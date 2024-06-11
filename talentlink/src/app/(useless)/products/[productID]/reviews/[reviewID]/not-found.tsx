import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

export default function NotFound() {
  return (
    <main className="">
      <h1>нету отзыва</h1>

      <Link href="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </main>
  );
}
