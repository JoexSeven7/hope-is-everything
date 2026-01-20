import { Heart } from 'lucide-react';

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	color?: 'blue' | 'green' | 'white';
	text?: string;
	fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = 'md',
	color = 'blue',
	text,
	fullScreen = false,
}) => {
	const sizeClasses = {
		sm: 'w-6 h-6',
		md: 'w-8 h-8',
		lg: 'w-12 h-12',
	};

	const colorClasses = {
		blue: 'text-hope-blue',
		green: 'text-hope-green',
		white: 'text-white',
	};

	const spinner = (
		<div className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-8'}`}>
			<div className="relative">
				{/* Outer ring */}
				<div
					className={`${sizeClasses[size]} border-4 border-gray-200 border-t-current rounded-full animate-spin ${colorClasses[color]}`}></div>

				{/* Inner heart icon for nonprofit theme */}
				<div className="absolute inset-0 flex items-center justify-center">
					<Heart
						className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} ${
							colorClasses[color]
						} animate-pulse`}
					/>
				</div>
			</div>

			{text && <p className={`mt-4 text-sm font-medium ${colorClasses[color]}`}>{text}</p>}
		</div>
	);

	if (fullScreen) {
		return <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">{spinner}</div>;
	}

	return spinner;
};
