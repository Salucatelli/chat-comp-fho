import { useEffect, useState } from "react";
import { getProfile } from "../api/endpoints";

export default function Profile() {

    const [user, setUser] = useState({});

    async function getUserProfile() {
        const response = await getProfile();

        if (!response.success) {
            alert(response.message);
            return;
        }

        setUser(response.user);
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <h1>Bem vindo ao seu perfil {user.name}!</h1>
            <h2>Email: {user.email}</h2>
        </div>
    );
}