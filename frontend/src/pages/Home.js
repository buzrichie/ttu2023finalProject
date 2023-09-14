import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Database from "../components/Database";
import UserProfile from "../components/UserProfile";
import useFetch from "../useFetch";
import NoticeBoard from "../components/NoticeBoard";

function Home() {
  const [database, setDatabase] = useState(null);
  const [data, setData] = useState(null);
  const { admin, token } = JSON.parse(localStorage.getItem("user"));
  const { _id, role } = admin;
  if (!admin || !token) {
    return;
  }
  const url = `/api/${role}/${_id}`;
  const { data: fetchDa, error, isPending } = useFetch(url, token);
  if (fetchDa) {
    console.log(fetchDa);
  }

  return (
    <div className="content">
      {/* Add your main content here */}
      <div>
        {fetchDa && <UserProfile />}
        <NoticeBoard />
      </div>
      <div>
        <p>hello</p>
      </div>
      {isPending && <p>Loading...</p>}
    </div>
  );
}

export default Home;
