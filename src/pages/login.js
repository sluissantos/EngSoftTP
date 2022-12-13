import { Button, Grid, TextField } from "@material-ui/core";
import { withIronSession } from "next-iron-session";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../components/header";
import MySnackBar from "../components/snackBar";
import { snackBarSeverity } from "../helper";
import { defaultStyles } from "../styles";
import { login } from "../api-front";

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user");

        if (!user) {
            return { props: {} };
        }
        req.session.destroy();
        return {
            props: {},
        };
    },
    {
        cookieName: "MYSITECOOKIE",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production" ? true : false,
        },
        password: process.env.APPLICATION_SECRET,
    }
);

const SignInPage = ({ theme, user, darkMode, setDarkMode }) => {
    const style = defaultStyles();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
    const [severitySnackBar, setSeveritySnackBar] = useState(
        snackBarSeverity.SUCCESS
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);

        if (response.status) {
            setSnackBarMessage("Logado com sucesso");
            setSeveritySnackBar(snackBarSeverity.SUCCESS);
            setIsOpenSnackBar(true);
            window.open("https://engsoft-clinica.vercel.app/", "_blank");
        } else {
            setSnackBarMessage(response.message);
            setSeveritySnackBar(snackBarSeverity.ERROR);
            setIsOpenSnackBar(true);
        }
    };

    return (
        <>
            <Header
                theme={theme}
                user={user}
                darkMode={darkMode}
                toggleDarkMode={setDarkMode}
            />

            <form className={style.divBox} onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="row"
                    style={{ maxWidth: "80vw", alignItems: "center" }}
                    justify="space-between"
                >
                    <Grid className={style.section} item>
                        <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Grid item>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                    variant="outlined"
                                    style={{
                                        justifyItems: "center",
                                        padding: "25px",
                                        width: "350px",
                                    }}
                                    type="text"
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    label="Senha"
                                    variant="outlined"
                                    style={{
                                        justifyItems: "center",
                                        padding: "25px",
                                        width: "350px",
                                    }}
                                    type="password"
                                />
                            </Grid>

                            <Grid item>
                                <Button variant="contained" type="submit">
                                    Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Image
                            src="/assets/logo.svg"
                            height={275}
                            width={500}
                        />
                    </Grid>
                </Grid>
            </form>
            <MySnackBar
                open={isOpenSnackBar}
                message={snackBarMessage}
                severity={severitySnackBar}
                setClose={setIsOpenSnackBar}
            />
        </>
    );
};

export default SignInPage;
