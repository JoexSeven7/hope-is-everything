import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ValidationRule {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	custom?: (value: string) => string | null;
}

interface EnhancedFormFieldProps {
	label: string;
	name: string;
	type?: 'text' | 'email' | 'tel' | 'textarea';
	value: string;
	onChange: (value: string) => void;
	validation?: ValidationRule;
	placeholder?: string;
	required?: boolean;
	className?: string;
}

export const EnhancedFormField: React.FC<EnhancedFormFieldProps> = ({
	label,
	name,
	type = 'text',
	value,
	onChange,
	validation,
	placeholder,
	required = false,
	className = '',
}) => {
	const [touched, setTouched] = useState(false);

	const validateField = (fieldValue: string) => {
		if (!validation) return { isValid: true, message: '' };

		// Required validation
		if (validation.required && !fieldValue.trim()) {
			return { isValid: false, message: `${label} is required` };
		}

		// Skip other validations if field is empty and not required
		if (!fieldValue.trim() && !validation.required) {
			return { isValid: true, message: '' };
		}

		// Min length validation
		if (validation.minLength && fieldValue.length < validation.minLength) {
			return {
				isValid: false,
				message: `${label} must be at least ${validation.minLength} characters`,
			};
		}

		// Max length validation
		if (validation.maxLength && fieldValue.length > validation.maxLength) {
			return {
				isValid: false,
				message: `${label} must be no more than ${validation.maxLength} characters`,
			};
		}

		// Pattern validation
		if (validation.pattern && !validation.pattern.test(fieldValue)) {
			return { isValid: false, message: `${label} format is invalid` };
		}

		// Custom validation
		if (validation.custom) {
			const customMessage = validation.custom(fieldValue);
			if (customMessage) {
				return { isValid: false, message: customMessage };
			}
		}

		return { isValid: true, message: '' };
	};

	const handleBlur = () => {
		setTouched(true);
	};

	const validationState = touched ? validateField(value) : { isValid: true, message: '' };

	const getInputClasses = () => {
		const baseClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${className}`;

		if (!touched) {
			return `${baseClasses} border-gray-300 focus:ring-hope-blue`;
		}

		if (validationState.isValid) {
			return `${baseClasses} border-green-300 focus:ring-green-500 bg-green-50`;
		} else {
			return `${baseClasses} border-red-300 focus:ring-red-500 bg-red-50`;
		}
	};

	const renderInput = () => {
		const commonProps = {
			id: name,
			name,
			value,
			onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
			onBlur: handleBlur,
			placeholder,
			className: getInputClasses(),
		};

		if (type === 'textarea') {
			return <textarea {...commonProps} rows={4} />;
		}

		return <input {...commonProps} type={type} />;
	};

	return (
		<div className="space-y-2">
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label} {required && <span className="text-red-500">*</span>}
			</label>

			{renderInput()}

			{/* Validation feedback */}
			{touched && (
				<div className={`flex items-center text-sm ${validationState.isValid ? 'text-green-600' : 'text-red-600'}`}>
					{validationState.isValid ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
					{validationState.message}
				</div>
			)}

			{/* Helper text for email field */}
			{type === 'email' && value && !validationState.isValid && (
				<div className="flex items-center text-sm text-amber-600">
					<AlertCircle className="h-4 w-4 mr-2" />
					Please enter a valid email address
				</div>
			)}
		</div>
	);
};
