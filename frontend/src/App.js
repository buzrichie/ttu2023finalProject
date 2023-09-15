import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages and Component
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";
import Home from "./pages/Home";
import AcademicLevel from "./components/AcademicLevel";
import Database from "./components/Database";
import NoticeBoard from "./components/NoticeBoard";
import NavBarSideBar from "./components/NavBarSideBar";
import Attendance from "./components/Attendance";
import Subject from "./components/Subject";
import Teacher from "./components/Teacher";
import Assessment from "./components/Assessment";
import GenerateQuestion from "./components/QuestionGenerator";

function App() {
  // const [user, setUser] = useState(null);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <BrowserRouter>
        {localStorageUser && <NavBarSideBar />}
        <div className="pages">
          <div className="main-content">
            {/* Add your main content here */}

            <Routes>
              <Route
                path={"/"}
                element={
                  localStorageUser ? <Home /> : <Navigate to={<Login />} />
                }
              />
              <Route
                path={"/auth/admin"}
                element={!localStorageUser ? <Login /> : <Navigate to="/" />}
              />
              {/* <Route
                path={"/auth/student"}
                element={!localStorageUser ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path={"/auth/teacher"}
                element={!localStorageUser ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path={"/teacher"}
                element={
                  localStorageUser ? <Teacher /> : <Navigate to={<Login />} />
                }
              /> */}
              <Route
                path={"/subject"}
                element={
                  localStorageUser ? <Subject /> : <Navigate to={<Login />} />
                }
              />
              <Route
                path={"/academicLevel"}
                element={
                  localStorageUser ? (
                    <AcademicLevel />
                  ) : (
                    <Navigate to={<Login />} />
                  )
                }
              />
              <Route
                path={"/attendance"}
                element={
                  localStorageUser ? (
                    <Attendance />
                  ) : (
                    <Navigate to={<Login />} />
                  )
                }
              />
              <Route
                path={"/assessment"}
                element={
                  localStorageUser ? (
                    <Assessment />
                  ) : (
                    <Navigate to={<Login />} />
                  )
                }
              />
              <Route
                path={"/generate"}
                element={
                  localStorageUser ? (
                    <GenerateQuestion />
                  ) : (
                    <Navigate to={<Login />} />
                  )
                }
              />
              <Route path={"/enroll"} element={<EnrollmentForm />} />
              <Route path={"/noticeboard"} element={<NoticeBoard />} />
              <Route path={"/userbase"} element={<Database />} />
              <Route path={"*"} element={"404..Page"} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
