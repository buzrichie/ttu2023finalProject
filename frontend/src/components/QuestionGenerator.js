import React, { useState } from "react";
import fetchDataPost from "../Hooks/usePostFetch";
import QuestionGeneratorForm from "./QuestionGeneratorForm";

function GenerateQuestion() {
  return (
    <div>
      <QuestionGeneratorForm />
    </div>
  );
}

export default GenerateQuestion;
