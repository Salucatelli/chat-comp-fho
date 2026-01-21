export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject("Unauthorized");
    }

    return response;
}
