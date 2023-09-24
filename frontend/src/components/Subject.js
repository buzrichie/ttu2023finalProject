import React, { useState } from "react";
import CreateSubjectForm from "./CreateSubjectForm";
import SubjectTable from "./SubjectTable";
import useFetch from "../useFetch";
import Header from "./header";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";

function Subject() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/subject/";
  const { data, error, isPending } = useFetch(url, token);
  return (
    <div className="w-full lg:w-1/3 mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
      <Header heading="Subject" />
      <CreateSubjectForm />
      {data && <SubjectTable data={data} />}
      {isPending && <Loading message="Fetching data..." />}
      {error && <IsError message={error} />}
    </div>
  );
}

export default Subject;
