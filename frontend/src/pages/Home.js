import useFetch from "../useFetch";
import jwt_decode from "jwt-decode";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

function Home() {
  const { token } = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    throw new Error("Autorization token not found");
  }

  let role;
  let id;
  if (token) {
    const decodedToken = jwt_decode(token);
    // Access the user's role from the decoded token
    role = decodedToken.role.toUpperCase();
    id = decodedToken.id;
  } else {
    throw new Error("Authorization failed.");
  }
  const url = `/api/${role}/${id}`;
  // const [user, setUser] = useState(null);
  const { data, error, isPending } = useFetch(url, token);
  if (data) {
    console.log(data.enroll);
    // setUser(data);
    localStorage.setItem("userData", JSON.stringify(data));
  }
  return (
    <>
      {data && !data.enroll ? <Dashboard /> : ""}
      {/* {<Dashboard />} */}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </>
  );
}

export default Home;
