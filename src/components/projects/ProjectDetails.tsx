import React from 'react'
import { Project } from '../../models/Projects';

type Props = {
    project:Project
}


const ProjectDetails:React.FC<Props> = ({ project}) => {
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">{ project.title }</span>
          <p>{project.content}</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>{project.authorFirstName} {project.authorLastName} </div>
          <div>{project.id}</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails