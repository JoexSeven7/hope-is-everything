import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Programs', href: '/programs' },
		{ name: 'Team', href: '/team' },
		{ name: 'Testimonials', href: '/testimonials' },
		{ name: 'Contact', href: '/contact' },
	];

	const isActive = (path: string) => location.pathname === path;

	return (
		<header className="bg-white shadow-lg sticky top-0 z-50">
			{/* Top Contact Bar */}
			<div className="bg-hope-blue text-gray-400 py-2">
				<div className="container-max px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center text-sm">
						<div className="flex items-center space-x-6">
							<div className="flex items-center space-x-2">
								<Phone className="h-4 w-4" />
								<span>+234 7040602452</span>
							</div>
							<div className="flex items-center space-x-2">
								<Mail className="h-4 w-4" />
								<span>info@hopeiseverything.org</span>
							</div>
						</div>
						<div className="hidden sm:block">
							<span>Together, we can make a difference</span>
						</div>
					</div>
				</div>
			</div>

			{/* Main Navigation */}
			<nav className="container-max px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-2">
						<div className="bg-hope-blue p-2 rounded-full">
							<Heart className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-xl font-bold text-hope-blue">Hope Is Everything</h1>
							<p className="text-xs text-hope-gray">Poverty Relief & Education</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									isActive(item.href)
										? 'text-hope-blue bg-blue-50'
										: 'text-gray-700 hover:text-hope-blue hover:bg-gray-50'
								}`}
								aria-current={isActive(item.href) ? 'page' : undefined}>
								{item.name}
							</Link>
						))}
						<Link to="/donate" className="btn-primary ml-4">
							Donate Now
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-gray-700 hover:text-hope-blue focus:outline-none"
							aria-expanded={isMenuOpen}
							aria-label="Toggle menu">
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden" role="menu" aria-label="Mobile menu">
						<div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
										isActive(item.href)
											? 'text-hope-blue bg-blue-50'
											: 'text-gray-700 hover:text-hope-blue hover:bg-gray-50'
									}`}
									onClick={() => setIsMenuOpen(false)}
									role="menuitem"
									aria-current={isActive(item.href) ? 'page' : undefined}>
									{item.name}
								</Link>
							))}
							<Link
								to="/donate"
								className="block w-full text-center btn-primary mt-4"
								onClick={() => setIsMenuOpen(false)}
								role="menuitem">
								Donate Now
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
};
