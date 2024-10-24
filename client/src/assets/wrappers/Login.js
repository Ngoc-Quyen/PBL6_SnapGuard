import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    input[type='email'],
    input[type='password'] {
        width: 100%;
        padding: 10px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 10px;
    }

    .title {
        text-align: left;
        padding: 10px 30px;
    }
    .form-login {
        padding: 10px 30px;
        background-color: #dff7f5;
        width: 500px;
        border-radius: 10px;
    }
    .form-submit {
    }
    .item-input {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .item-label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 11px;
        padding: 0px 5px;
    }
    .item-label i {
        padding-top: 2px;
    }
    button {
        background-color: #2db6aa;
        color: white;
        padding: 10px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        border-radius: 10px;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btn-cancel {
        background-color: red;
        width: 20%;
        padding: 10px;
        color: white;
        text-decoration: none;
        font-weight: 500;
        border-radius: 5px;
        text-align: center;
    }
    .forgot-password a {
        margin-left: 8px;
        color: blue;
    }
`;

export default Wrapper;
