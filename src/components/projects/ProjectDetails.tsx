import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rootReducer";
import { useParams } from "react-router-dom";
import { getProjectByProjectId } from "../../store/modules/projectModule";

const ProjectDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const project = useAppSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(getProjectByProjectId(id!))
  }, [id , dispatch]);

  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        {project && (
          <>
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                {project.authorFirstName} {project.authorLastName}{" "}
              </div>
              <div>{project.id}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
