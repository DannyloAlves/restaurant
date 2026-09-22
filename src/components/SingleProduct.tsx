"use client";
import { ProductType } from "@/types/types";
import Image from "next/image";
import styled from "styled-components";
import Price from "./Price";
import DeleteButton from "./DeleteButton";

const Container = styled.div`
  display: flex; 
  padding: 1rem; 
  flex-direction: column; 
  justify-content: space-around; 
  height: 100vh; 
  color: #EF4444;
  position: relative; 

  @media (min-width: 768px) { 
    flex-direction: row; 
    gap: 2rem; 
    align-items: center; 
  };
  @media (min-width: 1024px) { 
    padding-left: 5rem;
    padding-right: 5rem; 
  };
  @media (min-width: 1280px) { 
    padding-left: 10rem;
    padding-right: 10rem; 
  };
`;

const ImgContainer = styled.div`
  position: relative; 
  width: 100%; 
  height: 50%; 

  @media (min-width: 768px) { 
    height: 70%;
  };

  img{
    object-fit: contain;
  };
`;

const TextContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 1rem; 
  height: 50%; 


  @media (min-width: 768px) { 
    gap: 1.5rem; 
    justify-content: center; 
    height: 70%;
  };

  @media (min-width: 1280px) { 
    gap: 2rem; 
  };

  h1{
    font-size: 1.875rem;
    line-height: 2.25rem; 
    font-weight: 700; 
    text-transform: uppercase; 

    @media (min-width: 1280px) { 
      font-size: 3rem;
      line-height: 1; 
    };
  };
`;

export default function SingleProduct({ singleProduct }: { singleProduct: ProductType }) {
  return (
    <Container>
      {singleProduct.img && (
        <ImgContainer>
          <Image src={singleProduct.img} alt="" fill />
        </ImgContainer>
      )}
      <TextContainer>
        <h1>{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </TextContainer>
      <DeleteButton id={singleProduct.id} />
    </Container>
  );
};
