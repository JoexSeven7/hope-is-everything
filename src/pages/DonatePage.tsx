import { useState } from 'react';
import { CreditCard, Smartphone, Heart, Users, BookOpen, Home, DollarSign, CheckCircle } from 'lucide-react';

export const DonatePage = () => {
	const [selectedAmount, setSelectedAmount] = useState('50');
	const [customAmount, setCustomAmount] = useState('');
	const [donorInfo, setDonorInfo] = useState({
		name: '',
		email: '',
		frequency: 'one-time',
	});

	const presetAmounts = ['25', '50', '100', '250', '500'];

	const impactLevels = [
		{
			amount: '25',
			impact: 'Provides school supplies for 1 child for a month',
			icon: BookOpen,
			color: 'bg-green-500',
		},
		{
			amount: '50',
			impact: 'Funds one week of after-school tutoring',
			icon: Users,
			color: 'bg-blue-500',
		},
		{
			amount: '100',
			impact: 'Supports a student with full educational materials',
			icon: BookOpen,
			color: 'bg-purple-500',
		},
		{
			amount: '250',
			impact: 'Provides vocational training for one person',
			icon: Home,
			color: 'bg-orange-500',
		},
		{
			amount: '500',
			impact: 'Sponsors a community learning center for a month',
			icon: Heart,
			color: 'bg-red-500',
		},
	];

	const paymentMethods = [
		{
			id: 'stripe',
			name: 'Credit/Debit Card',
			icon: CreditCard,
			description: 'Secure payment via Stripe',
		},
		{
			id: 'crypto',
			name: 'Cryptocurrency',
			icon: Smartphone,
			description: 'Bitcoin, Ethereum, and more',
		},
	];

	const handleAmountSelect = (amount: string) => {
		setSelectedAmount(amount);
		setCustomAmount('');
	};

	const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomAmount(e.target.value);
		setSelectedAmount('');
	};

	const finalAmount = customAmount || selectedAmount;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-hope-green to-green-600 text-white section-padding">
				<div className="container-max text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Donation</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto">
						Your contribution creates lasting change. Join us in breaking the cycle of poverty through education and
						community empowerment.
					</p>
				</div>
			</section>

			<div className="container-max section-padding">
				<div className="grid lg:grid-cols-3 gap-12">
					{/* Donation Form */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-xl shadow-lg p-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Impact</h2>

							{/* Preset Amounts */}
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
								{presetAmounts.map((amount) => (
									<button
										key={amount}
										onClick={() => handleAmountSelect(amount)}
										className={`p-4 rounded-lg border-2 transition-all ${
											selectedAmount === amount
												? 'border-hope-green bg-green-50 text-hope-green'
												: 'border-gray-200 hover:border-hope-green'
										}`}>
										<div className="text-2xl font-bold">${amount}</div>
										<div className="text-sm text-gray-600">USD</div>
									</button>
								))}
							</div>

							{/* Custom Amount */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount (USD)</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
									<input
										type="number"
										value={customAmount}
										onChange={handleCustomAmountChange}
										className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
										placeholder="Enter amount"
										min="1"
									/>
								</div>
							</div>

							{/* Frequency */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-3">Donation Frequency</label>
								<div className="flex space-x-4">
									<label className="flex items-center">
										<input
											type="radio"
											name="frequency"
											value="one-time"
											checked={donorInfo.frequency === 'one-time'}
											onChange={(e) => setDonorInfo({ ...donorInfo, frequency: e.target.value })}
											className="mr-2 text-hope-green focus:ring-hope-green"
										/>
										One-time
									</label>
									<label className="flex items-center">
										<input
											type="radio"
											name="frequency"
											value="monthly"
											checked={donorInfo.frequency === 'monthly'}
											onChange={(e) => setDonorInfo({ ...donorInfo, frequency: e.target.value })}
											className="mr-2 text-hope-green focus:ring-hope-green"
										/>
										Monthly
									</label>
									<label className="flex items-center">
										<input
											type="radio"
											name="frequency"
											value="yearly"
											checked={donorInfo.frequency === 'yearly'}
											onChange={(e) => setDonorInfo({ ...donorInfo, frequency: e.target.value })}
											className="mr-2 text-hope-green focus:ring-hope-green"
										/>
										Yearly
									</label>
								</div>
							</div>

							{/* Payment Method */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
								<div className="space-y-3">
									{paymentMethods.map((method) => (
										<label
											key={method.id}
											className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
											<input
												type="radio"
												name="payment"
												value={method.id}
												className="mr-3 text-hope-green focus:ring-hope-green"
											/>
											<method.icon className="h-5 w-5 text-gray-600 mr-3" />
											<div>
												<div className="font-medium text-gray-900">{method.name}</div>
												<div className="text-sm text-gray-600">{method.description}</div>
											</div>
										</label>
									))}
								</div>
							</div>

							{/* Donor Information */}
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
										<input
											type="text"
											value={donorInfo.name}
											onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
											placeholder="Your full name"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
										<input
											type="email"
											value={donorInfo.email}
											onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
											placeholder="your@email.com"
										/>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<button className="w-full bg-hope-green hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
								<DollarSign className="h-5 w-5 mr-2" />
								Donate ${finalAmount}{' '}
								{donorInfo.frequency === 'monthly' ? 'Monthly' : donorInfo.frequency === 'yearly' ? 'Yearly' : ''}
							</button>

							<p className="text-xs text-gray-500 text-center mt-4">
								Your donation is secure and tax-deductible. You'll receive a receipt via email.
							</p>
						</div>
					</div>

					{/* Impact & Information */}
					<div className="space-y-8">
						{/* Impact Summary */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<h3 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h3>
							{finalAmount && (
								<div className="bg-hope-green bg-opacity-10 rounded-lg p-4 mb-4">
									<div className="text-2xl font-bold text-hope-green">${finalAmount}</div>
									<div className="text-sm text-gray-600">
										{donorInfo.frequency === 'monthly'
											? 'Monthly donation'
											: donorInfo.frequency === 'yearly'
											? 'Annual donation'
											: 'One-time donation'}
									</div>
								</div>
							)}

							<div className="space-y-3">
								<div className="flex items-center text-sm text-gray-600">
									<CheckCircle className="h-4 w-4 text-hope-green mr-2" />
									Provides educational materials
								</div>
								<div className="flex items-center text-sm text-gray-600">
									<CheckCircle className="h-4 w-4 text-hope-green mr-2" />
									Supports community programs
								</div>
								<div className="flex items-center text-sm text-gray-600">
									<CheckCircle className="h-4 w-4 text-hope-green mr-2" />
									Creates lasting change
								</div>
							</div>
						</div>

						{/* Impact Levels */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<h3 className="text-xl font-bold text-gray-900 mb-4">Donation Impact</h3>
							<div className="space-y-4">
								{impactLevels.map((level, index) => (
									<div key={index} className="flex items-start space-x-3">
										<div className={`${level.color} w-8 h-8 rounded-full flex items-center justify-center`}>
											<level.icon className="h-4 w-4 text-white" />
										</div>
										<div>
											<div className="font-semibold text-gray-900">${level.amount}</div>
											<div className="text-sm text-gray-600">{level.impact}</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Tax Information */}
						<div className="bg-blue-50 rounded-xl p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-2">Tax Information</h3>
							<p className="text-sm text-gray-600 mb-3">
								Hope Is Everything is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to
								the fullest extent allowed by law.
							</p>
							<p className="text-xs text-gray-500">Tax ID: 12-3456789</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
