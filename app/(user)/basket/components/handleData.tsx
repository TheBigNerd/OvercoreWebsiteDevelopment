"use client"

import { destroyCookie, parseCookies, setCookie} from 'nookies';

export function getCookieIds(): string[] | null {
    const cookies = parseCookies();
    console.log('All cookies:', cookies); // Log all cookies
    const cookieValue = cookies['productBasket'];
    console.log('cookieValue:', cookieValue); // Log the specific cookie value
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

export function removeCookieId(id: string): void {
    const cookies = parseCookies();
    const cookieValue = cookies['productBasket'];

    if (cookieValue) {
        // Parse the cookie value and extract the IDs
        let ids = cookieValue.split(',');

        // Remove the specified ID
        ids = ids.filter(cookieId => cookieId !== id);

        // Update the cookie with the new value
        setCookie(null, 'productBasket', ids.join(','), {
            path: '/',
        });
    }
}

export function removeCookieCustom(id: string): void {
    const cookies = parseCookies();
    const cookieValue = cookies['customProduct'];

    if (cookieValue) {
        destroyCookie(null, 'customProduct');
    }
}

export function updateCookie(newValue: string): void {
    const cookies = parseCookies();
    const cookieValue = cookies['productBasket'];

    let updatedValue;
    if (cookieValue) {
        updatedValue = `${cookieValue},${newValue}`;
    } else {
        updatedValue = newValue;
    }

    setCookie(null, 'productBasket', updatedValue, {
        path: '/',
    });
}

