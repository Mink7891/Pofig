import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT * FROM resume');
    client.release();
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    if (client) {
      client.release();
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { first_name, last_name, position, specialization, desired_salary, workExperiences = [], educations = [], skills = [] } = data;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert resume
      const insertResumeQuery = `
        INSERT INTO public.resume (first_name, last_name, position, specialization, desired_salary)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const resumeResult = await client.query(insertResumeQuery, [first_name, last_name, position, specialization, desired_salary]);
      const resumeId = resumeResult.rows[0].id;

      // Insert educations and link to resume
      for (const edu of educations) {
        const insertEducationQuery = `
          INSERT INTO public.education (institution, specialization, education_period, education_type)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `;
        const educationResult = await client.query(insertEducationQuery, [
          edu.institution,
          edu.specialization,
          edu.education_period,
          edu.education_type,
        ]);
        const educationId = educationResult.rows[0].id;

        const insertResumeEducationQuery = `
          INSERT INTO public.resumeeducation (resume_id, education_id)
          VALUES ($1, $2)
        `;
        await client.query(insertResumeEducationQuery, [resumeId, educationId]);
      }

      // Insert work experiences and link to resume
      if (workExperiences.length > 0) {
        for (const work of workExperiences) {
          const insertWorkExperienceQuery = `
            INSERT INTO public.workexperience (company, position, work_period, clients, project, team_members, project_role, completed_tasks, environment, tools, technologies)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
          `;
          const workExperienceResult = await client.query(insertWorkExperienceQuery, [
            work.company,
            work.position,
            work.work_period,
            work.clients,
            work.project,
            work.team_members,
            work.project_role,
            work.completed_tasks,
            work.environment,
            work.tools,
            work.technologies,
          ]);
          const workExperienceId = workExperienceResult.rows[0].id;

          const insertResumeWorkExperienceQuery = `
            INSERT INTO public.resumeworkexperience (resume_id, work_experience_id)
            VALUES ($1, $2)
          `;
          await client.query(insertResumeWorkExperienceQuery, [resumeId, workExperienceId]);
        }
      }

      // Insert skills and link to resume
      if (skills.length > 0) {
        for (const skill of skills) {
          const insertResumeSkillsQuery = `
            INSERT INTO public.resumeskills (resume_id, skill_id)
            VALUES ($1, $2)
          `;
          await client.query(insertResumeSkillsQuery, [resumeId, skill.id]);
        }
      }

      await client.query('COMMIT');
      client.release();

      return NextResponse.json({ message: 'Resume created successfully' }, { status: 201 });
    } catch (error) {
      await client.query('ROLLBACK');
      client.release();
      console.error('Error creating resume:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export function OPTIONS() {
  return NextResponse.json({ allow: ['GET', 'POST'] }, { status: 200 });
}