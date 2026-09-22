"use client";
import { featuredProducts } from "@/data";
import { ProductType } from "@/types/types";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
    overflow-x: scroll; 
    width: 100vw; 
    color: #EF4444; 
`;

const Wrapper = styled.div`
    display: flex; 
    width: max-content;
`;

const Item = styled.div`
    display: flex; 
    padding: 1rem; 
    flex-direction: column; 
    justify-content: space-around; 
    align-items: center; 
    width: 100vw; 
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    transition-duration: 300ms; 
    height: 60vh;

    &:hover{
        background-color: rgb(253 244 255);
    };

    @media (min-width: 768px) { 
        width: 50vw;
    };

    @media (min-width: 1280px) { 
        width: 33vw;
        height: 90vh;
    };
`;

const ImgContainer = styled.div`
    position: relative; 
    flex: 1 1 0%; 
    width: 100%; 
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms; 
    transition-duration: 500ms;
    
    &:hover{
        transform: rotate(60deg);
    };

    img{
        object-fit: contain;
    };
`;

const TextContainer = styled.div`
    display: flex; 
    text-align: center; 
    flex-direction: column; 
    flex: 1 1 0%; 
    justify-content: center; 
    align-items: center; 
    gap: 1rem;

    h1{
        font-size: 1.25rem;
        line-height: 1.75rem; 
        font-weight: 700; 
        text-transform: uppercase; 

        @media (min-width: 1280px) { 
            font-size: 1.5rem;
            line-height: 2rem; 
        };

        @media (min-width: 1536px) {
            font-size: 1.875rem/* 30px */;
            line-height: 2.25rem/* 36px */;
        };
    };

    p{
        padding: 1rem;

        @media (min-width: 1536px) {
            padding: 2rem/* 32px */;
        };
    };

    span{
        font-size: 1.25rem;
        line-height: 1.75rem; 
        font-weight: 700; 
    };

    button{
        padding: 0.5rem; 
        border-radius: 0.375rem; 
        color: #ffffff; 
        background-color: #EF4444;
    };
`;

type Props = {
    featuredProducts:ProductType[]
  };

export default function ClientFeatured({featuredProducts}:Props) {
  return (
    <Container>
        <Wrapper>
            {featuredProducts.map((item) => (
                <Item key={item.id}>
                    {item.img && (
                        <ImgContainer>
                            <Image src={item.img} alt="" fill/>
                        </ImgContainer>
                    )}
                    <TextContainer>
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                        <span>${item.price}</span>
                        <button>Add to Cart</button>
                    </TextContainer>
                </Item>
            ))}
        </Wrapper>
    </Container>
  );
};
