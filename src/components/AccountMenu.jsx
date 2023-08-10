import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, ListItemIcon, ListItemText, MenuList } from '@mui/material';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
    const auth = useAuthUser()()
    const signOut = useSignOut()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleChange = (event) => {
        setAuth(event.target.checked)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return <>
        <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="menu"
            onClick={handleMenu}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
        >
            <MenuList dense style={{ width: '14rem' }}>
                <MenuItem>
                    <ListItemText primary={auth.username} secondary={'jdoe@acme.com'} />
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={console.log}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText>Configuración</ListItemText>
                </MenuItem>
                <MenuItem onClick={console.log}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText>Perfil</ListItemText>
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={() => {signOut(); navigate('/AT_demo2/login')}}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText>Salir</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    </>
}
