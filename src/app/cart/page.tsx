"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  color: #EF4444; 
  height: calc(100vh - 6rem);


  @media (min-width: 768px) { 
    height: calc(100vh - 9rem);
  };
  @media (min-width: 1024px) { 
    flex-direction: row; 
  };
`;

const ProductContainer = styled.div`
  display: flex; 
  overflow: scroll; 
  padding: 1rem; 
  flex-direction: column; 
  justify-content: center; 
  height: 50%; 

  @media (min-width: 1024px) { 
    padding-left: 5rem;
    padding-right: 5rem; 
    width: 66.666667%; 
    height: 100%; 
  };
  @media (min-width: 1280px) { 
    padding-left: 10rem;
    padding-right: 10rem; 
  };
  @media (min-width: 1536px) {
    width: 50%;
  };
`;

const Item = styled.div`
  display: flex; 
  margin-bottom: 1rem; 
  justify-content: space-between; 
  align-items: center;

  div{
    h1{
      font-size: 1.25rem;
      line-height: 1.75rem; 
      font-weight: 700; 
      text-transform: uppercase; 
    };
  };

  h2{
    font-weight: 700; 
  };

  span:nth-child(4){
    cursor: pointer;
  };
`;

const PaymentContainer = styled.div`
  display: flex; 
  padding: 1rem; 
  flex-direction: column; 
  gap: 1rem; 
  justify-content: center; 
  height: 50%; 

  @media (min-width: 1024px) { 
    padding-left: 5rem;
    padding-right: 5rem; 
    width: 33.333333%; 
    height: 100%; 
  };
  @media (min-width: 1280px) { 
    padding-left: 10rem;
    padding-right: 10rem; 
  };
  @media (min-width: 1536px) {
    width: 50%;
    font-size: 1.25rem/* 20px */;
    line-height: 1.75rem/* 28px */;
    gap: 1.5rem/* 24px */;
  };

  div{
    display: flex; 
    justify-content: space-between;
    
    &:nth-child(3){
      span:last-child{
        color: #10B981; 
      };
    };

    &:nth-child(5){
      span:last-child{
        font-weight: 700; 
      };
    };
  };

  hr{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem; 
  };

  button{
    padding: 0.75rem; 
    align-self: flex-end; 
    border-radius: 0.375rem; 
    width: 50%; 
    color: #ffffff; 
    background-color: #EF4444; 
  };
`;

export default function CartPage() {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <ProductContainer>
        {products.map((item) => (
          <Item key={item.id}>
            {item.img && <Image src={item.img} alt="" width={100} height={100} />}
            <div>
              <h1>{item.title} x {item.quantity}</h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2>${item.price}</h2>
            <span onClick={() => removeFromCart(item)}>X</span>
          </Item>
        ))}
      </ProductContainer>
      <PaymentContainer>
        <div>
          <span>Subtotal ({totalItems} items)</span>
          <span>{totalPrice}</span>
        </div>
        <div>
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div>
          <span>Delivery Cost</span>
          <span>FREE!</span>
        </div>
        <hr />
        <div>
          <span>TOTAL(INCL. VAT)</span>
          <span>{totalPrice}</span>
        </div>
        <button onClick={handleCheckout}>CHECKOUT</button>
      </PaymentContainer>
    </Container>
  );
};
