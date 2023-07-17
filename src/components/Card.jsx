import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default ({ nombre, tipo, estado, imagen, origen }) => {
    return (
        <>
            <Card sx={{ maxWidth: 245 }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            {nombre.slice(0, 1)}
                        </Avatar>
                    }
                    title={nombre}
                    subheader={tipo}
                />
                <CardMedia
                    component="img"
                    height="auto"
                    image={imagen}
                    alt="Paella dish"
                />
                <CardContent>
                    {origen.name}
                    <Stack spacing={1} alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <Chip label={`${estado}`} color="info" />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}