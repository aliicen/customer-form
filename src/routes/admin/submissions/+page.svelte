<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let search = $state('');

	const visibleSubmissions = $derived(
		data.submissions.filter((submission) => {
			const term = search.trim().toLowerCase();

			if (!term) return true;

			return [submission.id.toString(), submission.name, submission.email, submission.country]
				.join(' ')
				.toLowerCase()
				.includes(term);
		})
	);

	const formatDate = (date: Date | string) =>
		new Intl.DateTimeFormat('en', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(new Date(date));
</script>

<svelte:head>
	<title>Customer Submissions</title>
</svelte:head>

<main>
	<a class="back-link" href={resolve('/')}>Back home</a>

	<header class="page-header">
		<div>
			<p class="eyebrow">Customer registrations</p>
			<h1>Submissions Database</h1>
		</div>

		<div class="header-actions">
			<a href={resolve('/register')}>New registration</a>
			<form method="post" action="?/signOut" use:enhance>
				<button>Logout</button>
			</form>
		</div>
	</header>

	<div class="toolbar">
		<p>
			<strong>{visibleSubmissions.length}</strong> shown of
			<strong>{data.submissions.length}</strong> total
		</p>

		<label>
			Search submissions
			<input bind:value={search} type="search" placeholder="Name, email, country, or ID" />
		</label>
	</div>

	{#if data.submissions.length === 0}
		<p class="empty-state">No customer registrations submitted yet.</p>
	{:else if visibleSubmissions.length === 0}
		<p class="empty-state">No submissions match your search.</p>
	{:else}
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Country</th>
						<th>Submitted</th>
					</tr>
				</thead>
				<tbody>
					{#each visibleSubmissions as submission (submission.id)}
						<tr>
							<td class="id-cell">#{submission.id}</td>
							<td>{submission.name}</td>
							<td><a href={`mailto:${submission.email}`}>{submission.email}</a></td>
							<td>{submission.country}</td>
							<td>{formatDate(submission.createdAt)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 72rem;
		margin: 3rem auto;
		padding: 0 1rem;
		font-family: sans-serif;
	}

	.page-header,
	.toolbar {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.page-header {
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.toolbar {
		align-items: flex-end;
		margin-bottom: 1rem;
		padding: 0.85rem 1rem;
		border: 1px solid #d7d7d7;
		border-radius: 6px;
		background: #fafafa;
	}

	h1,
	p {
		margin: 0;
	}

	.eyebrow {
		margin-bottom: 0.25rem;
		color: #555;
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	.header-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: flex-end;
	}

	.page-header a,
	button {
		padding: 0.55rem 0.8rem;
		border: 1px solid #1f2937;
		border-radius: 4px;
		font: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	.page-header a {
		color: #1f2937;
	}

	button {
		background: #1f2937;
		color: white;
		cursor: pointer;
	}

	label {
		display: grid;
		gap: 0.35rem;
		min-width: min(100%, 20rem);
		font-weight: 700;
	}

	input {
		padding: 0.55rem 0.65rem;
		border: 1px solid #b8b8b8;
		border-radius: 4px;
		font: inherit;
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid #d7d7d7;
		border-radius: 6px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid #e5e5e5;
		text-align: left;
		vertical-align: top;
		white-space: nowrap;
	}

	th {
		background: #f6f6f6;
		font-weight: 700;
	}

	tbody tr:nth-child(even) {
		background: #fbfbfb;
	}

	tbody tr:hover {
		background: #f3f6fb;
	}

	tbody tr:last-child td {
		border-bottom: 0;
	}

	.id-cell {
		color: #555;
		font-variant-numeric: tabular-nums;
	}

	.empty-state {
		padding: 1rem;
		border: 1px solid #d7d7d7;
		border-radius: 6px;
		background: #fafafa;
	}

	a {
		color: #1d4ed8;
	}

	@media (max-width: 720px) {
		.page-header,
		.toolbar {
			align-items: stretch;
			flex-direction: column;
		}
	}
</style>
