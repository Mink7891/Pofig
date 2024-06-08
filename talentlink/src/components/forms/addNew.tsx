"use client";
import { addNew } from "@/actions/news";
import { Button } from "../ui/button";
import { useOptimistic, useRef } from "react";

type New = {
  NewID: number;
  Header: string;
  Category: string;
  Text: string;
};

type News = {
  news: New[];
};

export default function CreateNews({ news }: News) {
  const ref = useRef<HTMLFormElement>(null);

  const [optimisticNews, addOptimisticNew] = useOptimistic(
    news,
    (state, newNew: New) => {
      return [...state, newNew];
    }
  );
  return (
    <>
      {optimisticNews.map((item) => {
        return (
          <div
            key={item.NewID}
            className="border-2  border-slate-800 m-10 p-10 rounded-lg w-1/2"
          >
            <h1>{item.Header}</h1>
            <h3>{item.Category}</h3>
            <p>{item.Text}</p>
          </div>
        );
      })}
      <form
        action={async (formData) => {
          ref.current.reset();
          addOptimisticNew({
            NewID: Math.random(),
            Header: formData.get("Header") as string,
            Category: formData.get("Category") as string,
            Text: formData.get("Text") as string,
          });
          await addNew(formData);
        }}
        ref={ref}
      >
        <input type="text" placeholder="Header" name="Header" />
        <input type="text" placeholder="Category" name="Category" />
        <input type="text" placeholder="Text" name="Text" />

        <Button>Отправить</Button>
      </form>
    </>
  );
}
