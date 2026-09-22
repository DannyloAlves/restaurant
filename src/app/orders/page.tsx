"use client";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem; 

  @media (min-width: 1024px) { 
    padding-left: 5rem;
    padding-right: 5rem; 
  };
  @media (min-width: 1280px) { 
    padding-left: 10rem;
    padding-right: 10rem; 
  };

  table{
    width: 100%; 
    border-collapse: separate;
    border-spacing: 0.5rem;
    
    thead{
      tr{
        text-align: left;
        
        th{
          &:nth-of-type(1), &:nth-of-type(4){
            display: none; 

            @media (min-width: 768px) { 
              display: block; 
            };
          };
        };
      };
    };

    tbody{
      tr{
        
      };
    };
  };
`;

const Tr = styled.tr<{ bg: string }>`
  font-size: 0.875rem;
  line-height: 1.25rem;
  
  background-color: #ffdfdf;

  @media (min-width: 768px) { 
    font-size: 1rem;
    line-height: 1.5rem; 
  };

  &:nth-child(odd){
    background-color: #e4e4e4;
  };

  &:first-child{
    background-color: ${(props) => props.bg !== "delivered" && "#FEF2F2"};
  };

  td{
    padding-left: 0.25rem;
    padding-right: 0.25rem; 
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    
    &:nth-child(1), &:nth-child(4){
      display: none; 

      @media (min-width: 768px) { 
        display: block; 
      };
    };
  };  
`;

const Form = styled.form`
  display: flex; 
  gap: 1rem; 
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5rem; 
  border-radius: 0.375rem; 
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); 
  --ring-color: #FEE2E2; 
`;

const Button = styled.button`
  padding: 0.5rem; 
  border-radius: 9999px; 
  background-color: #F87171;
`;

export default function OrdersPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
    toast.success("The order status has been changed!");
  };

  if (isLoading || status === "loading") return "Loading...";
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <Tr bg={item.status} key={item.id}>
              <td>{item.id}</td>
              <td>{item.createdAt.toString().slice(0, 10)}</td>
              <td>{item.price}</td>
              <td>{item.products[0].title}</td>
              {session?.user.isAdmin ? (
                <td>
                  <Form onSubmit={(e) => handleUpdate(e, item.id)}>
                    <Input placeholder={item.status} />
                    <Button>
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </Button>
                  </Form>
                </td>
              ) : (
                <td>{item.status}</td>
              )}
            </Tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};
