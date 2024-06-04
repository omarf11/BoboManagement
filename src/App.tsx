import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import { ToastContainer } from "react-toastify";
// import ProjectDetails from "./components/projects/ProjectDetails";
import "materialize-css/dist/css/materialize.min.css";
import { AuthProvider } from "./Context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<CreateProject />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}
export default App;
