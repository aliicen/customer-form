<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<main>
	<a class="back-link" href={resolve('/')}>Back home</a>

	<header>
		<div>
			<p>Signed in as {data.user.email}</p>
			<h1>Admin</h1>
		</div>

		<form method="post" action="?/signOut" use:enhance>
			<button>Sign out</button>
		</form>
	</header>

	<section>
		<h2>Customer registration database</h2>
		<p>View submitted customer registrations in the protected database view.</p>
		<a href={resolve('/admin/submissions')}>Open submissions database</a>
	</section>
</main>

<style>
	main {
		max-width: var(--layout-content-lg);
		margin: var(--space-page-y) auto;
		padding: 0 var(--space-md);
		font-family: var(--font-family-base);
	}

	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	h1,
	p {
		margin: 0;
	}

	header p {
		margin-bottom: var(--space-label-gap);
		color: var(--color-text-muted);
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--space-md);
		color: var(--color-primary);
		font-weight: 700;
	}

	button {
		padding: var(--space-input-y) var(--space-btn-y-alt);
		border: 0;
		border-radius: var(--radius);
		background: var(--color-button-bg);
		color: var(--color-button-text);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	section {
		display: grid;
		gap: var(--space-form-gap);
		margin-top: var(--space-md);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius);
		padding: var(--space-md);
		background: var(--color-surface);
	}

	h2 {
		margin: 0;
	}

	a {
		color: var(--color-primary);
		font-weight: 700;
	}
</style>
