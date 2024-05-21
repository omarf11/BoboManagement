
import { Project } from '../../models/Projects';
import ProjectSummary from './ProjectSummary'

type Props = {
  projects:Project[];
}

const ProjectList:React.FC<Props> = ({projects}) => {
  return (
    <div className="project-list section">  
      {projects && projects.map((project) => {
        return (<ProjectSummary project={project} key={project.id}/>)
      })}
  
    </div>
  )
}

export default ProjectList