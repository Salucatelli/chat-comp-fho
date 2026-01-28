import React, { useEffect, useState } from "react";
import '../Styles/Chat.css'

// Lista de contatos temporária
const contacts = [
    { id: 1, name: "Contato 1" },
    { id: 2, name: "Contato 2" },
    { id: 3, name: "Contato 3" },
    { id: 4, name: "Contato 4" },
    { id: 5, name: "Contato 5" },
    { id: 6, name: "Contato 6" },
    { id: 7, name: "Contato 7" },
    { id: 8, name: "Contato 8" },
    { id: 9, name: "Contato 9" },
    { id: 10, name: "Contato 10" },
]

export default function Chat() {

    const [userContact, setUserContact] = useState("");
    const [messages, setMessages] = useState([]);

    // carrega todas as mensagens de um determinado contato
    function getMessages(c) {
        setMessages([]);
    }

    function changeContact(c) {
        setUserContact(c);
    }

    // Sempre que o contato for atualizado, ele atualiza as mensagens
    useEffect(() => {
        getMessages(userContact);
    }, [userContact])


    return (<div className="chat-container">
        {/* Menu lateral com os contatos */}
        <div className="left-menu">
            <h2>Contatos</h2>
            <div className="contact-list">
                {contacts.map((c) =>
                    <div class="contact-item" key={c.id} onClick={() => changeContact(c.name)}>{c.name}</div>
                )}
            </div>
        </div>

        {userContact ? (
            <div className="main-chat">
                <div className="contact-info">
                    <h2>{userContact ? userContact : "Contato"}</h2>
                </div>

                <div className="messages-field">


                </div>

                <div className="input-field">
                    <input className="form-control" placeholder="Type a message"></input>
                    <button className="btn btn-primary"><i class="bi bi-send"></i></button>
                </div>
            </div>
        ) : ""}

    </div>)
}