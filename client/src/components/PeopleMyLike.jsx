import React from 'react';
import Wrapper from '../assets/wrappers/PeopleMyLike';
import { Link } from 'react-router-dom';
import avata from '../assets/images/HIEUTHUHAI.jpg';

const PeopleMyLike = () => {
    return (
        <Wrapper>
            <div className="PeopleMyLike">
                <div className="title">People you may like</div>
                <div className="item-account">
                    <div className="account">
                        <div className="account-avata">
                            <img src={avata} alt="" className="avata-img" />
                        </div>
                        <div className="account-info">
                            <Link className="account-name">Muoi</Link>
                            <p className="account-sub">1000 folowers</p>
                        </div>
                    </div>
                    <button className="btn-follow">Follow</button>
                </div>
                <div className="item-account">
                    <div className="account">
                        <div className="account-avata">
                            <img src={avata} alt="" className="avata-img" />
                        </div>
                        <div className="account-info">
                            <Link className="account-name">Muoi</Link>
                            <p className="account-sub">1000 folowers</p>
                        </div>
                    </div>
                    <button className="btn-follow">Follow</button>
                </div>
                <div className="item-account">
                    <div className="account">
                        <div className="account-avata">
                            <img src={avata} alt="" className="avata-img" />
                        </div>
                        <div className="account-info">
                            <Link className="account-name">Muoi</Link>
                            <p className="account-sub">1000 folowers</p>
                        </div>
                    </div>
                    <button className="btn-follow">Follow</button>
                </div>
                <div className="item-account">
                    <div className="account">
                        <div className="account-avata">
                            <img src={avata} alt="" className="avata-img" />
                        </div>
                        <div className="account-info">
                            <Link className="account-name">Muoi</Link>
                            <p className="account-sub">1000 folowers</p>
                        </div>
                    </div>
                    <button className="btn-follow">Follow</button>
                </div>
                <div className="view-more">
                    <Link>View more</Link>
                </div>
            </div>
        </Wrapper>
    );
};

export default PeopleMyLike;
