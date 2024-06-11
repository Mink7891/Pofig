import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

//ednf - expoer default named function

export default function Home() {
  return (
    <div className="grid">
      <div className="my-5 justify-self-center">
        здесь будет краткое описание нашего проекта
      </div>
      <Separator />
      <div className="my-5 justify-self-center">
        наши "многочисленные" преимущества, то что нас может выделить среди
        других, то что должно поразить эксперта
      </div>
      <Separator />
      <div className="my-10 justify-self-center">
        далее стоит предложить за кого мы хотим играть, за рекрутера или
        соискателя, тут также предлагаем зарегистрироваться
      </div>
      <Separator />

      <h1>Здарова пацаны</h1>

      <Link href="/about">
        <Button>тестовая страница с zod валидацией, призмой</Button>
      </Link>

      {/* <a href="/blog">Блог</a> */}
      <Link href="/blog">
        <Button>просто вложенные маршруты</Button>
      </Link>

      <Link href="/products">
        <Button>динамические маршруты </Button>
      </Link>
      <Link href="/parallel">
        <Button>параллельный роутинг</Button>
      </Link>
      <Link href="/news">
        <Button>тут есть серверные action</Button>
      </Link>
    </div>
  );
}
