import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

export default function Products() {
  return (
    <main className="">
      <h1>Продукты</h1>
      <Button>
        <Link href="/">назад</Link>
      </Button>
    </main>
  );
}
