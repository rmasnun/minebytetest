// Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for redirect
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../firebase/firebaseConfig"; // Import the Firebase auth instance
import "./Header.css";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

const Header = () => {
  const [isTranslucent, setIsTranslucent] = useState(false);
  const navigate = useNavigate(); // To navigate after logout

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsTranslucent(true);
    } else {
      setIsTranslucent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      // Perform Firebase logout
      await signOut(auth);

      // Remove the idToken cookie after logout
      Cookies.remove("idToken");

      // Redirect to the login page
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className={`header ${isTranslucent ? "translucent" : ""}`}>
      <Link to="/" className="brand">
        MineByte
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/test-your-skills">Test Your Skills</Link>
        <Link to="/accomplishments">Accomplishments</Link>
        <Link to="/quizlet">Quizlet</Link>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>{" "}
        {/* Add Logout Link */}
      </nav>
    </header>
  );
};

export default Header;
