import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
//ednf - expoer default named function

interface Params {
  params: {
    productID: string;
  };
}

export const generateMetadata = ({ params }: Params): Metadata => {
  return {
    title: `Товар ${params.productID}`,
  };
};
export default function ProductDetails({ params }: Params) {
  if (+params.productID > 100) {
    return notFound();
  }
  return (
    <main className="">
      <h1>Продукт № {params.productID}</h1>

      <Link href="/">
        <Button>назад </Button>
      </Link>
    </main>
  );
}
