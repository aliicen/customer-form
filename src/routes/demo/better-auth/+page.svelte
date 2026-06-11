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
		max-width: 64rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: sans-serif;
	}

	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	h1,
	p {
		margin: 0;
	}

	header p {
		margin-bottom: 0.35rem;
		color: #555;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
		color: #1d4ed8;
		font-weight: 700;
	}

	button {
		padding: 0.6rem 0.9rem;
		border: 0;
		border-radius: 4px;
		background: #1f2937;
		color: white;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	section {
		display: grid;
		gap: 0.75rem;
		margin-top: 1rem;
		border: 1px solid #d7d7d7;
		border-radius: 6px;
		padding: 1rem;
		background: #fafafa;
	}

	h2 {
		margin: 0;
	}

	a {
		color: #1d4ed8;
		font-weight: 700;
	}
</style>
