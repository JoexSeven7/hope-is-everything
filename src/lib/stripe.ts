import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import { IMPACT_COSTS, EXCHANGE_RATES, PRESET_AMOUNTS, IMPACT_LEVELS } from '../constants/currencyExchange';

// This is a test publishable key for demonstration
// In production, replace with your actual Stripe publishable key
const stripePublishableKey =
	import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
	'pk_test_51234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let stripePromise: Promise<Stripe | null> | null = null;

// Initialize Stripe
const initializeStripe = (): Promise<Stripe | null> => {
	if (!stripePromise) {
		stripePromise = loadStripe(stripePublishableKey);
	}
	return stripePromise;
};

// Fetch real-time exchange rates from an API (using exchangerate-api.com as an example)
export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<Record<string, number>> => {
	try {
		// In production, use a real API key
		const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
		const data = await response.json();
		return data.rates;
	} catch (error) {
		console.error('Failed to fetch exchange rates:', error);
		return EXCHANGE_RATES; // Fallback to static rates
	}
};

// Get impact costs for specific currency
export const getImpactCosts = (currency: string) => {
	return IMPACT_COSTS[currency as keyof typeof IMPACT_COSTS] || IMPACT_COSTS['USD'];
};

// Get preset amounts for specific currency
export const getPresetAmounts = (currency: string) => {
	return PRESET_AMOUNTS[currency as keyof typeof PRESET_AMOUNTS] || PRESET_AMOUNTS['USD'];
};

// Get impact levels for specific currency
export const getImpactLevels = (currency: string) => {
	return IMPACT_LEVELS[currency as keyof typeof IMPACT_LEVELS] || IMPACT_LEVELS['USD'];
};

// Helper function to get currency symbol
export const getCurrencySymbol = (currency: string): string => {
	const symbols: { [key: string]: string } = {
		USD: '$',
		EUR: '€',
		GBP: '£',
		CAD: 'C$',
		AUD: 'A$',
		JPY: '¥',
		CHF: 'CHF',
		NGN: '₦',
		INR: '₹',
	};
	return symbols[currency] || '$';
};

// Helper function to format currency
export const formatCurrency = (amount: number, currency: string): string => {
	const formatter = new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: 0,
	});
	return formatter.format(amount);
};

export { initializeStripe };

// Interface for donor information
interface DonorInfo {
	name: string;
	email: string;
	frequency: string;
}

// Stripe configuration validation
export const validateStripeConfig = (): { isValid: boolean; error?: string } => {
	const key = stripePublishableKey;

	if (!key || key === 'pk_test_51234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
		return {
			isValid: false,
			error: 'Demo mode: Using mock payment processing. Configure real Stripe keys for live payments.',
		};
	}

	if (!key.startsWith('pk_test_') && !key.startsWith('pk_live_')) {
		return {
			isValid: false,
			error: 'Invalid Stripe key format. Keys should start with pk_test_ or pk_live_.',
		};
	}

	return { isValid: true };
};

// Check if we're in demo mode
export const isStripeDemo = (): boolean => {
	return !validateStripeConfig().isValid;
};

// Mock donation processing for demo mode
export const processMockDonation = async (
	amount: number,
	currency: string,
	donorInfo: DonorInfo
): Promise<{ success: boolean; id: string }> => {
	try {
		// Validate inputs
		if (!amount || amount <= 0) {
			throw new Error('Invalid donation amount');
		}

		if (!donorInfo.email || !donorInfo.name) {
			throw new Error('Donor information is required');
		}

		// Simulate payment processing delay
		await new Promise((resolve) => setTimeout(resolve, 2000));

		console.log('Processing mock donation:', {
			amount,
			currency,
			donorInfo,
			timestamp: new Date().toISOString(),
		});

		// Store donation data locally for demo
		const donationData = {
			amount,
			currency,
			donorInfo,
			timestamp: new Date().toISOString(),
			id: 'demo_donation_' + Math.random().toString(36).substring(2, 15),
		};

		const donations = JSON.parse(localStorage.getItem('donations') || '[]');
		donations.push(donationData);
		localStorage.setItem('donations', JSON.stringify(donations));

		return {
			success: true,
			id: donationData.id,
		};
	} catch (error) {
		console.error('Error processing mock donation:', error);
		throw error;
	}
};

// Real Stripe payment processing
export const processStripePayment = async (
	amount: number,
	currency: string,
	donorInfo: DonorInfo
): Promise<{ success: boolean; id: string }> => {
	try {
		// In a real implementation, you would:
		// 1. Create a payment intent on your backend
		// 2. Confirm the payment with Stripe Elements
		// 3. Handle success/error responses

		// For now, simulate the process
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const paymentIntentId = 'pi_' + Math.random().toString(36).substring(2, 15);

		console.log('Processing Stripe payment:', {
			amount,
			currency,
			donorInfo,
			paymentIntentId,
			timestamp: new Date().toISOString(),
		});

		return {
			success: true,
			id: paymentIntentId,
		};
	} catch (error) {
		console.error('Error processing Stripe payment:', error);
		throw error;
	}
};

// Main donation processing function
export const processDonation = async (
	amount: number,
	currency: string = 'usd',
	donorInfo: DonorInfo
): Promise<{ success: boolean; id: string }> => {
	const isDemo = isStripeDemo();

	if (isDemo) {
		return processMockDonation(amount, currency, donorInfo);
	} else {
		const _stripe = await stripePromise;
		if (!_stripe) {
			throw new Error('Stripe failed to initialize');
		}
		return processStripePayment(amount, currency, donorInfo);
	}
};
