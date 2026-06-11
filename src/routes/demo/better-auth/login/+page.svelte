<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin Login</title>
</svelte:head>

<main>
	<a class="back-link" href={resolve('/')}>Back home</a>

	<section>
		<h1>Admin Login</h1>
		<p>Sign in to view customer registration submissions.</p>

		<form method="post" action="?/signInEmail" use:enhance>
			<input type="hidden" name="redirectTo" value={data.redirectTo} />

			<label>
				Email
				<input type="email" name="email" autocomplete="email" required />
			</label>

			<label>
				Password
				<input type="password" name="password" autocomplete="current-password" required />
			</label>

			<label>
				Name (for registration)
				<input name="name" autocomplete="name" />
			</label>

			<div class="actions">
				<button>Login</button>
				<button formaction="?/signUpEmail">Register</button>
			</div>
		</form>

		{#if form?.message}
			<p class="error">{form.message}</p>
		{/if}
	</section>
</main>

<style>
	main {
		max-width: var(--layout-form-sm);
		margin: var(--space-page-y) auto;
		padding: 0 var(--space-md);
		font-family: var(--font-family-base);
	}

	section,
	form {
		display: grid;
		gap: var(--space-md);
	}

	h1,
	p {
		margin: 0;
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--space-md);
		color: var(--color-primary);
		font-weight: 700;
	}

	label {
		display: grid;
		gap: var(--space-label-gap);
		font-weight: 700;
	}

	input {
		padding: var(--space-input-y);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius);
		font: inherit;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-form-gap);
	}

	button {
		padding: var(--space-btn-y) var(--space-btn-x);
		border: 0;
		border-radius: var(--radius);
		background: var(--color-button-bg);
		color: var(--color-button-text);
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}

	button[formaction] {
		border: 1px solid var(--color-button-bg);
		background: var(--color-background);
		color: var(--color-button-bg);
	}

	.error {
		color: var(--color-error);
		font-weight: 700;
	}
</style>
