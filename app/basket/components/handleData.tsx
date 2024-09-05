import { parseCookies } from 'nookies';

export default function getCookieIds(): string[] | null {
    const cookies = parseCookies();
    const cookieValue = cookies['productBasket'];

    if (cookieValue) {
        // Parse the cookie value and extract the IDs
        const ids = cookieValue.split(',');

        // Return the array of IDs
        return ids;
    }

    // Return null if the cookie is not found
    return null;
}

export function getCookieIdsCustom(): Record<string, string> | null {
    const cookies = parseCookies();
    const cookieValue = cookies['customProduct'];

    if (cookieValue) {
        // Parse the cookie value as JSON and return the object
        try {
            const details = JSON.parse(cookieValue);
            return details;
        } catch (error) {
            console.error('Failed to parse cookie value:', error);
            return null;
        }
    }

    // Return null if the cookie is not found
    return null;
}