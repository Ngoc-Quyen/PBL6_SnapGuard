import React from 'react';
import Wrapper from '../../assets/wrappers/Home';
import welcome from '../../assets/images/welcome.png';
const HomeGuess = () => {
    return (
        <Wrapper>
            <div className="container">
                <div className="img-center">
                    <img src={welcome} alt="img-welcome" />
                </div>
            </div>
        </Wrapper>
    );
};

export default HomeGuess;
