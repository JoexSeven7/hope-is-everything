import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { initializeStripe } from './lib/stripe';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { TeamPage } from './pages/TeamPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import './index.css';

function App() {
	const stripePromise = initializeStripe();

	return (
		<Elements stripe={stripePromise}>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-grow">
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="/programs" element={<ProgramsPage />} />
							<Route path="/donate" element={<DonatePage />} />
							<Route path="/contact" element={<ContactPage />} />
							<Route path="/team" element={<TeamPage />} />
							<Route path="/testimonials" element={<TestimonialsPage />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</Elements>
	);
}

export default App;
