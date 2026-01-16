import React, { useEffect, useState } from "react";

function Counter(props) {

    const [count, setCount] = useState(localStorage.getItem("count") ?? 0);

    // Dessa maneira, ele será executado sempre que um estado for atualizado, qualquer estado
    // useEffect(() => {

    // })

    // Dessa maneira ele é executado apenas quando o componente é criado, ou seja, uma vez só
    useEffect(() => {
        setCount(parseInt(localStorage.getItem("count")));
        console.log("setando");

        return () => {
            console.log("Essa função vai ser executada quando o componente sair da tela");
        }
    }, [])

    // E dessa maneira ele será executado sempre que um dos estados que está no array for atualizado
    useEffect(() => {
        localStorage.setItem("count", count);
        console.log("Atualizando");
    }, [count]);

    function add() {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>{props.nome}: {count}</h1>
            <button className="btn btn-success" onClick={() => add()}>Add</button>
        </div >
    );
}

// class Counter extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = { count: this.props.count, nome: this.props.nome };
//         this.add = this.add.bind(this);
//     }


//     add() {
//         // Para atualizar um estado                             função de callback
//         this.setState((s) => { return { count: s.count + 1 } }, () => {
//             console.log(console.log(this.state))
//             localStorage.setItem("state", JSON.stringify(this.state));
//         });
//     }

//     // Se isso aqui for false o componente não é atualizado na tela, mas o estado é atualizado, só o componente que não
//     shouldComponentUpdate() {
//         return true;
//     }

//     // Esse método é sempre executado depois que o componente é mostrado na tela, tipo um OnAfterRenderAsync eu acho
//     componentDidMount() {

//     }

//     // Esse é executado quando um componente é removido da tela, o contrário da DidMount
//     componentWillUnmount() {

//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.state.nome}: {this.state.count}</h1>
//                 <button className="btn btn-success" onClick={() => this.add()}>Add</button>
//             </div >
//         );
//     }
// }

export default Counter;