import { Route, Routes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import { ToastContainer } from "react-toastify";
import "materialize-css/dist/css/materialize.min.css";
import { AuthProvider } from "./Context/AuthProvider";
import ProjectDetails from "./components/projects/ProjectDetails";
import PrivateRoute from "./Routes/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <PrivateRoute>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </PrivateRoute>
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  );
}
export default App;
