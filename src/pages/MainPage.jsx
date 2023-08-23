import { useTheme } from '@mui/material/styles';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';


export default function MiniDrawer() {
    const [open, setOpen] = useState(false)
    const theme = useTheme()

    const mainStyle = {
        marginLeft: theme.spacing(open ? 35 : 7),
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }

    return <>
        <Header open={open} setOpen={setOpen} />
        <Navbar open={open} setOpen={setOpen} />

        <div component="main" style={mainStyle} >
            <Outlet />
        </div>
    </>
}
