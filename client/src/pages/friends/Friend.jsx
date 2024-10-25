import React from 'react';

const Friend = (props) => {
    return (
        <div className="friend">
            <div className="img-avt">
                <img src={props.avata} alt="" />
            </div>
            <div className="lable">
                <p className="nameUser">{props.name}</p>
            </div>
            <div className="btn">
                <button className="btn-accept">Xác nhận</button>
                <button className="btn-cancel">Xóa</button>
            </div>
        </div>
    );
};

export default Friend;
