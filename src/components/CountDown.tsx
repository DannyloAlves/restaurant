"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 3rem;
  line-height: 1; 
  font-weight: 700; 
  color: #FCD34D; 
`;

const CountDown = () => {

  let difference = +new Date(`06/06/2024`) - +new Date();
  const [delay, setDelay] = useState(difference);

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <Container>
      {d}:{h}:{m}:{s}
    </Container>
  );
};

export default CountDown;