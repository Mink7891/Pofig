"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type VacancyDetail = {
  job_title: string;
  tasks: string[];
  required_skills: string[];
  preferred_skills: string[];
  contact_info: string;
  we_offer: { name: string; description: string }[];
};

export default function VacancyDetailPage() {
  const searchParams = useSearchParams();
  const link = searchParams.get('link');

  const [vacancyDetail, setVacancyDetail] = useState<VacancyDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVacancyDetail() {
      try {
        const response = await fetch(`http://localhost:5000/vacancy_detail?link=${link}`);
        const data = await response.json();
        setVacancyDetail(data);
      } catch (error) {
        setError(error.message);
      }
    }
  
    fetchVacancyDetail();
  }, [link]);

  if (!vacancyDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{vacancyDetail.job_title}</h1>
      <Card>
      {vacancyDetail.tasks && vacancyDetail.tasks.length > 0 && (
        <>
          <CardHeader>
            <CardTitle>Задачи</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {vacancyDetail.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </CardContent>
        </>
      )}
      {vacancyDetail.preferred_skills && vacancyDetail.preferred_skills.length > 0 && (
        <>
          <CardHeader>
            <CardTitle>Будет плюсом</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {vacancyDetail.preferred_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </CardContent>
        </>
      )}

      {vacancyDetail.we_offer && vacancyDetail.we_offer.length > 0 && (
        <>
          <CardHeader>
            <CardTitle>Мы предлагаем</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vacancyDetail.we_offer.map((offer, index) => (
                <div key={index} className=" p-4 rounded shadow-md">
                  <h2 className="text-xl font-bold mb-2">{offer.name}</h2>
                  <p>{offer.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </>
      )}

      {vacancyDetail.contact_info && (
        <>
          <CardHeader>
            <CardTitle>Контакты</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{vacancyDetail.contact_info}</p>
          </CardContent>
        </>
      )}
      </Card>
    </div>
  );
}
