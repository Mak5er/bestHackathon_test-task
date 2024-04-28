import React from 'react';
import {Grid, Card, Typography, Stack, IconButton, Dialog, Fade, Box, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Applications from '../assets/applications.json'


const ApplicationCard = ({name, phone, city, description, imageUrl}) => {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false); // State for modal

    const handleOpenModal = () => setOpen(true);

    const handleCloseModal = () => setOpen(false);

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'row',  // Set flexbox for horizontal layout
            padding: 2,
            position: 'relative',
            minHeight: 200,
            maxHeight: { xs: 'unset', md: 200 },
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.primary.main}`,
        }}>
            {/* Image container with conditional rendering */}

            <img
                src={imageUrl}
                alt={imageUrl}
                style={{ width: 150, height: 'auto', marginRight: 10 }} // Adjust size and margin as needed
            />

            <Stack direction="column" spacing={1} flexGrow={1}>
                <Typography variant="h5"><b>{name}</b></Typography>
                <Typography variant="body2"><b>Телефон</b>: {phone}</Typography>
                <Typography variant="body2"><b>Місто</b>: {city}</Typography>
                <Typography
                    variant="body2">
                    <b>Опис</b>: {description.substring(0, 50)}{description.length > 50 ? '...' : ''}
                </Typography>

                <IconButton aria-label="show more" onClick={handleOpenModal}
                            sx={{position: 'absolute', bottom: 8, right: 8, color: theme.palette.primary.main }}>
                    <ExpandMoreIcon/>
                </IconButton>
            </Stack>
            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                fullWidth
                maxWidth="sm"

            >
                <Fade in={open}>
                    <Box sx={{
                        p: 2,
                        '@media (max-width: 600px)': { // Adjust max-width as needed for your design
                            maxHeight: '80vh', // Set a fixed max height for mobile
                        },
                        overflowY: "auto",
                        border: `1px solid ${theme.palette.primary.main}`,

                    }}>
                        <IconButton aria-label="close" onClick={handleCloseModal}
                                    sx={{position: 'absolute', top: 8, right: 8}}>
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h5">Інформація про заявку</Typography>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="body2" style={{ color: theme.palette.text.primary }}><b>Ім'я</b>: {name}</Typography>
                            <Typography variant="body2" style={{ color: theme.palette.text.primary }}><b>Телефон</b>: {phone}</Typography>
                            <Typography variant="body2" style={{ color: theme.palette.text.primary }}><b>Місто</b>: {city}</Typography>
                            <Typography variant="body2" style={{ color: theme.palette.text.primary }}><b>Опис</b>: {description}</Typography>
                        </Stack>
                    </Box>
                </Fade>
            </Dialog>
        </Card>);
};

const TilesGrid = () => {

    return (<Grid container spacing={2} sx={{
            padding: '8px',
        }}>
            {Applications.map((application) => (<Grid item xs={12} sm={6} md={4} lg={3}>
                    <ApplicationCard {...application} />
                </Grid>))}
        </Grid>);
};

export default TilesGrid;
