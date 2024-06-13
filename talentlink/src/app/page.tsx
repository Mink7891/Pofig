import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import bg from '../../public/drugs.png'
import Image from "next/image";


//ednf - expoer default named function

export default function Home() {
  return (
    <div className="grid">
      {/* <div style={{backgroundImage: `url(${bg.src})`}}> */}
      <div className="grid h-[40rem] justify-self-stretch relative">
        <div className=" justify-self-start relative ">
          
          <div><h1 className="font-bold !text-[#F8FAFC] text-5xl w-[55rem] p-2 leading-normal">TalentLink - Создаем связи между талантами и возможностями </h1></div>
        </div>
        <Image src="/morph.jpg" alt="Таблетки" fill={true} className="object-cover bg-cover bg-center bg-origin-padding z-[-5]"/>

        
        
      </div>
      <Separator />
      <div className="my-5 justify-self-center">
        наши "многочисленные" преимущества, то что нас может выделить среди
        других, то что должно поразить эксперта(card component)
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
