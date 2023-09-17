import React, { useState } from "react";
import { Link } from "react-router-dom";
Link;
function Login() {
  let role = ""; // Initialize the role variable

  const { pathname } = window.location;

  // Extract the role from the URL path
  if (pathname.includes("/auth/student")) {
    role = "student";
  } else if (pathname.includes("/auth/admin")) {
    role = "admin";
  } else if (pathname.includes("/auth/teacher")) {
    role = "teacher";
  }
  let userRole = `${role}ID`;

  const [formData, setFormData] = useState({
    adminID: "",
    studentID: "",
    teacherID: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData[userRole] || !formData.password) {
      return setError("Both fields are required.");
    } else {
      // Clear any previous error messages
      setError("");
    }

    // Construct the API endpoint based on the extracted role
    const apiUrl = `/api/${role}/login`;

    // Make a POST request to the appropriate API endpoint
    const fetchData = async () => {
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
            console.log("User available");
          }
        } else {
          const errorData = await response.json(); // Parse error response
          console.error("Login Error:", errorData);
        }
      } catch (error) {
        console.error("Network Error:", error);
      }
    };
    fetchData();
  };

  return (
    <div className="login">
      <div className="login-page">
        <div className="login-bg">
          <span>
            <img src="./Form Logo.png" width="100%" alt="School Logo" />
          </span>
          <p>Welcome Back!</p>
        </div>

        <div className="login-form">
          {/* Enrollment Form */}
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <p>Welcome back, please login to your account.</p>

            <label htmlFor={userRole}>Index Number</label>
            <input
              type="text"
              id={userRole}
              name={userRole}
              required
              value={formData.userRole}
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
              <a className="s_n" href="/enroll">
                Register
              </a>
            </div>

            {/* Display error message if there's an error */}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
