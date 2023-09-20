import React, { useState } from "react";
import CreateAcademicLevelForm from "./CreateAcademicLevelForm";
import AcademicLevelTable from "./AcademicLevelTable";
import useFetch from "../useFetch";

function AcademicLevel() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/academicLevel/";
  const { data, error, isPending } = useFetch(url, token);

  return (
    <div>
      <h1>Class</h1>
      <CreateAcademicLevelForm />
      {data && <AcademicLevelTable data={data} />}
      {isPending && <p> Loading... </p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default AcademicLevel;
