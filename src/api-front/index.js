import axios from "axios";

const baseUrl = "https://engsoft-clinica.vercel.app/api";

const get = async (address, params = null) => {
    let query = "?";
    for (const key in params) {
        query += `${key}=${params[key]}&`;
    }

    query = query.slice(0, -1);

    return axios.get(`${baseUrl}/${address}${query}`).then((res) => {
        return res ? res.data : null;
    });
};

const post = async (address, data) => {
    const url = `${baseUrl}/${address}/insert`;
    console.log("url");
    axios
        .post(url, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
};

const login = async (email, password) => {
    try {
        const url = "/sessions";
        let response = await axios.post(`${baseUrl}${url}`, {
            email,
            password,
        });

        console.log("RESPONSE");
        console.log(response);
        if (response.status === 201) {
            return {
                status: true,
                message: "",
            };
        }
        return {
            status: false,
            message: response.data,
        };
    } catch (ex) {
        console.log(ex.response);
        console.log(ex.request);
        console.log("LOGIN ERROR");
        console.log(ex);
        return {
            status: false,
            message: "Senha incorreta",
        };
    }
};

export { baseUrl, get, post, login };
