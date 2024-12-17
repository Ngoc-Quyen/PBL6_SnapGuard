import React from 'react';
import { Link } from 'react-router-dom';
import './searchHome.scss';

const SearchItemHome = ({ user }) => {
    return (
        <Link to={`/${user.id}`} className="search-item-home">
            <div className="item-avatar">
                <img
                    src={user.avatar_url || 'https://i.imgur.com/q3mEf9u.jpeg'}
                    alt={`${user.full_name || 'Unknown User'} Avatar`}
                />
            </div>
            <div className="item-info">
                <h4 className="item-name">{user.full_name}</h4>
            </div>
        </Link>
    );
};

export default SearchItemHome;
