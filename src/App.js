import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import CourseSelection from "./pages/CourseSelection";
import TestYourSkills from "./pages/TestYourSkills";
import Accomplishments from "./pages/Accomplishments";
import QuizletPage from "./pages/QuizletPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cookies from "js-cookie"; // Import js-cookie
import { auth } from "./firebase/firebaseConfig"; // Firebase auth
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore
import AddCourse from "./pages/AddCourse";
import CourseDetails from "./pages/CourseDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  const firestore = getFirestore();

  // Function to handle login and fetch user data from Firestore
  const handleLogin = async (user) => {
    try {
      // Fetch user details from Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setUsername(`${userData.firstName} ${userData.lastName}`);
      } else {
        console.error("No user data found in Firestore.");
      }

      setIsLoggedIn(true);
      setLoading(false); // Set loading to false once the user is logged in
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Check if the user is already logged in (check for the idToken cookie)
  useEffect(() => {
    const idToken = Cookies.get("idToken");
    if (idToken) {
      // Verify the token using Firebase Auth and automatically log in the user
      auth.onAuthStateChanged((user) => {
        if (user) {
          handleLogin(user); // Call handleLogin with the Firebase user object
        } else {
          setLoading(false); // If no user, stop loading
        }
      });
    } else {
      setLoading(false); // If no token found, stop loading
    }
  }, []);

  // Render the loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div> {/* Spinner in the center */}
      </div>
    );
  }

  return (
    <Router>
      {isLoggedIn ? (
        <Layout username={username}>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  username={username}
                  firstName={firstName}
                  lastName={lastName}
                />
              }
            />
            <Route path="/courses" element={<CourseSelection />} />
            <Route path={`/course/:courseName`} element={<CourseDetails />} />
            <Route path="/test-your-skills" element={<TestYourSkills />} />
            <Route path="/accomplishments" element={<Accomplishments />} />
            <Route path="/quizlet" element={<QuizletPage />} />
            <Route path="/add-course" element={<AddCourse />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
