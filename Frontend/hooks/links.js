import { useEffect, useState } from 'react';

const useSocialMediaLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('http://localhost:PORT/socialmedia'); // Replace PORT with your actual port
                if (!response.ok) {
                    throw new Error('Failed to fetch social media links');
                }
                const data = await response.json();
                setLinks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    return { links, loading, error };
};
export default useSocialMediaLinks