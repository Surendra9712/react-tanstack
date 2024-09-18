import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isNullOrUndefinedOrEmpty(value: any) {
    return value === null || value === undefined || value === '';
}

export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}

export function titleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

export function camelCaseToTitleCase(str: string) {
    // Regular expression to match a sequence of uppercase letters followed by a lowercase letter
    const regex = /([A-Z]+)([A-Z][a-z])|([a-z])([A-Z])/g;

    // Replace matches with a space between the sequences
    const result = str.replace(regex, (match, p1, p2, p3, p4) => {
        if (p1 && p2) {
            // Handle case where there's a sequence of uppercase letters followed by another uppercase and lowercase letter
            return `${p1} ${p2}`;
        } else if (p3 && p4) {
            // Handle regular camelCase
            return `${p3} ${p4}`;
        }
        return match;
    });

    // Capitalize each word in the result
    return result
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}