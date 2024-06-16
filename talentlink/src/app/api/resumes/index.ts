import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const resumes = await prisma.resume.findMany({
        include: {
          skills: {
            include: { skill: true },
          },
          workExperience: {
            include: { work_experience: true },
          },
          education: {
            include: { education: true },
          },
        },
      });
      res.status(200).json(resumes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resumes' });
    }
  } else if (req.method === 'POST') {
    const { position, specialization } = req.body;
    try {
      const resume = await prisma.resume.create({
        data: { position, specialization },
      });
      res.status(201).json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create resume' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}