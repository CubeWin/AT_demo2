import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Personajes from '../pages/ListarPersonajes'
import ExcelSheep from '../pages/ExcelSheep'
import LayoutAdmin from '../pages/LayoutAdmin'
import DocumentMain from '../pages/DocumentMain'

// const RegistroPage = () => <h1 className='font-bold text-teal-700'>Pagina web de registro</h1>
const PageNotFound = () => (
  <h1 className='font-bold text-[90px] text-amber-500'>
    PageNotFound error 404
  </h1>
)

const RoutesAT_demo2 = () => {
  return (
    <Routes>
      <Route path='/rym' element={<Personajes />} />
      <Route path='/layout' element={<LayoutAdmin />} />
      <Route path='/documento' element={<ExcelSheep />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<DocumentMain />} />

      <Route path='/AT_demo2' element={<Outlet />}>
        <Route index element={<DocumentMain />} />
        <Route path='*' element={<RoutesAT_demo2 />} />
      </Route>
      
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
)
