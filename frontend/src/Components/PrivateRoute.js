import React from 'react';

import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');

    function isTokenValidLocally(token) {
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const now = Date.now() / 1000;

            return payload.exp && payload.exp > now;
        } catch {
            return false;
        }
    }

    // Esse método valida se o token ainda não venceu, mas não valida a veracidade dele
    function validateToken() {

        //console.log("token válido? " + isTokenValidLocally(token));

        if (!token) {
            return false;
        }
        else if (!isTokenValidLocally(token)) {
            return false;
        }

        return true;
    }

    return validateToken() ? children : <Navigate to="/login" />;
}