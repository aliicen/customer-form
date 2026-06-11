import { redirect } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { customerRegistration } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/demo/better-auth/login?redirect=/admin/submissions');
	}

	const submissions = await db
		.select()
		.from(customerRegistration)
		.orderBy(desc(customerRegistration.createdAt));

	return { submissions };
};

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});

		return redirect(302, '/demo/better-auth/login');
	}
};
