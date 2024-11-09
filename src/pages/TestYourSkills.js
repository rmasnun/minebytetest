import React, { useState } from 'react';
import './TestYourSkills.css';

const questions = {
  Cpp: [
    "What is a pointer in C++?",
    "Write a program to reverse a linked list.",
    "What is the difference between 'new' and 'malloc'?",
    // ... Add more questions
  ],
  Java: [
    "Explain the concept of JVM in Java.",
    "Write a Java program to check if a number is prime.",
    "What are checked and unchecked exceptions?",
    // ... Add more questions
  ],
  Python: [
    "What is the difference between a list and a tuple in Python?",
    "Write a Python function to find the Fibonacci sequence.",
    "Explain how memory management works in Python.",
    // ... Add more questions
  ],
};

const TestYourSkills = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState([]);
  
  const handleLanguageSelection = (language) => {
    const languageQuestions = questions[language];
    const shuffledQuestions = languageQuestions.sort(() => 0.5 - Math.random());
    setRandomQuestions(shuffledQuestions.slice(0, 3));  // Pick 3 random questions
    setSelectedLanguage(language);
  };

  const handleSwitchLanguage = () => {
    setSelectedLanguage(null);
    setRandomQuestions([]);
  };

  const handleLeavePage = () => {
    setShowDialog(true);
  };

  const confirmLeave = (confirm) => {
    if (confirm) {
      // Logic for handling page leave (e.g., navigate away)
      setSelectedLanguage(null);
      setRandomQuestions([]);
    }
    setShowDialog(false);
  };

  return (
    <div className="skills-selection">
      {!selectedLanguage ? (
        <>
          <h2 style={{ marginTop: '50px' }}>Select a language to test your skills</h2>
          <div className="language-options">
            <button onClick={() => handleLanguageSelection('Cpp')}>C++</button>
            <button onClick={() => handleLanguageSelection('Java')}>Java</button>
            <button onClick={() => handleLanguageSelection('Python')}>Python</button>
          </div>
        </>
      ) : (
        <div className="compiler-container">
          <div className="compiler">
            <h3>{selectedLanguage} Compiler (Placeholder)</h3>
            <p>Your code here...</p>
            <textarea rows="10" cols="60"></textarea>
          </div>
          <div className="questions">
            <h3>{selectedLanguage} Questions</h3>
            {randomQuestions.map((q, index) => (
              <div key={index} className="question-item">
                <p>{index + 1}. {q}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedLanguage && (
        <>
          <button onClick={handleSwitchLanguage}>Switch Language</button>
          <button onClick={handleLeavePage}>Leave Test</button>
        </>
      )}
      
      {showDialog && (
        <div className="dialog">
          <p className="dialog-message">You won't be able to come back to this session. Do you want to leave?</p>
          <div className="dialog-buttons">
            <button onClick={() => confirmLeave(true)}>Yes</button>
            <button onClick={() => confirmLeave(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestYourSkills;
