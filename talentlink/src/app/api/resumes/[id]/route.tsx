import { Pool } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;
  let client;

  if (req.method === 'DELETE') {
    try {
      client = await pool.connect();

      // Start a transaction
      await client.query('BEGIN');

      // Delete related records in other tables
      await client.query('DELETE FROM resumeeducation WHERE resume_id = $1', [Number(id)]);
      await client.query('DELETE FROM resumeskills WHERE resume_id = $1', [Number(id)]);
      await client.query('DELETE FROM resumeworkexperience WHERE resume_id = $1', [Number(id)]);

      // Delete the resume
      const result = await client.query('DELETE FROM resume WHERE id = $1', [Number(id)]);
      
      // Commit the transaction
      await client.query('COMMIT');

      client.release();

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Resume not found' });
      } else {
        res.status(200).json({ message: 'Resume deleted' });
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      if (client) {
        await client.query('ROLLBACK');
        client.release();
      }
      res.status(500).json({ error: 'Failed to delete resume' });
    }
  } else if (req.method === 'PUT') {
    const { position, specialization, first_name, last_name, desired_salary } = req.body;
    try {
      client = await pool.connect();
      const result = await client.query(
        'UPDATE resume SET position = $1, specialization = $2, first_name = $3, last_name = $4, desired_salary = $5 WHERE id = $6 RETURNING *',
        [position, specialization, first_name, last_name, desired_salary, Number(id)]
      );
      client.release();

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Resume not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error updating resume:', error);
      if (client) {
        client.release();
      }
      res.status(500).json({ error: 'Failed to update resume' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}