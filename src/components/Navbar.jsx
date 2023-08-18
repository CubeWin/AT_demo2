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
import { Link } from 'react-router-dom'
// import { Link } from '@mui/material';

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

export default ({ open, setOpen }) => {
  return (
    <Drawer variant='permanent' open={open} onClose={() => setOpen(false)}>
      <DrawerHeader></DrawerHeader>
      <List>
        <Link to='/AT_demo2/'>
          <ListItem key='Inicio' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Inicio' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/AT_demo2/workbook'>
          <ListItem key='workbook' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary='Workbook' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/AT_demo2/projecto/listar'>
          <ListItem key='Proyectos activos' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewModuleIcon />
              </ListItemIcon>
              <ListItemText primary='Proyectos activos' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/AT_demo2/projecto/crear'>
          <ListItem key='Crear Proyecto' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary='Crear Proyecto' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/AT_demo2/tablas'>
          <ListItem key='Listar tablas' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewModuleIcon />
              </ListItemIcon>
              <ListItemText primary='Listar tablas' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/AT_demo2/visualizar'>
          <ListItem key='Cargar RH' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary='Cargar RH' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/AT_demo2/project'>
          <ListItem key='ProjectDemo' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary='Project' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      {/* <List>
            <ListItem key='Inicio' disablePadding>
                <ListItemButton href='/AT_demo2/' component={Link} >
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary='Inicio' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Proyectos activos' disablePadding>
                <ListItemButton href='/AT_demo2/projecto/listar' component={Link}>
                    <ListItemIcon><ViewModuleIcon /></ListItemIcon>
                    <ListItemText primary='Proyectos activos' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Crear Proyecto' disablePadding>
                <ListItemButton href='/AT_demo2/projecto/crear' component={Link}>
                    <ListItemIcon><AddBoxIcon /></ListItemIcon>
                    <ListItemText primary='Crear Proyecto' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Listar tablas' disablePadding>
                <ListItemButton href='/AT_demo2/tablas' component={Link}>
                    <ListItemIcon><ViewModuleIcon /></ListItemIcon>
                    <ListItemText primary='Listar tablas' />
                </ListItemButton>
            </ListItem>

            <ListItem key='Cargar RH' disablePadding>
                <ListItemButton href='/AT_demo2/visualizar' component={Link}>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='Cargar RH' />
                </ListItemButton>
            </ListItem>
        </List> */}
    </Drawer>
  )
}
