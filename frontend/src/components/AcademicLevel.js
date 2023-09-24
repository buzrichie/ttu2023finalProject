import React, { useState } from "react";
import CreateAcademicLevelForm from "./CreateAcademicLevelForm";
import AcademicLevelTable from "./AcademicLevelTable";
import useFetch from "../Hooks/useFetch";
import Header from "./header";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";

function AcademicLevel() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/academicLevel/";
  const { data, error, isPending } = useFetch(url, token);

  return (
    <>
      <div className="w-full lg:w-1/3 mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
        <Header heading="Class" />
        <CreateAcademicLevelForm />
        {data && <AcademicLevelTable data={data} />}
        {isPending && <Loading message="Fetching data..." />}
        {error && <IsError message={error} />}
      </div>
    </>
  );
}

export default AcademicLevel;
