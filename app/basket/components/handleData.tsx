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
