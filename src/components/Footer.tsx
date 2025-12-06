import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			<div className="container-max px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Organization Info */}
					<div className="space-y-4">
						<Link to="/" className="flex items-center space-x-2">
							<div className="bg-hope-blue p-2 rounded-full">
								<Heart className="h-6 w-6 text-white" />
							</div>
							<div>
								<h2 className="text-xl font-bold">Hope Is Everything</h2>
								<p className="text-sm text-gray-300">Poverty Relief & Education</p>
							</div>
						</Link>
						<p className="text-gray-300 text-sm leading-relaxed">
							Dedicated to breaking the cycle of poverty through education and empowerment. Together, we create lasting
							change in communities worldwide.
						</p>
						<div className="flex space-x-4">
							<a href="#" className="text-gray-400 hover:text-hope-blue transition-colors">
								<Facebook className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-400 hover:text-hope-blue transition-colors">
								<Twitter className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-400 hover:text-hope-blue transition-colors">
								<Instagram className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-400 hover:text-hope-blue transition-colors">
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/about" className="text-gray-300 hover:text-white transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
									Our Programs
								</Link>
							</li>
							<li>
								<Link to="/team" className="text-gray-300 hover:text-white transition-colors">
									Our Team
								</Link>
							</li>
							<li>
								<Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors">
									Success Stories
								</Link>
							</li>
							<li>
								<Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Programs */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Our Focus Areas</h3>
						<ul className="space-y-2 text-gray-300">
							<li>Education & Literacy</li>
							<li>Community Development</li>
							<li>Skills Training</li>
							<li>Healthcare Access</li>
							<li>Youth Empowerment</li>
							<li>Women's Rights</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
						<div className="space-y-3">
							<div className="flex items-start space-x-3">
								<MapPin className="h-5 w-5 text-hope-blue mt-0.5" />
								<div className="text-gray-300 text-sm">
									<p>123 Hope Street</p>
									<p>Community Center</p>
									<p>New York, NY 10001</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<Phone className="h-5 w-5 text-hope-blue" />
								<span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-3">
								<Mail className="h-5 w-5 text-hope-blue" />
								<span className="text-gray-300 text-sm">info@hopeiseverything.org</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-700 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-gray-400 text-sm">© {currentYear} Hope Is Everything. All rights reserved.</p>
						<div className="flex space-x-6 text-sm">
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								Privacy Policy
							</a>
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								Terms of Service
							</a>
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								Accessibility
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
