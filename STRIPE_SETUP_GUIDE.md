# Stripe Integration Setup Guide

## Overview

This guide explains how to properly configure Stripe for your donation website. The current implementation supports both demo mode (for testing) and live Stripe integration.

## Current Status

### ✅ What's Fixed

- **TypeScript Errors**: Resolved all type import issues with proper type-only imports
- **ESLint Warnings**: Fixed unused variable warnings and improved code quality
- **Demo Mode**: Improved demo mode functionality with better user messaging
- **Error Handling**: Enhanced error handling and validation
- **Code Structure**: Refactored for better maintainability
- **App Integration**: Fixed App.tsx Stripe Elements provider integration

### 🔧 Features

- **Demo Mode**: Works without real Stripe keys for testing
- **Multi-Currency Support**: Supports USD, EUR, GBP, CAD, AUD, JPY, CHF, NGN, INR
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Client-side validation for card details
- **Success/Error Handling**: Proper feedback to users
- **Security Notices**: Clear messaging about payment security

## Setting Up Real Stripe Integration

### Step 1: Get Stripe API Keys

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Go to your Stripe Dashboard → Developers → API keys
3. Copy your **Publishable key** (starts with `pk_test_` for testing)

### Step 2: Configure Environment Variables

1. Create a `.env` file in the project root:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Stripe key:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key_here
   ```

### Step 3: Backend Integration (Required for Live Payments)

For production use, you need a backend to create payment intents:

#### Example Node.js/Express Backend:

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/create-payment-intent', async (req, res) => {
	try {
		const { amount, currency, donorInfo } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100, // Convert to cents
			currency: currency.toLowerCase(),
			metadata: {
				donorName: donorInfo.name,
				donorEmail: donorInfo.email,
				frequency: donorInfo.frequency,
			},
		});

		res.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
```

#### Update Frontend to Use Backend:

Modify `src/lib/stripe.ts` to call your backend instead of using mock implementation.

#### Important: App.tsx Integration

The `App.tsx` file uses Stripe Elements provider. Make sure the export in `src/lib/stripe.ts` is compatible:

```typescript
// In stripe.ts
export let stripePromise: Promise<Stripe | null> | null = null;
export const stripe = stripePromise;
```

## Demo Mode Usage

### Testing Without Stripe Keys

The application automatically runs in demo mode when no valid Stripe key is configured. In this mode:

- **No real payments are processed**
- **Any card details are accepted** for testing
- **Success simulation** happens after 2 seconds
- **Demo donations** are stored in localStorage
- **Clear messaging** indicates demo mode is active

### Demo Test Card Details

Use these test details in demo mode:

- **Card Number**: Any 13-19 digit number (e.g., 4242 4242 4242 4242)
- **Expiry**: Any future date in MM/YY format (e.g., 12/34)
- **CVC**: Any 3-4 digit number (e.g., 123)
- **Name**: Any name

## File Structure

```
src/
├── lib/
│   └── stripe.ts              # Stripe configuration and utilities
├── components/
│   └── StripePaymentForm.tsx  # Payment form component
└── pages/
    └── DonatePage.tsx         # Main donation page
```

## Key Components

### StripePaymentForm

- Handles payment form UI and validation
- Supports demo and live modes
- Provides user feedback and error handling

### Stripe Configuration

- `validateStripeConfig()`: Validates Stripe key configuration
- `isStripeDemo()`: Checks if running in demo mode
- `processDonation()`: Main payment processing function
- `getCurrencySymbol()`: Currency symbol mapping

## Customization

### Adding New Currencies

Update the `getCurrencySymbol()` function in `src/lib/stripe.ts`:

```typescript
const symbols: { [key: string]: string } = {
	USD: '$',
	EUR: '€',
	// Add new currencies here
	NEW_CURRENCY: '₿', // Your symbol
};
```

### Styling

The payment form uses Tailwind CSS classes. Key classes:

- `bg-hope-green`: Main brand color
- `focus:ring-hope-green`: Focus states
- `border-hope-green`: Active states

### Form Fields

Available form fields:

- Card number (auto-formatted)
- Expiry date (MM/YY format)
- CVC (3-4 digits)
- Cardholder name

## Production Checklist

Before going live:

- [ ] Replace test Stripe key with live key
- [ ] Implement backend payment intent creation
- [ ] Add proper error logging
- [ ] Test all currencies
- [ ] Verify tax compliance for your region
- [ ] Test donation success/error flows
- [ ] Set up Stripe webhooks for payment confirmation
- [ ] Add receipt generation
- [ ] Implement donor database storage

## Troubleshooting

### Common Issues

1. **TypeScript Errors**

   - Ensure `@stripe/stripe-js` is properly imported
   - Use type-only imports for Stripe types

2. **ESLint Warnings**

   - Check for unused variables
   - Remove unused imports

3. **Demo Mode Issues**

   - Verify `.env` file doesn't contain valid Stripe keys
   - Check browser console for configuration errors

4. **Build Errors**

   - Run `npm run lint` to check code quality
   - Run `npm run build` to test production build

5. **App.tsx Import Errors**
   - Ensure `stripe` export is available in `src/lib/stripe.ts`
   - Check that Stripe Elements provider is properly configured

### Getting Help

- Stripe Documentation: [https://stripe.com/docs](https://stripe.com/docs)
- React Stripe.js: [https://github.com/stripe/react-stripe-js](https://github.com/stripe/react-stripe-js)
- Check browser console for detailed error messages

## Security Notes

- **Never expose Stripe secret keys** in frontend code
- **Use HTTPS** in production
- **Validate all inputs** on both client and server
- **Implement proper error handling** to avoid information leakage
- **Log payment attempts** for security monitoring

---

_This integration is ready for both demo testing and production use with proper backend implementation._
