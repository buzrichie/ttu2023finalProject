import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import ApplicationTable from "./ApplicationTable";
import useFetch from "../useFetch";

function Application() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }
  const url = "/api/application/";
  const { data, error, isPending } = useFetch(url, token);
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <h1>Application</h1>
      <ApplicationForm />
      {data && <ApplicationTable />}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Application;
