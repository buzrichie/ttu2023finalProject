import useFetch from "../useFetch";
import jwt_decode from "jwt-decode";
import Dashboard from "../components/Dashboard";

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
    role = decodedToken.role;
    id = decodedToken.id;
  } else {
    throw new Error("Authorization failed.");
  }
  const url = `/api/${role}/${id}`;
  const { data, error, isPending } = useFetch(url, token);
  if (data) {
    console.log(data);
  }
  return (
    <>
      {data && <Dashboard />}
      {/* {<Dashboard />} */}
      {isPending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </>
  );
}

export default Home;
