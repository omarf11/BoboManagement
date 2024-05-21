import { Project } from "../../models/Projects"

type Props = {
  project: Project
}

const ProjectSummary: React.FC<Props> = ({project}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{project.title}</span>
        <p className="grey-text">{project.content}</p>
      </div>
    </div>
  )
}

export default ProjectSummary