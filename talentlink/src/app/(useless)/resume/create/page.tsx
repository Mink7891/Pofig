"use client";

import { useState, useEffect } from "react";
import { Button, TextField, Typography, Paper, Slider, Checkbox, FormControlLabel, Autocomplete } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateResume = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [desiredSalary, setDesiredSalary] = useState(0);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educations, setEducations] = useState([
    {
      institution: "",
      specialization: "",
      education_period_start: "",
      education_period_end: "",
      education_type: ""
    }
  ]);
  const [showWorkExperienceForm, setShowWorkExperienceForm] = useState(false); // State to control visibility of work experience form
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch skills from the API
    const fetchSkills = async () => {
      try {
       const response = await axios.get('/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (event, newSkill) => {
    setSelectedSkills(newSkill ? [newSkill, ...selectedSkills] : selectedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/resumes", {
        first_name: firstName,
        last_name: lastName,
        position,
        specialization,
        desired_salary: desiredSalary,
        workExperiences,
        educations,
        skills: selectedSkills,
      });
      console.log("Resume created:", response.data);
      router.push("/resume"); // Redirect to resume page after successful creation
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const addSkill = () => {
    if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, ""]);
    }
  };

  const handleSkillInputChange = (index, value) => {
    const updatedSkills = [...selectedSkills];
    updatedSkills[index] = value;
    setSelectedSkills(updatedSkills);
  };


  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        company: "",
        position: "",
        work_period_start: "",
        work_period_end: "",
        clients: "",
        project: "",
        team_members: "",
        project_role: "",
        completed_tasks: "",
        environment: "",
        tools: "",
        technologies: ""
      }
    ]);
    setShowWorkExperienceForm(true); // Show the work experience form when adding a new work experience
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        institution: "",
        specialization: "",
        education_period_start: "",
        education_period_end: "",
        education_type: ""
      }
    ]);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences[index][field] = value;
    setWorkExperiences(newWorkExperiences);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const handleDesiredSalaryChange = (e, newValue) => {
    setDesiredSalary(newValue);
  };

  return (
    <Paper style={{ padding: 16, margin: 16 }}>
      <Typography variant="h5">Создать новое резюме</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Имя"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <TextField
          fullWidth
          label="Фамилия"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <TextField
          fullWidth
          label="Должность"
          variant="outlined"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <TextField
          fullWidth
          label="Специализация"
          variant="outlined"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Typography variant="h6" style={{ marginBottom: 8 }}>
          Желаемая заработная плата
        </Typography>
        <Slider
          value={desiredSalary}
          onChange={handleDesiredSalaryChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          marks={[
            { value: 0, label: "0" },
            { value: 10000, label: "10 000" },
            { value: 50000, label: "50 000" },
            { value: 100000, label: "100 000" },
            { value: 150000, label: "150 000" },
            { value: 200000, label: "200 000" },
            { value: 250000, label: "250 000" },
            { value: 300000, label: "300 000" },
            { value: 350000, label: "350 000" },
            { value: 400000, label: "400 000" },
            { value: 450000, label: "450 000" },
            { value: 500000, label: "500 000" }
          ]}
          step={10000}
          style={{ marginBottom: 16 }}
        />

        {/* Autocomplete for selecting skills */}
        <Typography variant="h6" style={{ marginBottom: 8 }}>
          Умения (Выберите до 5 умений)
        </Typography>
        {selectedSkills.map((skill, index) => (
          <Autocomplete
            key={index}
            options={skills}
            getOptionLabel={(option) => option.skill_name}
            value={skill}
            onChange={(event, newValue) =>
              handleSkillInputChange(index, newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={`Умение ${index + 1}`}
                placeholder="Выберите или введите умение"
                fullWidth
              />
            )}
          />
        ))}
        {selectedSkills.length < 5 && (
          <Button
            onClick={addSkill}
            variant="outlined"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Добавить умение
          </Button>
        )}

        <br></br>
        <br></br>

        {showWorkExperienceForm && (
          <>
            <Typography variant="h6">Опыт Работы</Typography>
            {workExperiences.map((workExperience, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <TextField
                  fullWidth
                  label="Компания"
                  variant="outlined"
                  value={workExperience.company}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "company", e.target.value)
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Должность"
                  variant="outlined"
                  value={workExperience.position}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "position", e.target.value)
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Начало работы"
                  type="date"
                  variant="outlined"
                  value={workExperience.work_period_start}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "work_period_start",
                      e.target.value
                    )
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Окончание работы"
                  type="date"
                  variant="outlined"
                  value={workExperience.work_period_end}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "work_period_end",
                      e.target.value
                    )
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Клиенты"
                  variant="outlined"
                  value={workExperience.clients}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "clients", e.target.value)
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Проект"
                  variant="outlined"
                  value={workExperience.project}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "project", e.target.value)
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Участники команды"
                  variant="outlined"
                  value={workExperience.team_members}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "team_members",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Роль в проекте"
                  variant="outlined"
                  value={workExperience.project_role}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "project_role",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Выполненные задачи"
                  variant="outlined"
                  value={workExperience.completed_tasks}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "completed_tasks",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Окружение"
                  variant="outlined"
                  value={workExperience.environment}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "environment",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Инструменты"
                  variant="outlined"
                  value={workExperience.tools}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "tools", e.target.value)
                  }
                  style={{ marginBottom: 8 }}
                />
                <TextField
                  fullWidth
                  label="Технологии"
                  variant="outlined"
                  value={workExperience.technologies}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "technologies",
                      e.target.value
                    )
                  }
                  style={{ marginBottom: 8 }}
                />
              </div>
            ))}
          </>
        )}

        <Button
          onClick={addWorkExperience}
          variant="contained"
          color="secondary"
          style={{ marginBottom: 16 }}
        >
          Добавить опыт работы
        </Button>

        <Typography variant="h6">Образование</Typography>
        {educations.map((education, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <TextField
              fullWidth
              label="Учебное заведение"
              variant="outlined"
              value={education.institution}
              onChange={(e) =>
                handleEducationChange(index, "institution", e.target.value)
              }
              style={{ marginBottom: 8 }}
            />
            <TextField
              fullWidth
              label="Специализация"
              variant="outlined"
              value={education.specialization}
              onChange={(e) =>
                handleEducationChange(index, "specialization", e.target.value)
              }
              style={{ marginBottom: 8 }}
            />
            <TextField
              fullWidth
              label="Начало обучения"
              type="date"
              variant="outlined"
              value={education.education_period_start}
              onChange={(e) =>
                handleEducationChange(
                  index,
                  "education_period_start",
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true
              }}
              style={{ marginBottom: 8 }}
            />
            <TextField
              fullWidth
              label="Окончание обучения"
              type="date"
              variant="outlined"
              value={education.education_period_end}
              onChange={(e) =>
                handleEducationChange(
                  index,
                  "education_period_end",
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true
              }}
              style={{ marginBottom: 8 }}
            />
            <TextField
              fullWidth
              label="Тип образования"
              variant="outlined"
              value={education.education_type}
              onChange={(e) =>
                handleEducationChange(index, "education_type", e.target.value)
              }
              style={{ marginBottom: 8 }}
            />
          </div>
        ))}

        <Button
          onClick={addEducation}
          variant="contained"
          color="secondary"
          style={{ marginBottom: 16 }}
        >
          Добавить образование
        </Button>

        <br />
        <Button type="submit" variant="contained" color="primary">
          Создать резюме
        </Button>
      </form>
    </Paper>
  );
};

export default CreateResume;