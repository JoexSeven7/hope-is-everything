import { Mail, Linkedin, Users, Award, Heart } from 'lucide-react';

export const TeamPage = () => {
	const leadership = [
		{
			name: 'Dr. Sarah Johnson',
			position: 'Executive Director & Founder',
			bio: 'Dr. Johnson has over 15 years of experience in international development and education. She holds a PhD in Education Policy from Harvard University and has worked with UNICEF and UNESCO.',
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
			email: 'sarah.johnson@hopeiseverything.org',
			linkedin: '#',
		},
		{
			name: 'Michael Chen',
			position: 'Director of Programs',
			bio: 'Michael oversees all program implementation and has a background in community development. He previously worked with World Bank and has an MBA from Stanford.',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
			email: 'michael.chen@hopeiseverything.org',
			linkedin: '#',
		},
		{
			name: 'Dr. Amara Okafor',
			position: 'Director of Education',
			bio: 'Dr. Okafor leads our education initiatives and has published extensively on literacy and poverty reduction. She brings 12 years of field experience from across Africa.',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
			email: 'amara.okafor@hopeiseverything.org',
			linkedin: '#',
		},
		{
			name: 'James Rodriguez',
			position: 'Chief Financial Officer',
			bio: 'James manages our finances and ensures accountability. He has 20 years of experience in nonprofit finance and is a CPA.',
			image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
			email: 'james.rodriguez@hopeiseverything.org',
			linkedin: '#',
		},
	];

	const staff = [
		{
			name: 'Lisa Thompson',
			position: 'Senior Program Manager',
			department: 'Education Programs',
			image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'David Kim',
			position: 'Technology Coordinator',
			department: 'Digital Innovation',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'Fatima Al-Rashid',
			position: 'Regional Coordinator',
			department: 'Middle East & North Africa',
			image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'Carlos Mendoza',
			position: 'Community Liaison',
			department: 'Latin America',
			image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'Priya Sharma',
			position: 'Research Specialist',
			department: 'Program Evaluation',
			image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'Robert Wilson',
			position: 'Volunteer Coordinator',
			department: 'Human Resources',
			image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'Grace Nakimuli',
			position: 'Communications Manager',
			department: 'Marketing & Communications',
			image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
		},
		{
			name: 'Ahmed Hassan',
			position: 'Program Assistant',
			department: 'Operations',
			image: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=150&h=150&fit=crop&crop=face',
		},
	];

	const board = [
		{
			name: 'Dr. Elena Vasquez',
			position: 'Board Chair',
			organization: 'Former World Bank Vice President',
			expertise: 'International Development',
		},
		{
			name: 'Prof. David Liu',
			position: 'Vice Chair',
			organization: 'Stanford University, Education Dept.',
			expertise: 'Education Policy',
		},
		{
			name: 'Maria Santos',
			position: 'Treasurer',
			organization: 'Former Goldman Sachs Executive',
			expertise: 'Finance & Strategy',
		},
		{
			name: 'John Williams',
			position: 'Secretary',
			organization: 'Nonprofit Legal Counsel',
			expertise: 'Corporate Governance',
		},
		{
			name: 'Dr. Kwame Asante',
			position: 'Board Member',
			organization: 'University of Ghana',
			expertise: 'African Studies',
		},
		{
			name: 'Sarah Miller',
			position: 'Board Member',
			organization: 'Social Impact Investor',
			expertise: 'Impact Investing',
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-hope-blue to-blue-700 text-white section-padding">
				<div className="container-max text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto">
						Meet the dedicated professionals and volunteers who work tirelessly to create lasting change through
						education and community empowerment.
					</p>
				</div>
			</section>

			{/* Leadership Team */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Our experienced leadership team brings together decades of expertise in education, development, and
							nonprofit management.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{leadership.map((leader, index) => (
							<div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
								<div className="flex items-start space-x-6">
									<img
										src={leader.image}
										alt={leader.name}
										className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 flex-shrink-0"
									/>
									<div className="flex-grow">
										<h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
										<p className="text-hope-blue font-semibold mb-3">{leader.position}</p>
										<p className="text-gray-600 mb-4 leading-relaxed">{leader.bio}</p>
										<div className="flex space-x-3">
											<a
												href={`mailto:${leader.email}`}
												className="flex items-center text-gray-600 hover:text-hope-blue transition-colors">
												<Mail className="h-4 w-4 mr-1" />
												<span className="text-sm">Email</span>
											</a>
											<a
												href={leader.linkedin}
												className="flex items-center text-gray-600 hover:text-hope-blue transition-colors">
												<Linkedin className="h-4 w-4 mr-1" />
												<span className="text-sm">LinkedIn</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Staff Team */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Staff</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							A diverse team of professionals working across different departments to support our mission and programs
							worldwide.
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{staff.map((member, index) => (
							<div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
								<img
									src={member.image}
									alt={member.name}
									className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
								/>
								<h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
								<p className="text-hope-blue text-sm font-medium mb-1">{member.position}</p>
								<p className="text-gray-600 text-sm">{member.department}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Board of Directors */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Board of Directors</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Our board provides strategic guidance and governance, bringing together leaders from various sectors to
							advance our mission.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{board.map((member, index) => (
							<div key={index} className="bg-gray-50 rounded-lg p-6">
								<div className="flex items-center mb-4">
									<div className="bg-hope-blue bg-opacity-10 p-2 rounded-full mr-3">
										<Award className="h-5 w-5 text-hope-blue" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
										<p className="text-hope-blue text-sm font-medium">{member.position}</p>
									</div>
								</div>
								<p className="text-gray-600 text-sm mb-2">{member.organization}</p>
								<p className="text-gray-500 text-xs">Expertise: {member.expertise}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Join Our Team */}
			<section className="bg-hope-blue section-padding">
				<div className="container-max text-center">
					<div className="max-w-3xl mx-auto">
						<Users className="h-16 w-16 mx-auto mb-6 text-blue-200" />
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Mission</h2>
						<p className="text-xl mb-8 text-blue-100">
							We're always looking for passionate individuals to join our team. Whether you're interested in full-time
							positions, consulting, or volunteering, we'd love to hear from you.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/contact"
								className="bg-white text-hope-blue hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
								View Open Positions
							</a>
							<a
								href="/contact"
								className="border-2 border-white text-white hover:bg-white hover:text-hope-blue font-semibold py-3 px-6 rounded-lg transition-all">
								Volunteer With Us
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Our Values */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Our team is united by shared values and a commitment to creating meaningful change in the communities we
							serve.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="bg-hope-green bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Heart className="h-8 w-8 text-hope-green" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Compassion</h3>
							<p className="text-gray-600">
								We approach every person with empathy, dignity, and respect, understanding that true change starts with
								caring relationships.
							</p>
						</div>
						<div className="text-center">
							<div className="bg-hope-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Award className="h-8 w-8 text-hope-orange" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
							<p className="text-gray-600">
								We maintain the highest standards in our programs and services, continuously learning and improving our
								approaches.
							</p>
						</div>
						<div className="text-center">
							<div className="bg-hope-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="h-8 w-8 text-hope-blue" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
							<p className="text-gray-600">
								We believe in the power of partnerships and work together with communities, organizations, and
								stakeholders.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact CTA */}
			<section className="bg-white section-padding">
				<div className="container-max text-center">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
						<p className="text-xl text-gray-600 mb-8">
							Join our team and help us create lasting change through education and community empowerment.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="/contact" className="btn-primary">
								Get In Touch
							</a>
							<a href="/donate" className="btn-outline">
								Support Our Work
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
