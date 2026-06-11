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
		max-width: var(--layout-content-xl);
		margin: var(--space-page-y) auto;
		padding: 0 var(--space-md);
		font-family: var(--font-family-base);
	}

	.page-header,
	.toolbar {
		display: flex;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.page-header {
		align-items: flex-start;
		margin-bottom: var(--space-lg);
	}

	.toolbar {
		align-items: flex-end;
		margin-bottom: var(--space-md);
		padding: var(--space-panel-pad-y) var(--space-md);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius);
		background: var(--color-surface);
	}

	h1,
	p {
		margin: 0;
	}

	.eyebrow {
		margin-bottom: var(--space-xs);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		font-weight: 700;
		text-transform: uppercase;
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--space-md);
		font-weight: 700;
	}

	.header-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-form-gap);
		justify-content: flex-end;
	}

	.page-header a,
	button {
		padding: var(--space-btn-y-sm) var(--space-btn-x-sm);
		border: 1px solid var(--color-button-bg);
		border-radius: var(--radius);
		font: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	.page-header a {
		color: var(--color-button-bg);
	}

	button {
		background: var(--color-button-bg);
		color: var(--color-button-text);
		cursor: pointer;
	}

	label {
		display: grid;
		gap: var(--space-label-gap);
		min-width: min(100%, var(--layout-input-min));
		font-weight: 700;
	}

	input {
		padding: var(--space-btn-y-sm) var(--space-input-x);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius);
		font: inherit;
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-table);
	}

	th,
	td {
		padding: var(--space-btn-y) var(--space-form-gap);
		border-bottom: 1px solid var(--color-border-soft);
		text-align: left;
		vertical-align: top;
		white-space: nowrap;
	}

	th {
		background: var(--color-surface-alt);
		font-weight: 700;
	}

	tbody tr:nth-child(even) {
		background: var(--color-surface-row);
	}

	tbody tr:hover {
		background: var(--color-surface-hover);
	}

	tbody tr:last-child td {
		border-bottom: 0;
	}

	.id-cell {
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
	}

	.empty-state {
		padding: var(--space-md);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius);
		background: var(--color-surface);
	}

	a {
		color: var(--color-primary);
	}

	@media (max-width: var(--breakpoint-md)) {
		.page-header,
		.toolbar {
			align-items: stretch;
			flex-direction: column;
		}
	}
</style>
