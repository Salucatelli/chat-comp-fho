import React from "react";

function Header(props) {
    return (
        <header className="head">
            <h1>{props.name}</h1>
            <ul>
                {props.links.map((element, index) =>
                    <li key={index}>
                        {element}
                    </li>)
                }
            </ul>
        </header>
    );
}

export default Header;