// CourseDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Box, Typography, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CourseDetails = () => {
  const { courseName } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const coursesCollection = collection(db, "courses");
      const q = query(coursesCollection, where("courseName", "==", courseName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setCourse(querySnapshot.docs[0].data());
      }
    };

    fetchCourse();
  }, [courseName]);

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper
        elevation={3}
        sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
      >
        <Typography variant="h4" gutterBottom>
          {course.courseName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Description:
        </Typography>
        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Learning Hours:
        </Typography>
        <Typography variant="body1" paragraph>
          {course.learningHours} hours
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Enrollment:
        </Typography>
        <Typography variant="body1">
          {course.isFree ? "Free" : "Paid"}
        </Typography>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={2}
        >
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ background: "#6B73E8" }}
          >
            Enrol
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CourseDetails;
