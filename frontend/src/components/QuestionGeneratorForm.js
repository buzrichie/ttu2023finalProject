import React, { useState } from "react";

function QuestionGeneratorForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return null; // Return null when there's no token
  }

  const [questionContext, setQuestionContext] = useState("");
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});

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
    <div className="question-generator-container p-4">
      <h2 className="text-2xl font-bold mb-4">Question Generator</h2>
      <textarea
        rows="4"
        cols="50"
        required
        className="border p-2 rounded-md w-full"
        placeholder="Enter context for question and answer generation"
        value={questionContext}
        onChange={(e) => setQuestionContext(e.target.value)}
      ></textarea>
      <br />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
      >
        Generate
      </button>

      {questions.content && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Questions:</h3>
          <p>{questions.content}</p>
        </div>
      )}

      {answers.content && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-green-600">Answers:</h3>
          <div className="response-text border-2 border-slate-300 px-2 py-3">
            {answers.content}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionGeneratorForm;
