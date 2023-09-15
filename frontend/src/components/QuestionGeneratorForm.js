import React, { useState } from "react";
import usePostFetch from "../usePostFetch";

function QuestionGeneratorForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }

  const [questionContext, setQuestionContext] = useState("");
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await fetch("/api/genQue/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionContext }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate question");
      }

      const data = await response.json();
      console.log({ data });
      setQuestions(data.Qusetions);
      setAnswers(data.answers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="question-generator-container">
      <h2>Question Generator</h2>
      <textarea
        rows="4"
        cols="50"
        required
        placeholder="Enter context for question and answer generation"
        value={questionContext}
        onChange={(e) => setQuestionContext(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleGenerate}>Generate</button>

      {questions && (
        <div>
          <h3>Questions:</h3>
          <p>{questions.content}</p>
        </div>
      )}

      {answers && (
        <div>
          <h3>Answers:</h3>
          <p>{answers.content}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionGeneratorForm;
