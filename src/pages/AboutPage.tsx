import { Users, Target, Award, Heart, Globe, BookOpen, Handshake } from 'lucide-react';
import aboutHeroImage from '../assets/pexels6.jpg';

export const AboutPage = () => {
	const values = [
		{
			icon: Heart,
			title: 'Compassion',
			description: 'We approach every person with empathy, dignity, and respect.',
		},
		{
			icon: Target,
			title: 'Impact',
			description: 'We focus on sustainable solutions that create lasting change.',
		},
		{
			icon: Users,
			title: 'Community',
			description: 'We believe in the power of collective action and collaboration.',
		},
		{
			icon: Award,
			title: 'Excellence',
			description: 'We maintain the highest standards in all our programs and services.',
		},
	];

	const achievements = [
		{
			year: '2010',
			title: 'Foundation',
			description: 'Hope Is Everything was founded with a vision to transform lives through education.',
		},
		{
			year: '2015',
			title: 'Global Expansion',
			description: 'Extended operations to 15 countries, reaching over 10,000 beneficiaries.',
		},
		{
			year: '2020',
			title: 'Digital Innovation',
			description: 'Launched online learning platforms and remote education programs.',
		},
		{
			year: '2025',
			title: '50,000 Lives',
			description: 'Celebrating over 50,000 lives transformed across 25 countries.',
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section
				className="bg-gradient-to-r from-hope-blue to-blue-700 text-white section-padding relative overflow-hidden"
				style={{
					backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.85)), url(${aboutHeroImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}>
				<div className="container-max">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">About Hope Is Everything</h1>
						<p className="text-xl md:text-2xl leading-relaxed">
							For over a decade, we've been dedicated to breaking the cycle of poverty through education, skills
							training, and community development programs that create lasting change.
						</p>
					</div>
				</div>
			</section>

			{/* Our Story */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
							<div className="space-y-4 text-gray-600">
								<p>
									Hope Is Everything was born from a simple yet powerful belief: that every person deserves access to
									education and the opportunity to build a better future. Founded in 2010 by a group of educators and
									community advocates, we started with a single school in an underserved community.
								</p>
								<p>
									What began as a grassroots initiative has grown into a global movement, impacting over 50,000 lives
									across 25 countries. Our approach is rooted in the understanding that education is not just about
									literacy—it's about empowerment, dignity, and creating pathways out of poverty.
								</p>
								<p>
									Today, we continue to innovate and expand our programs, always keeping our core mission at the heart
									of everything we do: providing hope through education and creating lasting change in communities
									worldwide.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="bg-gray-100 rounded-2xl p-8 text-center">
								<Globe className="h-16 w-16 text-hope-blue mx-auto mb-4" />
								<h3 className="text-2xl font-bold text-gray-900 mb-4">Global Impact</h3>
								<p className="text-gray-600">
									From local communities to international partnerships, our work spans across continents, cultures, and
									communities.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Values */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							These core values guide everything we do and shape how we serve communities around the world.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{values.map((value, index) => (
							<div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
								<div className="bg-hope-blue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<value.icon className="h-8 w-8 text-hope-blue" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
								<p className="text-gray-600">{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
						<p className="text-xl text-gray-600">Key milestones in our mission to transform lives through education.</p>
					</div>

					<div className="max-w-4xl mx-auto">
						{achievements.map((achievement, index) => (
							<div key={index} className="flex items-start space-x-6 mb-8 last:mb-0">
								<div className="flex-shrink-0">
									<div className="bg-hope-blue text-white w-16 h-16 rounded-full flex items-center justify-center font-bold">
										{achievement.year}
									</div>
								</div>
								<div className="flex-grow">
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h3>
									<p className="text-gray-600">{achievement.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* What We Do */}
			<section className="bg-gray-50 section-padding">
				<div className="container-max">
					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What We Do</h2>
							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<BookOpen className="h-6 w-6 text-hope-blue mt-1" />
									<div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">Education Programs</h3>
										<p className="text-gray-600">
											We provide comprehensive education from early childhood through adult learning, focusing on
											literacy, numeracy, and life skills that prepare students for success.
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<Handshake className="h-6 w-6 text-hope-green mt-1" />
									<div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">Community Development</h3>
										<p className="text-gray-600">
											Our community programs build infrastructure, establish healthcare facilities, and create economic
											opportunities that support sustainable development.
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<Users className="h-6 w-6 text-hope-orange mt-1" />
									<div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">Skills Training</h3>
										<p className="text-gray-600">
											We offer vocational training and entrepreneurship programs that equip individuals with marketable
											skills and create pathways to economic independence.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-hope-blue p-6 rounded-xl text-white">
							<h3 className="text-2xl font-bold mb-4">Our Approach</h3>
							<ul className="space-y-3 text-blue-100">
								<li className="flex items-center">
									<span className="w-2 h-2 bg-white rounded-full mr-3"></span>
									Community-centered solutions
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-white rounded-full mr-3"></span>
									Sustainable development
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-white rounded-full mr-3"></span>
									Partnership and collaboration
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-white rounded-full mr-3"></span>
									Evidence-based programs
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-white rounded-full mr-3"></span>
									Cultural sensitivity
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="bg-white section-padding">
				<div className="container-max text-center">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
						<p className="text-xl text-gray-600 mb-8">
							Together, we can continue breaking barriers and creating opportunities for communities around the world.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="/donate" className="btn-primary">
								Support Our Work
							</a>
							<a href="/contact" className="btn-outline">
								Get Involved
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
