import { useState, useEffect, useCallback } from 'react';
import './body.css';

function Body() {
    const [card, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const generateProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('https://api.github.com/users');
            
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch: ${response.status} ${response.statusText}`
                );
            }
            
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        generateProfile();
    }, [generateProfile]);

    const handleSearch = () => {
        const user = card.find((item) => item.login.toLowerCase() === search.toLowerCase());
        if (user) {
            alert('User profile exists');
        } else {
            alert('User profile does not exist');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading profiles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
                <button 
                    onClick={generateProfile}
                    className="retry-button"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="profile-grid">
            <div className="search-container">
                <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search by username" 
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            {card.map((item) => (
                <div key={item.id} className="profile-card">
                    <img 
                        src={item.avatar_url} 
                        alt={`${item.login}'s avatar`} 
                        className="profile-avatar"
                        loading="lazy"
                    />
                    <h2 className="profile-name">{item.login}</h2>
                    <a 
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link"
                    >
                        View Profile
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Body;

