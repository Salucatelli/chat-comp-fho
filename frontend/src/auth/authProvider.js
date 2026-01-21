import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getProfile } from "../api/endpoints";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await getProfile();
            setUser(response.user);
        } catch (err) {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    console.log("AuthProvider render, user:", user);

    useEffect(() => {
        loadUser();
    }, []);

    function login(token, userData) {
        localStorage.setItem("token", token);
        setUser(userData);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
