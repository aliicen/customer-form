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
		max-width: 36rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: sans-serif;
	}

	section {
		display: grid;
		gap: 1rem;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
		color: #1d4ed8;
		font-weight: 700;
	}

	form {
		display: grid;
		gap: 0.75rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-weight: 600;
	}

	input,
	select {
		width: 100%;
		box-sizing: border-box;
		padding: 0.6rem;
		border: 1px solid #b8b8b8;
		border-radius: 4px;
		font: inherit;
	}

	button {
		width: fit-content;
		padding: 0.65rem 1rem;
		border: 0;
		border-radius: 4px;
		background: #1f2937;
		color: white;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.error {
		margin: -0.4rem 0 0;
		color: #b42318;
	}

	.info {
		margin: -0.4rem 0 0;
		color: #555;
	}

	.success {
		color: #067647;
		font-weight: 600;
	}
</style>
