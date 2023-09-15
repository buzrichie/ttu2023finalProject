import React, { useState } from "react";
import CreateAssessmentForm from "./CreateAssessmentForm";
import AssessmentTable from "./AssessmentTable";
import useFetch from "../useFetch";

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
    <div>
      <h1>Assessment</h1>
      <CreateAssessmentForm />
      {data && <AssessmentTable />}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Assessment;
