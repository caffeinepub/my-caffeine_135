/**
 * Admin authentication configuration
 * 
 * To change the admin password for production:
 * 1. Update the ADMIN_PASSWORD constant below
 * 2. Or set the VITE_ADMIN_PASSWORD environment variable
 * 
 * Note: This is a simple password protection mechanism.
 * For production applications with sensitive data, consider using
 * Internet Identity or other secure authentication methods.
 */

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
