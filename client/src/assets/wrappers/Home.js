import styled from 'styled-components';

const Wrapper = styled.div`
    /* background-color: #dff7f5; */
    margin: 0 60px;
    border-radius: 10px;
    height: 100%;
    padding-bottom: 30px;
    width: 100%;

    .img-center {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: start;
    }
    .img-center img:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .img-center img {
        object-fit: cover;
    }
`;

export default Wrapper;
