import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages and Component
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";
import Dashboard from "./pages/Dashboard";
import CreateAcademicLevelForm from "./components/CreateAcademicLevelForm";
import Database from "./components/Database";

function App() {
  // const [user, setUser] = useState(null);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path={"/admin/dashboard"}
              element={
                localStorageUser ? <Dashboard /> : <Navigate to="/auth/admin" />
              }
            />
            <Route
              path={"/auth/admin"}
              element={
                !localStorageUser ? (
                  <Login />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
            <Route
              path={"/auth/student"}
              element={
                !localStorageUser ? (
                  <Login />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
            <Route
              path={"/auth/teacher"}
              element={
                !localStorageUser ? (
                  <Login />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
            <Route
              path={"/academicLevel"}
              element={<CreateAcademicLevelForm />}
            />
            <Route path="/enroll" element={<EnrollmentForm />} />
            <Route path="/userbase" element={<Database />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
