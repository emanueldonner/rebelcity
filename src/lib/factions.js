export const factions = [
	{
		id: 'civic-political',
		icon: 'streamline:politics-speech-solid',
		title: 'Civic and Political Sphere',
		subFactions: [
			{
				title: 'Local Politicians',
				description: 'Influential figures in the city’s governance.'
			},
			{
				title: 'Bureaucrats',
				description: 'Officials who manage public services and regulations.'
			},
			{
				title: 'Community Leaders',
				description: 'Respected individuals in various neighborhoods.'
			},
			{
				title: 'Activists',
				description: 'People actively campaigning for political change.'
			}
		],
		description:
			'Engage with local politicians, bureaucrats, and community leaders to influence policy decisions.',
		benefits:
			'Access to government resources, ability to reduce negative impacts from city authorities.',
		primaryColor: '#616161', // Dark Grey
		secondaryColor: '#9E9E9E', // Muted Grey
		tertiaryColor: lightenColor('#616161', 0.8) // Light Grey
	},
	{
		id: 'academic-cultural',
		icon: 'mdi:education-outline',
		title: 'Academic and Cultural Collective',
		subFactions: [
			{
				title: 'Students',
				description: 'Young, energetic individuals, often driving new ideas.'
			},
			{
				title: 'Intellectuals',
				description: 'Thinkers and academics providing insights and knowledge.'
			},
			{
				title: 'Artists',
				description: 'Creative minds influencing culture and public opinion.'
			},
			{
				title: 'Cultural Influencers',
				description: 'Individuals with the power to sway popular culture.'
			}
		],
		description:
			'Collaborate with students, intellectuals, and artists to shape public opinion and cultural movements.',
		benefits:
			'Gain strategic insights, increase public support, and boost morale through cultural events.',
		primaryColor: '#FF7043', // Strong Orange
		secondaryColor: '#FFCCBC', // Muted Orange
		tertiaryColor: lightenColor('#FF7043', 0.8) // Light Orange
	},
	{
		id: 'business-industry',
		icon: 'fa:gears',
		title: 'Business and Industry Sector',
		subFactions: [
			{
				title: 'Local Businesses',
				description: 'Small to medium enterprises crucial to the city’s economy.'
			},
			{
				title: 'Industrial Workers',
				description: 'The workforce in factories and production facilities.'
			},
			{
				title: 'Trade Unions',
				description: 'Organizations representing the rights of workers.'
			},
			{
				title: 'Tech Community',
				description: 'Innovators and technologists driving modern solutions.'
			}
		],
		description:
			'Connect with local businesses and trade unions to secure financial and industrial support.',
		benefits:
			'Acquire additional funding, access to industrial resources, and ability to organize impactful industrial actions.',
		primaryColor: '#388E3C', // Deep Green
		secondaryColor: '#C8E6C9', // Soft Green
		tertiaryColor: lightenColor('#388E3C', 0.8) // Light Green
	},
	{
		id: 'health-welfare',
		icon: 'material-symbols:ecg-heart',
		title: 'Health and Welfare Network',
		subFactions: [
			{
				title: 'Healthcare Workers',
				description: 'Doctors, nurses, and medical staff providing essential care.'
			},
			{
				title: 'Environmentalists',
				description: 'Advocates for environmental protection and sustainability.'
			},
			{
				title: 'Social Workers',
				description: 'Professionals supporting the most vulnerable in society.'
			}
		],
		description:
			'Work with healthcare workers, environmentalists, and social workers to manage public health and environmental sustainability.',
		benefits:
			'Improve healthcare for activists, gain support for environmental initiatives, and enhance overall community welfare.',
		primaryColor: '#039BE5', // Vibrant Blue
		secondaryColor: '#B3E5FC', // Light Blue
		tertiaryColor: lightenColor('#039BE5', 0.8) // Light Blue
	},
	{
		id: 'grassroots-community',
		icon: 'iconoir:community',
		title: 'Grassroots and Community Organizations',
		subFactions: [
			{
				title: 'Grassroots Activists',
				description: 'Local individuals committed to grassroots change.'
			},
			{
				title: 'Religious Groups',
				description: 'Faith-based communities with significant local influence.'
			},
			{
				title: 'Neighborhood Associations',
				description: 'Groups focused on local community needs and issues.'
			},
			{
				title: 'Underrepresented Communities',
				description: 'Minority and marginalized groups seeking equity.'
			}
		],
		description:
			'Mobilize grassroots activists and community organizations for widespread local support.',
		benefits:
			'Establish a network of local informants, create safe locations for meetings, and strengthen community-driven initiatives.',
		primaryColor: '#CDDC39', // Vibrant Yellow
		secondaryColor: '#F0F4C3', // Pale Yellow
		tertiaryColor: lightenColor('#CDDC39', 0.8) // Light Yellow
	}
];

function lightenColor(color, amount) {
	// Convert color to RGB
	const rgb = colorToRGB(color);
	// Calculate the lightened color
	const lightenedColor = rgb.map((c) => Math.round(c + (255 - c) * amount));
	// Convert back to hex
	return rgbToHex(lightenedColor);
}

function colorToRGB(color) {
	// Remove the # symbol if present
	color = color.replace('#', '');
	// Convert to RGB
	const r = parseInt(color.substring(0, 2), 16);
	const g = parseInt(color.substring(2, 4), 16);
	const b = parseInt(color.substring(4, 6), 16);
	return [r, g, b];
}

function rgbToHex(rgb) {
	return '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
}
