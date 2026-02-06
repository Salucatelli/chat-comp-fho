import React, { useEffect, useState } from "react";
import { socket } from "../Services/socketService";
import '../Styles/Chat.css'
import { getContactsService, getConversationsService, postMethod } from "../Services/chatService";

export default function Chat({ user }) {

    const [currentConversation, setCurrentConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [contacts, setContacts] = useState([]);
    const [conversations, setConversations] = useState([]);

    async function getContacts() {
        var c = (await getContactsService());
        setContacts(c.contacts.filter(c => c.id !== user.id));
    }

    async function addContact(c) {
        const conversa = conversations.find(conversation => conversation.id === c.id);

        if (!conversa) {
            console.log("Não tem uma conversation");
            const res = await postMethod("/createConversation", { title: `${user.name}-${c.name}`, contact1: c.id, contact2: user.id });

            setCurrentConversation(res.conv);

            console.log("resposta: ", res);
        } else {

        }
    }

    async function selectConversation(c) {
        if (currentConversation != null) {
            socket.emit("leaveConversation", currentConversation.id);
        }
        setCurrentConversation(c);
        socket.emit("joinConversation", c.id);
    }

    async function getConversations() {
        const id = user.id;

        var c = (await getConversationsService(id));
        setConversations(c.conversations);
    }


    //=============================== TODO ========================================
    // - Salvar as mensagens no banco de dados
    // - Carregar as mensagens do banco de dados quando abrir um chat
    // - Configurar a notificação para quando não estiver com o chat aberto 
    // - Criar um menuzinho para adicionar contatos novos 
    // - Opção para criar um grupo
    //=============================================================================


    // useEffect para conectar ao socket e carregar conversas
    useEffect(() => {
        getContacts();
        getConversations();

        socket.connect();

        socket.on("connect", () => {
            console.log("conectado"); // true
        });

        socket.on("disconnect", () => {
            console.log("desconectado"); // false
        });

    }, []);

    // useEffect para receber mensagens e notificações
    useEffect(() => {
        const handleChatMessage = (data) => {

            if (data.sender.id === user.id) return;
            console.log("mensagem recebida: ", data.message);
            setMessages((prev) => [...prev, data]);
        };

        socket.on("chatMessage", handleChatMessage);

        return () => {
            socket.off("chatMessage", handleChatMessage);
        };
    }, [user.id]);

    // useEffect para atualizar quando mudar o current conversation
    useEffect(() => {
        const handleNotification = (data) => {
            //console.log(data);
            // console.log("Id da conversa atual: ", currentConversation.id);
            // console.log("Id da notificação: ", data.to);
        }

        socket.on("chatNotification", handleNotification);
        return () => socket.off("chatNotification", handleNotification);
    }, [currentConversation]);

    // Detectar que clicou no enter
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    // Enviar uma mensagem
    function sendMessage() {
        if (messageInput === "") return;

        let newMessage = { message: messageInput, to: currentConversation.id, sender: user }

        socket.emit("chatMessage", newMessage);
        //console.log("contato: ", userContact);
        setMessages([...messages, newMessage]);
        setMessageInput("");
    }

    // carrega todas as mensagens de um determinado contato
    function getMessages(c) {
        setMessages([]);
    }

    // async function changeContact(c) {
    //     // const conversa = conversations.find(conversation => conversation.id === c.id);

    //     // if (!conversa) {
    //     //     console.log("Não tem uma conversation");
    //     //     const res = await postMethod("/createConversation", { title: "teste", contact1: c.id, contact2: user.id });

    //     //     console.log("resposta: ", res);
    //     // };

    //     setUserContact(c);
    // }

    // Sempre que o contato for atualizado, ele atualiza as mensagens
    // useEffect(() => {
    //     getMessages(userContact);
    // }, [userContact]);


    return (<div className="chat-container">
        {/* Menu lateral com os contatos */}
        <div className="left-menu">

            <div>
                <h2>Conversas</h2>
                <div className="contact-list">
                    {conversations.map((c) =>
                        <div className="contact-item" key={c.id} onClick={() => selectConversation(c)}>{c.title}</div>
                    )}
                </div>
            </div>

            <br></br>

            <div>
                <h2>Contatos para adicionar</h2>
                <div className="contact-list">
                    {contacts.map((c) =>
                        <div className="contact-item" key={c.id} onClick={async () => await addContact(c)}>{c.name}</div>
                    )}
                </div>
            </div>
        </div>

        {/* Chat Principal */}
        {Object.keys(currentConversation).length !== 0 ? (
            <div className="main-chat">
                <div className="contact-info">
                    <h2>{currentConversation ? currentConversation.title : "Contato"}</h2>
                </div>

                {/* Campo com as mensagens */}
                <div className="messages-field">
                    {messages.map((m, index) =>
                        <div className={`message-line ${m.sender.id === user.id ? "message-mine" : ""}`} key={index}>
                            <div className="message-item">
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
        ) : <div><h3>Selecione um contato</h3></div>}

    </div>)
}