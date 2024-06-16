import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

// Настройка динамического маршрута
export const dynamic = "force-dynamic";

// Подключение к базе данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, skill_name FROM skills');
    client.release(); // Release the client back to the pool

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Если вы хотите также добавить возможность POST запросов
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skill_name } = body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO skills (skill_name) VALUES ($1) RETURNING *',
      [skill_name]
    );
    client.release(); // Release the client back to the pool

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}