import {
    createMuiTheme,
    CssBaseline,
    NoSsr,
    ThemeProvider,
} from "@material-ui/core";
import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { withIronSession } from "next-iron-session";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
    },
});

const App = ({ Component, pageProps, user }) => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = darkMode ? darkTheme : lightTheme;
    console.log(user);
    return (
        <NoSsr>
            <ThemeProvider theme={theme}>
                <div style={{ position: "relative", height: "100vh" }}>
                    <CssBaseline />
                    <div style={{ paddingBottom: "130px" }}>
                        <Component
                            {...pageProps}
                            theme={theme}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                        />
                    </div>
                    <Footer />
                </div>
            </ThemeProvider>
        </NoSsr>
    );
};

export default App;
