import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import "materialize-css/dist/css/materialize.min.css";
import { AuthProvider } from "./Context/AuthProvider";
import ProjectDetails from "./components/projects/ProjectDetails";
import PrivateRoute from "./Routes/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <PrivateRoute>
                  <CreateProject />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/project/:id" 
              element={
                <PrivateRoute>
                  <ProjectDetails />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;