import { useState } from 'react';
import type { ReactNode } from 'react';

interface FlipCardProps {
	front: ReactNode;
	back: ReactNode;
	className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ front, back, className = '' }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<div
			className={`relative w-full h-64 perspective-1000 ${className}`}
			onMouseEnter={() => setIsFlipped(true)}
			onMouseLeave={() => setIsFlipped(false)}>
			<div
				className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
					isFlipped ? 'rotate-y-180' : ''
				}`}>
				{/* Front */}
				<div className="absolute inset-0 w-full h-full backface-hidden">{front}</div>

				{/* Back */}
				<div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">{back}</div>
			</div>
		</div>
	);
};
