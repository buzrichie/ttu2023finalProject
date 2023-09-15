import React, { useState } from "react";
import fetchDataPost from "../usePostFetch";
import QuestionGeneratorForm from "./QuestionGeneratorForm";

function GenerateQuestion() {
  return (
    <div>
      <QuestionGeneratorForm />
    </div>
  );
}

export default GenerateQuestion;
