<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const countries = [
		'Afghanistan',
		'Albania',
		'Algeria',
		'Andorra',
		'Angola',
		'Antigua and Barbuda',
		'Argentina',
		'Armenia',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bhutan',
		'Bolivia',
		'Bosnia and Herzegovina',
		'Botswana',
		'Brazil',
		'Brunei',
		'Bulgaria',
		'Burkina Faso',
		'Burundi',
		'Cabo Verde',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Central African Republic',
		'Chad',
		'Chile',
		'China',
		'Colombia',
		'Comoros',
		'Congo',
		'Costa Rica',
		'Croatia',
		'Cuba',
		'Cyprus',
		'Czechia',
		'Democratic Republic of the Congo',
		'Denmark',
		'Djibouti',
		'Dominica',
		'Dominican Republic',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Eswatini',
		'Ethiopia',
		'Fiji',
		'Finland',
		'France',
		'Gabon',
		'Gambia',
		'Georgia',
		'Germany',
		'Ghana',
		'Greece',
		'Grenada',
		'Guatemala',
		'Guinea',
		'Guinea-Bissau',
		'Guyana',
		'Haiti',
		'Honduras',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran',
		'Iraq',
		'Ireland',
		'Israel',
		'Italy',
		'Jamaica',
		'Japan',
		'Jordan',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		'Kuwait',
		'Kyrgyzstan',
		'Laos',
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands',
		'Mauritania',
		'Mauritius',
		'Mexico',
		'Micronesia',
		'Moldova',
		'Monaco',
		'Mongolia',
		'Montenegro',
		'Morocco',
		'Mozambique',
		'Myanmar',
		'Namibia',
		'Nauru',
		'Nepal',
		'Netherlands',
		'New Zealand',
		'Nicaragua',
		'Niger',
		'Nigeria',
		'North Korea',
		'North Macedonia',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Panama',
		'Papua New Guinea',
		'Paraguay',
		'Peru',
		'Philippines',
		'Poland',
		'Portugal',
		'Qatar',
		'Romania',
		'Russia',
		'Rwanda',
		'Saint Kitts and Nevis',
		'Saint Lucia',
		'Saint Vincent and the Grenadines',
		'Samoa',
		'San Marino',
		'Sao Tome and Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Korea',
		'South Sudan',
		'Spain',
		'Sri Lanka',
		'Sudan',
		'Suriname',
		'Sweden',
		'Switzerland',
		'Syria',
		'Taiwan',
		'Tajikistan',
		'Tanzania',
		'Thailand',
		'Timor-Leste',
		'Togo',
		'Tonga',
		'Trinidad and Tobago',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates',
		'United Kingdom',
		'United States',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Vatican City',
		'Venezuela',
		'Vietnam',
		'Yemen',
		'Zambia',
		'Zimbabwe'
	];

	let countryValue = $state('');
	let countryOpen = $state(false);

	$effect(() => {
		if (form?.values?.country !== undefined) countryValue = form.values.country;
	});

	const filteredCountries = $derived(
		countries.filter((country) => country.toLowerCase().includes(countryValue.trim().toLowerCase()))
	);

	const selectCountry = (country: string) => {
		countryValue = country;
		countryOpen = false;
	};
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

			<div class="country-field">
				<label for="country">Country</label>
				<input
					id="country"
					name="country"
					bind:value={countryValue}
					autocomplete="country-name"
					placeholder="Search or select a country"
					aria-autocomplete="list"
					aria-expanded={countryOpen}
					aria-controls="country-options"
					onfocus={() => (countryOpen = true)}
					oninput={() => (countryOpen = true)}
					onblur={() => setTimeout(() => (countryOpen = false), 120)}
				/>

				{#if countryOpen}
					<ul id="country-options" class="country-options" role="listbox">
						{#if filteredCountries.length === 0}
							<li class="country-empty">No countries found</li>
						{:else}
							{#each filteredCountries as country (country)}
								<li>
									<button
										type="button"
										role="option"
										aria-selected={country === countryValue}
										onmousedown={() => selectCountry(country)}
									>
										{country}
									</button>
								</li>
							{/each}
						{/if}
					</ul>
				{/if}
			</div>
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

	.country-field {
		position: relative;
		display: grid;
		gap: 0.35rem;
	}

	input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.6rem;
		border: 1px solid #b8b8b8;
		border-radius: 4px;
		font: inherit;
	}

	.country-options {
		position: absolute;
		top: calc(100% + 0.25rem);
		left: 0;
		right: 0;
		z-index: 10;
		max-height: 14rem;
		margin: 0;
		padding: 0.25rem 0;
		overflow-y: auto;
		border: 1px solid #b8b8b8;
		border-radius: 4px;
		background: white;
		box-shadow: 0 8px 18px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	.country-options button,
	.country-empty {
		width: 100%;
		padding: 0.6rem 0.75rem;
		text-align: left;
	}

	.country-options button {
		border: 0;
		border-radius: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}

	.country-options button:hover,
	.country-options button:focus {
		background: #f3f6fb;
		outline: none;
	}

	.country-empty {
		color: #555;
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

	.success {
		color: #067647;
		font-weight: 600;
	}
</style>
