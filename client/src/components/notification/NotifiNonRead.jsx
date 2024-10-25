import React from 'react';
import ItemNotification from './ItemNotification';
import { listNotification } from '../../utils/dataTest';
import { Link } from 'react-router-dom';

const NotifiNonRead = () => {
    return (
        <div>
            <div className="item">
                {listNotification.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotification.map((notifi) => {
                        return notifi.type === 'previous' ? <ItemNotification key={notifi.id} notifi={notifi} /> : null;
                    })
                )}
            </div>
        </div>
    );
};

export default NotifiNonRead;
