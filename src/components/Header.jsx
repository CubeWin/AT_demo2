import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import AccountMenu from '../components/AccountMenu';

export default ({ open, setOpen }) => {
    const theme = useTheme()

    return <AppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}> 
        <Toolbar>
            <IconButton
                onClick={() => setOpen(!open)}
                aria-label="Abrir menu de navegación"
                color="inherit"
                edge="start"
                sx={{ marginRight: 5 }}
            ><MenuIcon /></IconButton>
            <Typography variant="h6">Altamira</Typography>

            <Box flexGrow='1'></Box>
            <AccountMenu></AccountMenu>
        </Toolbar>
    </AppBar>
}