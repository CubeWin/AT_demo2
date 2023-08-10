import { ProjectProvider } from '../context/ProjectContext'
import Projectcontent from '../contents/Projectcontent'
export default () => {
  return (
    <ProjectProvider>
      <Projectcontent/>
    </ProjectProvider>
  )
}
