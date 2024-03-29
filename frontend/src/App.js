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
import { links, teacher, student } from "./data/Dummy";
import StatusInformation from "./components/enroll/statusInformation";
import SchoolForm from "./components/forms/SchoolForm";
import ScoreTable from "./components/ScoreTable";

function App() {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  let userLink = null;
  let user = null;
  if (userData) {
    if (userData.admin) {
      userLink = links;
      user = userData.admin;
    }
    if (userData.teacher) {
      userLink = teacher;
      user = userData.teacher;
    }
    if (userData.student || userData.enroll) {
      userLink = student;
      user = userData.student || userData.enroll;
    }
    console.log("userData is ", userData);
  }
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
        <div className="flex w-screen relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              {localStorageUser && (
                <Sidebar user={localStorageUser} links={userLink} />
              )}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              {localStorageUser && (
                <Sidebar user={localStorageUser} links={userLink} />
              )}
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
              {localStorageUser && (
                <Navbar user={localStorageUser} userCre={user} />
              )}
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
                  path={"/enroll"}
                  element={
                    !localStorageUser ? <EnrollmentForm /> : <Navigate to="/" />
                  }
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
                <Route
                  path={"/statusinformation"}
                  element={
                    localStorageUser ? (
                      <StatusInformation />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path={"/userprofile"}
                  element={
                    localStorageUser ? (
                      <UserProfile />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path={"/noticeboard"}
                  element={
                    localStorageUser ? (
                      <NoticeBoard />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path={"/userbase"}
                  element={
                    localStorageUser ? <Database /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path={"/scoretable"}
                  element={
                    localStorageUser ? <ScoreTable /> : <Navigate to="/login" />
                  }
                />

                <Route path={"/school"} element={<SchoolForm />} />
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
