import { Avatar, Box, Container, Divider, List, ListItem, ListItemButton, ListItemText, ThemeProvider, createTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio' // Import the Radio component
import * as React from 'react'
import PeopleIcon from '@mui/icons-material/People'

export default function Lista() {
  const [checked, setChecked] = React.useState(1) // Use a single state for the selected value

  const handleToggle = (value) => () => {
    setChecked(value)
  }

  return (
    <Container className='absolute h-full w-full flex flex-col justify-between'>
      <div className='max-w-[450px] p-0 w-full'>
        <h1 className='text-slate-600 my-5 font-thin text-center text-3xl font-[Helvetica]'>Seleccionar Procedencia de datos</h1>
        <Box className='w-full bg-gray-300 min-h-[350px] max-h-[50vh] rounded-md overflow-auto'>
          <List className='m-0 p-0'>
            {[0, 1, 2, 3, 4].map((value) => {
              const labelId = `radio-list-label-${value}`
              return (
                <React.Fragment key={value}>
                  <ListItem
                    className='p-0'
                    onClick={handleToggle(value)} // Call the handleToggle function on click
                  >
                    <ListItemButton>
                      <PeopleIcon className='mr-2' />
                      <ListItemText id={labelId} primary={`Tabla0${value + 1}`} />
                      <Radio
                        edge='start'
                        checked={checked === value} // Set the 'checked' prop of Radio based on the state
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )
            })}
          </List>
        </Box>
      </div>
      <div className='p-2 flex justify-around'>
        <Button className='btn bg-slate-100 text-black border border-slate-600'>Cancelar</Button>
        <Button className='btn bg-cyan-600 text-white active:ring-2 active:ring-teal-400'>Crear</Button>
      </div>
    </Container>
  )
}
