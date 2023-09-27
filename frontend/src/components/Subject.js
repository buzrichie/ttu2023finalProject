import React, { useState } from "react";
import CreateSubjectForm from "./CreateSubjectForm";
import SubjectTable from "./SubjectTable";
import useFetch from "../Hooks/useFetch";
import Header from "./header";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";

function Subject() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const { admin } = JSON.parse(localStorage.getItem("userData"));
  if (!token) {
    return;
  }
  const url = "/api/subject/";
  const { data, error, isPending } = useFetch(url, token);

  let id = "";
  if (admin && admin.school) {
    id = admin.school._id;
  }
  return (
    <div className="w-full lg:w-1/3 mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
      <Header heading="Subject" />
      <CreateSubjectForm school={id} />
      {data && <SubjectTable data={data} />}
      {isPending && <Loading message="Fetching data..." />}
      {error && <IsError message={error} />}
    </div>
  );
}

export default Subject;
