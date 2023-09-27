import React, { useState } from "react";
import fetchDataPost from "../Hooks/usePostFetch";
import QuestionGeneratorForm from "./QuestionGeneratorForm";
import Header from "./header";

function GenerateQuestion() {
  return (
    <div className="w-full mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
      <Header heading="Question Generator" />
      <QuestionGeneratorForm />
    </div>
  );
}

export default GenerateQuestion;
