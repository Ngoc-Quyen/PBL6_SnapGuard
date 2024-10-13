import React from 'react';
import Wrapper from '../../assets/wrappers/HomeGuess';
import welcome from '../../assets/images/welcome.png';

const HomeGuess = () => {
    return (
        <Wrapper>
            <container className="container">
                <div className="img-center">
                    <img src={welcome} alt="" />
                </div>
            </container>
        </Wrapper>
    );
};

export default HomeGuess;
