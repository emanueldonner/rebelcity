export const researchTree = [
	{
		title: 'Urban Survival Skills',
		tier: 'basic',
		branch: 'survival',
		depends_on: [],
		description: 'Learn essential survival skills for urban environments.',
		cost: 5,
		duration: 2,
		completed: true,
		leads_to: ['Advanced First Aid', 'Safehouse Security'],
		unlocks: {}
	},
	{
		title: 'Advanced First Aid',
		tier: 'intermediate',
		branch: 'survival',
		depends_on: ['Urban Survival Skills'],
		description: 'Enhance medical skills to treat injuries effectively.',
		cost: 10,
		duration: 3,
		completed: false,
		leads_to: ['Emergency Medical Response'],
		unlocks: { item: 'Field Medicine Kit' }
	},
	{
		title: 'Safehouse Security',
		tier: 'intermediate',
		branch: 'survival',
		depends_on: ['Urban Survival Skills'],
		description: 'Improve the security of your base to avoid detection and raids.',
		cost: 8,
		duration: 3,
		completed: false,
		leads_to: ['Counter-Surveillance Techniques'],
		unlocks: { facility: 'Enhanced Security Systems' }
	},
	{
		title: 'Emergency Medical Response',
		tier: 'advanced',
		branch: 'survival',
		depends_on: ['Advanced First Aid'],
		description: 'Prepare for and manage medical emergencies.',
		cost: 15,
		duration: 4,
		completed: false,
		leads_to: [],
		unlocks: { facility: 'Mobile Medical Unit' }
	},
	{
		title: 'Counter-Surveillance Techniques',
		tier: 'advanced',
		branch: 'survival',
		depends_on: ['Safehouse Security'],
		description: 'Learn advanced methods to evade and counteract surveillance.',
		cost: 12,
		duration: 4,
		completed: false,
		leads_to: [],
		unlocks: { technique: 'Stealth Operations' }
	},
	{
		title: 'Basic Encryption Techniques',
		tier: 'basic',
		branch: 'technology',
		description: 'Learn fundamental encryption methods to secure communications.',
		cost: 6,
		duration: 2,
		completed: false,
		depends_on: [],
		leads_to: ['Cybersecurity', 'Secure Communication'],
		unlocks: {}
	},
	{
		title: 'Cybersecurity',
		tier: 'intermediate',
		branch: 'technology',
		description: 'Develop advanced cybersecurity measures to protect sensitive data.',
		cost: 12,
		duration: 4,
		completed: false,
		depends_on: ['Basic Encryption Techniques'],
		leads_to: ['Advanced Hacking'],
		unlocks: { technique: 'Data Encryption' }
	},
	{
		title: 'Secure Communication',
		tier: 'intermediate',
		branch: 'technology',
		description: 'Implement secure communication channels to avoid interception.',
		cost: 10,
		duration: 3,
		completed: false,
		depends_on: ['Basic Encryption Techniques'],
		leads_to: ['Network Infiltration'],
		unlocks: { item: 'Encrypted Communication Devices' }
	},
	{
		title: 'Advanced Hacking',
		tier: 'advanced',
		branch: 'technology',
		description: 'Gain the ability to infiltrate high-level security systems.',
		cost: 15,
		duration: 5,
		completed: false,
		depends_on: ['Cybersecurity'],
		leads_to: ['Digital Counterintelligence'],
		unlocks: { technique: 'System Sabotage' }
	},
	{
		title: 'Network Infiltration',
		tier: 'advanced',
		branch: 'technology',
		description: 'Learn techniques for penetrating and analyzing complex networks.',
		cost: 18,
		duration: 5,
		completed: false,
		depends_on: ['Secure Communication'],
		leads_to: [],
		unlocks: { event: 'Data Leak Operations' }
	},
	{
		title: 'Digital Counterintelligence',
		tier: 'advanced',
		branch: 'technology',
		description: 'Master methods to counter digital espionage and misinformation.',
		cost: 20,
		duration: 6,
		completed: false,
		depends_on: ['Advanced Hacking'],
		leads_to: [],
		unlocks: { technique: 'Misinformation Campaigns' }
	},
	{
		title: 'Community Support Initiatives',
		tier: 'basic',
		branch: 'community',
		description:
			'Initiate programs focused on supporting the well-being and basic needs of community members.',
		cost: 4,
		duration: 2,
		completed: false,
		depends_on: [],
		leads_to: ['Mental Health Awareness', 'Urban Farming Projects'],
		unlocks: {}
	},
	{
		title: 'Mental Health Awareness',
		tier: 'intermediate',
		branch: 'community',
		description: 'Promote mental health awareness and provide resources for emotional well-being.',
		cost: 7,
		duration: 3,
		completed: false,
		depends_on: ['Community Support Initiatives'],
		leads_to: ['Counseling Services', 'Stress Management Workshops'],
		unlocks: { resource: 'Mental Health Materials' }
	},
	{
		title: 'Urban Farming Projects',
		tier: 'intermediate',
		branch: 'community',
		description:
			'Develop sustainable urban farming practices to enhance local food security and community engagement.',
		cost: 6,
		duration: 3,
		completed: false,
		depends_on: ['Community Support Initiatives'],
		leads_to: ['Community Gardens', 'Nutritional Education Programs'],
		unlocks: { facility: 'Community Greenhouse' }
	},
	{
		title: 'Counseling Services',
		tier: 'advanced',
		branch: 'community',
		description:
			'Establish counseling services to offer psychological support and crisis intervention.',
		cost: 10,
		duration: 4,
		completed: false,
		depends_on: ['Mental Health Awareness'],
		leads_to: [],
		unlocks: { service: 'Counseling Center' }
	},
	{
		title: 'Stress Management Workshops',
		tier: 'advanced',
		branch: 'community',
		description:
			'Conduct workshops focused on stress management techniques and self-care practices.',
		cost: 8,
		duration: 4,
		completed: false,
		depends_on: ['Mental Health Awareness'],
		leads_to: [],
		unlocks: { event: 'Wellness Workshops' }
	},
	{
		title: 'Community Gardens',
		tier: 'advanced',
		branch: 'community',
		description:
			'Create community gardens to foster a sense of community, provide food, and offer a peaceful retreat.',
		cost: 9,
		duration: 4,
		completed: false,
		depends_on: ['Urban Farming Projects'],
		leads_to: [],
		unlocks: { facility: 'Garden Spaces' }
	},
	{
		title: 'Nutritional Education Programs',
		tier: 'advanced',
		branch: 'community',
		description:
			'Implement programs to educate the community on nutrition, healthy eating, and sustainable food practices.',
		cost: 9,
		duration: 4,
		completed: false,
		depends_on: ['Urban Farming Projects'],
		leads_to: [],
		unlocks: { program: 'Nutritional Workshops' }
	},
	{
		title: 'Public Speaking Training',
		tier: 'basic',
		branch: 'communication',
		description: 'Develop effective public speaking skills to inspire and lead.',
		cost: 5,
		duration: 2,
		completed: false,
		depends_on: [],
		leads_to: ['Media Relations', 'Social Media Strategy'],
		unlocks: {}
	},
	{
		title: 'Media Relations',
		tier: 'intermediate',
		branch: 'communication',
		description:
			"Learn to engage with the media to shape public perception and spread the movement's message.",
		cost: 8,
		duration: 3,
		completed: false,
		depends_on: ['Public Speaking Training'],
		leads_to: ['Press Release Campaign', 'Crisis Communication'],
		unlocks: { technique: 'Media Engagement' }
	},
	{
		title: 'Social Media Strategy',
		tier: 'intermediate',
		branch: 'communication',
		description:
			'Develop strategies to effectively utilize social media for outreach and mobilization.',
		cost: 7,
		duration: 3,
		completed: false,
		depends_on: ['Public Speaking Training'],
		leads_to: ['Viral Marketing', 'Online Community Building'],
		unlocks: { technique: 'Social Media Presence' }
	},
	{
		title: 'Press Release Campaign',
		tier: 'advanced',
		branch: 'communication',
		description:
			"Craft and disseminate press releases to control the narrative and highlight the movement's activities.",
		cost: 10,
		duration: 4,
		completed: false,
		depends_on: ['Media Relations'],
		leads_to: [],
		unlocks: { event: 'Press Conferences' }
	},
	{
		title: 'Crisis Communication',
		tier: 'advanced',
		branch: 'communication',
		description:
			'Manage communication during crises to maintain public support and mitigate negative impacts.',
		cost: 12,
		duration: 4,
		completed: false,
		depends_on: ['Media Relations'],
		leads_to: [],
		unlocks: { technique: 'Crisis Management' }
	},
	{
		title: 'Viral Marketing',
		tier: 'advanced',
		branch: 'communication',
		description:
			'Create content and strategies designed to spread rapidly and gain widespread attention.',
		cost: 11,
		duration: 4,
		completed: false,
		depends_on: ['Social Media Strategy'],
		leads_to: [],
		unlocks: { technique: 'Viral Campaigns' }
	},
	{
		title: 'Online Community Building',
		tier: 'advanced',
		branch: 'communication',
		description:
			"Foster and grow an online community to support and propagate the movement's ideals.",
		cost: 9,
		duration: 4,
		completed: false,
		depends_on: ['Social Media Strategy'],
		leads_to: [],
		unlocks: { technique: 'Online Forums and Networks' }
	}
];
