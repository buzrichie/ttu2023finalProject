import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
// Import Pages and Component
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";
import Home from "./pages/Home";
import AcademicLevel from "./components/AcademicLevel";
import Database from "./components/Database";
import NoticeBoard from "./components/NoticeBoard";
import NavBarSideBar from "./components/NavBarSideBar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import Attendance from "./components/Attendance";
import Subject from "./components/Subject";
import Teacher from "./components/Teacher";
import Assessment from "./components/Assessment";
import GenerateQuestion from "./components/QuestionGenerator";

import { useStateContext } from "./contexts/ContextProvider";
import UserProfile from "./components/UserProfile";
import TemporalNavBar from "./components/NavBarTemp";
import Application from "./components/Application";

function App() {
  // const [user, setUser] = useState(null);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              {localStorageUser && <Sidebar user={localStorageUser} />}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              {localStorageUser && <Sidebar user={localStorageUser} />}
            </div>
          )}
          {/* {localStorageUser && <NavBarSideBar />} */}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              {localStorageUser && <Navbar user={localStorageUser} />}
            </div>
            <div>
              {/* Add your main content here */}

              <Routes>
                <Route
                  path={"/"}
                  element={
                    localStorageUser ? <Home /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path={"/login"}
                  element={!localStorageUser ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path={"/teacher"}
                  element={
                    localStorageUser ? <Teacher /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path={"/subject"}
                  element={
                    localStorageUser ? <Subject /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path={"/academicLevel"}
                  element={
                    localStorageUser ? (
                      <AcademicLevel />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path={"/attendance"}
                  element={
                    localStorageUser ? <Attendance /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path={"/assessment"}
                  element={
                    localStorageUser ? <Assessment /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path={"/application"}
                  element={
                    localStorageUser ? (
                      <Application />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path={"/generate"}
                  element={
                    localStorageUser ? (
                      <GenerateQuestion />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path={"/userprofile"} element={<UserProfile />} />
                <Route path={"/enroll"} element={<EnrollmentForm />} />
                <Route path={"/noticeboard"} element={<NoticeBoard />} />
                <Route path={"/userbase"} element={<Database />} />
                <Route path={"/temporalnavbar"} element={<TemporalNavBar />} />
                <Route path={"*"} element={"404..Page"} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
