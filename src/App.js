import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {createTheme} from '@mui/material/styles';
import {useState} from "react";
import Header from "./components/Header"
import Profile from "./pages/Profile"


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3d64fd', // Акцентний колір
        },
        secondary: {
            main: '#819cf5', // Неактивні елементи
        },
        background: {
            default: '#141a32', // Основний фон
        },
        text: {
            primary: '#ffffff', // Колір тексту
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3d64fd', // Акцентний колір
        },
        secondary: {
            main: '#5b6485', // Неактивні елементи, слабший відтінок сірого для світлої теми
        },
        background: {
            default: '#ffffff', // Основний фон
        },
        text: {
            primary: '#141a32', // Колір тексту
        },
    },
});

function App() {
    const [theme, setTheme] = useState(darkTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="container" style={{ backgroundColor: theme.palette.background.default}}>
                <Router>
                    <Header toggleTheme={toggleTheme} />
                    <Routes>
                        <Route path='/' element={<Home/>}/>;
                        <Route path='/profile' element={<Profile/>}/>
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>

    );
}

export default App;
