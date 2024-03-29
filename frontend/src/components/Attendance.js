import React, { useState } from "react";
import CreateAttendanceForm from "./CreateAttendanceForm";
import AttendanceTable from "./AttendanceTable";
import useFetch from "../Hooks/useFetch";
import Header from "./header";
import IsError from "./prompt/isError";
import Loading from "./prompt/isLoading";

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
    <div className="w-full lg:w-1/3 mt-5 pt-5 sm:pt-0 sm:mt-0 p-2 sm:p-5">
      <Header heading="Attendance" />
      <CreateAttendanceForm />
      {data && <AttendanceTable />}
      {isPending && <Loading message="Fetching data..." />}
      {error && <IsError message={error} />}
    </div>
  );
}

export default Attendance;
