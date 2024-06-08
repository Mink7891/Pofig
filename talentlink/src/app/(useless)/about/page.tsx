import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function About() {
  // const FirstName = "Ching";
  // const LastName = "chong";
  // const BirthDate = new Date();
  // const Position = "position";
  // const Salary = "10";

  // const employee = await prisma.employee.create({
  //   data: {
  //     FirstName,
  //     LastName,
  //     BirthDate,
  //     Position,
  //     Salary: parseFloat(Salary),
  //   },
  // });

  // const employees = await prisma.employee.findMany();
  // console.log(employees);

  return (
    <>
      <h1>about page</h1>

      <Link href="/">
        <Button>Обратно</Button>
      </Link>
    </>
  );
}
