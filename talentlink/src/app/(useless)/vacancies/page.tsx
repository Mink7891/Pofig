"use client";

import { useState, useEffect } from "react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";

type Vacancy = {
  title: string;
  description: string;
  link: string;
};

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVacancies() {
      try {
        const response = await fetch('http://localhost:5000/vacancies');
        const data = await response.json();
        setVacancies(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchVacancies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Вакансии</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacancies.map((vacancy, index) => (
          <Card key={index} className="vacancy">
            <CardHeader>
              <CardTitle>{vacancy.title}</CardTitle>
              <CardDescription>{vacancy.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/vacancies/info_vacancies?link=${vacancy.link}`} passHref>
                <Button>Подробнее</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
