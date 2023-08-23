import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import VisualizarXML from '../pages/VisualizarXML'
import ActiveProjects from '../pages/ActiveProjects'

import MainPage from '../pages/MainPage'
import Login from '../pages/Login'
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
            <Route
              path=''
              element={
                <div className='w-full h-full flex flex-col justify-center items-center text-5xl text-stone-400 font-bold'>
                  <h1>BIENVENIDO</h1>
                  <p className='text-lg'>Altamira Technology</p>
                </div>
              }
            />
            <Route path='activeProjects' element={<ActiveProjects />} />
            <Route path='rrhh' element={<VisualizarXML />} />
            <Route path='workbook' element={<WorkBook />} />
            <Route path='workbook/:projectId' element={<WorkBook />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
