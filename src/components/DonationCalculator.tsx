import { useState, useMemo } from 'react';
import { Calculator, BookOpen, Users, Heart, Home, DollarSign } from 'lucide-react';
import { getImpactCosts, getCurrencySymbol, formatCurrency } from '../lib/stripe';

interface ImpactItem {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	cost: number;
	color: string;
}

interface DonationCalculatorProps {
	currency?: string;
	onDonationAmountChange?: (amount: number) => void;
}

export const DonationCalculator: React.FC<DonationCalculatorProps> = ({ 
	currency = 'USD', 
	onDonationAmountChange 
}) => {
	const [donationAmount, setDonationAmount] = useState(50);
	const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
	const [selectedImpactAreas, setSelectedImpactAreas] = useState<string[]>([]);
	const [impactQuantities, setImpactQuantities] = useState<Record<string, number>>({});
	const [calculationMode, setCalculationMode] = useState<'amount-to-impact' | 'impact-to-amount'>('amount-to-impact');

	// Update parent component when donation amount changes
	const updateDonationAmount = (newAmount: number) => {
		setDonationAmount(newAmount);
		if (onDonationAmountChange) {
			onDonationAmountChange(newAmount);
		}
	};

	// Update parent component when impact-to-amount calculation changes
	const handleCalculationModeChange = (mode: 'amount-to-impact' | 'impact-to-amount') => {
		setCalculationMode(mode);
		if (mode === 'impact-to-amount') {
			const total = calculateTotalFromImpact();
			if (onDonationAmountChange) {
				onDonationAmountChange(total);
			}
		} else {
			if (onDonationAmountChange) {
				onDonationAmountChange(donationAmount);
			}
		}
	};

	// Get impact costs for the selected currency
	const getImpactItems = (): ImpactItem[] => {
		const costs = getImpactCosts(currency);
		return [
			{
				icon: BookOpen,
				title: 'Educational Materials',
				description: 'School supplies for students',
				cost: costs.educationalMaterials,
				color: 'bg-blue-500',
			},
			{
				icon: Users,
				title: 'Tutoring Session',
				description: 'One week of after-school support',
				cost: costs.tutoringSession,
				color: 'bg-green-500',
			},
			{
				icon: Home,
				title: 'Vocational Training',
				description: 'Skills development program',
				cost: costs.vocationalTraining,
				color: 'bg-purple-500',
			},
			{
				icon: Heart,
				title: 'Healthcare Support',
				description: 'Medical care for families',
				cost: costs.healthcareSupport,
				color: 'bg-red-500',
			},
		];
	};

	const toggleImpactArea = (title: string) => {
		setSelectedImpactAreas(prev => 
			prev.includes(title) 
				? prev.filter(item => item !== title)
				: [...prev, title]
		);
	};

	const updateImpactQuantity = (title: string, quantity: number) => {
		setImpactQuantities(prev => ({
			...prev,
			[title]: Math.max(0, quantity),
		}));
		
		// Update parent component if in impact-to-amount mode
		if (calculationMode === 'impact-to-amount') {
			const total = calculateTotalFromImpact();
			if (onDonationAmountChange) {
				onDonationAmountChange(total);
			}
		}
	};

	const calculateImpact = (amount: number) => {
		const impactsMap = new Map<string, any>();
		let remaining = amount;
		const items = getImpactItems();
		const consideredItems = selectedImpactAreas.length > 0
			? items.filter(item => selectedImpactAreas.includes(item.title))
			: items;

		if (selectedImpactAreas.length > 0) {
			// First pass: Check if we can allocate at least 1 unit of each selected item
			const totalCostOfOneEach = consideredItems.reduce((sum, item) => sum + item.cost, 0);
			
			if (totalCostOfOneEach <= amount) {
				// We have enough to allocate at least 1 of each selected item
				for (const item of consideredItems) {
					impactsMap.set(item.title, {
						...item,
						count: 1,
						total: item.cost,
					});
					remaining -= item.cost;
				}

				// Second pass: Greedily allocate remaining amount across selected items
				for (const item of consideredItems) {
					const count = Math.floor(remaining / item.cost);
					if (count > 0) {
						const existing = impactsMap.get(item.title);
						existing.count += count;
						existing.total += count * item.cost;
						remaining -= count * item.cost;
					}
				}
			} else {
				// Not enough to allocate 1 of each selected item - fall back to greedy allocation
				for (const item of consideredItems) {
					const count = Math.floor(remaining / item.cost);
					if (count > 0) {
						impactsMap.set(item.title, {
							...item,
							count,
							total: count * item.cost,
						});
						remaining -= count * item.cost;
					}
				}
			}
		} else {
			// No items selected - greedy allocation across all items
			for (const item of consideredItems) {
				const count = Math.floor(remaining / item.cost);
				if (count > 0) {
					impactsMap.set(item.title, {
						...item,
						count,
						total: count * item.cost,
					});
					remaining -= count * item.cost;
				}
			}
		}

		// Return items in the same order as in getImpactItems()
		return items
			.filter(item => impactsMap.has(item.title))
			.map(item => impactsMap.get(item.title));
	};

	const calculateTotalFromImpact = () => {
		let total = 0;
		const impactItems = getImpactItems();
		
		impactItems.forEach(item => {
			const quantity = impactQuantities[item.title] || 0;
			total += quantity * item.cost;
		});

		return total;
	};

	const getTotalImpact = useMemo(() => {
		if (calculationMode === 'amount-to-impact') {
			const baseAmount =
				frequency === 'monthly' ? donationAmount * 12 : frequency === 'yearly' ? donationAmount : donationAmount;
			return calculateImpact(baseAmount);
		} else {
			const impacts: Array<ImpactItem & { count: number; total: number }> = [];
			const impactItems = getImpactItems();
			
			impactItems.forEach(item => {
				const quantity = impactQuantities[item.title] || 0;
				if (quantity > 0) {
					impacts.push({
						...item,
						count: quantity,
						total: quantity * item.cost,
					});
				}
			});

			return impacts;
		}
	}, [donationAmount, frequency, selectedImpactAreas, currency, impactQuantities, calculationMode]);

	const formatFrequency = () => {
		switch (frequency) {
			case 'monthly':
				return '/month';
			case 'yearly':
				return '/year';
			default:
				return '';
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-lg p-6">
			<div className="flex items-center mb-6">
				<Calculator className="h-6 w-6 text-hope-blue mr-3" />
				<h3 className="text-xl font-bold text-gray-900">Impact Calculator</h3>
			</div>

			{/* Calculation Mode Switch */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-3">Calculation Mode:</label>
				<div className="flex bg-gray-100 p-1 rounded-lg">
					<button
						onClick={() => handleCalculationModeChange('amount-to-impact')}
						className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
							calculationMode === 'amount-to-impact' 
								? 'bg-white text-hope-blue shadow-sm' 
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Donation → Impact
					</button>
					<button
						onClick={() => handleCalculationModeChange('impact-to-amount')}
						className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
							calculationMode === 'impact-to-amount' 
								? 'bg-white text-hope-blue shadow-sm' 
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Impact → Amount
					</button>
				</div>
			</div>

			{/* Impact Areas Selection */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-3">
					{calculationMode === 'amount-to-impact' 
						? 'Focus your impact on specific areas (optional):' 
						: 'Select impact items and quantities:'}
				</label>
				<div className="space-y-2">
					{getImpactItems().map((item) => (
						<label
							key={item.title}
							className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
								selectedImpactAreas.includes(item.title)
									? 'border-hope-blue bg-blue-50'
									: 'border-gray-200 hover:border-hope-blue hover:bg-gray-50'
							}`}>
							{calculationMode === 'amount-to-impact' ? (
								<input
									type="checkbox"
									checked={selectedImpactAreas.includes(item.title)}
									onChange={() => toggleImpactArea(item.title)}
									className="mr-3 h-4 w-4 text-hope-blue rounded focus:ring-hope-blue"
								/>
							) : (
								<div className="flex items-center mr-3">
									<button
										onClick={() => updateImpactQuantity(item.title, (impactQuantities[item.title] || 0) - 1)}
										className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
									>
										-
									</button>
									<span className="w-8 text-center font-medium">
										{impactQuantities[item.title] || 0}
									</span>
									<button
										onClick={() => updateImpactQuantity(item.title, (impactQuantities[item.title] || 0) + 1)}
										className="w-8 h-8 flex items-center justify-center rounded-full bg-hope-blue hover:bg-blue-600 text-white"
									>
										+
									</button>
								</div>
							)}
							<div className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
								<item.icon className="h-4 w-4 text-white" />
							</div>
							<div className="flex-1">
								<div className="font-medium text-gray-900">{item.title}</div>
								<div className="text-sm text-gray-600">{item.description}</div>
							</div>
							<div className="text-sm font-bold text-hope-blue">
								{getCurrencySymbol(currency)}{item.cost}
							</div>
						</label>
					))}
				</div>
			</div>

			{/* Donation Amount Input */}
			{calculationMode === 'amount-to-impact' ? (
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount {formatFrequency()}</label>
					<div className="relative">
						<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
							{getCurrencySymbol(currency)}
						</span>
						<input
							type="number"
							value={donationAmount}
							onChange={(e) => updateDonationAmount(Number(e.target.value))}
							className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
							placeholder="Enter amount"
							min="1"
						/>
					</div>
				</div>
			) : (
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">Total Required Amount {formatFrequency()}</label>
					<div className="relative">
						<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
							{getCurrencySymbol(currency)}
						</span>
						<input
							type="number"
							value={calculateTotalFromImpact()}
							readOnly
							className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
						/>
					</div>
					<p className="mt-2 text-sm text-gray-600">
						This is the total amount needed to fund your selected impact items
					</p>
				</div>
			)}

			{/* Frequency Selection */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-3">Frequency</label>
				<div className="grid grid-cols-3 gap-2">
					{[
						{ value: 'one-time', label: 'One-time' },
						{ value: 'monthly', label: 'Monthly' },
						{ value: 'yearly', label: 'Yearly' },
					].map((freq) => (
						<button
							key={freq.value}
							onClick={() => setFrequency(freq.value as 'one-time' | 'monthly' | 'yearly')}
							className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
								frequency === freq.value ? 'bg-hope-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}>
							{freq.label}
						</button>
					))}
				</div>
			</div>

			{/* Impact Display */}
			<div className="space-y-4">
				<h4 className="font-semibold text-gray-900">
					{calculationMode === 'amount-to-impact' 
						? `Your ${frequency === 'one-time' ? 'donation' : frequency} impact:` 
						: 'Your selected impact:'}
				</h4>

				{getTotalImpact.length > 0 ? (
					<div className="space-y-3">
						{getTotalImpact.map((impact: any, index: number) => (
							<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div className="flex items-center">
									<div className={`${impact.color} w-8 h-8 rounded-full flex items-center justify-center mr-3`}>
										<impact.icon className="h-4 w-4 text-white" />
									</div>
									<div>
										<div className="font-medium text-gray-900">{impact.title}</div>
										<div className="text-sm text-gray-600">{impact.description}</div>
									</div>
								</div>
								<div className="text-right">
									<div className="font-bold text-hope-blue">x{impact.count}</div>
									<div className="text-sm text-gray-600">{formatCurrency(impact.total, currency)}</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-4 text-gray-500">
						<DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
						<p>
							{calculationMode === 'amount-to-impact' 
								? 'Increase your donation to see the impact!' 
								: 'Select impact items to calculate the total amount needed!'
							}
						</p>
					</div>
				)}

				{/* Total */}
				{((calculationMode === 'amount-to-impact' && donationAmount > 0) || 
				  (calculationMode === 'impact-to-amount' && calculateTotalFromImpact() > 0)) && (
					<div className="border-t pt-4 mt-4">
						<div className="flex justify-between items-center">
							<span className="font-semibold text-gray-900">
								{calculationMode === 'amount-to-impact' ? 'Total Impact Value:' : 'Total Required Amount:'}
							</span>
							<span className="text-2xl font-bold text-hope-green">
								{formatCurrency(getTotalImpact.reduce((sum: number, item: any) => sum + item.total, 0), currency)}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
