import { useNavigate } from "react-router-dom";
import { Project } from "../../models/Projects"

type Props = {
  project: Project
}

const ProjectSummary: React.FC<Props> = ({project}) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId?:string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="card z-depth-0 project-summary" onClick={()=> handleProjectClick( project.id )} >
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{project.title}</span>
        <p className="grey-text">{project.content}</p>
        <p className="grey-text">{project.authorFirstName}</p>
        <p className="grey-text">{project.authorLastName}</p>
        <p className="grey-text">{project.id}</p>
      </div>
    </div>
  )
}

export default ProjectSummary