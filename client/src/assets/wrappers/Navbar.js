import styled from 'styled-components';
const Wrapper = styled.div`
    height: var(--nav-height);
    display: flex;
    background: var(--background-secondary-color);
    .nav-center {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 10px 40px;
    }
    .logo {
        height: 65px;
        width: 200px;
        /* margin-left: 40px; */
        padding: 0;
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
    .search {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-input {
        padding: 5px 10px;
        border-radius: 5px 0px 0px 5px;
        width: 250px;
        font-size: medium;
    }
    .search-icon {
        padding: 5px 10px;
        border-radius: 0px 5px 5px 0px;
    }
    .search-icon:hover {
        cursor: pointer;
    }
    .profile {
        width: 40px;
        height: 40px;
    }
    .avata-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid black;
    }
    .group-right-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }
`;

export default Wrapper;
