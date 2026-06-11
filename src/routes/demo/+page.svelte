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
		gap: 1rem;
		max-width: 36rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: sans-serif;
	}

	a {
		color: #1d4ed8;
		font-weight: 700;
	}
</style>
