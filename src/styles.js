import { makeStyles } from "@material-ui/core";

export const defaultStyles = makeStyles((theme) => ({
    fastAnimation: {
        animation: `$fadeIn 1500ms ${theme.transitions.easing.easeInOut}`,
    },
    fadeLeftAnimation: {
        animation: `$slowFadeInLeft 3000ms ${theme.transitions.easing.easeInOut}`,
    },
    fadeRightAnimation: {
        animation: `$slowFadeInRight 3000ms ${theme.transitions.easing.easeInOut}`,
    },
    background: {
        position: "relative",
        width: "90vw",
        height: "65vh",
        margin: "auto",
        marginTop: "80px",
        backgroundColor: theme.palette.background.paper,
        opacity: 0.7,
    },
    title: {
        position: "absolute",
        left: "20px",
        fontSize: "72px",
        bottom: "80px",
        zIndex: 1,
        color: `${theme.palette.text.secondary}`,
    },
    subtitle: {
        position: "absolute",
        left: "30px",
        bottom: "0",
        zIndex: 1,
        color: `${theme.palette.text.primary}`,
    },
    titleDesc: {
        top: "20%",
    },
    subtitleDesc: {
        top: "30%",
    },
    description: {
        position: "absolute",
        fontSize: "30px",
        width: "70%",
        fontWeight: "bold",
        left: "20px",
        bottom: "20px",
        zIndex: 1,
        color: `${theme.palette.text.primary}`,
    },
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0,
            transform: "translateY(-20%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
    "@keyframes slowFadeInLeft": {
        "0%": {
            opacity: 0,
            transform: "translateX(-30%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0)",
        },
    },
    "@keyframes slowFadeInRight": {
        "0%": {
            opacity: 0,
            transform: "translateX(30%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateX(0)",
        },
    },
    section: {
        width: "50vw",
    },
    divBox: {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "85vh",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        opacity: 0.5,
    },
}));

export const footer = makeStyles((theme) => ({
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        marginTop: "50px",
        padding: "50px",
        height: "25px",
        width: "100%",
    },
    iconsContainer: { display: "flex" },
    icon: {
        height: "30px",
        width: "30px",
        marginRight: "30px",
    },
}));

export const form = makeStyles((theme) => ({
    default: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
    },
    buttons: {
        display: "flex",
        maxWidth: "300px",
        width: "50vw",
    },
    box: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },
    item: { marginBottom: "15px", marginLeft: "15px", minWidth: "257px" },
}));
