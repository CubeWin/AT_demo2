import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Personajes from '../pages/ListarPersonajes'
import ExcelSheep from '../pages/ExcelSheep'
import LayoutAdmin from '../pages/LayoutAdmin'
import DocumentMain from '../pages/DocumentMain'

// const RegistroPage = () => <h1 className='font-bold text-teal-700'>Pagina web de registro</h1>
const PageNotFound = () => <h1 className='font-bold text-[90px] text-amber-500'>PageNotFound error 404</h1>

export default () =>
    <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={<ExcelSheep />}
            />
            <Route
                path='/registro'
                element={<Personajes />}
            />
            <Route
                path='/layout'
                element={<LayoutAdmin />}
            />
            <Route
                path='/documento'
                element={<DocumentMain />}
            />
            <Route
                path='*'
                element={<PageNotFound />}
            />
        </Routes>
    </BrowserRouter>
