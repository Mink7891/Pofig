"use client";

import { useState, useEffect } from "react";
import { Button, Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import axios from "axios";
import jsPDF from "jspdf";

const Resume = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios.get("/api/resumes")
      .then(response => setResumes(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/resumes/${id}`)
      .then(() => setResumes(resumes.filter(resume => resume.id !== id)))
      .catch(error => console.error(error));
  };

  const generatePDF = (resume) => {
    const doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.text(`Position: ${resume.position}`, 10, 20);
    // Add more resume details here
    doc.save("resume.pdf");
  };

  return (
    <div>
      {resumes.length ? (
        resumes.map(resume => (
          <Paper key={resume.id} style={{ padding: 16, margin: 16 }}>
            <Typography variant="h5">{resume.position}</Typography>
            <List>
              {/* Render resume details */}
              <ListItem>
                <ListItemText primary="Position" secondary={resume.position} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(resume.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Button variant="contained" onClick={() => generatePDF(resume)}>Download PDF</Button>
          </Paper>
        ))
      ) : (
        <Typography variant="h6">
          Похоже у вас ещё нет ни одного резюме, вы можете создать его <Link href="/resume/create">тут</Link>.
        </Typography>
      )}
    </div>
  );
};

export default Resume;