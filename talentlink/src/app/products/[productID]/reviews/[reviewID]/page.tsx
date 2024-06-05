import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

//ednf - expoer default named function

interface Params {
  params: {
    productID: string;
    reviewID: string;
  };
}

export default function ProductDetails({ params }: Params) {
  if (+params.reviewID > 100 || typeof params.reviewID != "number") {
    notFound();
  }
  return (
    <main className="">
      <h1>
        Продукт № {params.productID} с отзывом № {params.reviewID}
      </h1>

      <Link href="/">
        <Button>назад</Button>
      </Link>
    </main>
  );
}
