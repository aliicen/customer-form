import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { customerRegistration } from '$lib/server/db/schema';

type FieldErrors = Partial<Record<'name' | 'email' | 'country', string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getString = (formData: FormData, field: string) =>
	(formData.get(field)?.toString() ?? '').trim();

type RestCountry = {
	cca2?: string;
	name?: { common?: string };
	flag?: string;
};

type CountryOption = {
	name: string;
	label: string;
};

const countryCodeToFlag = (code: string) =>
	code
		.toUpperCase()
		.split('')
		.map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
		.join('');

const normalizeCountries = (payload: unknown): CountryOption[] => {
	if (!Array.isArray(payload)) return [];

	return payload
		.map((country) => {
			const item = country as RestCountry | Record<string, unknown>;
			const nameCandidate =
				typeof item.name === 'string'
					? item.name
					: item.name && typeof item.name === 'object'
						? (((item.name as { common?: string }).common as string | undefined) ?? '')
						: '';
			const name = nameCandidate.trim();

			if (!name) return null;

			const flagCandidate =
				typeof item.flag === 'string'
					? item.flag
					: typeof item.cca2 === 'string'
						? countryCodeToFlag(item.cca2)
						: '';
			const flag = flagCandidate.trim();

			return {
				name,
				label: flag ? `${flag} ${name}` : name
			};
		})
		.filter((country): country is CountryOption => country !== null)
		.sort((a, b) => a.name.localeCompare(b.name));
};

const getFallbackCountries = async (fetchFn: typeof fetch): Promise<CountryOption[]> => {
	try {
		const response = await fetchFn('https://flagcdn.com/en/codes.json');
		if (!response.ok) return [];

		const payload = (await response.json()) as Record<string, string>;

		return Object.entries(payload)
			.map(([code, name]) => {
				if (!/^[a-z]{2}$/i.test(code)) return null;

				const countryName = name.trim();
				if (!countryName) return null;

				const flag = countryCodeToFlag(code);
				return {
					name: countryName,
					label: `${flag} ${countryName}`
				};
			})
			.filter((country): country is CountryOption => country !== null)
			.sort((a, b) => a.name.localeCompare(b.name));
	} catch {
		return [];
	}
};

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.REST_COUNTRIES_URL?.trim();

	if (!baseUrl) {
		const countries = await getFallbackCountries(fetch);
		return {
			countries,
			countriesUnavailable: countries.length === 0,
			countriesSource: countries.length > 0 ? 'fallback' : 'none'
		};
	}

	const endpoint = `${baseUrl.replace(/\/+$/, '')}/all`;

	try {
		const response = await fetch(endpoint);

		const payload = (await response.json()) as unknown;
		const countries = response.ok ? normalizeCountries(payload) : [];
		const fallbackCountries = countries.length === 0 ? await getFallbackCountries(fetch) : [];
		const finalCountries = countries.length > 0 ? countries : fallbackCountries;

		return {
			countries: finalCountries,
			countriesUnavailable: finalCountries.length === 0,
			countriesSource:
				countries.length > 0 ? 'api' : fallbackCountries.length > 0 ? 'fallback' : 'none'
		};
	} catch {
		const countries = await getFallbackCountries(fetch);
		return {
			countries,
			countriesUnavailable: countries.length === 0,
			countriesSource: countries.length > 0 ? 'fallback' : 'none'
		};
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			name: getString(formData, 'name'),
			email: getString(formData, 'email'),
			country: getString(formData, 'country')
		};

		const errors: FieldErrors = {};

		if (!values.name) errors.name = 'Name is required.';
		else if (values.name.length > 120) errors.name = 'Name must be 120 characters or fewer.';

		if (!values.email) errors.email = 'Email is required.';
		else if (values.email.length > 254) errors.email = 'Email must be 254 characters or fewer.';
		else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.';

		if (!values.country) errors.country = 'Country is required.';
		else if (values.country.length > 120)
			errors.country = 'Country must be 120 characters or fewer.';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		await db.insert(customerRegistration).values(values);

		return { success: true };
	}
};
