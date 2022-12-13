import { Divider, Typography } from "@material-ui/core";
import { footer } from "../styles";

const Footer = () => {
    const style = footer();

    return (
        <Typography component="footer" className={style.footer}>
            <span className={style.iconsContainer}>
                <a href="https://www.instagram.com/davi_emediato/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        className={style.icon}
                        alt="Facebook"
                    />
                </a>
                <Divider />
                <a href="https://twitter.com/Savio_Campolina">
                    <img
                        src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1.png"
                        className={style.icon}
                        alt="Twitter"
                    />
                </a>
            </span>
            <>
                {"© "}
                disney corp {new Date().getFullYear()}
            </>
            <span>
                <Typography variant="span" marked="left" gutterBottom>
                    made with (◍•ᴗ•◍)❤️ by savio, iury, lucca and leo
                </Typography>
                <br />
                <Typography variant="caption">
                    "A dor é passageira, mas desistir é para sempre."
                </Typography>
            </span>
        </Typography>
    );
};

export default Footer;
