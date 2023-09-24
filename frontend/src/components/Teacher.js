import React, { useState } from "react";
import CreateTeacherForm from "./CreateTeacherForm";
import TeacherTable from "./TeacherTable";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";
import useFetch from "../Hooks/useFetch";
import Header from "./header";

function Teacher() {
  const [formData, setFormData] = useState({
    _Subject: "", // Assuming this represents Subject ID
    level: "",
    _School: "", // Assuming this represents School ID
  });

  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/teacher/";
  const { data, error, isPending } = useFetch(url, token);

  return (
    <div className="w-full mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
      <Header heading="Teacher" />
      <CreateTeacherForm />
      {/* {data && <TeacherTable />} */}
      {isPending && <Loading message="Fetching data..." />}
      {error && <IsError message={error} />}
    </div>
  );
}

export default Teacher;
