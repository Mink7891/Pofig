// import { Button } from "@/components/ui/button";
// import prisma from "@/lib/prisma";
// import Link from "next/link";

// export default async function About() {
//   return (
//     <>
//       <h1>about page</h1>

//       <Link href="/">
//         <Button>Обратно</Button>
//       </Link>
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { addEntry } from "@/app/_actions";

const FormDataSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  message: z
    .string()
    .min(6, { message: "Message must be at least 6 characters." }),
});

type Inputs = z.infer<typeof FormDataSchema>;

async function addEntry(data: Inputs) {
  const result = FormDataSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

export default function RhfWithAction() {
  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addEntry(data);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    reset();
    setData(result.data);
  };

  return (
    <section className="flex gap-6">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 sm:w-1/2"
      >
        <input
          placeholder="name"
          className="rounded-lg"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}

        <input
          placeholder="message"
          className="rounded-lg"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}

        <button className="rounded-lg bg-black py-2 text-white">Submit</button>
      </form>

      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
