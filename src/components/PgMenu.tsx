"use client";
import { MenuType } from "@/types/types";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  padding: 1rem; 
  flex-direction: column; 
  align-items: center; 
  height: calc(100vh - 6rem/* 96px */);


  @media (min-width: 768px) { 
    flex-direction: row; 
    height: calc(100vh - 9rem/* 144px */);
  };
  @media (min-width: 1024px) { 
    padding-left: 5rem;
    padding-right: 5rem; 
  };
  @media (min-width: 1280px) { 
    padding-left: 10rem;
    padding-right: 10rem; 
  };

  a{
    padding: 2rem; 
    width: 100%; 
    height: 33.333333%; 
    background-size: cover; 

    @media (min-width: 768px) { 
      height: 55%;
    };
  };
`;

const TextContainer = styled.div`
  width: 50%;
  color: ${props=>props.color};

  h1{
    font-size: 1.875rem;
    line-height: 2.25rem; 
    font-weight: 700; 
    text-transform: uppercase; 
  };

  p{
    margin-top: 2rem;
    margin-bottom: 2rem; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
  };

  button{
    display: none;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    border-radius: 0.375rem;
    background-color: ${props=>props.color};
    color: ${props=>props.color === "black" ? "white" : "#f56565"};

    @media (min-width: 1536px) {
      display: block;
    };
  };
`;

type Props = {
  menu:MenuType
};

export default function PgMenu({menu}:Props) {
  return (
    <Container>
      {menu.map((category) => (
        <Link href={`/menu/${category.slug}`} key={category.id} style={{backgroundImage:`url(${category.img})`}}>
          <TextContainer color ={category.color}>
            <h1>{category.title}</h1>
            <p>{category.desc}</p>
            <button>Explore</button>
          </TextContainer>
        </Link>
      ))}
    </Container>
  );
};