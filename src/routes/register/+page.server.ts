import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { customerRegistration } from '$lib/server/db/schema';

type FieldErrors = Partial<Record<'name' | 'email' | 'country', string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getString = (formData: FormData, field: string) =>
	(formData.get(field)?.toString() ?? '').trim();

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
