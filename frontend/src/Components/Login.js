import '../Styles/Login.css'

export default function Login() {
    return (
        <div className="login-main-div">
            <div className="login-card">
                <h1>Fazer Login</h1>

                <div className="input-div">
                    <input type="text" className="form-control" placeholder="Email" />
                    <input type="password" className="form-control" placeholder="Senha" />
                    <div>
                        <button className="btn btn-outline-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}