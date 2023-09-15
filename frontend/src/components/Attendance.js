import React, { useState } from "react";
import CreateAttendanceForm from "./CreateAttendanceForm";
import AttendanceTable from "./AttendanceTable";
import useFetch from "../useFetch";

function Attendance() {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) {
    return;
  }

  const url = "/api/attendance/";
  const { data, error, isPending } = useFetch(url, token);
  if (data) {
    console.log(data);
  }

  return (
    <div>
      <h1>Attendance</h1>
      <CreateAttendanceForm />
      {data && <AttendanceTable />}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Attendance;
