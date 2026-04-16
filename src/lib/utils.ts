import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: string | { url: string },
    url2: string | { url: string },
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: string | { url: string }): string {
    return typeof url === 'string' ? url : url.url;
}
