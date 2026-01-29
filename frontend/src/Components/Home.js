import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import '../Styles/NavMenu.css'
import Chat from './Chat';


export default function Home() {
    const { user } = useAuth();

    return (
        <div>
            <div className="main-div">
                <div className="title-div">
                    <h2>Home da página</h2>
                </div>

                <div className="right-div">
                    <Link to="/">
                        <h4>Home</h4>
                    </Link>

                    <Link to="/login">
                        <h4>Login</h4>
                    </Link>
                    <Link to="/register">
                        <h4>Registrar</h4>
                    </Link>

                </div>
            </div>

            {!user ? (
                <div>
                    <div>
                        <h3>Bem vindo ao Chat Comp FHO. <br></br>Faça seu login ou registre-se</h3>
                    </div>
                </div>
            ) : (
                <Chat user={user}></Chat>
            )}
        </div>

    )
}

// return (
//     <div>
//         <div className="main-div">
//             <div className="title-div">
//                 <h2>Home da página</h2>
//             </div>

//             <div className="right-div">
//                 <Link to="/">
//                     <h4>Home</h4>
//                 </Link>

//                 <Link to="/login">
//                     <h4>Login</h4>
//                 </Link>
//                 <Link to="/register">
//                     <h4>Registrar</h4>
//                 </Link>

//             </div>
//         </div>

//         <div>
//             <h3>Bem vindo ao Chat Comp FHO. <br></br>Faça seu login ou registre-se</h3>
//         </div>
//     </div>
// )
// }