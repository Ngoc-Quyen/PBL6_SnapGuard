import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchItemHome from './SearchItemHome';
import './searchHome.scss';


const SearchHome = ({ query }) => {
    const [searchResults, setSearchResults] = useState([]);
    const storedToken = localStorage.getItem('token');
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://pbl6-snapguard.onrender.com';

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.post(`${API_ENDPOINT}/user/search?query=${query}`, null, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [query, API_ENDPOINT]);

    return (
        <div className="search-home">
            {searchResults.length === 0 ? (
                <div className="no-results">Không tìm thấy kết quả</div>
            ) : (
                searchResults.map((user) => (
                    <SearchItemHome key={user.id} user={user} />
                ))
            )}
        </div>
    );
};

export default SearchHome;