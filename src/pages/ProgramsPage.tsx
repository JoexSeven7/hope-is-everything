import { BookOpen, Users, Heart, Home, Briefcase, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProgramsPage = () => {
	const programs = [
		{
			id: 1,
			icon: BookOpen,
			title: 'Education & Literacy Programs',
			description:
				'Comprehensive educational support from early childhood through adult learning, focusing on literacy, numeracy, and life skills.',
			features: [
				'Early childhood education',
				'Primary and secondary schooling support',
				'Adult literacy programs',
				'Digital literacy training',
				'Scholarship programs',
			],
			impact: '1,200+ students currently enrolled',
			beneficiaries: '5,000+ graduates',
			image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
		},
		{
			id: 2,
			icon: Users,
			title: 'Community Development',
			description:
				'Building sustainable communities through infrastructure development, healthcare access, and social programs.',
			features: [
				'Infrastructure development',
				'Healthcare facility establishment',
				'Water and sanitation projects',
				'Community centers construction',
				'Local leadership training',
			],
			impact: '150+ communities transformed',
			beneficiaries: '25,000+ community members',
			image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
		},
		{
			id: 3,
			icon: Briefcase,
			title: 'Skills Training & Employment',
			description:
				'Vocational training and entrepreneurship programs that equip individuals with marketable skills for economic independence.',
			features: [
				'Vocational skills training',
				'Entrepreneurship development',
				'Microfinance programs',
				'Job placement assistance',
				'Business mentorship',
			],
			impact: '800+ individuals trained annually',
			beneficiaries: '3,200+ employed graduates',
			image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
		},
		{
			id: 4,
			icon: Heart,
			title: 'Healthcare Access',
			description: 'Ensuring vulnerable populations have access to basic healthcare services and health education.',
			features: [
				'Mobile health clinics',
				'Health education programs',
				'Maternal and child health',
				'Nutrition programs',
				'Disease prevention campaigns',
			],
			impact: '25,000+ patients treated annually',
			beneficiaries: '100,000+ healthcare interventions',
			image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
		},
		{
			id: 5,
			icon: Home,
			title: 'Youth Empowerment',
			description:
				'Specialized programs designed to empower young people with education, skills, and leadership opportunities.',
			features: [
				'Youth leadership programs',
				'Mentorship initiatives',
				'Sports and recreation',
				'Arts and culture programs',
				'Peer education networks',
			],
			impact: '2,500+ youth engaged annually',
			beneficiaries: '10,000+ youth reached',
			image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
		},
		{
			id: 6,
			icon: Globe,
			title: "Women's Rights & Empowerment",
			description: 'Advancing gender equality through education, economic empowerment, and advocacy programs.',
			features: [
				"Girls' education initiatives",
				"Women's economic empowerment",
				'Legal rights awareness',
				'Safe spaces and support',
				'Leadership development',
			],
			impact: '3,000+ women empowered',
			beneficiaries: '15,000+ women supported',
			image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
		},
	];

	const stats = [
		{ number: '50,000+', label: 'Lives Impacted', icon: Users },
		{ number: '150+', label: 'Communities Served', icon: Home },
		{ number: '25+', label: 'Countries Reached', icon: Globe },
		{ number: '1,200+', label: 'Students Educated', icon: BookOpen },
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-hope-blue to-blue-700 text-white section-padding">
				<div className="container-max text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto">
						Comprehensive solutions addressing the root causes of poverty through education, healthcare, and community
						development programs that create lasting change.
					</p>
				</div>
			</section>

			{/* Impact Stats */}
			<section className="bg-white py-16">
				<div className="container-max px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div key={index} className="text-center">
								<div className="flex justify-center mb-4">
									<div className="bg-hope-blue bg-opacity-10 p-3 rounded-full">
										<stat.icon className="h-8 w-8 text-hope-blue" />
									</div>
								</div>
								<div className="text-3xl md:text-4xl font-bold text-hope-blue mb-2">{stat.number}</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Programs Grid */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Focus Areas</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Each program is designed with a holistic approach, addressing multiple aspects of poverty and creating
							sustainable change.
						</p>
					</div>

					<div className="space-y-12">
						{programs.map((program, index) => (
							<div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
								<div className="grid lg:grid-cols-2 gap-0">
									<div className={`p-8 lg:p-12 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
										<div className="flex items-center mb-6">
											<div className="bg-hope-blue bg-opacity-10 p-3 rounded-full mr-4">
												<program.icon className="h-8 w-8 text-hope-blue" />
											</div>
											<img src={program.image} alt={program.title} className="w-16 h-16 rounded-lg object-cover" />
										</div>

										<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{program.title}</h3>

										<p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

										<div className="mb-6">
											<h4 className="font-semibold text-gray-900 mb-3">Key Components:</h4>
											<ul className="space-y-2">
												{program.features.map((feature, featureIndex) => (
													<li key={featureIndex} className="flex items-center text-gray-600">
														<CheckCircle className="h-4 w-4 text-hope-green mr-3 flex-shrink-0" />
														{feature}
													</li>
												))}
											</ul>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
											<div className="bg-hope-blue bg-opacity-10 rounded-lg p-4">
												<div className="text-lg font-bold text-hope-blue">{program.impact}</div>
												<div className="text-sm text-gray-600">Current Impact</div>
											</div>
											<div className="bg-hope-green bg-opacity-10 rounded-lg p-4">
												<div className="text-lg font-bold text-hope-green">{program.beneficiaries}</div>
												<div className="text-sm text-gray-600">Total Beneficiaries</div>
											</div>
										</div>

										<Link to="/donate" className="inline-flex items-center btn-primary">
											Support This Program
											<ArrowRight className="ml-2 h-4 w-4" />
										</Link>
									</div>

									<div
										className={`bg-gradient-to-br from-hope-blue to-blue-700 p-8 lg:p-12 flex items-center justify-center ${
											index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
										}`}>
										<div className="text-center text-white">
											<img
												src={program.image}
												alt={program.title}
												className="w-48 h-48 rounded-xl object-cover mb-6 mx-auto border-4 border-white shadow-2xl"
											/>
											<div className="text-2xl font-bold mb-2">Program {program.id}</div>
											<div className="text-blue-100">Making a Difference</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Success Stories Preview */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success in Action</h2>
						<p className="text-xl text-gray-600">See how our programs are transforming lives and communities.</p>
					</div>

					<div className="grid md:grid-cols-3 gap-2 mb-12">
						<div className="bg-gray-50 rounded-xl p-6 text-center">
							<div className="text-3xl mb-4">📈</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">95% Success Rate</h3>
							<p className="text-gray-600">Students complete our programs and achieve their goals</p>
						</div>
						<div className="bg-gray-50 rounded-xl p-6 text-center">
							<div className="text-3xl mb-4">💰</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Economic Impact</h3>
							<p className="text-gray-600">Average income increase of 300% for program graduates</p>
						</div>
						<div className="bg-gray-50 rounded-xl p-6 text-center">
							<div className="text-3xl mb-4">🌍</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
							<p className="text-gray-600">Programs adapted and implemented across 25 countries</p>
						</div>
					</div>

					<div className="text-center flex items-center gap-4 ">
						<Link to="/testimonials" className="btn-outline mr-4">
							Read Success Stories
						</Link>
						<Link to="/donate" className="btn-primary">
							Support Our Programs
						</Link>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="bg-gradient-to-r from-hope-green to-green-600 text-white section-padding">
				<div className="container-max text-center">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
						<p className="text-xl mb-8 text-green-100">
							Every program creates ripples of change. Your support helps us reach more communities and transform more
							lives.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/donate"
								className="bg-white text-hope-green hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
								Make a Donation
							</Link>
							<Link
								to="/contact"
								className="border-2 border-white text-white hover:bg-white hover:text-hope-green font-semibold py-3 px-6 rounded-lg transition-all">
								Get Involved
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
