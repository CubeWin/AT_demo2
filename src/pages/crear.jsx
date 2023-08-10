import { Box, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button"

export default function Crear() {
    document.body.style.backgroundColor = "white";
    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 13,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1 style={{ color: 'gray', fontFamily: 'Helvetica', fontWeight: 100, textAlign: 'center', fontSize: 29 }}>Crear nuevo Proyecto</h1>
                <TextField sx={{
                    width: { sm: 300, md: 400 },
                    marginTop: 5,
                }}
                    id="filled-name"
                    label="Nombre"
                    defaultValue="Nombre del Proyecto"
                    variant="filled"
                />
                <TextField sx={{
                    marginTop: 2,
                    width: { sm: 300, md: 400 }
                }}
                    id="filled-descripcion"
                    label="Descripción"
                    defaultValue="Descripción del Proyecto"
                    variant="filled"
                    multiline
                    rows={3}
                />
                <Button variant="contained" sx={{
                    marginTop: 20,
                    marginLeft: 120
                }}>Crear</Button>
            </Box>
        </Container>
    );
}