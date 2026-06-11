import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

const defaultRedirectTo = '/admin/submissions';

const getSafeRedirectTo = (value: FormDataEntryValue | string | null) => {
	const redirectTo = value?.toString() ?? '';

	if (redirectTo === '/admin/submissions' || redirectTo.startsWith('/admin/')) {
		return redirectTo;
	}

	return defaultRedirectTo;
};

export const load: PageServerLoad = (event) => {
	const redirectTo = getSafeRedirectTo(event.url.searchParams.get('redirect'));

	if (event.locals.user) {
		return redirect(302, redirectTo);
	}
	return { redirectTo };
};

export const actions: Actions = {
	signInEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const redirectTo = getSafeRedirectTo(
			formData.get('redirectTo') ?? event.url.searchParams.get('redirect')
		);

		try {
			await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: '/auth/verification-success'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Signin failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		return redirect(302, redirectTo);
	},
	signUpEmail: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';
		const redirectTo = getSafeRedirectTo(
			formData.get('redirectTo') ?? event.url.searchParams.get('redirect')
		);

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name,
					callbackURL: '/auth/verification-success'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Registration failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		return redirect(302, redirectTo);
	}
};
