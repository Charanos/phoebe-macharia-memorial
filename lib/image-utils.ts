/**
 * Image optimization utilities for the memorial website
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Generate optimized image URL with parameters
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!originalUrl) return '';
  
  // Skip optimization for non-cloudinary URLs
  if (!originalUrl.includes('cloudinary.com')) {
    return originalUrl;
  }

  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'cover'
  } = options;

  // Parse Cloudinary URL
  const urlParts = originalUrl.split('/');
  const uploadIndex = urlParts.findIndex(part => part === 'upload');
  
  if (uploadIndex === -1) return originalUrl;

  // Build optimization parameters
  const transformations = [];
  
  if (width || height) {
    const size = [width || 'auto', height || 'auto'].join(',');
    transformations.push(`w_${width || 'auto'},h_${height || 'auto'},c_${fit}`);
  }
  
  transformations.push(`q_${quality},f_${format}`);
  
  // Insert transformations into URL
  const newUrlParts = [...urlParts];
  newUrlParts.splice(uploadIndex + 1, 0, transformations.join('/'));
  
  return newUrlParts.join('/');
}

/**
 * Get thumbnail URL for gallery grid
 */
export function getThumbnailUrl(originalUrl: string): string {
  return getOptimizedImageUrl(originalUrl, {
    width: 300,
    height: 200,
    quality: 70,
    format: 'webp',
    fit: 'cover'
  });
}

/**
 * Get medium size URL for detail view
 */
export function getMediumUrl(originalUrl: string): string {
  return getOptimizedImageUrl(originalUrl, {
    width: 800,
    height: 600,
    quality: 85,
    format: 'webp',
    fit: 'contain'
  });
}

/**
 * Get large size URL for full screen view
 */
export function getLargeUrl(originalUrl: string): string {
  return getOptimizedImageUrl(originalUrl, {
    width: 1200,
    height: 900,
    quality: 90,
    format: 'webp',
    fit: 'contain'
  });
}

/**
 * Get responsive image srcset
 */
export function getResponsiveImageSet(originalUrl: string): string {
  const sizes = [
    { width: 300, height: 200 },
    { width: 600, height: 400 },
    { width: 900, height: 600 },
    { width: 1200, height: 800 }
  ];

  return sizes
    .map(size => `${getOptimizedImageUrl(originalUrl, size)} ${size.width}w`)
    .join(', ');
}

/**
 * Check if image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Get placeholder image URL
 */
export function getPlaceholderImage(width = 300, height = 200): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='Arial' font-size='14'%3EImage%3C/text%3E%3C/svg%3E`;
}
