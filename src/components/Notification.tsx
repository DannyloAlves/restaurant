"use client";
import styled from "styled-components";

const Container = styled.div`
  height: 3rem;
  background-color: rgb(239 68 68);
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  justify-content: center;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 1rem/* 16px */;
    line-height: 1.5rem/* 24px */;
  };
`;

export default function Notification() {
  return (
    <Container>
      Free delivery for all orders over $50. Order you food now!
    </Container>
  );
};
