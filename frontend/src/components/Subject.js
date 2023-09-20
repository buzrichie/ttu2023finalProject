import React, { useState } from "react";
import CreateSubjectForm from "./CreateSubjectForm";
import SubjectTable from "./SubjectTable";
import useFetch from "../useFetch";

function Subject() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/subject/";
  const { data, error, isPending } = useFetch(url, token);
  return (
    <div>
      <h1>Subject</h1>
      <CreateSubjectForm />
      {data && <SubjectTable data={data} />}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Subject;
