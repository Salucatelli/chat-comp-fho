import React, { useEffect, useState } from "react";
import { socket } from "../Services/socketService";
import '../Styles/Chat.css'
import { getContactsService } from "../Services/chatService";

// Lista de contatos temporária


export default function Chat({ user }) {

    const [userContact, setUserContact] = useState({});
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [contacts, setContacts] = useState([]);

    async function getContacts() {
        var c = (await getContactsService());
        setContacts(c.contacts.filter(c => c.id !== user.id));
    }

    useEffect(() => {
        getContacts();

        socket.connect();

        socket.on("connect", () => {
            console.log("conectado"); // true
        });

        socket.on("disconnect", () => {
            console.log("desconectado"); // false
        });

        // socket.on("chatMessage", (data) => {
        //     if (data.to !== user.id) return;

        //     setMessages((prevMessages) => [...prevMessages, data.message]);
        // });

        // return () => {
        //     socket.off("Saiu da página");
        //     socket.disconnect();
        // };
    }, []);

    // useEffect para mensagens
    useEffect(() => {
        const handleChatMessage = (data) => {
            if (data.to !== user.id) return;

            setMessages((prev) => [...prev, data]);
        };

        socket.on("chatMessage", handleChatMessage);

        return () => {
            socket.off("chatMessage", handleChatMessage);
        };
    }, [user.id]);



    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        if (messageInput === "") return;

        let newMessage = { message: messageInput, to: userContact.id, sender: user }

        socket.emit("chatMessage", newMessage);
        console.log("contato: ", userContact);
        setMessages([...messages, newMessage]);
        setMessageInput("");
    }

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
    }, [userContact]);


    return (<div className="chat-container">
        {/* Menu lateral com os contatos */}
        <div className="left-menu">
            <h2>Contatos</h2>
            <div className="contact-list">
                {contacts.map((c) =>
                    <div className="contact-item" key={c.id} onClick={() => changeContact(c)}>{c.name}</div>
                )}
            </div>
        </div>

        {userContact ? (
            <div className="main-chat">
                <div className="contact-info">
                    <h2>{userContact ? userContact.name : "Contato"}</h2>
                </div>

                {/* Campo com as mensagens */}
                <div className="messages-field">
                    {messages.map((m, index) =>
                        <div className={`message-line ${m.sender.id === user.id ? "message-mine" : ""}`}>
                            <div className="message-item" key={index}>
                                <div>
                                    <h4>{m.sender.name}</h4>
                                </div>
                                <div>
                                    <p>{m.message}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="input-field">
                    <input
                        className="form-control"
                        placeholder="Type a message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    ></input>
                    <button
                        className="btn btn-primary"
                        onClick={() => sendMessage()}
                    ><i className="bi bi-send"></i></button>
                </div>
            </div>
        ) : ""}

    </div>)
}