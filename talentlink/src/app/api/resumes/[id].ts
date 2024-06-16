import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.resume.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Resume deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete resume' });
    }
  } else if (req.method === 'PUT') {
    const { position } = req.body;
    try {
      const resume = await prisma.resume.update({
        where: { id: Number(id) },
        data: { position },
      });
      res.status(200).json(resume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update resume' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}