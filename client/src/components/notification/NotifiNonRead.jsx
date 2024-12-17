import React from 'react';
import NotificationNew from './NotificationNew';

const NotifiNonRead = ({ listNotifineNoRead, handleListNotifine }) => {
    return (
        <div>
            {listNotifineNoRead.length > 0 ? (
                listNotifineNoRead.map((notifi) => {
                    return <NotificationNew key={notifi.id} notifi={notifi} handleListNotifine={handleListNotifine} />;
                })
            ) : (
                <div className="error-message">Chưa có thông báo nào</div>
            )}
        </div>
    );
};

export default NotifiNonRead;
