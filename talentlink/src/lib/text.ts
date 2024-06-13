import prisma from "./prisma";

export default async function handler() {

    const FirstName = "Ars";
    const LastName = "Yu";+
    const BirthDate = new Date();
    const Position = "position";
    const Salary = "12";


    const employee = await prisma.employee.create({
      data: {
        FirstName,
        LastName,
        BirthDate,
        Position,
        Salary: parseFloat(Salary),
      },
    });

    const employees = await prisma.employee.findMany();
    console.log(employees)

}
