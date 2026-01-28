import { Login, Register } from "../api/endpoints";

// Essa função faz uma requisição para API para fazer login
export async function tryLogin(email, password) {

    try {
        // const response = await fetch("http://localhost:3000/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: senha
        //     })
        // });

        const response = await Login(email, password);

        //console.log("try login user: " + response.user);

        const data = {
            success: response.success,
            message: response.message,
            token: response.token,
            user: response.user
        };
        //console.log(data);
        return data;
    }
    catch (error) {
        console.log("deu erro");
        return { succes: false, message: error };
    }
}

export async function tryRegister(email, password, name) {
    try {
        const response = await Register(email, password, name);

        const data = {
            success: response.success,
            message: response.message,
            token: response.token,
            user: response.user
        };

        console.log(data);
        return data;
    } catch (error) {
        console.log("deu erro");
        return { succes: false, message: error };
    }
}