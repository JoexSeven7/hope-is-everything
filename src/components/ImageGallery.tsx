import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
	src: string;
	alt: string;
	title?: string;
	description?: string;
}

interface ImageGalleryProps {
	images: GalleryImage[];
	className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className = '' }) => {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

	const openModal = (index: number) => {
		setSelectedImage(index);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	// Handle body overflow when modal is open
	useEffect(() => {
		if (selectedImage !== null) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [selectedImage]);

	const nextImage = () => {
		if (selectedImage !== null) {
			setSelectedImage((selectedImage + 1) % images.length);
		}
	};

	const prevImage = () => {
		if (selectedImage !== null) {
			setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
		}
	};

	const handleImageLoad = (index: number) => {
		setLoadedImages((prev) => new Set([...prev, index]));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') closeModal();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
	};

	return (
		<>
			<div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
				{images.map((image, index) => (
					<div
						key={index}
						className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
						onClick={() => openModal(index)}>
						{/* Loading placeholder */}
						{!loadedImages.has(index) && (
							<div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
								<div className="w-8 h-8 border-4 border-hope-blue border-t-transparent rounded-full animate-spin"></div>
							</div>
						)}

						{/* Image */}
						<img
							src={image.src}
							alt={image.alt}
							className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
								loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
							}`}
							onLoad={() => handleImageLoad(index)}
							loading="lazy"
						/>

						{/* Overlay */}
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
							<div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
								{image.title && <h3 className="font-semibold text-sm">{image.title}</h3>}
								{image.description && <p className="text-xs opacity-90">{image.description}</p>}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			{selectedImage !== null && (
				<div
					className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
					onClick={closeModal}
					onKeyDown={handleKeyDown}
					tabIndex={0}>
					{/* Close button */}
					<button
						onClick={closeModal}
						className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10">
						<X className="h-8 w-8" />
					</button>

					{/* Navigation buttons */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							prevImage();
						}}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10">
						<ChevronLeft className="h-12 w-12" />
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							nextImage();
						}}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10">
						<ChevronRight className="h-12 w-12" />
					</button>

					{/* Image */}
					<div className="max-w-4xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
						<img
							src={images[selectedImage].src}
							alt={images[selectedImage].alt}
							className="max-w-full max-h-full object-contain"
						/>
					</div>

					{/* Image info */}
					<div className="absolute bottom-4 left-4 text-white">
						<h3 className="text-xl font-semibold">{images[selectedImage].title}</h3>
						{images[selectedImage].description && <p className="text-gray-300">{images[selectedImage].description}</p>}
						<p className="text-sm text-gray-400 mt-2">
							{selectedImage + 1} of {images.length}
						</p>
					</div>
				</div>
			)}
		</>
	);
};
