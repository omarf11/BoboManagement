import React from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { useAppSelector } from "../../store/rootReducer";

const Dashboard : React.FC =()=>{
  const projects = useAppSelector((state) => state.project.projects);

    return (
    
        <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
}

export default Dashboard;