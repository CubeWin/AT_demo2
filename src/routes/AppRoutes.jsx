import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import VisualizarXML from '../pages/VisualizarXML'
import Campos from '../pages/campos'
import ExcelSheep from '../pages/ExcelSheep'
import LayoutAdmin from '../pages/LayoutAdmin'
import ActiveProjects from '../pages/ActiveProjects'

import MainPage from '../pages/MainPage'
import Login from '../pages/Login'
import AtRoutes from './AtRoutes'
import WorkBook from '../pages/Workbook'

const PageNotFound = () => <h1 className='font-bold text-[90px] text-amber-500'>PageNotFound error 404</h1>

export default () => {
  return (
    <AuthProvider authType='cookie' authName='_auth' cookieDomain={window.location.hostname} cookieSecure={false}>
      <BrowserRouter>
        <CssBaseline />

        <Routes>
          <Route path='/AT_demo2/login' element={<Login />} />
          <Route
            path='/AT_demo2/'
            element={
              <RequireAuth loginPath='/AT_demo2/login'>
                <MainPage />
              </RequireAuth>
            }
          >
            <Route path='' element={<div>contenido</div>} />
            <Route path='visualizar' element={<VisualizarXML />} />
            <Route path='activeProjects' element={<ActiveProjects />} />
            <Route path='layout' element={<LayoutAdmin />} />
            <Route path='documento' element={<ExcelSheep />} />
            <Route path='PageVerXml' element={<VisualizarXML />} />
            <Route path='campos' element={<Campos />} />
            <Route path='workbook' element={<WorkBook />} />
            <Route path='workbook/:projectId' element={<WorkBook />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
