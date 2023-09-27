import React, { useState } from "react";
import Loading from "./prompt/isLoading";
import IsError from "./prompt/isError";

function QuestionGeneratorForm() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return null; // Return null when there's no token
  }

  const [questionContext, setQuestionContext] = useState("");
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/genQue/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionContext }),
      });

      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        throw new Error(data.error);
      }

      console.log({ data });
      setQuestions(data.Qusetions);
      setAnswers(data.answers);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(data.error);
      setLoading(false);
      console.error(error.message);
    }
  };

  return (
    <div className="question-generator-container p-4">
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
      {loading && <Loading message="Generating response ..." />}
      {error && <IsError message={error} />}
    </div>
  );
}

export default QuestionGeneratorForm;
