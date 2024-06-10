"use client";
import { addNew } from "@/actions/news";
import { Button } from "../ui/button";
import { useOptimistic, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddNewFormData } from "@/lib/formShemas";

type Inputs = z.infer<typeof AddNewFormData>;

export default function CreateNews({ news }: { news: Inputs[] }) {
  const [optimisticNews, addOptimisticNew] = useOptimistic(
    news,
    (state, newNew: Inputs) => {
      return [...state, newNew];
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AddNewFormData),
  });

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
    </>
  );
}
