import {
    Avatar, Box, Checkbox, Container, Divider, List, ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import Button from "@mui/material/Button"
import * as React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { Label } from "@mui/icons-material";



const theme = createTheme({
    palette: {
        background: {
            paper: '#5F5D5D',
            listacolor: '#F1F1F1'
        }
    },
});

export default function Campos() {
    document.body.style.backgroundColor = "white";
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
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
                    <h1 style={{ color: 'gray', fontFamily: 'Helvetica', fontWeight: 100, textAlign: 'center', fontSize: 29 }}>Seleccionar Procedencia de datos</h1>

                    <Box sx={{
                        marginTop: 4,
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        height: 350,
                        borderRadius: '16px',
                        bgcolor: 'background.listacolor'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <PeopleIcon sx={{
                                marginRight: 3,
                            }} />
                            <Typography sx={{
                                marginRight: 30,
                            }} variant="subtitle1">Tabla05</Typography>
                        </div>
                        <List dense sx={{ width: '100%', maxWidth: 360, color: 'background.paper', border: 'radius' }}>
                            {[0, 1, 2, 3, 4, 5].map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;

                                return (
                                    <React.Fragment key={value}>
                                        <ListItem
                                            secondaryAction={
                                                <Checkbox
                                                    edge="end"
                                                    onChange={handleToggle(value)}
                                                    checked={checked.indexOf(value) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>
                                                <ListItemText id={labelId} primary={`Campo0${value + 1}`} />
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
                        marginLeft: 30,
                        width: 150
                    }}>EXTRAER DATOS</Button>
                </Box>
            </ThemeProvider>
        </Container>
    );
}