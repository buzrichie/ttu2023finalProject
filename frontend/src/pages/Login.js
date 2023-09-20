import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

function Login() {
  // let role = ""; // Initialize the role variable
  const navigate = useNavigate();
  // const { pathname } = window.location;

  // Extract the role from the URL path
  // if (pathname.includes("/auth/student")) {
  //   role = "student";
  // } else if (pathname.includes("/auth/admin")) {
  //   role = "admin";
  // } else if (pathname.includes("/auth/teacher")) {
  //   role = "teacher";
  // }
  // let userRole = `${role}ID`;

  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  // Make a POST request to the appropriate API endpoint
  const fetchData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json));
        setUser(json);
        console.log("Success:", json);
        if (user) {
          navigate.push("/");
        }
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Login Error:", errorData.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.password) {
      return setError("Both fields are required.");
    } else {
      // Clear any previous error messages
      setError("");
    }
    // Construct the API endpoint based on the extracted role
    let apiUrl = "";
    if (formData.id.toLocaleLowerCase().includes("ad")) {
      apiUrl = "/api/admin/login";
    }
    if (formData.id.toLocaleLowerCase().includes("st")) {
      apiUrl = "/api/student/login";
    }
    if (formData.id.toLocaleLowerCase().includes("te")) {
      apiUrl = "/api/teacher/login";
    }

    fetchData(apiUrl);
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login-page">
          <div className="login-bg">
            <span>
              <img src="images/NavLogo.png" width="100%" alt="School Logo" />
            </span>
            <p>Welcome Back!</p>
          </div>

          <div className="login-form">
            {/* Enrollment Form */}
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>

              <p>Welcome back, please login to your account.</p>

              <label htmlFor="id">Index Number</label>
              <input
                type="text"
                id="id"
                name="id"
                required
                value={formData.id}
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />

              <label className="remember-me" htmlFor="remember-me">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                Remember Me
              </label>
              <a className="forget-password" href="#">
                Forget Password
              </a>

              <input type="submit" value="Login" />

              <div className="dregis">
                <p className="s_n">New Student?</p>
                <Link className="s_n" to="/enroll">
                  Register
                </Link>
              </div>

              {/* Display error message if there's an error */}
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
