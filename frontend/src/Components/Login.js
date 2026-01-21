import '../Styles/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tryLogin } from '../Services/LoginService';

export default function Login() {

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Aqui ele vai tentar fazer o login, se conseguir, manda para profile, se não da mensagem de erro
    async function useHandleLogin(formData) {
        const response = await tryLogin(formData.get("email"), formData.get("password"));

        setError("");

        // Se login bem sucedido, vai para profile
        if (response.success) {
            console.log(response);
            localStorage.setItem('token', response.token);
            navigate("/profile");
        } else {
            setError(response.message);
            console.log(response.message);
        }
    }

    return (
        <div className="login-main-div">
            <div className="login-card">
                <h1>Fazer Login</h1>

                <form action={useHandleLogin} className="input-form">
                    <input type="text" name="email" className="form-control" placeholder="Email" />
                    <input type="password" name="password" className="form-control" placeholder="Senha" />
                    <span className="text-danger">{error}</span>
                    <div>
                        <button type="submit" className="btn btn-outline-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}