"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    font-size: 1.5rem;
    line-height: 2rem; 
    text-align: center; 
    color: #047857;
    min-height: calc(100vh - 6rem);

    @media (min-width: 768px) { 
        min-height: calc(100vh - 15rem);
    };

    p{  
        max-width: 600px;
    };
`;

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");
    const router = useRouter();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
                    method: "PUT",
                });
                setTimeout(() => {
                    router.push("/orders");
                }, 5000);
            } catch (error) {
                console.log(error);
            }
        };

        makeRequest();
    }, [payment_intent, router]);

    return (
        <Container>
            <p>
                Payment successful. You are being redirected to the orders page.
                Please do not close the page.
            </p>
        </Container>
    );
};
