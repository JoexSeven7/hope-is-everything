import { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, Copy, Check, Globe, BookOpen } from 'lucide-react';
import { StripePaymentForm } from '../components/StripePaymentForm';
import { DonationCalculator } from '../components/DonationCalculator';
import donateImage from '../assets/pexels6.jpg';
import { getPresetAmounts, getImpactLevels } from '../lib/stripe';

interface DonorInfo {
	name: string;
	email: string;
	frequency: 'one-time' | 'monthly' | 'yearly';
	paymentMethod: 'stripe' | 'crypto';
}

export const DonatePage = () => {
	const [selectedAmount, setSelectedAmount] = useState('50');
	const [customAmount, setCustomAmount] = useState('');
	const [selectedCurrency, setSelectedCurrency] = useState('USD');
	const [donorInfo, setDonorInfo] = useState<DonorInfo>({
		name: '',
		email: '',
		frequency: 'one-time',
		paymentMethod: 'stripe',
	});
	const [copiedAddress, setCopiedAddress] = useState('');
	const [showStripeForm, setShowStripeForm] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);

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

	const presetAmounts = getPresetAmounts(selectedCurrency);

	const cryptoWallets = [
		{
			name: 'Bitcoin',
			symbol: '₿',
			address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
			qrCode:
				'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
			description: 'Send Bitcoin (BTC) to this SegWit address',
			bgColor: 'bg-gradient-to-r from-orange-400 to-yellow-500',
			iconColor: 'bg-orange-500',
			borderColor: 'border-orange-200',
			buttonColor: 'text-orange-600 hover:text-orange-700',
		},
		{
			name: 'Ethereum',
			symbol: 'Ξ',
			address: '0x742d35Cc6634C0532925a3b8D4A9F3B2B1a2e9F1',
			qrCode:
				'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x742d35Cc6634C0532925a3b8D4A9F3B2B1a2e9F1',
			description: 'Send Ethereum (ETH) to this address',
			bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
			iconColor: 'bg-blue-600',
			borderColor: 'border-blue-200',
			buttonColor: 'text-blue-600 hover:text-blue-700',
		},
		{
			name: 'Litecoin',
			symbol: 'Ł',
			address: 'ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
			qrCode:
				'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
			description: 'Send Litecoin (LTC) to this SegWit address',
			bgColor: 'bg-gradient-to-r from-gray-400 to-slate-500',
			iconColor: 'bg-slate-600',
			borderColor: 'border-slate-200',
			buttonColor: 'text-slate-600 hover:text-slate-700',
		},
	];

	const copyToClipboard = (address: string, symbol: string) => {
		navigator.clipboard.writeText(address);
		setCopiedAddress(symbol);
		setTimeout(() => setCopiedAddress(''), 2000);
	};

	const handlePaymentSuccess = () => {
		setPaymentSuccess(true);
		alert('Thank you for your donation! You will receive a confirmation email shortly.');
	};

	const handlePaymentError = (error: string) => {
		console.error('Payment failed:', error);
		alert('Payment failed: ' + error);
	};



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
		console.log('handleAmountSelect called with:', amount);
		setSelectedAmount(amount);
		setCustomAmount('');
	};

	const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomAmount(e.target.value);
		setSelectedAmount('');
	};

	const handleCurrencyChange = (newCurrency: string) => {
		setSelectedCurrency(newCurrency);
		// Reset selected amount to default for new currency
		const newPresetAmounts = getPresetAmounts(newCurrency);
		setSelectedAmount(newPresetAmounts[1]); // Default to second preset (e.g., 50 USD, 46 EUR)
		setCustomAmount('');
	};

	const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const method = e.target.value as 'stripe' | 'crypto';
		setDonorInfo({ ...donorInfo, paymentMethod: method });
		if (method === 'stripe') {
			setShowStripeForm(true);
		} else {
			setShowStripeForm(false);
		}
	};

	const finalAmount = customAmount || selectedAmount;
	const currentCurrency = currencies.find((c) => c.code === selectedCurrency);

	// Show success message if payment was successful
	if (paymentSuccess) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="h-8 w-8 text-green-600" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
					<p className="text-gray-600 mb-6">
						Your donation of {currentCurrency?.symbol}
						{finalAmount} {selectedCurrency} has been processed successfully. You'll receive a confirmation email
						shortly.
					</p>
					<button
						onClick={() => (window.location.href = '/')}
						className="bg-hope-green hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
						Return to Homepage
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section
				className="bg-gradient-to-r from-hope-green to-green-600 text-white section-padding relative overflow-hidden"
				style={{
					backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.8)), url(${donateImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}>
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

							{/* Currency Selection */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<Globe className="inline h-4 w-4 mr-1" />
									Payment Currency
								</label>
								<select
									value={selectedCurrency}
									onChange={(e) => handleCurrencyChange(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent">
									{currencies.map((currency) => (
										<option key={currency.code} value={currency.code}>
											{currency.symbol} {currency.code} - {currency.name}
										</option>
									))}
								</select>
							</div>

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
										<div className="text-2xl font-bold">
											{currentCurrency?.symbol}
											{amount}
										</div>
										<div className="text-sm text-gray-600">{selectedCurrency}</div>
									</button>
								))}
							</div>

							{/* Custom Amount */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Custom Amount ({selectedCurrency})
								</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
										{currentCurrency?.symbol}
									</span>
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
											onChange={(e) => setDonorInfo({ ...donorInfo, frequency: e.target.value as 'one-time' })}
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
											onChange={(e) => setDonorInfo({ ...donorInfo, frequency: e.target.value as 'monthly' })}
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
											onChange={(e) => setDonorInfo({ ...donorInfo, frequency: e.target.value as 'yearly' })}
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
												checked={donorInfo.paymentMethod === method.id}
												onChange={handlePaymentMethodChange}
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

							{/* Stripe Payment Form */}
							{showStripeForm && donorInfo.paymentMethod === 'stripe' && finalAmount && (
								<div className="mb-6">
									<StripePaymentForm
										amount={parseFloat(finalAmount)}
										currency={selectedCurrency}
										donorInfo={donorInfo}
										onSuccess={handlePaymentSuccess}
										onError={handlePaymentError}
									/>
								</div>
							)}

							{/* Cryptocurrency Wallets */}
							{donorInfo.paymentMethod === 'crypto' && (
								<div className="mb-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Send Cryptocurrency</h3>
									<div className="space-y-4">
										{cryptoWallets.map((wallet) => (
											<div
												key={wallet.symbol}
												className={`border-2 ${wallet.borderColor} rounded-xl p-6 ${wallet.bgColor} text-white relative overflow-hidden`}>
												<div className="relative z-10">
													<div className="flex items-center justify-between mb-4">
														<div className="flex items-center">
															<div
																className={`w-10 h-10 ${wallet.iconColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
																<span className="text-white font-bold text-lg">{wallet.symbol}</span>
															</div>
															<div>
																<div className="font-bold text-lg text-white">{wallet.name}</div>
																<div className="text-sm text-white/80">{wallet.description}</div>
															</div>
														</div>
														<button
															onClick={() => copyToClipboard(wallet.address, wallet.symbol)}
															className={`flex items-center text-sm ${wallet.buttonColor} bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-all backdrop-blur-sm`}>
															{copiedAddress === wallet.symbol ? (
																<>
																	<Check className="h-4 w-4 mr-1" />
																	Copied!
																</>
															) : (
																<>
																	<Copy className="h-4 w-4 mr-1" />
																	Copy
																</>
															)}
														</button>
													</div>
													<div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
														<div className="text-xs text-white/70 mb-1">Wallet Address:</div>
														<div className="text-sm font-mono text-white break-all">{wallet.address}</div>
													</div>
													<div className="mt-4 flex flex-col sm:flex-row gap-4">
														<img
															src={wallet.qrCode}
															alt={`${wallet.name} QR Code`}
															className="w-24 h-24 border-2 border-white/30 rounded-lg bg-white p-1"
														/>
														<div className="flex-1">
															<div className="text-sm text-white/90 mb-3">
																Send exactly{' '}
																<span className="font-bold text-white">
																	{currentCurrency?.symbol}
																	{finalAmount} {selectedCurrency}
																</span>{' '}
																worth of {wallet.name}
															</div>
															<div className="text-xs text-white/70 space-y-1">
																<div>• Double-check the address before sending</div>
																<div>• Only send {wallet.name} to this address</div>
																<div>• Transactions may take 10-60 minutes to confirm</div>
															</div>
														</div>
													</div>
												</div>
												{/* Decorative background pattern */}
												<div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
												<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
											</div>
										))}
									</div>
								</div>
							)}

							<p className="text-xs text-gray-500 text-center mt-4">
								{donorInfo.paymentMethod === 'crypto'
									? "Send cryptocurrency to the addresses above. You'll receive a receipt once confirmed."
									: "Your donation is secure and tax-deductible. You'll receive a receipt via email."}
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
									<div className="text-2xl font-bold text-hope-green">
										{currentCurrency?.symbol}
										{finalAmount} {selectedCurrency}
									</div>
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

						{/* Donation Calculator */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<DonationCalculator 
								currency={selectedCurrency} 
								onDonationAmountChange={(amount) => {
									handleAmountSelect(amount.toString());
								}}
							/>
						</div>

						{/* Impact Levels */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<h3 className="text-xl font-bold text-gray-900 mb-4">Donation Impact</h3>
							<div className="space-y-4">
								{getImpactLevels(selectedCurrency).map((level, index) => (
									<a
										key={index}
										href="#"
										onClick={(e) => {
											e.preventDefault();
											console.log('Impact level anchor clicked:', level.amount);
											handleAmountSelect(level.amount);
										}}
										className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
											selectedAmount === level.amount
												? 'bg-hope-green bg-opacity-10 border-2 border-hope-green'
												: 'hover:bg-gray-50 border-2 border-transparent hover:border-hope-green'
										}`}
									>
										<div className={`${level.iconColor} w-8 h-8 rounded-full flex items-center justify-center`}>
											<BookOpen className="h-4 w-4 text-white" />
										</div>
										<div className="flex-1">
											<div className="font-semibold text-gray-900">
												{currentCurrency?.symbol}
												{level.amount} {selectedCurrency}
											</div>
											<div className="text-sm text-gray-600">{level.impact}</div>
										</div>
									</a>
								))}
							</div>
						</div>

						{/* Currency Information */}
						<div className="bg-blue-50 rounded-xl p-6">
							<h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Currency Support</h3>
							<p className="text-sm text-gray-600 mb-3">
								We accept donations in multiple currencies to make it easy for supporters around the world to contribute
								to our mission.
							</p>
							<div className="text-xs text-gray-500 space-y-1">
								<div>• All currencies are processed securely</div>
								<div>• Exchange rates are applied automatically</div>
								<div>• Receipts will be in your selected currency</div>
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

