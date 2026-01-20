import { useState, useMemo } from 'react';
import { Calculator, BookOpen, Users, Heart, Home, DollarSign } from 'lucide-react';

interface ImpactItem {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	cost: number;
	color: string;
}

export const DonationCalculator: React.FC = () => {
	const [donationAmount, setDonationAmount] = useState(50);
	const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');

	const impactItems: ImpactItem[] = [
		{
			icon: BookOpen,
			title: 'Educational Materials',
			description: 'School supplies for students',
			cost: 15,
			color: 'bg-blue-500',
		},
		{
			icon: Users,
			title: 'Tutoring Session',
			description: 'One week of after-school support',
			cost: 25,
			color: 'bg-green-500',
		},
		{
			icon: Home,
			title: 'Vocational Training',
			description: 'Skills development program',
			cost: 75,
			color: 'bg-purple-500',
		},
		{
			icon: Heart,
			title: 'Healthcare Support',
			description: 'Medical care for families',
			cost: 100,
			color: 'bg-red-500',
		},
	];

	const calculateImpact = (amount: number) => {
		const impacts = [];
		let remaining = amount;

		for (const item of impactItems) {
			const count = Math.floor(remaining / item.cost);
			if (count > 0) {
				impacts.push({
					...item,
					count,
					total: count * item.cost,
				});
				remaining -= count * item.cost;
			}
		}

		return impacts;
	};

	const getTotalImpact = useMemo(() => {
		const baseAmount =
			frequency === 'monthly' ? donationAmount * 12 : frequency === 'yearly' ? donationAmount : donationAmount;
		return calculateImpact(baseAmount);
	}, [donationAmount, frequency]);

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

			{/* Donation Amount Input */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount {formatFrequency()}</label>
				<div className="relative">
					<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
					<input
						type="number"
						value={donationAmount}
						onChange={(e) => setDonationAmount(Number(e.target.value))}
						className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hope-blue focus:border-transparent"
						placeholder="Enter amount"
						min="1"
					/>
				</div>
			</div>

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
					Your {frequency === 'one-time' ? 'donation' : frequency} impact:
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
									<div className="text-sm text-gray-600">${impact.total}</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-4 text-gray-500">
						<DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
						<p>Increase your donation to see the impact!</p>
					</div>
				)}

				{/* Total */}
				{donationAmount > 0 && (
					<div className="border-t pt-4 mt-4">
						<div className="flex justify-between items-center">
							<span className="font-semibold text-gray-900">Total Impact Value:</span>
							<span className="text-2xl font-bold text-hope-green">
								${getTotalImpact.reduce((sum: number, item: any) => sum + item.total, 0)}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
