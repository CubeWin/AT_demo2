import { Route, Routes } from 'react-router-dom'

import ActiveProjects from '../pages/ActiveProjects'
import VisualizarXML from '../pages/VisualizarXML'
import AdminLayout from '../pages/AdminLayout'
import Campos from '../pages/campos'
import Lista from '../pages/lista'
import Crear from '../pages/crear'
import Project from '../pages/Project'
import Workbook from '../pages/Workbook'

export default () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path='visualizar' element={<VisualizarXML />} />
        <Route path='projecto/listar' element={<ActiveProjects />} />
        <Route path='projecto/crear' element={<Crear />} />
        <Route path='tablas' element={<Lista />} />
        <Route path='campos' element={<Campos />} />
        <Route path='project' element={<Project />} />
        <Route path='workbook/:projectId' element={<Workbook />} />
      </Routes>
    </AdminLayout>
  )
}
