import { ProjectProvider } from '../context/ProjectContext'
import WorkBook from '../contents/WorkBook'

export default () => {
  return (
    <ProjectProvider>
      <WorkBook />
    </ProjectProvider>
  )
}
