<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<main>
	<h1>Customer Form</h1>
	<p>Collect customer registrations and review submissions after signing in.</p>

	<nav aria-label="Main navigation">
		<a href={resolve('/register')}>Open registration form</a>
		<a href={resolve('/admin/submissions')}>View submissions</a>
		<a href={resolve('/demo/better-auth/login?redirect=/admin/submissions')}>Admin login</a>
	</nav>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: sans-serif;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	a {
		color: #1d4ed8;
	}
</style>
