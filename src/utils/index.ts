/**
 * Utilities Index
 * Central export point for all utility functions and libraries
 */

// HTTP Client
export { default as axios } from './axios';

// Note: state-capital.ts runs on DOMContentLoaded automatically
// No need to import separately - just include in your page

// Note: lottie-player.ts is a large library, import it separately if needed
// import 'lottie-player' when you need it in components

// Re-export cn utility from lib (if needed here)
export { cn } from '../lib/utils';
