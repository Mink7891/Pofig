"use client";
import { addNew, deleteNew, updateItem } from "@/actions/news";
import { Button } from "../ui/button";
import { useOptimistic, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddNewFormData } from "@/lib/formShemas";

import { Cross1Icon } from "@radix-ui/react-icons";

type Inputs = z.infer<typeof AddNewFormData>;

export default function CreateNews({ news }: { news: Inputs[] }) {
  const [optimisticNews, addOptimisticNew] = useOptimistic(
    news,
    (state, newNew: Inputs) => {
      return [...state, newNew];
    }
  );
  const [headerText, setHeaderText] = useState("");
  // const [headerChange, setHeaderChange] = useState(false);
  //   const [categoryChange, setCategoryChange] = useState(false);
  //   const [textChange, setTextChange] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AddNewFormData),
  });
  //   function change() {
  //     setHeaderChange(true);
  //   }

  const processForm: SubmitHandler<Inputs> = async (data) => {
    addOptimisticNew({
      NewID: Math.random(),
      Header: data.Header,
      Category: data.Category,
      Text: data.Text,
    });
    await addNew(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <input type="text" placeholder="Header" {...register("Header")} />
        {errors.Header?.message && (
          <p className="text-sm text-red-400">{errors.Header.message}</p>
        )}
        <input type="text" placeholder="Category" {...register("Category")} />
        {errors.Category?.message && (
          <p className="text-sm text-red-400">{errors.Category.message}</p>
        )}
        {/* <input type="text" placeholder="Category" name="Category" /> */}
        <input type="text" placeholder="Text" {...register("Text")} />
        {errors.Text?.message && (
          <p className="text-sm text-red-400">{errors.Text.message}</p>
        )}

        <Button>Отправить</Button>
      </form>
      {optimisticNews.map((item) => {
        return (
          <div
            key={item.NewID}
            className="border-2  border-slate-800 m-10 p-10 rounded-lg w-1/2 grid grid-cols-2"
          >
            <div>
              <h1
                suppressHydrationWarning
                onDoubleClick={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                  e.currentTarget.querySelector("input").style.visibility =
                    "visible";
                }}
              >
                {item.Header}
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Введите название заголовка"
                  onChange={(e) => {
                    setHeaderText(e.currentTarget.value);
                  }}
                  onBlur={(e) => {
                    console.log(e.currentTarget.value);
                    updateItem(e.currentTarget.value, item.NewID);
                  }}
                  value={headerText}
                  style={{ visibility: "hidden" }}
                />
              </h1>
              <h3>{item.Category}</h3>
              <p>{item.Text}</p>
            </div>
            <div className="justify-self-end">
              <Cross1Icon onClick={() => deleteNew(item.NewID)} />
            </div>
          </div>
        );
      })}
    </>
  );
}
