"use client";

import { useState, useEffect } from "react";
import {Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Category = {
  name: string;
  dataTarget: string;
};

type Vacancy = {
  title: string;
  description: string;
  link: string;
};


export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchVacancies(selectedCategory);
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const res = await fetch('http://localhost:5000/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  }

  async function fetchVacancies(category: string) {
    try {
      let url;
      if (category === 'All') {
        url = 'http://localhost:5000/vacancies'; // Эндпойнт для всех вакансий
      } else {
        url = `http://localhost:5000/vacancies_by_category?category_id=${category}`; // Эндпойнт для вакансий по категориям
      }
      const res = await fetch(url);
      const data = await res.json();
      setVacancies(data);
    } catch (error) {
      setError('Failed to fetch vacancies');
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Вакансии</h1>
      {/* <Button onClick={() => setShowDialog(true)} className="mb-4 font-bold py-2 px-4 rounded">
        Добавить вакансию
      </Button> */}
      <div className="mb-4">
        {categories.map((category) => (
          <Button key={category.dataTarget} onClick={() => setSelectedCategory(category.dataTarget)} className="mr-2 mb-2 font-bold py-2 px-4 rounded">
            {category.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacancies.map((vacancy, index) => (
          <Card key={index} className="vacancy">
            <CardHeader>
              <CardTitle>{vacancy.title}</CardTitle>
              <CardDescription>{vacancy.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/vacancies/info_vacancies?link=${encodeURIComponent(vacancy.link)}`} passHref>
                <Button>Подробнее</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новую вакансию</DialogTitle>
            </DialogHeader>
            <Input placeholder="Название вакансии" className="mb-4" />
            <Input placeholder="Описание вакансии" className="mb-4" />
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Отмена</Button>
              <Button onClick={() => {
                
                setShowDialog(false);
              }}>Сохранить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  );
}

