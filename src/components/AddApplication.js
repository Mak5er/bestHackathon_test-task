import React, {useState} from 'react';
import citiesData from '../assets/cities.json'
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Fab, IconButton, Box, InputAdornment, useTheme
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // CSS для компонента PhoneInput
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';


const AddApplication = ({...props}) => {
    const theme = useTheme();


    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');

    const handleOpenModal = () => setOpen(true); // Відкриття модальної панелі
    const handleCloseModal = () => setOpen(false); // Закриття модальної панелі

    const handleSubmit = () => {

        // Перевірка валідності
        if (!name || !phone || !city || !description) {
            alert('Будь ласка, заповніть всі поля.');
            return;
        }

        console.log(name, phone, city, description)

        // Очистити поля форми
        setName('');
        setPhone('');
        setCity('');
        setDescription('');

        // Закрити модальну панель
        handleCloseModal();

    };

    return (<div>
        <Box sx={{position: 'fixed', bottom: 16, right: 16}}>
            <Fab style={{backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary}} aria-label="add" onClick={handleOpenModal}>
                <AddIcon/>
            </Fab>
        </Box>

        {/* Модальна панель */}
        <Dialog
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="add-application-dialog-title"
            aria-describedby="add-application-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="add-application-dialog-title">Додати заявку</DialogTitle>
            <DialogContent id="add-application-dialog-description">
                <TextField
                    label="Ім'я"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <PhoneInput
                    country="UA"
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    inputProps={{
                        required: true,

                    }}
                />
                <Autocomplete
                    label="Місто"
                    fullWidth
                    value={city}
                    onChange={(event, newValue) => setCity(newValue)}
                    disablePortal
                    id="combo-box-demo"
                    options={citiesData.map((city) => city.city_name)}
                    renderInput={(params) => <TextField {...params}
                                                        margin="normal"
                                                        required label="Місто"/>}

                />
                <TextField
                    label="Опис"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Відміна</Button>
                <Button variant="contained" onClick={handleSubmit}>Подати</Button>
            </DialogActions>
        </Dialog>
    </div>);
};

export default AddApplication;
