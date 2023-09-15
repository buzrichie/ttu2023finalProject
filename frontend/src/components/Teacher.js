import React, { useState } from "react";
import fetchDataPost from "../usePostFetch";
import CreateTeacherForm from "./CreateTeacherForm";
import TeacherTable from "./TeacherTable";

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
    <div>
      <h1>Teacher</h1>
      <CreateTeacherForm />
      {data && <TeacherTable />}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Teacher;
