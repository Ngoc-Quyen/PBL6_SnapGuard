import React from 'react';

const FriendSuggestion = (props) => {
    return (
        <div className="friend">
            <div className="img-avt">
                <img src={props.avata} alt="" />
            </div>
            <div className="lable">
                <p className="nameUser">{props.name}</p>
            </div>
            <div className="btn">
                <button className="btn-accept">Thêm bạn bè</button>
                <button className="btn-cancel">Gỡ</button>
            </div>
        </div>
    );
};

export default FriendSuggestion;
