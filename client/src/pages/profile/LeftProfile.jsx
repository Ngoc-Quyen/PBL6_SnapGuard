import React from 'react';
import './profile.scss';
import { formatDateToDDMMYYYY } from '../../utils/calculateTimeDifference ';

const LeftProfile = ({ userProfile }) => {
    const date_birth = formatDateToDDMMYYYY(userProfile.date_of_birth);
    return (
        <div className="left-profile">
            <div className="title">
                <h2>Giới thiệu</h2>
            </div>
            <div className="content-bio">
                <span>{userProfile.bio}</span>
            </div>
            <div className="content-other">
                <ul className="list-other">
                    <li className="item-other">
                        <i class="fas fa-map-marker-alt"></i>
                        <p className="item-content">
                            Sống tại <span>{userProfile.address}</span>
                        </p>
                    </li>
                    <li className="item-other">
                        <i class="fas fa-birthday-cake"></i>
                        <p className="item-content">
                            <span>{date_birth}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LeftProfile;
