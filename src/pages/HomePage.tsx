import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Heart, Target, Eye, Award, CheckCircle, TrendingUp } from 'lucide-react';

export const HomePage = () => {
	const impactStats = [
		{ number: '50,000+', label: 'Lives Impacted' },
		{ number: '150+', label: 'Communities Served' },
		{ number: '25+', label: 'Countries Reached' },
		{ number: '1,200+', label: 'Students Educated' },
	];

	const programs = [
		{
			icon: BookOpen,
			title: 'Education & Literacy',
			description:
				'Providing quality education and literacy programs to children and adults in underserved communities.',
			impact: '1,200+ students enrolled',
		},
		{
			icon: Users,
			title: 'Community Development',
			description: 'Building sustainable communities through infrastructure, healthcare, and social programs.',
			impact: '150+ communities transformed',
		},
		{
			icon: Heart,
			title: 'Healthcare Access',
			description: 'Ensuring access to basic healthcare services for vulnerable populations.',
			impact: '25,000+ patients treated',
		},
	];

	const testimonials = [
		{
			quote: "Hope Is Everything gave me the education I dreamed of. Now I'm a teacher helping others.",
			author: 'Sarah M.',
			role: 'Graduate & Current Teacher',
			image: '👩‍🏫',
		},
		{
			quote: "The skills training program changed my family's future. I can now provide for them.",
			author: 'James K.',
			role: 'Skills Training Graduate',
			image: '👨‍🔧',
		},
		{
			quote: "This organization doesn't just help - they empower communities for lasting change.",
			author: 'Dr. Maria Rodriguez',
			role: 'Community Partner',
			image: '👩‍⚕️',
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-hope-blue to-blue-800 text-white overflow-hidden">
				<div className="absolute inset-0 bg-black opacity-20"></div>
				<div className="relative container-max section-padding text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
						Hope Is Everything
						<span className="block text-2xl md:text-4xl font-normal mt-2 text-blue-100">
							Breaking the Cycle of Poverty Through Education
						</span>
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
						Together, we create lasting change by empowering communities with education, skills, and hope for a better
						tomorrow.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/donate" className="btn-primary text-lg">
							Donate Now
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
						<Link to="/programs" className="btn-outline border-white text-white hover:bg-white hover:text-hope-blue">
							Our Programs
						</Link>
					</div>
				</div>
			</section>

			{/* Impact Stats */}
			<section className="bg-white py-16">
				<div className="container-max px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{impactStats.map((stat, index) => (
							<div key={index} className="text-center">
								<div className="text-3xl md:text-4xl font-bold text-hope-blue mb-2">{stat.number}</div>
								<div className="text-gray-600 font-medium">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<Target className="h-6 w-6 text-hope-blue mt-1" />
									<div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">Mission</h3>
										<p className="text-gray-600">
											To break the cycle of poverty by providing quality education, skills training, and community
											development programs that empower individuals and transform communities.
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<Eye className="h-6 w-6 text-hope-green mt-1" />
									<div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">Vision</h3>
										<p className="text-gray-600">
											A world where every person has access to education and opportunities to reach their full
											potential, creating thriving, self-sufficient communities.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="relative">
							<div className="bg-hope-blue p-8 rounded-2xl text-white">
								<Award className="h-12 w-12 mb-4" />
								<h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
								<p className="text-blue-100">
									We believe that education is the most powerful weapon against poverty. Through sustainable programs
									and community partnerships, we create lasting change that extends beyond individual lives to entire
									communities.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Programs Overview */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Comprehensive solutions addressing the root causes of poverty through education, healthcare, and community
							development.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{programs.map((program, index) => (
							<div
								key={index}
								className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
								<div className="bg-hope-blue bg-opacity-10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
									<program.icon className="h-6 w-6 text-hope-blue" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
								<p className="text-gray-600 mb-4">{program.description}</p>
								<div className="flex items-center text-hope-green">
									<CheckCircle className="h-4 w-4 mr-2" />
									<span className="text-sm font-medium">{program.impact}</span>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link to="/programs" className="btn-primary">
							Explore All Programs
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories of Impact</h2>
						<p className="text-xl text-gray-600">Real people, real transformations, real hope.</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<div key={index} className="bg-white p-6 rounded-xl shadow-sm">
								<div className="text-4xl mb-4">{testimonial.image}</div>
								<blockquote className="text-gray-600 mb-4 italic">"{testimonial.quote}"</blockquote>
								<div>
									<div className="font-semibold text-gray-900">{testimonial.author}</div>
									<div className="text-sm text-gray-500">{testimonial.role}</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link to="/testimonials" className="btn-outline">
							Read More Stories
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="bg-gradient-to-r from-hope-green to-green-600 text-white section-padding">
				<div className="container-max text-center">
					<div className="max-w-3xl mx-auto">
						<TrendingUp className="h-16 w-16 mx-auto mb-6" />
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
						<p className="text-xl mb-8 text-green-100">
							Your support can change lives. Join us in creating lasting change through education and community
							empowerment.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/donate"
								className="bg-white text-hope-green hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
								Donate Now
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
