import { Divider, Typography } from "@material-ui/core";
import { footer } from "../styles";

const Footer = () => {
    const style = footer();

    return (
        <Typography component="footer" className={style.footer}>
            <span className={style.iconsContainer}>
                <a href="">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        className={style.icon}
                        alt="Facebook"
                    />
                </a>
                <Divider />
                <a href="">
                    <img
                        src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1.png"
                        className={style.icon}
                        alt="Twitter"
                    />
                </a>
            </span>
            <>
                {"© "}
                CEFET {new Date().getFullYear()}
            </>
            <span>
                <Typography variant="span" marked="left" gutterBottom>
                    made by Fernado, João, Luis e Rafael
                </Typography>
                <br />
                <Typography variant="caption">
                    "A dor é passageira (lá ele), mas desistir é para sempre."
                </Typography>
            </span>
        </Typography>
    );
};

export default Footer;
