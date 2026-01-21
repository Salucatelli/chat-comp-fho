import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavMenu.css'
import { useAuth } from '../auth/useAuth';

export default function NavMenu() {
    const { user, logout, loading } = useAuth();
    console.log("NavMenu render, user:", user);

    if (loading) return null;

    return (
        <div className="main-div">
            <div className="title-div">
                <h2>Título</h2>
            </div>

            <div className="right-div">
                <Link to="/">
                    <h4>Home</h4>
                </Link>

                {!user && (
                    <>
                        <Link to="/login">
                            <h4>Login</h4>
                        </Link>
                        <Link to="/register">
                            <h4>Registrar</h4>
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <Link to="/profile">
                            <h4>Perfil</h4>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}