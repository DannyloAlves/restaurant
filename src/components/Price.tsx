"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

const Container = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: 1rem;

    h2{
        font-size: 1.5rem;
        line-height: 2rem; 
        font-weight: 700;
    };
`;

const OptContainer = styled.div`
    display: flex; 
    gap: 1rem;

    button{
        min-width: 6rem/* 96px */;
        padding: 0.5rem; 
        border-radius: 0.375rem; 
        box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        --ring-color: #F87171; 
    };
`;

const AddContainer = styled.div`
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
`;

const QuantContainer = styled.div`
    display: flex; 
    padding: 0.75rem; 
    justify-content: space-between; 
    width: 100%;
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    --ring-color: #EF4444; 

    div{
        display: flex; 
        gap: 1rem; 
        align-items: center; 
    };
`;

const AddButton = styled.button`
    padding: 0.75rem; 
    width: 14rem; 
    color: #ffffff; 
    text-transform: uppercase; 
    background-color: #EF4444;
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    --ring-color: #EF4444; 
`;

export default function Price({ product }: { product: ProductType }) {
    const [total, setTotal] = useState(product.price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);

    const { addToCart } = useCartStore();

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    useEffect(() => {
        if (product.options?.length) {
            setTotal(
                quantity * product.price + Number(product.options[selected].additionalPrice)
            );
        }
    }, [quantity, selected, product]);

    const handleCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            img: product.img,
            price: total,
            ...(product.options?.length && { optionTitle: product.options[selected].title }),
            quantity: quantity
        })
        toast.success("The product added to the cart!");
    };

    return (
        <Container>
            <h2>${total}</h2>
            <OptContainer>
                {product.options?.length !== 0 && product.options?.map((option, index) => (
                    <button
                        key={option.title}
                        style={{
                            background: selected === index ? "rgb(248 113 113)" : "white",
                            color: selected === index ? "white" : "red",
                        }}
                        onClick={() => setSelected(index)}
                    >
                        {option.title}
                    </button>
                ))}
            </OptContainer>
            <AddContainer>
                <QuantContainer>
                    <span>Quantity</span>
                    <div>
                        <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>{"<"}</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}>{">"}</button>
                    </div>
                </QuantContainer>
                <AddButton onClick={handleCart}>Add to Cart</AddButton>
            </AddContainer>
        </Container>
    );
};
