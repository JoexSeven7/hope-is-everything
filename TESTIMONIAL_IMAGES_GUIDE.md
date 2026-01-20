# How to Add Testimonial Images - Complete Guide

## Overview

Your testimonials are now using actual images instead of emoji placeholders! Here are the different approaches you can use:

## Option 1: Using Remote Images (Currently Implemented)

The current implementation uses Unsplash images via direct URLs:

```typescript
image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face';
```

**Pros:**

- No need to manage image files
- Professional stock photos
- Fast loading with CDN
- Easy to swap images

**Cons:**

- Requires internet connection
- Limited customization
- May have licensing restrictions

## Option 2: Using Local Images

### Step 1: Add Images to Assets

Place your testimonial images in `src/assets/` directory:

```
src/assets/
├── testimonial-sarah.jpg
├── testimonial-james.jpg
├── testimonial-maria.jpg
├── testimonial-ahmed.jpg
├── testimonial-grace.jpg
├── testimonial-carlos.jpg
├── testimonial-michael.jpg
├── testimonial-lisa.jpg
└── testimonial-david.jpg
```

### Step 2: Import and Use Images

```typescript
import sarahImg from '../assets/testimonial-sarah.jpg';
import jamesImg from '../assets/testimonial-james.jpg';

const testimonials = [
	{
		id: 1,
		name: 'Sarah Mukamana',
		image: sarahImg, // Use imported image
		// ... other properties
	},
	// ... more testimonials
];
```

### Step 3: Update the testimonial-images.ts file

```typescript
export const testimonialImages = {
	sarah: '/src/assets/testimonial-sarah.jpg',
	james: '/src/assets/testimonial-james.jpg',
	// ... etc
};
```

## Option 3: Using Public Directory

### Step 1: Add Images to Public Assets

Place images in `public/assets/`:

```
public/assets/
├── testimonial-sarah.jpg
├── testimonial-james.jpg
└── ... etc
```

### Step 2: Reference with Absolute Paths

```typescript
image: '/assets/testimonial-sarah.jpg';
```

## Option 4: Hybrid Approach (Recommended)

Use the existing Unsplash URLs as fallbacks with local images:

```typescript
const TestimonialImage = ({ src, alt, fallbackSrc }) => {
	const [imageSrc, setImageSrc] = useState(src);

	const handleError = () => {
		setImageSrc(fallbackSrc);
	};

	return (
		<img
			src={imageSrc}
			alt={alt}
			className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
			onError={handleError}
			onLoad={() => setImageSrc(src)}
		/>
	);
};

// Usage
<TestimonialImage
	src="/assets/testimonial-sarah.jpg"
	alt="Sarah Mukamana"
	fallbackSrc="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
/>;
```

## Image Requirements

### Recommended Specifications:

- **Format**: JPG or PNG
- **Size**: 150x150 pixels minimum
- **Aspect Ratio**: 1:1 (square) or 4:3
- **File Size**: Under 500KB for faster loading
- **Quality**: High resolution for retina displays

### CSS Classes Used:

- Small images: `w-16 h-16` (64x64px)
- Large featured images: `w-32 h-32` (128x128px)
- Rounded: `rounded-full`
- Object fit: `object-cover`
- Borders: `border-2 border-gray-200`

## Current Implementation Details

The updated TestimonialsPage includes:

1. **Error Handling**: Each image has an `onError` handler that falls back to a placeholder
2. **Responsive Design**: Images scale properly on different screen sizes
3. **Accessibility**: Proper `alt` attributes for screen readers
4. **Styling**: Consistent rounded images with borders and shadows

## Adding New Testimonials

When adding new testimonials, use this structure:

```typescript
{
  id: 7,
  name: 'New Person Name',
  role: 'Their Role',
  location: 'Country',
  image: 'https://images.unsplash.com/photo-...', // or local path
  quote: "Their testimonial quote...",
  program: 'Program Name',
  year: '2024',
  impact: 'What they achieved',
  featured: false, // true for featured stories
}
```

## Performance Tips

1. **Optimize Images**: Use tools like TinyPNG to compress images
2. **Use WebP Format**: For better compression (with fallbacks)
3. **Lazy Loading**: Consider implementing lazy loading for better performance
4. **CDN**: Consider using a CDN for faster image delivery

## Next Steps

1. Choose your preferred approach (local, remote, or hybrid)
2. Add your testimonial images to the appropriate directory
3. Update the image paths in the testimonials data
4. Test the implementation to ensure all images load correctly
5. Consider implementing lazy loading for better performance

Your testimonials now have a much more professional and engaging appearance with actual photos instead of emoji placeholders!
