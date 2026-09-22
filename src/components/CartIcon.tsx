"use client";
import { useCartStore } from '@/utils/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative; 
    width: 2rem; 
    height: 2rem; 


    @media (min-width: 768px) { 
        width: 1.25rem; 
        height: 1.25rem; 
    };
`;

export default function CartIcon() {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href="/cart" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Wrapper>
        <Image src="/cart.png" fill alt='' />
      </Wrapper>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};
