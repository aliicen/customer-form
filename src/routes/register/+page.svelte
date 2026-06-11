<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Customer Registration</title>
</svelte:head>

<main>
	<a class="back-link" href={resolve('/')}>Back home</a>

	<section>
		<h1>Customer Registration</h1>
		<p>Submit your details and we will keep them on file.</p>

		{#if form?.success}
			<p class="success">Thanks, your registration was submitted.</p>
		{/if}

		<form method="post" use:enhance>
			<label>
				Name
				<input name="name" value={form?.values?.name ?? ''} autocomplete="name" />
			</label>
			{#if form?.errors?.name}<p class="error">{form.errors.name}</p>{/if}

			<label>
				Email
				<input type="email" name="email" value={form?.values?.email ?? ''} autocomplete="email" />
			</label>
			{#if form?.errors?.email}<p class="error">{form.errors.email}</p>{/if}

			<label for="country">
				Country
				<select
					id="country"
					name="country"
					value={form?.values?.country ?? ''}
					autocomplete="country-name"
					required
				>
					<option value="">Select a country</option>
					{#each data.countries as country (country.name)}
						<option value={country.name}>{country.label}</option>
					{/each}
				</select>
			</label>
			{#if data.countriesUnavailable}
				<p class="info">Country list is temporarily unavailable. Please try again shortly.</p>
			{:else if data.countriesSource === 'fallback'}
				<p class="info">Country list loaded from local fallback data.</p>
			{/if}
			{#if form?.errors?.country}<p class="error">{form.errors.country}</p>{/if}

			<button>Submit</button>
		</form>
	</section>
</main>

<style>
	main {
		max-width: var(--layout-form-md);
		margin: var(--space-page-y) auto;
		padding: 0 var(--space-md);
		font-family: var(--font-family-base);
	}

	section {
		display: grid;
		gap: var(--space-md);
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--space-md);
		color: var(--color-primary);
		font-weight: 700;
	}

	form {
		display: grid;
		gap: var(--space-form-gap);
	}

	label {
		display: grid;
		gap: var(--space-label-gap);
		font-weight: 600;
	}

	input,
	select {
		width: 100%;
		box-sizing: border-box;
		padding: var(--space-input-y);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius);
		font: inherit;
	}

	button {
		width: fit-content;
		padding: var(--space-btn-y) var(--space-btn-x);
		border: 0;
		border-radius: var(--radius);
		background: var(--color-button-bg);
		color: var(--color-button-text);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.error {
		margin: calc(var(--space-sm) * -0.8) 0 0;
		color: var(--color-error);
	}

	.info {
		margin: calc(var(--space-sm) * -0.8) 0 0;
		color: var(--color-text-muted);
	}

	.success {
		color: var(--color-success);
		font-weight: 600;
	}
</style>
