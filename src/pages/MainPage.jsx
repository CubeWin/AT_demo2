import { useTheme } from '@mui/material/styles';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import VisualizarXML from '../pages/VisualizarXML'
import Crear from '../pages/crear'
import Lista from '../pages/lista'
import Campos from '../pages/campos'
import { useState } from 'react';
import Personajes from '../pages/ListarPersonajes'
import ExcelSheep from '../pages/ExcelSheep'
import LayoutAdmin from '../pages/LayoutAdmin'
import ActiveProjects from './ActiveProjects';
import { Route, Routes } from 'react-router-dom';

export default function MiniDrawer() {
    const [open, setOpen] = useState(false)
    const theme = useTheme()

    return <>
        <Header open={open} setOpen={setOpen} />
        <Navbar open={open} setOpen={setOpen} />

        <div component="main" onClick={() => setOpen(false)} style={{ marginLeft: theme.spacing(7), background: '#d3e5e5', flexGrow: 1 }} >
            <Routes>
                <Route path='visualizar' element={<VisualizarXML />} />
                <Route path='activeProjects' element={<ActiveProjects />} />
                <Route path='rym' element={<Personajes />} />
                <Route path='layout' element={<LayoutAdmin />} />
                <Route path='documento' element={<ExcelSheep />} />
                <Route path='PageVerXml' element={<VisualizarXML />} />
                <Route path='crear' element={<Crear />} />
                <Route path='lista' element={<Lista />} />
                <Route path='campos' element={<Campos />} />
                <Route path='campos' element={<Campos />} />
            </Routes>
        </div>
    </>
}
