// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
// import ViewModuleIcon from '@mui/icons-material/ViewModule'
// import MailIcon from '@mui/icons-material/Mail'
// import { styled } from '@mui/material/styles'
// import MuiDrawer from '@mui/material/Drawer'
// import HomeIcon from '@mui/icons-material/Home'
// import AddBoxIcon from '@mui/icons-material/AddBox'
// import GroupIcon from '@mui/icons-material/Group'
// import { Link } from 'react-router-dom'
// import { Link } from '@mui/material';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import MailIcon from '@mui/icons-material/Mail'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import HomeIcon from '@mui/icons-material/Home'
import AddBoxIcon from '@mui/icons-material/AddBox'
import GroupIcon from '@mui/icons-material/Group'
import { NavLink } from 'react-router-dom'

const openedMixin = (theme) => ({
  overflowX: 'hidden',
  width: theme.spacing(35),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
})

const closedMixin = (theme) => ({
  overflowX: 'hidden',
  width: theme.spacing(7),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ':hover': {
    width: theme.spacing(35)
  }
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ open, theme }) => {
  let stateProps = {
    whiteSpace: 'nowrap'
  }

  if (open) {
    stateProps = {
      ...stateProps,
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }
  } else {
    stateProps = {
      ...stateProps,
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }
  }

  return stateProps
})

const DrawerHeader = styled('div')(({ theme }) => ({
  // Necesario para que los botones esten debajo de la barra de herramientas
  ...theme.mixins.toolbar
}))

const NavButton = ({ to, children }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton to={to} component={NavLink} sx={{ '&.active': { background: 'rgba(0, 0, 0, 0.1)' } }}>
        {children}
      </ListItemButton>
    </ListItem>
  )
}

export default ({ open, setOpen }) => {
  return (
    <Drawer variant='permanent' open={open} onClose={() => setOpen(false)}>
      <DrawerHeader></DrawerHeader>
      <List>
        <NavButton key='Inicio' to='/AT_demo2/'>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Inicio' />
        </NavButton>
        <NavButton key='Proyectos activos' to='/AT_demo2/activeProjects'>
          <ListItemIcon>
            <ViewModuleIcon />
          </ListItemIcon>
          <ListItemText primary='Proyectos activos' />
        </NavButton>
        <NavButton key='Workbook activos' to='/AT_demo2/workbook'>
          <ListItemIcon>
            <ViewModuleIcon />
          </ListItemIcon>
          <ListItemText primary='Workbook' />
        </NavButton>
        <NavButton key='Cargar RH' to='/AT_demo2/PageVerXmL'>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary='Cargar RH' />
        </NavButton>
      </List>
    </Drawer>
  )
}
