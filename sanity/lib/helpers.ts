/**
 * Sanity Helper Functions
 * Utility functions for working with Sanity CMS
 */

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Validate required fields
 */
export function validateRequired(value: any, context: any) {
  if (!value) {
    return 'This field is required';
  }
  return true;
}

/**
 * Validate URL format
 */
export function validateURL(value: string) {
  if (!value) return true; // Allow empty

  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlPattern.test(value)) {
    return 'Please enter a valid URL';
  }
  return true;
}

/**
 * Validate email format
 */
export function validateEmail(value: string) {
  if (!value) return true; // Allow empty

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return 'Please enter a valid email address';
  }
  return true;
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Estimate reading time (assuming 200 words/minute)
 */
export function estimateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.ceil(words / 200);
}
