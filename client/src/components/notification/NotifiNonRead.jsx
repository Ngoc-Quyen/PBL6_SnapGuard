import React, { useEffect, useState } from 'react';
import ItemNotification from './ItemNotification';
import { listNotification } from '../../utils/dataTest';
import axios from 'axios';

const NotifiNonRead = ({ linkAPI }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const [listNotifine, setListNotifine] = useState([]);
    const handelListNotifine = async () => {
        try {
            const result = await axios.patch(`${API_ENDPOINT}/notification/${linkAPI}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setListNotifine(result.data);
            console.log('🚀 ~ listNotifine ~ result.data:', result.data);
        } catch (error) {
            console.log('🚀 ~ listNotifine ~ error:', error);
        }
    };

    useEffect(() => {
        handelListNotifine();
    }, [linkAPI]);
    return (
        <div>
            <div className="item">
                {listNotifine.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotifine.map((notifi) => {
                        return notifi.type === 'previous' ? <ItemNotification key={notifi.id} notifi={notifi} /> : null;
                    })
                )}
            </div>
        </div>
    );
};

export default NotifiNonRead;
