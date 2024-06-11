import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

//ednf - expoer default named function
//перебивает layout
export const metadata: Metadata = {
  title: "Products",
  description: "degra",
};

export default function Products() {
  return (
    <main className="">
      <h1>Продукты</h1>

      <Link href="/">
        <Button>назад</Button>
      </Link>
    </main>
  );
}
