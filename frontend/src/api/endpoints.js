import { apiFetch } from "./apiClient";

// Endpoint para fazer login
export async function Login(email, password) {
    const response = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    return {
        success: response.ok,
        message: json.message,
        token: json.token,
        user: json.user
    };
}

export async function Register(email, password, name) {
    const response = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name })
    });

    const json = await response.json();

    if (response.status !== 201) {
        return { success: false, ...json };
    }

    return { success: response.ok, ...json };
}

export async function getProfile() {
    const response = await apiFetch("/profile", { method: "GET" });

    const json = await response.json();
    return { success: response.ok, ...json };
}

export async function getUserProfile() {
    const response = await apiFetch("/me");
    return response.json();
}

export async function getAllContacts() {
    const response = await apiFetch("/allContacts");
    //console.log(response);
    return response.json();
}

export async function getMethod(url) {
    const response = await apiFetch(url);
    //console.log(response);
    return response.json();
}

export async function postMethod(url, body) {
    const response = await apiFetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    });
    return response.json();
}