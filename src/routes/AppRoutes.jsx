import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, RequireAuth } from 'react-auth-kit'

// import MainPage from '../pages/MainPage'
import Login from '../pages/Login'
import AtRoutes from './AtRoutes';

const PageNotFound = () => (
  <h1 className='font-bold text-[90px] text-amber-500'>
      PageNotFound error 404
  </h1>
)

export default () => {

  return <AuthProvider authType='cookie' authName='_auth' cookieDomain={window.location.hostname} cookieSecure={false}>
    <BrowserRouter>
      <CssBaseline />

      <Routes>
        <Route path='/AT_demo2/login' element={<Login />} />
        <Route path='/AT_demo2/*' element={<RequireAuth loginPath='/AT_demo2/login'><AtRoutes /></RequireAuth>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter >
  </AuthProvider>
}