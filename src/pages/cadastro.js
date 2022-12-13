import { withIronSession } from "next-iron-session";
import GenericForm from "../components/generic-form";
import Header from "../components/header";

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

const Cadastro = ({ theme, user, darkMode, setDarkMode }) => {
    return user ? (
        <>
            <Header
                theme={theme}
                user={user}
                darkMode={darkMode}
                toggleDarkMode={setDarkMode}
            />
            <GenericForm type="funcionario" />
        </>
    ) : (
        <div>acesso negado</div>
    );
};

export default Cadastro;
