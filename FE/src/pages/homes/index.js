import React from 'react';
import HomeGuess from './HomeGuess.js';
import NavBarGuess from '../../components/NavBarGuess.js';

const index = () => {
    return (
        <div>
            <NavBarGuess></NavBarGuess>
            <HomeGuess></HomeGuess>
        </div>
    );
};

export default index;
