import './App.css';
import Header from './Header';
import Counter from "./Counter";
import { useEffect, useState } from 'react';

function App() {

    const [show, setShow] = useState(true);

    let time = 0;

    useEffect(() => {
        let timer = setInterval(() => {
            time++;
            console.log(time);

            if (time > 5) {
                clearInterval(timer);
                setShow(false);
            }
        }, 1000);
    }, []);



    if (show) {
        return (
            <div>
                <Header name="Batata frita" links={["Sobre", "Comprar", "Contato", "Login"]} />
                <br></br>
                <Counter count={2} nome="Testando 123"></Counter>
            </div>

        );
    } else {
        return (
            <div>
                <Header name="Batata frita" links={["Sobre", "Comprar", "Contato", "Login"]} />
                <br></br>
            </div>

        );
    }

}

export default App;
