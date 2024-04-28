import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    useTheme,
    FormControlLabel,
    RadioGroup,
    Radio, Link
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PhoneInput from "react-phone-input-2";
import Autocomplete from "@mui/material/Autocomplete";
import citiesData from "../assets/cities.json";
import {useState} from "react";

const pages = ['Home'];


const Header = ({toggleTheme}) => {
    const theme = useTheme();


    const [openSignUp, setOpenSignUp] = React.useState(false); // State for Sign Up modal
    const [openSignIn, setOpenSignIn] = React.useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [isProvider, setIsProvider] = useState(undefined);


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleSubmit = () => {

        // Перевірка валідності
        if (!name || !password || !phone || !email || !city || !isProvider) {
            alert('Будь ласка, заповніть всі поля.');
            return;
        }

        const providerType = isProvider ? 'true' : 'false';

        console.log(name, password, phone, city, providerType)

        // Очистити поля форми
        setName('');
        setPassword('');
        setEmail('');
        setPhone('');
        setCity('');
        setIsProvider(undefined);

        // Закрити модальну панель
        handleCloseModalSignUp();
        handleOpenModalSignIn();

    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenModalSignUp = () => {
        setOpenSignUp(true);
        setOpenSignIn(false);

    };

    const handleCloseModalSignUp = () => {
        setOpenSignUp(false);
    };

    const handleOpenModalSignIn = () => {
        setOpenSignIn(true);
        setOpenSignUp(false);

    };

    const handleCloseModalSignIn = () => {
        setOpenSignIn(false);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event) => {
        setIsProvider(event.target.checked);
    };

    return (
        <div>
            <AppBar position="sticky" style={{backgroundColor: theme.palette.primary.main}}>
                <Toolbar>
                    <Box sx={{flexGrow: 0.011}}>
                        <Typography variant="h5" sx={{flexGrow: 1}}>
                            <b>ASSIST NOW</b>
                        </Typography>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                sx={{fontSize: '18px'}}
                                color="inherit"
                                key={page}
                                href='/'
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <Tooltip title="Змінити тему">
                            <IconButton onClick={toggleTheme} sx={{p: 0, marginRight: '20px'}}>
                                {theme.palette.mode === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Відкрити налаштування">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom', // змінено vertical на bottom
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="Акаунт" onClick={handleOpenModalSignUp}>
                                <Typography textAlign="center">Акаунт</Typography>
                            </MenuItem>
                            <MenuItem key="Вийти" onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Вийти</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Dialog
                open={openSignUp}
                onClose={handleCloseModalSignUp}
                aria-labelledby="sign-up-dialog-title"
                aria-describedby="sign-up-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="sign-up-dialog-title">Реєстрація</DialogTitle>
                <DialogContent id="sign-up-dialog-description">
                    <Typography variant="body2" color="textSecondary">
                        Вже маєте акаунт? <Link onClick={handleOpenModalSignIn}>Увійти</Link>
                    </Typography>
                    <TextField
                        id="name"
                        label="Ім'я"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <TextField
                        id="email"
                        label="E-Mail"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

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
                    <Typography>
                        Чим ви хочете займтись?
                    </Typography>
                    <RadioGroup onChange={handleChange}>
                        <FormControlLabel value='true' control={<Radio/>} label="Надати допомогу"/>
                        <FormControlLabel value='false' control={<Radio/>} label="Отримати допомогу"/>
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalSignUp}>Відміна</Button>
                    <Button onClick={handleSubmit} variant="contained">Зареєструватися</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openSignIn}
                onClose={handleCloseModalSignIn}
                aria-labelledby="sign-up-dialog-title"
                aria-describedby="sign-up-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="sign-in-dialog-title">Вхід</DialogTitle>
                <DialogContent id="sign-in-dialog-description">
                    <Typography variant="body2" color="textSecondary">
                        Не маєте акаунту? <Link onClick={handleOpenModalSignUp}>Зареєструватися</Link>
                    </Typography>
                    <TextField
                        id="email"
                        label="E-Mail"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <TextField
                        id="password"
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalSignIn}>Відміна</Button>
                    <Button onClick={handleSubmit} variant="contained">Увійти</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Header;
