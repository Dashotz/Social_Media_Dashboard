/**
 * Client-side security utilities for static export
 * These work in the browser and don't require a server
 */

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    .trim();
}

/**
 * Validate URL to prevent malicious links
 */
export function validateURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHTML(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Validate platform name
 */
export function validatePlatform(platform: string): platform is 'facebook' | 'instagram' | 'twitter' {
  return ['facebook', 'instagram', 'twitter'].includes(platform);
}

/**
 * Rate limiting for client-side (using localStorage)
 */
export function clientRateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  if (typeof window === 'undefined') return true; // Server-side rendering check
  
  const now = Date.now();
  const storageKey = `rate_limit_${key}`;
  const stored = localStorage.getItem(storageKey);
  
  if (!stored) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, resetTime: now + windowMs }));
    return true;
  }
  
  const record = JSON.parse(stored);
  
  if (now > record.resetTime) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, resetTime: now + windowMs }));
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  localStorage.setItem(storageKey, JSON.stringify(record));
  return true;
}

/**
 * Validate and sanitize post content
 */
export function validatePostContent(content: string, maxLength: number = 2000): { valid: boolean; error?: string; sanitized?: string } {
  if (!content || !content.trim()) {
    return { valid: false, error: 'Content is required' };
  }
  
  if (content.length > maxLength) {
    return { valid: false, error: `Content must be ${maxLength} characters or less` };
  }
  
  const sanitized = sanitizeInput(content);
  
  if (!sanitized) {
    return { valid: false, error: 'Content cannot be empty after sanitization' };
  }
  
  return { valid: true, sanitized };
}

/**
 * Validate scheduled time
 */
export function validateScheduledTime(scheduledTime: string): { valid: boolean; error?: string } {
  if (!scheduledTime) {
    return { valid: false, error: 'Scheduled time is required' };
  }
  
  const scheduled = new Date(scheduledTime);
  const now = new Date();
  
  if (isNaN(scheduled.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }
  
  if (scheduled < now) {
    return { valid: false, error: 'Scheduled time must be in the future' };
  }
  
  // Don't allow scheduling too far in the future (e.g., more than 1 year)
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  
  if (scheduled > oneYearFromNow) {
    return { valid: false, error: 'Cannot schedule posts more than 1 year in advance' };
  }
  
  return { valid: true };
}

