"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  background-color: rgb(253 244 255);
  height: calc(100vh - 6rem/* 96px */);

  @media (min-width: 768px) { 
    height: calc(100vh - 9rem/* 144px */);
  };
  @media (min-width: 1024px) { 
    flex-direction: row; 
  };
`;

const TextContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  flex: 1; 
  gap: 2rem; 
  justify-content: center; 
  align-items: center; 
  font-weight: 700; 
  color: #EF4444;

  h1{
    padding: 1rem; 
    font-size: 3rem;
    line-height: 1; 
    text-align: center; 
    text-transform: uppercase; 


    @media (min-width: 768px) { 
      padding: 2.5rem; 
      font-size: 3.75rem;
      line-height: 1; 
    };

    @media (min-width: 1280px) { 
      font-size: 4.5rem;
      line-height: 1; 
    };
  };

  button{
    padding-top: 1rem;
    padding-bottom: 1rem; 
    padding-left: 2rem;
    padding-right: 2rem; 
    color: #ffffff; 
    background-color: #EF4444; 
  };
`;

const ImgContainer = styled.div`
  position: relative; 
  flex: 1; 
  width: 100%; 

  img{
    object-fit: cover;
  };
`;

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <TextContainer>
        <h1>{data[currentSlide].title}</h1>
        <button>Order Now</button>
      </TextContainer>
      <ImgContainer>
        <Image src={data[currentSlide].image} alt="" fill />
      </ImgContainer>
    </Container>
  );
};
