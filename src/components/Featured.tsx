import ClientFeatured from "./ClientFeatured";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {cache: "no-store"});

  if(!res.ok){
    throw new Error("Failed!");
  }

  return res.json();
};
  
export default async function Featured() {
  const featuredProducts = await getData();

  return (
    <ClientFeatured featuredProducts = {featuredProducts}/>
  );
};