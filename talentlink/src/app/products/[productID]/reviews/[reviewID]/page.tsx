import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

interface Params {
  params: {
    productID: string;
    reviewID: string;
  };
}

export default function ProductDetails({ params }: Params) {
  return (
    <main className="">
      <h1>
        Продукт № {params.productID} с отзывом № {params.reviewID}
      </h1>
      <Button>
        <Link href="/">назад</Link>
      </Button>
    </main>
  );
}
