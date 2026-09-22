"use client";
import Image from "next/image";
import styled from "styled-components";
import CountDown from "./CountDown";

const Container = styled.div`
    display: flex; 
    flex-direction: column; 
    height: 100vh; 
    background-color: #000000;


    @media (min-width: 768px) { 
        flex-direction: row; 
        justify-content: space-between; 
        background: url('/offerBg.png');
        height: 70vh;
    };
`;

const TextContainer = styled.div`
    display: flex; 
    padding: 1.5rem; 
    flex-direction: column; 
    flex: 1 1 0%; 
    gap: 2rem; 
    justify-content: center; 
    align-items: center; 
    text-align: center;
    
    h1{
        font-size: 3rem;
        line-height: 1; 
        font-weight: 700; 
        color: #ffffff; 

        @media (min-width: 1280px) { 
            font-size: 3.75rem;
            line-height: 1; 
        };
    };

    p{
        color: #ffffff; 

        @media (min-width: 1280px) { 
            font-size: 1.25rem;
            line-height: 1.75rem; 
        };
    };

    button{
        padding-top: 0.75rem;
        padding-bottom: 0.75rem; 
        padding-left: 1.5rem;
        padding-right: 1.5rem; 
        border-radius: 0.375rem; 
        color: #ffffff; 
        background-color: #EF4444; 
    };
`;

const ImgContainer = styled.div`
    position: relative; 
    flex: 1 1 0%; 
    width: 100%; 

    @media (min-width: 768px) { 
    height: 100%; 
    };

    img{
        object-fit: contain;
    };
`;

export default function Offer() {
    const endingDate = new Date("2024-07-25");

    return (
        <Container>
            <TextContainer>
                <h1>Delicious Burger & French Fry</h1>
                <p>
                    Progressively simplify effective e-toilers and process-centric methods
                    of empowerment. Quickly pontificate parallel.
                </p>
                {/* <CountDown/> */}
                <button>Order Now</button>
            </TextContainer>
            <ImgContainer>
                <Image src="/offerProduct.png" alt="" fill />
            </ImgContainer>
        </Container>
    );
};
