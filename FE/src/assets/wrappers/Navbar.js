import styled from 'styled-components';
const Wrapper = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, Courier, monospace;
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: auto;
        margin: 0 40px;
        margin-top: 30px;
    }
    .logo {
        height: 100px;
        width: 200px;
        margin-left: 20px;
    }
    .img-logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .group-right {
        margin-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        width: 300px;
    }
    .group-auth {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;
    }
    .group-auth li {
        margin-right: 20px; /* Space between the menu items */
    }
    .group-auth li:last-child {
        margin-right: 0; /* Space between the menu items */
        border: 1px solid gray;
        padding: 5px 10px;
        border-radius: 10px;
        padding-top: 2px;
    }
    .sign-up:hover {
        background-color: orange;
        cursor: pointer;
    }
    .group-auth .sign-up a:hover {
        color: white;
    }
    .group-auth li a {
        text-decoration: none;
        color: #000; /* Default color */
        font-weight: 500; /* Bold text */
        font-size: 20px;
    }
    .group-auth li a:hover {
        color: orange; /* Change color when hovering */
    }
    .language-button {
        background-color: orange;
        color: white;
        padding: 10px 15px;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
    }
`;

export default Wrapper;
