import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
// import ProjectDetails from "./components/projects/ProjectDetails";
import 'materialize-css/dist/css/materialize.min.css';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route  path='/' element={<Dashboard/>} />
          {/* <Route path='/project/:id' element={<ProjectDetails/>} /> */}
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/create' element={<CreateProject/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
