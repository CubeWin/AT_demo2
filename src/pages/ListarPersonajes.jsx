import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import HeaderPage from '../contents/HeaderPage';
import BodyPage from '../contents/BodyPage';

export default () => {
    return (
        <>
            <CssBaseline />
            <Container>
                <HeaderPage title="Pagina de Inicio" />
                <BodyPage />
            </Container>
        </>
    )
}