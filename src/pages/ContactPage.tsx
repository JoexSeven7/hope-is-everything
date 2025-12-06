import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Heart } from 'lucide-react';

export const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		inquiryType: 'general',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log('Form submitted:', formData);
		alert('Thank you for your message! We will get back to you soon.');
		// Reset form
		setFormData({
			name: '',
			email: '',
			phone: '',
			subject: '',
			message: '',
			inquiryType: 'general',
		});
	};

	const contactInfo = [
		{
			icon: MapPin,
			title: 'Headquarters',
			details: ['123 Hope Street', 'Community Center Building', 'New York, NY 10001', 'United States'],
		},
		{
			icon: Phone,
			title: 'Phone',
			details: ['+1 (555) 123-4567', '+1 (555) 123-4568 (Fax)', 'Mon-Fri: 9:00 AM - 6:00 PM EST'],
		},
		{
			icon: Mail,
			title: 'Email',
			details: ['info@hopeiseverything.org', 'donations@hopeiseverything.org', 'volunteer@hopeiseverything.org'],
		},
		{
			icon: Clock,
			title: 'Office Hours',
			details: [
				'Monday - Friday: 9:00 AM - 6:00 PM',
				'Saturday: 10:00 AM - 4:00 PM',
				'Sunday: Closed',
				'Emergency: 24/7',
			],
		},
	];

	const inquiryTypes = [
		{ value: 'general', label: 'General Inquiry' },
		{ value: 'donation', label: 'Donation Question' },
		{ value: 'volunteer', label: 'Volunteer Opportunities' },
		{ value: 'partnership', label: 'Partnership' },
		{ value: 'media', label: 'Media Inquiry' },
		{ value: 'support', label: 'Program Support' },
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-hope-blue to-blue-700 text-white section-padding">
				<div className="container-max text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto">
						Ready to make a difference? We'd love to hear from you. Get in touch to learn more about our programs,
						volunteer opportunities, or ways to support our mission.
					</p>
				</div>
			</section>

			<div className="container-max section-padding">
				<div className="grid lg:grid-cols-3 gap-12">
					{/* Contact Form */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-xl shadow-lg p-8">
							<div className="flex items-center mb-6">
								<MessageSquare className="h-6 w-6 text-hope-blue mr-3" />
								<h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
											placeholder="Your full name"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
											placeholder="your@email.com"
										/>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
										<input
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
											placeholder="+1 (555) 123-4567"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
										<select
											name="inquiryType"
											value={formData.inquiryType}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent">
											{inquiryTypes.map((type) => (
												<option key={type.value} value={type.value}>
													{type.label}
												</option>
											))}
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
									<input
										type="text"
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
										placeholder="Brief subject of your message"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										required
										rows={6}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
										placeholder="Please provide details about your inquiry..."
									/>
								</div>

								<button
									type="submit"
									className="w-full bg-hope-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
									<Send className="h-5 w-5 mr-2" />
									Send Message
								</button>
							</form>
						</div>
					</div>

					{/* Contact Information */}
					<div className="space-y-8">
						{/* Contact Details */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
							<div className="space-y-6">
								{contactInfo.map((info, index) => (
									<div key={index} className="flex items-start space-x-4">
										<div className="bg-hope-blue bg-opacity-10 p-2 rounded-full">
											<info.icon className="h-5 w-5 text-hope-blue" />
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
											{info.details.map((detail, detailIndex) => (
												<p key={detailIndex} className="text-gray-600 text-sm">
													{detail}
												</p>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Quick Actions */}
						<div className="bg-hope-blue rounded-xl p-6 text-white">
							<h3 className="text-xl font-bold mb-4">Quick Actions</h3>
							<div className="space-y-3">
								<a
									href="/donate"
									className="block w-full bg-white text-hope-blue hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg transition-colors text-center">
									Make a Donation
								</a>
								<a
									href="#"
									className="block w-full border-2 border-white text-white hover:bg-white hover:text-hope-blue font-semibold py-3 px-4 rounded-lg transition-all text-center">
									Volunteer Sign-up
								</a>
								<a
									href="#"
									className="block w-full border-2 border-white text-white hover:bg-white hover:text-hope-blue font-semibold py-3 px-4 rounded-lg transition-all text-center">
									Newsletter Sign-up
								</a>
							</div>
						</div>

						{/* Emergency Contact */}
						<div className="bg-red-50 border border-red-200 rounded-xl p-6">
							<div className="flex items-center mb-3">
								<Heart className="h-5 w-5 text-red-500 mr-2" />
								<h3 className="text-lg font-bold text-gray-900">Emergency Support</h3>
							</div>
							<p className="text-gray-600 text-sm mb-3">
								For urgent matters related to our programs or beneficiaries, please use our emergency contact line.
							</p>
							<p className="font-semibold text-red-600">24/7 Hotline: +1 (555) 911-HOPE</p>
						</div>
					</div>
				</div>
			</div>

			{/* Map Section Placeholder */}
			<section className="bg-gray-100 py-16">
				<div className="container-max">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Centers</h2>
						<p className="text-gray-600">
							We have offices and program centers around the world. Find the nearest location to you.
						</p>
					</div>

					<div className="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
						<div className="text-center">
							<MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
							<p className="text-gray-600">Map integration would be placed here showing our global locations</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="bg-white section-padding">
				<div className="container-max">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
						<p className="text-xl text-gray-600">
							Quick answers to common questions about our organization and programs.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">How can I make a donation?</h3>
								<p className="text-gray-600">
									You can donate online through our secure donation page, by phone, or by mail. We accept one-time and
									recurring donations.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">Can I volunteer with your organization?</h3>
								<p className="text-gray-600">
									Yes! We welcome volunteers for various programs. Contact us to learn about current opportunities that
									match your skills and interests.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">How do you ensure program effectiveness?</h3>
								<p className="text-gray-600">
									We use data-driven approaches, regular monitoring, and community feedback to continuously improve our
									programs and measure impact.
								</p>
							</div>
						</div>
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">Where do you operate?</h3>
								<p className="text-gray-600">
									We work in 25 countries across Africa, Asia, and Latin America, with programs adapted to local needs
									and contexts.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">Is my donation tax-deductible?</h3>
								<p className="text-gray-600">
									Yes, Hope Is Everything is a registered 501(c)(3) nonprofit organization. You will receive a tax
									receipt for your donation.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">How can I stay updated on your work?</h3>
								<p className="text-gray-600">
									Subscribe to our newsletter, follow us on social media, or check our website regularly for updates and
									success stories.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
