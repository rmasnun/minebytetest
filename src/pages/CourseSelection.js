import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(coursesCollection);
      const courseList = courseSnapshot.docs.map((doc) => doc.data());
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseName) => {
    navigate(`/course/${courseName}`);
  };

  return (
    <Box
      className="courses-grid"
      mt={4}
      display="grid"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns="repeat(4, 1fr)"
      gap={2}
    >
      {Array.isArray(courses) &&
        courses?.map((course, index) => (
          <Card
            key={index}
            variant="outlined"
            onClick={() => handleCourseClick(course.courseName)}
            sx={{
              cursor: "pointer",
              padding: "10px",
              textAlign: "center",
              bgcolor: "#8a90ed",
              color: "white",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {course?.courseName}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};

export default CourseSelection;
