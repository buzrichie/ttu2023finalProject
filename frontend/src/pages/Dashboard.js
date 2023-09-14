import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Database from "../components/Database";
import UserProfile from "../components/UserProfile";

function Dashboard() {
  const [database, setDatabase] = useState(null);
  const [data, setData] = useState(null);
  const { admin, token } = JSON.parse(localStorage.getItem("user"));
  const { _id, role } = admin;
  if (!admin || !token) {
    return;
  }

  useEffect(() => {
    //Fetch -Get- with Authorization Header
    const getData = async () => {
      const response = await fetch(`/api/${role}/${_id}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          // Authorization header with the authToken
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw Error(json);
      }
      if (response.ok) {
        console.log("successful fetched data ", json);
        setData(json);
      }
    };
    getData();
  }, []);

  //Fetch -Get- with Authorization Header
  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch("/api/school/6500bd2c639c040ead8d5378", {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          // Authorization header with the authToken
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        setDatabase(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <img src="school_logo.png" alt="School Logo" />
        </div>
        <ul className="nav-tabs">
          <li>
            <a href="#">
              <i className="fas fa-home"></i> Dashboard
            </a>
          </li>
          <li>
            <Link to="#" onClick={handleClick}>
              <i className="fas fa-user"></i> Userbase
            </Link>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-chalkboard"></i> Courses
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-calendar"></i> G-Question
            </a>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
        {/* ... (previous HTML code) */}
        <div className="actions">
          <ul className="action-list">
            <li>
              <a href="#">
                <i className="fas fa-file-alt"></i> Reports
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-question-circle"></i> Help
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-cog"></i> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-info">
          <div className="notification">
            <i className="fas fa-bell"></i>
          </div>
          <div className="avatar">
            <img src="user_avatar.png" alt="User Avatar" />
          </div>
          <div className="user-name">John Doe</div>
          {/* Replace with the user's name */}
        </div>
      </div>
      <div className="main-content">
        {/* Add your main content here */}
        {data && <UserProfile />}
        {database && (
          <Database key={database._id} database={database} title="Student" />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
