import SingleProduct from "@/components/SingleProduct";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

export default async function SingleProductPage({ params }: { params: { id: string } }) {
  const singleProduct = await getData(params.id);

  return (
    <SingleProduct singleProduct={singleProduct} />
  );
};
