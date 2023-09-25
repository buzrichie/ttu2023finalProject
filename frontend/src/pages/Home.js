import useFetch from "../Hooks/useFetch";
import jwt_decode from "jwt-decode";
import Dashboard from "../components/Dashboard";
import StatusInformation from "../components/enroll/statusInformation";
import Loading from "../components/prompt/isLoading";
import IsError from "../components/prompt/isError";

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
  console.log(role);
  const url = `/api/${role}/${id}`;
  // const [user, setUser] = useState(null);
  const { data, error, isPending } = useFetch(url, token);
  if (data) {
    localStorage.setItem("userData", JSON.stringify(data));
  }
  return (
    <>
      {data && !data.enroll ? <Dashboard data={data} role={role} /> : ""}
      {data && data.enroll ? <StatusInformation data={data.enroll} /> : ""}
      {/* {<Dashboard />} */}
      {isPending && <Loading message="fetching data..." />}
      {error && <IsError message={error} />}
    </>
  );
}

export default Home;
