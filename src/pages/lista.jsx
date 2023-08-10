import { Avatar, Box, Container, Divider, List, ListItem, ListItemButton, ListItemText, ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio'; // Import the Radio component
import * as React from 'react';
import PeopleIcon from '@mui/icons-material/People';

const theme = createTheme({
    palette: {
        background: {
            paper: '#5F5D5D',
            listacolor: '#F1F1F1',
            default: '#FFFFFF'
        }
    },
});

export default function Lista() {
    document.body.style.backgroundColor = "white";
    const [checked, setChecked] = React.useState(1); // Use a single state for the selected value

    const handleToggle = (value) => () => {
        setChecked(value);
    };

    return (
        <Container maxWidth="xs">
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',                    
                    }}
                >
                    <h1 style={{ color: 'gray', fontFamily: 'Helvetica', fontWeight: 100, textAlign: 'center',fontSize:29 }}>Seleccionar Procedencia de datos</h1>

                    <Box sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        height: 350,
                        borderRadius: '16px',
                        bgcolor: 'background.listacolor'
                    }}>
                        <List dense sx={{ width: '100%', maxWidth: 360, color: 'background.paper', border: 'radius' }}>
                            {[0, 1, 2, 3, 4].map((value) => {
                                const labelId = `radio-list-label-${value}`;
                                return (
                                    <React.Fragment key={value}>
                                        <ListItem
                                            disablePadding
                                            onClick={handleToggle(value)} // Call the handleToggle function on click
                                        >
                                            <ListItemButton>
                                                <PeopleIcon sx={{
                                                    marginRight: 4
                                                }} />
                                                <ListItemText id={labelId} primary={`Tabla0${value + 1}`} />
                                                <Radio
                                                    edge="start"
                                                    checked={checked === value} // Set the 'checked' prop of Radio based on the state
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Box>
                    <Button variant="contained" sx={{
                        marginTop: 20,
                        marginLeft: 33
                    }}>SELECCIONAR</Button>
                </Box>
            </ThemeProvider>
        </Container>
    );
}