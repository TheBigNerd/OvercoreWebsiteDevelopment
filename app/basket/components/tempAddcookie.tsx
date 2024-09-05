"use client"
import { useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies';

const SetOrUpdateCookie: React.FC = () => {
    useEffect(() => {
        const cookies = parseCookies();
        const id = cookies.id || 'null';


        setCookie(null, 'id', id, {
            maxAge: 30 * 24 * 60 * 60,
        });
    }, []);

    return <div>Cookie has been set or updated.</div>;
};

export default SetOrUpdateCookie;