<script>
	import { researchTree } from '$lib/research_data.js';

	import { onMount, onDestroy } from 'svelte';

	let projectElements = {};
	let lines = [];
	let modalContent = null;

	function updateLines() {
		lines = [];
		researchTree.forEach((project) => {
			const startElement = projectElements[project.title];
			if (startElement) {
				project.leads_to.forEach((dependentTitle) => {
					const endElement = projectElements[dependentTitle];
					if (endElement) {
						const startRect = startElement.getBoundingClientRect();
						const endRect = endElement.getBoundingClientRect();
						lines.push({
							x1: startRect.left + startRect.width / 2,
							y1: startRect.top + startRect.height / 2,
							x2: endRect.left + endRect.width / 2,
							y2: endRect.top + endRect.height / 2
						});
					}
				});
			}
		});
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateLines);
			setTimeout(updateLines, 0); // Delay to ensure elements are rendered
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateLines);
		}
	});
	// Group projects by branch and then by tier
	const branches = researchTree.reduce((acc, project) => {
		if (!acc[project.branch]) {
			acc[project.branch] = {};
		}
		const branch = acc[project.branch];
		if (!branch[project.tier]) {
			branch[project.tier] = [];
		}
		branch[project.tier].push(project);
		return acc;
	}, {});

	const isUnlocked = (project) => {
		return project.depends_on?.every(
			(dependency) => researchTree.find((p) => p.title === dependency)?.completed
		);
	};

	function showProjectModal(project) {
		modalContent = project;
	}

	function hideProjectModal() {
		modalContent = null;
	}
</script>

<div class="research-container">
	{#each Object.entries(branches) as [branchName, tiers]}
		<div class={`branch ${branchName}`}>
			<h2>{branchName}</h2>
			{#each Object.entries(tiers) as [tierName, projects]}
				<div class={`tier ${tierName}`}>
					<h3>{tierName}</h3>
					<div class="tier-group">
						{#each projects as project}
							<div
								role="button"
								tabindex="0"
								class={`research-item ${isUnlocked(project) ? '' : 'locked'} ${
									project.completed ? 'completed' : ''
								}`}
								on:mouseover={() => showProjectModal(project)}
								on:mouseleave={hideProjectModal}
								on:focus={() => showProjectModal(project.title)}
							>
								<div bind:this={projectElements[project.title]} class="project-sphere"></div>
								<div class="title">{project.title}</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

{#if modalContent}
	<button class="modal-overlay" on:click={hideProjectModal} tabindex="0">
		<div class="modal">
			<h2>{modalContent.title}</h2>
			<div>
				<table>
					<tbody>
						{#if modalContent.description}
							<tr>
								<td><strong>Description:</strong></td>
								<td>{modalContent.description}</td>
							</tr>
						{/if}
						{#if modalContent.tier}
							<tr>
								<td><strong>Tier:</strong></td>
								<td>{modalContent.tier}</td>
							</tr>
						{/if}
						{#if modalContent.branch}
							<tr>
								<td><strong>Branch:</strong></td>
								<td>{modalContent.branch}</td>
							</tr>
						{/if}
						{#if modalContent.cost}
							<tr>
								<td><strong>Cost:</strong></td>
								<td>{modalContent.cost} Research Points</td>
							</tr>
						{/if}
						{#if modalContent.duration}
							<tr>
								<td><strong>Duration:</strong></td>
								<td>{modalContent.duration} turns</td>
							</tr>
						{/if}
						<tr>
							<td><strong>Completed:</strong></td>
							<td>{modalContent.completed ? 'Yes' : 'No'}</td>
						</tr>
						{#if Object.keys(modalContent.depends_on).length > 0}
							<tr>
								<td><strong>Depends on:</strong></td>
								<td>{modalContent.depends_on.join(', ')}</td>
							</tr>
						{/if}
						{#if Object.keys(modalContent.leads_to).length > 0}
							<tr>
								<td><strong>Leads to:</strong></td>
								<td>{modalContent.leads_to.join(', ')}</td>
							</tr>
						{/if}
						{#if Object.keys(modalContent.unlocks).length > 0}
							<tr>
								<td><strong>Unlocks:</strong></td>
								<td>
									{#each Object.entries(modalContent.unlocks) as [key, value]}
										{value} ({key})
									{/each}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div></button
	>
{/if}

<!-- <svg
	class="lines-container"
	style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"
>
	{#each lines as line}
		<line
			x1={line.x1}
			y1={line.y1}
			x2={line.x2}
			y2={line.y2}
			stroke="rgb(39, 63, 63)"
			stroke-dasharray="8, 8"
			stroke-width="3"
		/>
	{/each}
</svg> -->

<style>
	.lines-container {
		z-index: 1;
	}
	.research-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/* gap: 1rem; */
		text-align: center;
		/* flex-direction: column; */
		font-family: 'Young Serif', serif;
		background-color: #1a1a1a;
		overflow-x: auto;
		color: #fff;
		padding: 1rem;
	}
	h2 {
		text-transform: capitalize;
	}
	h3 {
		text-transform: capitalize;
		color: #444;
	}
	.branch {
		flex: 1;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
		z-index: 2;
		padding: 0.5rem;
		min-width: 40%;
	}
	.branch:hover {
		background-color: rgba(255, 255, 255, 0.02);
	}
	.tier {
		background-color: rgba(255, 255, 255, 0.02);
		border-radius: 1rem;
		padding: 0.5rem;
	}
	.tier-group {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}

	.research-item {
		position: relative;
		margin: 1em 0;
		padding: 1em;
		border-radius: 4px;
		/* background-color: rgb(138, 215, 215); */
		color: #eee;
		cursor: pointer;
		/* transition: all 0.2s ease-in-out; */
	}
	.research-item:hover {
		background-color: rgba(117, 222, 222, 0.428);
		box-shadow: 0 0 0.8rem rgba(138, 217, 217, 0.8);
	}
	.research-item.locked {
		opacity: 0.5;
	}

	.research-item.locked .project-sphere {
		background-color: transparent !important;
		border: 3px solid rgb(194, 194, 194);
	}

	.research-item.completed .project-sphere {
		background-color: rgb(138, 215, 215);
		border-color: rgb(138, 215, 215);
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-family: 'Young Serif', serif;
		background-color: rgba(0, 0, 0, 0);
		border-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
		pointer-events: none;
	}

	.modal {
		background-color: rgb(182, 228, 228);
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 8px rgba(182, 228, 228, 0.5);
		/* width: 80%; */
		max-width: 500px; /* Adjust as needed */
		text-align: left;
	}
	.modal h2 {
		text-align: center;
	}
	.modal table {
		width: 100%;
		border-collapse: collapse;
	}

	.modal table td {
		padding: 0.5rem;
	}

	.modal table td {
		text-align: left;
	}

	.modal table tr:nth-child(even) {
		background-color: rgba(255, 255, 255, 0.4);
	}

	.research-item .project-sphere {
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		background-color: transparent;
		border: 3px solid rgb(138, 215, 215);
		margin-right: 0.5em;
		display: inline-block;
	}

	.title {
		font-weight: bold;
	}

	.description {
		margin-top: 0.5em;
	}

	.details {
		margin-top: 0.5em;
		font-size: 0.9em;
		color: #333;
	}
</style>
