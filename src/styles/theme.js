import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        default: {
            main: "#555",
            light: "#666",
            dark: "#333",
        },
        white: {
            main: "#fff",
            light: "#fff",
            dark: "#eaeaea",
        },
        primary: {
            main: "#FB3C00",
            light: "#F26437",
            dark: "#A12700"
        },
        secondary: {
            main: "#0075FF",
            light: "#68ADFD",
            dark: "#00428F"
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        title: {
            fontSize: 'clamp(3.625rem, 1.2857rem + 3.5714vw, 4rem)',
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        navLink: {
            fontSize: '1rem',
            fontWeight: '500',
            color: 'inherit',
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        h1: {
            fontSize: 36
        },
        h2: {
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '20px'
        },
        h3: {
            fontSize: 28
        },
        h4: {
            fontSize: 26
        },
        h5: {
            fontSize: 24
        },
        h6: {
            fontSize: 22
        },
        body1: {
            fontSize: 20,
        },
        body2: {
            fontSize: 18,
        },
        caption: {
            fontSize: 16
        },
        button: {
            fontWeight: 'bold',
            textTransform: 'initial'
        }
    }
});


export default theme;