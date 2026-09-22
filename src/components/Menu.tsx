"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import CartIcon from "./CartIcon";

const Container = styled.div``;

const List = styled.div`
    background-color: rgb(239 68 68);
    color: white;
    position: absolute;
    left: 0;
    top: 6rem/* 96px */;
    width: 100%;
    height: calc(100vh - 6rem/* 96px */);
    display: flex;
    flex-direction: column;
    gap: 2rem/* 32px */;
    align-items: center;
    justify-content: center;
    font-size: 1.875rem/* 30px */;
    line-height: 2.25rem/* 36px */;
    z-index: 10;
`;

const links = [
    { id: 1, title: "Homepage", url: "/" },
    { id: 2, title: "Menu", url: "/menu" },
    { id: 3, title: "Working Hours", url: "/" },
    { id: 4, title: "Contact", url: "/" },
];

export default function Menu() {
    const [open, setOpen] = useState(false);

    const user = false;

  return (
    <Container>
        {!open ? (
            <Image src="/open.png" width={20} height={20} alt="" onClick={()=>setOpen(true)}/>
        ):(
            <Image src="/close.png" width={20} height={20} alt="" onClick={()=>setOpen(false)}/>
        )}
        {open && (
            <List>
                {links.map((item) => (
                    <Link href={item.url} key={item.id} onClick={()=>setOpen(false)}>
                        {item.title}
                    </Link>
                ))}
                {!user ? (
                    <Link href="/login" onClick={()=>setOpen(false)}>Login</Link>
                ):(
                    <Link href="/orders" onClick={()=>setOpen(false)}>Orders</Link>
                )}
                <Link href="/cart" onClick={()=>setOpen(false)}>
                    <CartIcon/>
                </Link>
            </List>
        )}
    </Container>
  );
};
