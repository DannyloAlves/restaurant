"use client";
import Link from "next/link";
import styled from "styled-components";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Container = styled.div`
  height: 3rem/* 48px */;
  color: rgb(239 68 68);
  padding: 1rem/* 16px */;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-bottom-color: rgb(239 68 68);
  text-transform: uppercase;

  @media (min-width: 768px) {
    height: 6rem/* 96px */;
  };

  @media (min-width: 1024px) {
    padding-left: 5rem/* 80px */;
    padding-right: 5rem/* 80px */;
  };

  @media (min-width: 1280px) {
    padding-left: 10rem/* 160px */;
    padding-right: 10rem/* 160px */;
  };
`;

const List = styled.div`
  display: none; 
  flex: 1 1 0%; 
  gap: 1rem;
  
  &:last-child{
    justify-content: flex-end; 
    align-items: center; 

    span{
      margin-left: 1rem; 
      cursor: pointer;
    };
  };

  @media (min-width: 768px) { 
    display: flex; 
  };
`;

const Name = styled.div`
  font-size: 1.25rem/* 20px */;
  line-height: 1.75rem/* 28px */;
  flex: 1 1 0%;

  @media (min-width: 768px) {
    font-weight: 700;
    text-align: center;
  };
`;

const MobMenu = styled.div`
  @media (min-width: 768px) { 
    display: none; 
  };
`;

const Contact = styled.div`
  display: flex; 
  top: 0.75rem; 
  padding-left: 0.25rem;
  padding-right: 0.25rem; 
  gap: 0.5rem; 
  align-items: center; 
  border-radius: 0.375rem; 
  background-color: rgb(253 186 116);
  cursor: pointer; 

  @media (min-width: 768px) { 
    position: absolute; 
  };
  @media (min-width: 1024px) { 
    position: static; 
  };
`;

export default function Navbar() {
  const { status } = useSession();

  return (
    <Container>
      {/*LEFT LINKS*/}
      <List>
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </List>
      {/*LOGO*/}
      <Name>
        <Link href="/">Massimo</Link>
      </Name>
      {/*MOBILE MENU*/}
      <MobMenu>
        <Menu />
      </MobMenu>
      {/*RIGHT LINKS*/}
      <List>
        <Contact>
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </Contact>
        {status === "authenticated" ? (
          <div>
            <Link href="/orders">Orders</Link>
            <span onClick={() => signOut()}>Logout</span>
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <CartIcon />
      </List>
    </Container>
  );
};
