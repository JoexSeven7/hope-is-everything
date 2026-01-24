import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Users, BookOpen, Heart, Target, Eye, Award, CheckCircle, TrendingUp, Globe } from 'lucide-react';
import pexels6Image from '../assets/pexels6.jpg';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { DonationCalculator } from '../components/DonationCalculator';
import { Tooltip } from '../components/Tooltip';

export const HomePage = () => {
	const [selectedCurrency, setSelectedCurrency] = useState('USD');

	const currencies = [
		{ code: 'USD', symbol: '$', name: 'US Dollar' },
		{ code: 'EUR', symbol: '€', name: 'Euro' },
		{ code: 'GBP', symbol: '£', name: 'British Pound' },
		{ code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
		{ code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
		{ code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
		{ code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
		{ code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
		{ code: 'INR', symbol: '₹', name: 'Indian Rupee' },
	];

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
			image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
		},
		{
			quote: "The skills training program changed my family's future. I can now provide for them.",
			author: 'James K.',
			role: 'Skills Training Graduate',
			image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
		},
		{
			quote: "This organization doesn't just help - they empower communities for lasting change.",
			author: 'Dr. Maria Rodriguez',
			role: 'Community Partner',
			image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face',
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section
				className="relative bg-gradient-to-br from-hope-blue to-blue-800 text-white overflow-hidden"
				style={{
					backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url(${pexels6Image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}>
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
							<div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
								<div className="text-3xl md:text-4xl font-bold text-hope-blue mb-2">
									<AnimatedCounter
										end={parseInt(stat.number.replace(/[^0-9]/g, ''))}
										suffix={stat.number.replace(/[0-9]/g, '')}
									/>
								</div>
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
									<Tooltip content={`Learn more about our ${program.title.toLowerCase()} program`} position="top">
										<program.icon className="h-6 w-6 text-hope-blue cursor-help" />
									</Tooltip>
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
						</Link>
					</div>
				</div>
			</section>

			{/* Donation Calculator */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See Your Impact</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Discover exactly what your donation can accomplish. Every contribution creates lasting change.
						</p>
					</div>
					<div className="max-w-2xl mx-auto">
						{/* Currency Selection */}
						<div className="mb-6 text-center">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								<Globe className="inline h-4 w-4 mr-1" />
								Select Currency
							</label>
							<select
								value={selectedCurrency}
								onChange={(e) => setSelectedCurrency(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent">
								{currencies.map((currency) => (
									<option key={currency.code} value={currency.code}>
										{currency.symbol} {currency.code} - {currency.name}
									</option>
								))}
							</select>
						</div>
						
						<DonationCalculator currency={selectedCurrency} />
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
								<div className="flex justify-center mb-4">
									<img
										src={testimonial.image}
										alt={testimonial.author}
										className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
										onError={(e) => {
											const img = e.currentTarget;
											const fallback = img.nextSibling as HTMLElement;
											img.style.display = 'none';
											if (fallback) {
												fallback.style.display = 'flex';
											}
										}}
									/>
									<div
										className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-4xl"
										style={{ display: 'none' }}>
										👤
									</div>
								</div>
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
