export const equipment = [
	// Reconnaissance & Surveillance
	{
		id: 'binoculars',
		name: 'Binoculars',
		description: 'Optical devices for long-distance visual surveillance.',
		categories: ['recon-surveillance']
	},
	{
		id: 'night-vision',
		name: 'Night Vision Devices',
		description: 'Devices that amplify low light for visibility in dark conditions.',
		categories: ['recon-surveillance', 'protection-defense']
	},
	{
		id: 'thermal-imaging',
		name: 'Thermal Imaging Cameras',
		description: 'Cameras for detecting heat signatures for surveillance.',
		categories: ['recon-surveillance']
	},
	{
		id: 'laser-rangefinders',
		name: 'Laser Range Finders',
		description: 'Devices for accurate distance measurement in surveillance and planning.',
		categories: ['recon-surveillance']
	},
	{
		id: 'recon-drones',
		name: 'Reconnaissance Drones',
		description: 'Unmanned aerial vehicles for aerial surveillance and mapping.',
		categories: ['recon-surveillance']
	},
	{
		id: 'digital-cameras',
		name: 'Digital Cameras with Zoom',
		description: 'High-resolution cameras for detailed surveillance from a distance.',
		categories: ['recon-surveillance']
	},

	// Infiltration & Access
	{
		id: 'breaching-tools',
		name: 'Breaching Tools',
		description: 'Equipment for forced entry, including rams and breaching shotguns.',
		categories: ['infiltration-access']
	},
	{
		id: 'lock-picking-sets',
		name: 'Lock Picking Sets',
		description: 'Tools for non-destructive bypassing of mechanical locks.',
		categories: ['infiltration-access']
	},
	{
		id: 'rappelling-gear',
		name: 'Rappelling Gear',
		description: 'Equipment for controlled descent down buildings.',
		categories: ['infiltration-access', 'protection-defense']
	},

	// Protection & Defense
	{
		id: 'body-armor',
		name: 'Body Armor',
		description: 'Protective clothing to absorb or deflect physical attacks.',
		categories: ['protection-defense']
	},
	{
		id: 'gas-masks',
		name: 'Gas Masks',
		description: 'Masks to protect against inhaling harmful gases and particles.',
		categories: ['protection-defense']
	},
	{
		id: 'tactical-gloves',
		name: 'Tactical Gloves',
		description: 'Gloves providing protection and better grip.',
		categories: ['protection-defense']
	},
	{
		id: 'stealth-footwear',
		name: 'Stealth Footwear',
		description: 'Shoes designed for quiet movement, maintaining stealth.',
		categories: ['protection-defense']
	},
	{
		id: 'ballistic-helmets',
		name: 'Ballistic Helmets',
		description: 'Helmets designed to protect from ballistic impacts.',
		categories: ['protection-defense']
	},
	{
		id: 'impact-eyewear',
		name: 'Impact-Resistant Eyewear',
		description: 'Glasses or goggles to protect eyes from debris and impact.',
		categories: ['protection-defense']
	}
	// ... any additional equipment items ...
];

export const categories = [
	{
		id: 'recon-surveillance',
		name: 'Reconnaissance & Surveillance',
		icon: 'basil:binocular-solid'
	},
	{
		id: 'infiltration-access',
		name: 'Infiltration & Access',
		icon: 'material-symbols:lock'
	},
	{
		id: 'protection-defense',
		name: 'Protection & Defense',
		icon: 'material-symbols:shield'
	}
];
