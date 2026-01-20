import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineItem {
	year: string;
	title: string;
	description: string;
	details: string;
	icon?: string;
}

interface InteractiveTimelineProps {
	items: TimelineItem[];
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ items }) => {
	const [expandedItem, setExpandedItem] = useState<string | null>(null);

	const toggleExpanded = (year: string) => {
		setExpandedItem(expandedItem === year ? null : year);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="space-y-8">
				{items.map((item, index) => (
					<div key={item.year} className="relative">
						{/* Timeline line */}
						{index < items.length - 1 && <div className="absolute left-8 top-16 w-0.5 h-20 bg-hope-blue/30"></div>}

						{/* Timeline item */}
						<div className="flex items-start space-x-6">
							{/* Icon */}
							<div className="flex-shrink-0">
								<div className="w-16 h-16 bg-hope-blue rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
									{item.year}
								</div>
							</div>

							{/* Content */}
							<div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
								<div className="p-6 cursor-pointer" onClick={() => toggleExpanded(item.year)}>
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
											<p className="text-gray-600">{item.description}</p>
										</div>
										<div className="ml-4">
											{expandedItem === item.year ? (
												<ChevronUp className="h-5 w-5 text-hope-blue" />
											) : (
												<ChevronDown className="h-5 w-5 text-hope-blue" />
											)}
										</div>
									</div>
								</div>

								{/* Expanded content */}
								{expandedItem === item.year && (
									<div className="px-6 pb-6 border-t border-gray-100">
										<div className="pt-4 animate-fadeInUp">
											<p className="text-gray-700 leading-relaxed">{item.details}</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
