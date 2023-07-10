import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages and Component
import Login from "./pages/Login";
import EnrollmentForm from "./pages/EnrollmentForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/enroll" element={<EnrollmentForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
