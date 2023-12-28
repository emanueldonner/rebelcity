export const ruleset = {
	overview: {
		title: 'Game Overview',
		content: [
			{
				subtitle: 'Introduction',
				detail:
					'Rebel City is a turn-based strategy game set in a modern urban environment where players lead a revolutionary movement. The game combines elements of strategic planning, resource management, and character development.'
			},
			{
				subtitle: 'Gameplay',
				detail:
					'Players work together, building their underground base, influencing city dynamics, and fulfilling individual missions, all while balancing the collective needs and skills of their characters.'
			}
		]
	},
	gameContents: {
		title: 'Game Contents',
		content: [
			{
				subtitle: '25 City Map Tiles',
				detail: [
					'1 City Hall Tile',
					'8 Inner Ring Tiles (including 2 Alleyway Tiles (Nr. 1 & 2), University and Main Square Tile)',
					'16 Outer Ring Tiles (including 4 Alleyway Tiles (Nr. 3 - 6), Hospital, Factory and Mall Tile)'
				]
			},
			{
				subtitle: 'Other Components',
				detail: [
					'City Map Grid (5x5)',
					'1 Underground Map Grid (25x25)',
					'1 Six-Sided Die',
					'X Mission Cards',
					'X Event Cards',
					'X Underground Base Tiles',
					'X Resource Tokens',
					'X Character Sheets',
					'Markers for Base Entrance, Revolution, Community, and Suspicion Points.'
				]
			}
		]
	},
	setup: {
		title: 'Setting Up the City Map',
		content: [
			{
				subtitle: 'Central Administrative District:',
				detail: 'Place the City Hall tile at the center of the 5x5 grid.'
			},
			{
				subtitle: 'Inner Ring (Residential and Cultural District):',
				detail:
					'Shuffle the Inner Ring tiles, including the Alleyway tiles, the University and the Main Square, and lay them face down around the City Hall tile.'
			},
			{
				subtitle: 'Outer Ring (Commercial and Industrial District):',
				detail:
					'Shuffle the Outer Ring tiles, including the Alleyway Tiles, the Hospital, Factory and the Mall, and lay them face down to form the outer layer of the grid.'
			},
			{
				subtitle: 'Reveal the Cityscape:',
				detail: 'Turn over all the tiles to reveal the layout of Rebel City.'
			}
		]
	},

	turnStructure: {
		title: 'Turn Structure',
		content: [
			{
				subtitle: "Base's Turn",
				detail: 'Plan and build underground base, plan city events, manage resources.'
			},
			{
				subtitle: "Player's Turn",
				detail: 'Progress on Mission Cards, perform actions like recruiting, gather intelligence.'
			},
			{
				subtitle: "City's Turn",
				detail: 'Resolve events, draw Event Cards, update points.'
			}
		]
	},
	skillsSystem: {
		title: 'Skills System',
		content: [
			{
				subtitle: 'Technical Skills',
				detail:
					'Include mechanics, IT, engineering. Useful for tasks like sabotage, hacking, building.'
			},
			{
				subtitle: 'Social Skills',
				detail:
					'Encompass public speaking, persuasion, negotiation. Key for recruiting, organizing events.'
			},
			{
				subtitle: 'Strategic Skills',
				detail:
					'Involves planning, logistics, tactical thinking. Essential for mission planning, resource allocation.'
			},
			{
				subtitle: 'Medical Skills',
				detail:
					'Covers medical knowledge, first aid. Important for treating injuries, managing health crises.'
			},
			{
				subtitle: 'Stealth Skills',
				detail: 'Includes stealth, espionage. Crucial for intelligence gathering, secret missions.'
			}
		]
	},
	needsSystem: {
		title: 'Needs System',
		content: [
			{
				subtitle: 'Physical Needs',
				detail:
					'Include nutrition, sleep, physical health. Neglecting these leads to decreased performance.'
			},
			{
				subtitle: 'Psychological Needs',
				detail:
					'Covers mental health, stress management. Essential for maintaining focus, decision-making.'
			},
			{
				subtitle: 'Social Needs',
				detail: 'Involves interaction, belonging. Important for cooperation, preventing isolation.'
			},
			{
				subtitle: 'Safety Needs',
				detail: 'Concerns personal safety, protection. Crucial for ensuring characters feel secure.'
			},
			{
				subtitle: 'Self-Actualization Needs',
				detail:
					"Relates to personal growth, fulfillment. Neglecting this can hinder character's development."
			}
		]
	},
	communityPoints: {
		title: 'Community Points',
		content: [
			{
				subtitle: 'Earning Community Points',
				detail: 'Earn CPs through community-based projects and actions that promote social equity.'
			},
			{
				subtitle: 'Tracking Community Points',
				detail: "CPs are tracked on a scale, influencing the post-revolution society's stability."
			}
		]
	},
	gameProgression: {
		title: 'Progressing Through the Game',
		content: [
			{
				subtitle: 'Completing Missions',
				detail: 'Complete missions to draw new Mission Cards, contributing to Revolution Points.'
			},
			{
				subtitle: 'Milestones',
				detail: 'Track milestones on scales, triggering events that influence game direction.'
			}
		]
	},
	winningAndLosing: {
		title: 'Winning and Losing',
		content: [
			{
				subtitle: 'Victory Conditions',
				detail:
					"Achieve 10 Revolution Points for victory, with Community Points determining society's quality."
			},
			{
				subtitle: 'Defeat Conditions',
				detail: 'The game is lost if Suspicion Points reach 10, indicating movement compromise.'
			}
		]
	},
	gameplayExperience: {
		title: 'Gameplay Experience',
		content: [
			{
				subtitle: 'Strategic Rebellion',
				detail:
					'Balance revolutionary objectives with the well-being of characters and the community.'
			},
			{
				subtitle: 'Decision Making',
				detail:
					"Every decision, from planning protests to expanding your base, shapes the game's outcome."
			}
		]
	}
};

export default ruleset;
