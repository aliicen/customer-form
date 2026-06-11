<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playwrite+GB+J:wght@100..400&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
