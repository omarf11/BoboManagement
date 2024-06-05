import React, { useEffect } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { useAppDispatch, useAppSelector } from "../../store/rootReducer";
import { getProjectsByUserId } from "../../store/modules/projectModule";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.project.projects);
  const userAuth = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    console.log("User Auth: " , userAuth)
    dispatch(getProjectsByUserId(userAuth.userId!));
  }, [dispatch, userAuth]);

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
  );
};

export default Dashboard;
