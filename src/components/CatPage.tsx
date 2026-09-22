"use client";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  flex-wrap: wrap; 
  color: #EF4444;
  
  a{
    display: flex; 
    padding: 1rem; 
    flex-direction: column; 
    justify-content: space-between; 
    border-right-width: 2px; 
    border-bottom-width: 2px; 
    border-color: #EF4444; 
    width: 100%; 
    height: 60vh;

    &:nth-child(odd){
      background-color: rgb(253 244 255);
    };

    @media (min-width: 640px) { 
      width: 50%; 
    };

    @media (min-width: 1024px) { 
      width: 33.333333%; 
    };

    &:hover{
      button{
        display: block;
      };

      h2{
        display: none;
      };
    };
  };
`;

const ImgContainer = styled.div`
  position: relative; 
  height: 80%;

  img{
    object-fit: contain;
  };
`;

const TextContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  font-weight: 700;
  
  h1{
    padding: 0.5rem; 
    font-size: 1.5rem;
    line-height: 2rem; 
    text-transform: uppercase; 
  };

  h2{
    font-size: 1.25rem;
    line-height: 1.75rem;
  };

  button{
    display: none; 
    padding: 0.5rem; 
    border-radius: 0.375rem; 
    color: #ffffff; 
    text-transform: uppercase; 
    background-color: #EF4444;
  };
`;

type Props = {
  products: ProductType[]
};

export default function CatPage({products}:Props) {
  return (
    <Container>
      {products.map((item) => (
        <Link href={`/product/${item.id}`} key={item.id}>
        {item.img && (
          <ImgContainer>
            <Image src={item.img} alt="" fill/>
          </ImgContainer>
        )}
        <TextContainer>
          <h1>{item.title}</h1>
          <h2>${item.price}</h2>
          <button>Add to Cart</button>
        </TextContainer>
        </Link>
      ))}
    </Container>
  );
};
