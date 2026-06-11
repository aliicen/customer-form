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
		max-width: var(--layout-form-md);
		margin: var(--space-page-y) auto;
		padding: 0 var(--space-md);
		font-family: var(--font-family-base);
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-form-gap);
		margin-top: var(--space-lg);
	}

	a {
		color: var(--color-primary);
	}
</style>
