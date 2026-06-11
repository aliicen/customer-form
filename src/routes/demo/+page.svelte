<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<main>
	<a href={resolve('/')}>Back home</a>
	<a href={resolve('/demo/better-auth')}>Better Auth demo</a>
</main>

<style>
	main {
		display: flex;
		gap: var(--space-md);
		max-width: var(--layout-form-md);
		margin: var(--space-page-y) auto;
		padding: 0 var(--space-md);
		font-family: var(--font-family-base);
	}

	a {
		color: var(--color-primary);
		font-weight: 700;
	}
</style>
