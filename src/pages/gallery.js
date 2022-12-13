import { Divider, Paper, Typography } from "@material-ui/core";
import { withIronSession } from "next-iron-session";
import Image from "next/image";
import React from "react";
import Header from "../components/header";
import { defaultStyles } from "../styles";

const Item = ({ item, index, style }) => (
    <>
        <Paper className={style.background} elevation={24}>
            <Typography
                className={`${style.title} ${style.fadeLeftAnimation}`}
                variant="h1"
            >
                {item.first}
            </Typography>
            <Typography
                className={`${style.subtitle} ${style.fadeRightAnimation}`}
                variant="h1"
            >
                {item.second}
            </Typography>
            <Image
                src={`/assets/${index}.jpg`}
                width="300px"
                height="120px"
                layout="responsive"
            />
        </Paper>
        <Divider style={{ height: "10px", marginTop: "50px" }} />
    </>
);

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user");

        if (!user) {
            res.statusCode = 403;
            return { props: {} };
        }

        return {
            props: { user },
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

const Gallery = ({ theme, user, darkMode, setDarkMode }) => {
    const style = defaultStyles();

    const texts = [
        { first: "confira", second: "nossa clínica" },
        { first: "prontos", second: "para te atender" },
        { first: "espaço", second: "confortável" },
        { first: "tecnologia", second: "de ponta" },
        { first: "agende", second: "sua consulta" },
    ];

    return (
        <>
            <Header
                theme={theme}
                user={user}
                darkMode={darkMode}
                toggleDarkMode={setDarkMode}
            />
            <section className={style.fastAnimation}>
                {texts.map((item, index) => (
                    <Item key={index} item={item} index={index} style={style} />
                ))}
            </section>
        </>
    );
};

export default Gallery;
