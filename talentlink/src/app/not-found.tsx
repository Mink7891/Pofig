import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

export default function NotFound() {
  return (
    <main className="">
      <h1>Страница не найдена</h1>
      <Button>
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </main>
  );
}
