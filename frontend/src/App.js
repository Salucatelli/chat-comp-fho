import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Styles/App.css';
import NavMenu from './Components/NavMenu';
import Home from './Components/Home';
import Infos from './Components/Infos';
import Login from './Components/Login';
import Profile from './Components/Profile'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavMenu />

                <Routes>
                    <Route path="/" exact element={<Home />} />

                    {/* Esse Id vai ser um parâmetro da rota */}
                    <Route path="/infos/:id" exact element={<Infos />} />

                    {/* Essa rota é privada */}
                    <Route path="/profile" exact element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />

                    <Route path="/login" exact element={<Login />} />

                    <Route path="*" element={<h1>Rota não encontrada</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
