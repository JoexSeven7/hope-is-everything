import { Heart, Quote, Star, Users, BookOpen, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TestimonialsPage = () => {
	const testimonials = [
		{
			id: 1,
			name: 'Sarah Mukamana',
			role: 'Program Graduate & Teacher',
			location: 'Rwanda',
			image: '👩‍🏫',
			quote:
				"Before Hope Is Everything came to my village, I had never been to school. Now I'm a qualified teacher helping other children get the education I missed. This program didn't just change my life - it changed my entire community.",
			program: 'Adult Literacy Program',
			year: '2022',
			impact: 'Now teaches 45 students',
			featured: true,
		},
		{
			id: 2,
			name: 'James Kone',
			role: 'Skills Training Graduate',
			location: 'Mali',
			image: '👨‍🔧',
			quote:
				'The vocational training gave me skills in carpentry and business management. I now employ 8 people from my village and can provide for my family. Hope Is Everything taught me that education is the key to freedom.',
			program: 'Vocational Skills Training',
			year: '2021',
			impact: 'Started own business',
			featured: true,
		},
		{
			id: 3,
			name: 'Dr. Maria Santos',
			role: 'Community Health Worker',
			location: 'Peru',
			image: '👩‍⚕️',
			quote:
				"Through Hope Is Everything's healthcare access program, I became a trained health worker. I've helped deliver over 200 babies safely and educate families about health. My community trusts me because I have knowledge.",
			program: 'Healthcare Access',
			year: '2020',
			impact: 'Served 500+ families',
			featured: true,
		},
		{
			id: 4,
			name: 'Ahmed Al-Rashid',
			role: 'Youth Leader',
			location: 'Jordan',
			image: '👨‍💼',
			quote:
				'The youth empowerment program taught me leadership skills and gave me confidence. Now I organize community projects and mentor younger students. Education broke the cycle of poverty in my family.',
			program: 'Youth Leadership',
			year: '2023',
			impact: 'Mentors 25 youth',
			featured: false,
		},
		{
			id: 5,
			name: 'Grace Nakamuli',
			role: "Women's Cooperative Leader",
			location: 'Uganda',
			image: '👩‍🌾',
			quote:
				"The women's empowerment program helped me start a farming cooperative. We now support 40 women and their families. We learned business skills, leadership, and that women deserve equal opportunities.",
			program: "Women's Empowerment",
			year: '2022',
			impact: 'Supports 40 families',
			featured: false,
		},
		{
			id: 6,
			name: 'Carlos Mendoza',
			role: 'Community Organizer',
			location: 'Guatemala',
			image: '👨‍🏫',
			quote:
				"The community development program built our local school and health center. Now children don't have to walk 3 hours to get an education. Our village has hope for the first time in generations.",
			program: 'Community Development',
			year: '2021',
			impact: 'Built 2 community centers',
			featured: false,
		},
	];

	const partnerTestimonials = [
		{
			organization: 'UNICEF',
			person: 'Dr. Elena Rodriguez',
			position: 'Regional Director, West Africa',
			quote:
				"Hope Is Everything's work in education and community development aligns perfectly with our mission. Their sustainable, community-centered approach creates lasting change.",
			logo: '🏢',
		},
		{
			organization: 'World Bank',
			person: 'Prof. David Liu',
			position: 'Senior Education Specialist',
			quote:
				"The impact metrics from Hope Is Everything's programs are remarkable. They've demonstrated that targeted education interventions can break generational poverty cycles.",
			logo: '🏛️',
		},
		{
			organization: 'Local Government Partnership',
			person: 'Mayor Janet Wilson',
			position: 'Mayor, Riverside Community',
			quote:
				"Hope Is Everything worked alongside our community to understand our needs and build sustainable solutions. They're true partners in development.",
			logo: '🏛️',
		},
	];

	const volunteerStories = [
		{
			name: 'Michael Thompson',
			role: 'Volunteer Teacher',
			duration: '2 years',
			quote:
				"Teaching through Hope Is Everything has been life-changing. Seeing students' faces light up when they understand a concept reminds me why education matters.",
			image: '👨‍🏫',
		},
		{
			name: 'Lisa Chen',
			role: 'Medical Volunteer',
			duration: '1 year',
			quote:
				"As a nurse, I've volunteered in many programs, but Hope Is Everything's approach to healthcare and education is unique. They treat people with dignity.",
			image: '👩‍⚕️',
		},
		{
			name: 'David Park',
			role: 'Technology Volunteer',
			duration: '6 months',
			quote:
				'Helping set up digital learning centers has shown me how technology can bridge educational gaps. The impact goes beyond just providing devices.',
			image: '👨‍💻',
		},
	];

	const featuredTestimonials = testimonials.filter((t) => t.featured);
	const regularTestimonials = testimonials.filter((t) => !t.featured);

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-hope-blue to-blue-700 text-white section-padding">
				<div className="container-max text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Stories of Hope & Transformation</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto">
						Real stories from real people whose lives have been transformed through education, skills training, and
						community empowerment programs.
					</p>
				</div>
			</section>

			{/* Featured Success Stories */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Meet some of the incredible individuals whose lives have been transformed through our programs and the
							ripple effect of change they create.
						</p>
					</div>

					<div className="space-y-12">
						{featuredTestimonials.map((testimonial, index) => (
							<div key={testimonial.id} className="bg-gray-50 rounded-2xl overflow-hidden">
								<div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}>
									<div className={`p-8 lg:p-12 flex items-center ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
										<div className="w-full">
											<div className="flex items-center mb-6">
												<Quote className="h-8 w-8 text-hope-blue mr-4" />
												<div className="text-4xl">{testimonial.image}</div>
											</div>

											<blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
												"{testimonial.quote}"
											</blockquote>

											<div className="flex items-center justify-between">
												<div>
													<div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
													<div className="text-hope-blue font-medium">{testimonial.role}</div>
													<div className="text-gray-600 text-sm">{testimonial.location}</div>
												</div>
												<div className="text-right">
													<div className="text-sm text-gray-600">Program: {testimonial.program}</div>
													<div className="text-sm text-gray-600">Year: {testimonial.year}</div>
												</div>
											</div>

											<div className="mt-4 pt-4 border-t border-gray-200">
												<div className="flex items-center">
													<Award className="h-4 w-4 text-hope-green mr-2" />
													<span className="text-hope-green font-medium text-sm">{testimonial.impact}</span>
												</div>
											</div>
										</div>
									</div>

									<div
										className={`bg-gradient-to-br from-hope-green to-green-600 p-8 lg:p-12 flex items-center justify-center text-white ${
											index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'
										}`}>
										<div className="text-center">
											<div className="text-8xl mb-6">{testimonial.image}</div>
											<div className="text-2xl font-bold mb-2">Success Story</div>
											<div className="text-green-100 mb-4">{testimonial.program}</div>
											<div className="flex items-center justify-center">
												<Star className="h-5 w-5 mr-1" />
												<Star className="h-5 w-5 mr-1" />
												<Star className="h-5 w-5 mr-1" />
												<Star className="h-5 w-5 mr-1" />
												<Star className="h-5 w-5" />
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* More Success Stories */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">More Impact Stories</h2>
						<p className="text-xl text-gray-600">
							Every program creates ripples of change that extend far beyond individual lives.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regularTestimonials.map((testimonial) => (
							<div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
								<div className="flex items-center mb-4">
									<div className="text-3xl mr-3">{testimonial.image}</div>
									<div>
										<h3 className="font-bold text-gray-900">{testimonial.name}</h3>
										<p className="text-hope-blue text-sm">{testimonial.role}</p>
										<p className="text-gray-600 text-sm">{testimonial.location}</p>
									</div>
								</div>

								<blockquote className="text-gray-700 mb-4 italic">"{testimonial.quote}"</blockquote>

								<div className="border-t pt-4">
									<div className="flex justify-between items-center text-sm">
										<span className="text-gray-600">{testimonial.program}</span>
										<span className="text-hope-green font-medium">{testimonial.impact}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Partner Testimonials */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partner Perspectives</h2>
						<p className="text-xl text-gray-600">What organizations we work with say about our programs and impact.</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						{partnerTestimonials.map((partner, index) => (
							<div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
								<div className="text-4xl mb-4">{partner.logo}</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">{partner.organization}</h3>
								<div className="text-hope-blue font-medium mb-4">{partner.person}</div>
								<div className="text-gray-600 text-sm mb-4">{partner.position}</div>
								<blockquote className="text-gray-700 italic">"{partner.quote}"</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Volunteer Stories */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Volunteer Voices</h2>
						<p className="text-xl text-gray-600">
							Hear from volunteers who dedicate their time and skills to our mission.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{volunteerStories.map((volunteer, index) => (
							<div key={index} className="bg-white rounded-xl p-6 shadow-sm">
								<div className="flex items-center mb-4">
									<div className="text-3xl mr-3">{volunteer.image}</div>
									<div>
										<h3 className="font-bold text-gray-900">{volunteer.name}</h3>
										<p className="text-hope-blue text-sm">{volunteer.role}</p>
										<p className="text-gray-600 text-sm">Volunteer for {volunteer.duration}</p>
									</div>
								</div>

								<blockquote className="text-gray-700 italic">"{volunteer.quote}"</blockquote>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Impact Statistics */}
			<section className="bg-hope-blue section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact by Numbers</h2>
						<p className="text-xl text-blue-100">
							The cumulative effect of every story, every life changed, every community transformed.
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div className="text-center text-white">
							<div className="flex justify-center mb-4">
								<div className="bg-white bg-opacity-20 p-3 rounded-full">
									<Users className="h-8 w-8" />
								</div>
							</div>
							<div className="text-3xl md:text-4xl font-bold mb-2">50,000+</div>
							<div className="text-blue-100">Lives Transformed</div>
						</div>
						<div className="text-center text-white">
							<div className="flex justify-center mb-4">
								<div className="bg-white bg-opacity-20 p-3 rounded-full">
									<BookOpen className="h-8 w-8" />
								</div>
							</div>
							<div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
							<div className="text-blue-100">Students Currently Enrolled</div>
						</div>
						<div className="text-center text-white">
							<div className="flex justify-center mb-4">
								<div className="bg-white bg-opacity-20 p-3 rounded-full">
									<Briefcase className="h-8 w-8" />
								</div>
							</div>
							<div className="text-3xl md:text-4xl font-bold mb-2">3,200+</div>
							<div className="text-blue-100">Employed Graduates</div>
						</div>
						<div className="text-center text-white">
							<div className="flex justify-center mb-4">
								<div className="bg-white bg-opacity-20 p-3 rounded-full">
									<Heart className="h-8 w-8" />
								</div>
							</div>
							<div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
							<div className="text-blue-100">Communities Transformed</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="bg-gradient-to-r from-hope-green to-green-600 text-white section-padding">
				<div className="container-max text-center">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Be Part of the Next Success Story</h2>
						<p className="text-xl mb-8 text-green-100">
							Your support can create the next transformation story. Join us in breaking the cycle of poverty through
							education and empowerment.
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
