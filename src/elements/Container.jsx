import styled from "styled-components"

const Container = styled.div`
    background-color: #fff;
    width: 90%;
    max-width: 70rem;
    height: 90vh;
    max-height: 50rem;
    /*overflow-y: auto;*/
    box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.05);
    border-radius: 0.625rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justy-content: space-between;
    position: relative;
    z-index: 100;

    @media (max-width: 60rem) {
        height: 95vh;
        max-height: none;
    }

`;

export default Container;
