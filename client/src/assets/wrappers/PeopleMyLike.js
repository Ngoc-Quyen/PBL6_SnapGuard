import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 10px;
    border-radius: 10px;
    color: #0c322f;
    background-color: white;
    width: 20%;
    padding: 20px;
    height: 400px;
    .title {
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 10px;
        border-bottom: 1px solid #2db6aa;
    }
    .item-account {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
    }
    .account-avata {
        width: 50px;
        height: 50px;
    }
    .avata-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .btn-follow {
        padding: 5px 10px;
        margin: 0;
        justify-content: center;
        border-radius: 20px;
        background-color: #ff9f1c;
        cursor: pointer;
        width: auto;
    }
    .account {
        display: flex;
        gap: 20px;
    }
    .account-name {
        text-decoration: none;
        font-weight: 600;
        font-size: 17px;
    }
    .account-sub {
        font-size: 12px;
        color: #2db6aa;
        font-weight: 600;
    }
    .view-more {
        text-align: center;
        margin-top: 30px;
    }
    .view-more a {
        text-decoration: none;
        color: #2db6aa;
        font-size: 15px;
        font-weight: 500;
    }
`;

export default Wrapper;
