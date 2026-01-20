import React, { useEffect, useState } from 'react'
import { Link, useMatch, useLocation, useParams } from 'react-router-dom'


export default function Infos() {
    // Esse aqui serve para pegar os parâmetros da url
    const params = useParams();

    const match = useMatch("/infos/:id");
    const location = useLocation();

    let [value, setValue] = useState("");

    //const [url, setUrl] = useState("");

    useEffect(() => {
        // console.log("O novo id é " + match.params.id);
        // console.log(location);
        setValue(new URLSearchParams(location.search).get("v"));

        if (value.length > 0) console.log(value);
    }, [location, value])

    return (
        <div>
            <h1>Está é a página de Infos com id {params.id}</h1>
            <h2><Link to="/infos/12">teste1</Link></h2>
            <h2><Link to="/infos/40">teste2</Link></h2>
        </div>
    )
}