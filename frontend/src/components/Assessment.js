import React, { useState } from "react";
import CreateAssessmentForm from "./CreateAssessmentForm";
import AssessmentTable from "./AssessmentTable";
import useFetch from "../useFetch";
import Header from "./header";

function Assessment() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/assessment/";
  const { data, error, isPending } = useFetch(url, token);
  if (data) {
    console.log(data);
  }
  return (
    <div className="w-full lg:w-1/3 mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
      <Header heading="Assessment" />
      <CreateAssessmentForm />
      {data && <AssessmentTable />}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Assessment;
