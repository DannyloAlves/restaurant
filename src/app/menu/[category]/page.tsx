import CatPage from "@/components/CatPage";

const getData = async (category:string) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {cache: "no-store"});

  if(!res.ok){
    throw new Error("Failed!");
  }

  return res.json();
};

type Props = {
  params: {category:string}
};

export default async function CategoryPage({params}:Props) {
  const products = await getData(params.category);

  return (
    <CatPage products={products}/>
  );
};
