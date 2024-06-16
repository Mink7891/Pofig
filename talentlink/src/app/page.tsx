import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import bg from '../../public/drugs.png'
import Image from "next/image";
import { EyeNoneIcon, PersonIcon, MagnifyingGlassIcon, CalendarIcon, Share1Icon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { BellIcon } from "lucide-react";


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
      <div className="my-5 justify-self-center grid grid-cols-2">
      <Card className="m-5">
        <CardHeader className="pb-3">
          <CardTitle>Вакансии</CardTitle>
          <CardDescription>
            Публикуй и просматривай вакансии
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <BellIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Уведомления</p>
              <p className="text-sm text-muted-foreground">
                Уведомления о новых вакансиях и об успешном создании новых
              </p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <PersonIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Персонализация</p>
              <p className="text-sm text-muted-foreground">
                Индивидеальные вакансии
              </p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <MagnifyingGlassIcon className="mt-px h-5 w-5"/>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Фильтрация</p>
              <p className="text-sm text-muted-foreground">
                Фисльтрация и интерактивный поиск
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="m-5">
        <CardHeader className="pb-3">
          <CardTitle>Резюме</CardTitle>
          <CardDescription>
            Публикуй и просматривай резюме
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <BellIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Уведомления</p>
              <p className="text-sm text-muted-foreground">
                Уведомления о новых вакансиях и об успешном создании новых
              </p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <CalendarIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Календарь</p>
              <p className="text-sm text-muted-foreground">
                Настройка индивидуального календаря
              </p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <Share1Icon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Публикация</p>
              <p className="text-sm text-muted-foreground">
                Можно оставить резюме рекрутеру 
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      <Separator />

  
      {/* <a href="/blog">Блог</a> */}
      
    </div>
  );
}
