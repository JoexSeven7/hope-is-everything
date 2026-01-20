import { useState } from 'react';
import { CreditCard, Lock, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { processDonation, getCurrencySymbol, isStripeDemo } from '../lib/stripe';

interface DonorInfo {
	name: string;
	email: string;
	frequency: 'one-time' | 'monthly' | 'yearly';
}

interface StripePaymentFormProps {
	amount: number;
	currency?: string;
	donorInfo: DonorInfo;
	onSuccess: () => void;
	onError: (error: string) => void;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
	amount,
	currency = 'USD',
	donorInfo,
	onSuccess,
	onError,
}) => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [message, setMessage] = useState('');
	const [cardDetails, setCardDetails] = useState({
		number: '',
		expiry: '',
		cvc: '',
		name: donorInfo.name || '',
	});

	const currencySymbol = getCurrencySymbol(currency);
	const isDemoMode = isStripeDemo();

	const handleInputChange = (field: string, value: string) => {
		setCardDetails((prev) => ({ ...prev, [field]: value }));
	};

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || '';
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(' ');
		} else {
			return v;
		}
	};

	const formatExpiry = (value: string) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		if (v.length >= 2) {
			return v.substring(0, 2) + '/' + v.substring(2, 4);
		}
		return v;
	};

	const validateCardDetails = () => {
		const errors = [];

		if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
			errors.push('Please fill in all card details');
		}

		const cleanNumber = cardDetails.number.replace(/\s/g, '');
		if (cleanNumber.length < 13) {
			errors.push('Please enter a valid card number');
		}

		if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
			errors.push('Please enter a valid expiry date (MM/YY)');
		}

		if (cardDetails.cvc.length < 3) {
			errors.push('Please enter a valid CVC');
		}

		// Additional validation for demo mode
		if (isDemoMode) {
			// In demo mode, accept any card details for testing
			if (cleanNumber.length >= 13 && /^\d{2}\/\d{2}$/.test(cardDetails.expiry) && cardDetails.cvc.length >= 3) {
				return []; // Valid demo card details
			}
		}

		return errors;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsProcessing(true);
		setMessage('');

		try {
			// Validate card details
			const validationErrors = validateCardDetails();
			if (validationErrors.length > 0) {
				throw new Error(validationErrors[0]);
			}

			// Validate donor information
			if (!donorInfo.name || !donorInfo.email) {
				throw new Error('Please provide your name and email');
			}

			// Validate email format
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(donorInfo.email)) {
				throw new Error('Please enter a valid email address');
			}

			// Process the donation
			const result = await processDonation(amount, currency, donorInfo);

			if (result.success) {
				setMessage('Donation processed successfully!');
				setTimeout(() => {
					onSuccess();
				}, 1500);
			} else {
				throw new Error('Payment processing failed');
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Payment failed';
			setMessage(errorMessage);
			onError(errorMessage);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Demo Mode Notice */}
			{isDemoMode && (
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<div className="flex items-start">
						<AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
						<div className="text-sm text-blue-800">
							<p className="font-medium mb-1">Demo Mode Active</p>
							<p>This is a demonstration payment form. Use any card details to test the flow.</p>
							<p className="mt-2 text-xs">No real payment will be processed.</p>
						</div>
					</div>
				</div>
			)}

			{/* Payment Summary */}
			<div className="bg-gray-50 rounded-lg p-4">
				<h3 className="font-semibold text-gray-900 mb-2">Payment Summary</h3>
				<div className="flex justify-between items-center">
					<span className="text-gray-600">
						Donation Amount
						{donorInfo.frequency === 'monthly' && ' (Monthly)'}
						{donorInfo.frequency === 'yearly' && ' (Yearly)'}
					</span>
					<span className="font-bold text-lg">
						{currencySymbol}
						{amount} {currency}
					</span>
				</div>
				<div className="text-xs text-gray-500 mt-2">
					{isDemoMode ? 'Demo payment processing' : 'Secure payment powered by Stripe'}
				</div>
			</div>

			{/* Payment Form */}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="border border-gray-200 rounded-lg p-4">
					<div className="flex items-center mb-4">
						<CreditCard className="h-5 w-5 text-gray-600 mr-2" />
						<span className="font-medium text-gray-900">Card Details</span>
						<Lock className="h-4 w-4 text-green-600 ml-auto" />
					</div>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
							<input
								type="text"
								value={cardDetails.number}
								onChange={(e) => handleInputChange('number', formatCardNumber(e.target.value))}
								placeholder="1234 5678 9012 3456"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
								maxLength={19}
								required
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
								<input
									type="text"
									value={cardDetails.expiry}
									onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
									placeholder="MM/YY"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
									maxLength={5}
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
								<input
									type="text"
									value={cardDetails.cvc}
									onChange={(e) => handleInputChange('cvc', e.target.value.replace(/[^0-9]/g, ''))}
									placeholder="123"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
									maxLength={4}
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
							<input
								type="text"
								value={cardDetails.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
								placeholder="John Joshua"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-green focus:border-transparent"
								required
							/>
						</div>
					</div>
				</div>

				{/* Message */}
				{message && (
					<div
						className={`border rounded-lg p-3 flex items-center ${
							message.includes('success')
								? 'bg-green-50 border-green-200 text-green-600'
								: 'bg-red-50 border-red-200 text-red-600'
						}`}>
						{message.includes('success') ? (
							<CheckCircle className="h-4 w-4 mr-2" />
						) : (
							<AlertCircle className="h-4 w-4 mr-2" />
						)}
						<p className="text-sm">{message}</p>
					</div>
				)}

				{/* Security Notice */}
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
					<div className="flex items-start">
						<Lock className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
						<div className="text-sm text-blue-800">
							<p className="font-medium mb-1">Secure Payment</p>
							<p>Your payment information is encrypted and secure. We never store your card details.</p>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isProcessing}
					className={`w-full font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center ${
						isProcessing
							? 'bg-gray-400 text-gray-600 cursor-not-allowed'
							: 'bg-hope-green hover:bg-green-700 text-white'
					}`}>
					{isProcessing ? (
						<>
							<Loader className="h-5 w-5 mr-2 animate-spin" />
							Processing Payment...
						</>
					) : (
						<>
							<CreditCard className="h-5 w-5 mr-2" />
							{isDemoMode ? 'Test Donation' : 'Donate'}
							{currencySymbol}
							{amount} {currency}
						</>
					)}
				</button>

				<p className="text-xs text-gray-500 text-center">
					By completing this donation, you agree to our terms of service and privacy policy. Your donation is
					tax-deductible.
				</p>
			</form>
		</div>
	);
};
