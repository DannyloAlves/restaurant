"use client";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  padding: 1rem; 
  justify-content: space-between; 
  align-items: center; 
  height: 3rem; 
  color: #EF4444; 

  @media (min-width: 768px) { 
    height: 6rem; 
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

export default function Footer() {
  return (
    <Container>
      <Link href="/" style={{fontSize:"1.25rem", lineHeight:"1.75rem", fontWeight:"700"}}>
        Massimo
      </Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </Container>
  );
};
