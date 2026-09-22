"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex; 
  padding: 1rem; 
  justify-content: center; 
  align-items: center; 
  height: calc(100vh - 6rem);


  @media (min-width: 768px) { 
    height: calc(100vh - 9rem);
  };
`;

const Wrapper = styled.div`
  display: flex; 
  flex-direction: column; 
  border-radius: 0.375rem; 
  height: 100%; 
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 

  @media (min-width: 768px) { 
    flex-direction: row; 
    width: 100%; 
    height: 70%;
  };
  @media (min-width: 1024px) { 
    width: 60%;
  };
  @media (min-width: 1536px) {
    width: 50%;
  };
`;

const ImgContainer = styled.div`
  position: relative; 
  width: 100%; 
  height: 33.333333%; 

  @media (min-width: 768px) { 
    width: 50%; 
    height: 100%; 
  };

  img{
    object-fit: cover;
  };
`;

const FormContainer = styled.div`
  display: flex; 
  padding: 2.5rem; 
  flex-direction: column; 
  gap: 2rem; 

  @media (min-width: 768px) { 
    width: 50%; 
  };

  h1{
    font-size: 1.25rem;
    line-height: 1.75rem; 
    font-weight: 700; 

    @media (min-width: 1280px) { 
      font-size: 1.875rem;
      line-height: 2.25rem; 
    };
  };

  button{
    display: flex; 
    padding: 1rem; 
    gap: 1rem; 
    border-radius: 0.375rem; 
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    &:first-of-type{
      --ring-color: rgb(255 237 213);
    };

    &:last-of-type{
      --ring-color: #DBEAFE; 
    };

    img{
      object-fit: contain;
    };
  };

  a{
    text-decoration: underline; 
  };
`;

export default function LoginPage() {
  const {data, status} = useSession();
  const router = useRouter();

  if(status === "loading"){
    return <p>Loading...</p>
  }
  if(status === "authenticated"){
    return router.push("/");
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src="/loginBg.png" alt="" fill/>
        </ImgContainer>
        <FormContainer>
          <h1>Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button onClick={()=>signIn("google")}>
            <Image src="/google.png" alt="" width={20} height={20}/>
            <span>Sign in with Google</span>
          </button>
          <button>
            <Image src="/facebook.png" alt="" width={20} height={20}/>
            <span>Sign in with Facebook</span>
          </button>
          <p>Have a problem? <Link href="/">Contact us</Link></p>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};
