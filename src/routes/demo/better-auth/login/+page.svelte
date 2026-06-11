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
		max-width: 34rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: sans-serif;
	}

	section,
	form {
		display: grid;
		gap: 1rem;
	}

	h1,
	p {
		margin: 0;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
		color: #1d4ed8;
		font-weight: 700;
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-weight: 700;
	}

	input {
		padding: 0.6rem;
		border: 1px solid #b8b8b8;
		border-radius: 4px;
		font: inherit;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	button {
		padding: 0.65rem 1rem;
		border: 0;
		border-radius: 4px;
		background: #1f2937;
		color: white;
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}

	button[formaction] {
		border: 1px solid #1f2937;
		background: white;
		color: #1f2937;
	}

	.error {
		color: #b42318;
		font-weight: 700;
	}
</style>
