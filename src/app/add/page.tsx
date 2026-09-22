"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex; 
    padding: 1rem; 
    justify-content: center; 
    align-items: center; 
    color: #EF4444;


    @media (min-width: 1024px) { 
        padding-left: 5rem;
        padding-right: 5rem; 
    };

    @media (min-width: 1280px) { 
        padding-left: 10rem;
        padding-right: 10rem; 
    };

    @media (min-width: 768px) { 

    };
`;

const AddForm = styled.form`
    display: flex; 
    flex-wrap: wrap; 
    gap: 1.5rem; 

    h1{
        margin-bottom: 0.5rem; 
        font-size: 2.25rem;
        line-height: 2.5rem; 
        font-weight: 700; 
        color: #D1D5DB; 
    };

    div{
        display: flex; 
        flex-direction: column; 
        gap: 0.5rem; 
        width: 100%;

        label{
            font-size: 0.875rem;
            line-height: 1.25rem; 
        };

        input, textarea{
            padding: 1rem; 
            border-radius: 0.125rem; 
            outline-style: none; 
            box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); 
            --ring-color: #FECACA; 
        };

        div:first-of-type{
            display: flex;

            div{ 
                color: #ffffff; 
                background-color: #6B7280;
                display: flex; 
                position: relative; 
                padding: 1rem; 
                justify-content: center; 
                align-items: center; 
                border-radius: 0.375rem; 
                width: 12rem; 
                height: 3.5rem; 
                cursor: pointer;
            };
        };

        div:last-of-type{
            display: flex; 
            margin-top: 0.5rem; 
            flex-wrap: wrap; 
            gap: 1rem;
            
            div{
                padding: 0.5rem; 
                border-radius: 0.375rem; 
                color: #9CA3AF; 
                background-color: #E5E7EB; 
                cursor: pointer;
                
                span:last-child{
                    font-size: 0.75rem;
                    line-height: 1rem; 
                };
            };
        };
    };

    button{
        display: flex; 
        position: relative; 
        padding: 1rem; 
        justify-content: center; 
        align-items: center; 
        border-radius: 0.375rem; 
        width: 12rem; 
        height: 3.5rem; 
        color: #ffffff; 
        background-color: #EF4444; 
    };
`;

const UploadImg = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: 0.5rem; 
    width: 100%;
    
    label{
        display: flex; 
        gap: 1rem; 
        align-items: center; 
        font-size: 0.875rem;
        line-height: 1.25rem; 
        cursor: pointer;
    };

    input{
        display: none;
    };
`;

type Inputs = {
    title: string,
    desc: string,
    price: number,
    catSlug: string
};

type Option = {
    title: string,
    additionalPrice: number,
};

export default function AddPage() {
    const { data: session, status } = useSession();
    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        desc: "",
        price: 0,
        catSlug: ""
    });

    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0
    });

    const [options, setOptions] = useState<Option[]>([]);
    const [file, setFile] = useState<File>();

    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        router.push("/");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item);
    };

    const upload = async () => {
        const data = new FormData();
        data.append("file", file!);
        data.append("upload_preset", "restaurant");

        const res = await fetch("https://api.cloudinary.com/v1_1/do3svizsa/image/upload", {
            method: "POST",
            body: data,
        });

        const resData = await res.json();
        return resData.url;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const url = await upload();
            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                body: JSON.stringify({
                    img: url,
                    ...inputs,
                    options,
                }),
            });

            const data = await res.json();
            router.push(`/product/${data.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <AddForm onSubmit={handleSubmit}>
                <h1>Add New Product</h1>
                <UploadImg>
                    <label htmlFor="file">
                        <Image src="/upload.png" alt="" width={30} height={20} />
                        <span>Upload Image</span>
                    </label>
                    <input type="file" id="file" onChange={handleChangeImg} />
                </UploadImg>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Bella Napoli" onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="desc"
                        rows={3}
                        placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="price" placeholder="29" onChange={handleChange} />
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="catSlug" placeholder="pizzas" onChange={handleChange} />
                </div>
                <div>
                    <label>Options</label>
                    <div>
                        <input type="text" name="title" placeholder="Title" onChange={changeOption} />
                        <input type="number" name="additionalPrice" placeholder="Additional Price" onChange={changeOption} />
                        <div onClick={() => setOptions((prev) => [...prev, option])}>Add Option</div>
                    </div>
                    <div>
                        {options.map((item) => (
                            <div key={item.title} onClick={() => setOptions(options.filter(opt => opt.title !== item.title))}>
                                <span>{item.title}</span>
                                <span>${item.additionalPrice}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">Submit</button>
            </AddForm>
        </Container>
    );
};
