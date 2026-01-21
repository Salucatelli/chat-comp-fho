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
        token: json.token
    };
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