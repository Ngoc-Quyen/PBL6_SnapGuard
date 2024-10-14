import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 20%;
    padding: 30px 10px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 10px;
        font-size: 20px;
        text-decoration: none;
        font-weight: 500;
        color: #0c322f;
        padding: 10px 15px;
    }
    .item:hover {
        background-color: #f2f2f2;
        border-radius: 10px;
    }
    ul {
        padding: 0px 20px;
    }
    /* .item-icon {
        color: #ff9f1c;
    }
    .item-title {
        color: #0c322f;
        text-decoration: none;
    } */
    .footer {
        color: #0c322f;
        text-align: center;
    }
    .footer-local {
        font-size: 12px;
        color: #036f66;
    }
`;

export default Wrapper;
