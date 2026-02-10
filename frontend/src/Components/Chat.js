import React, { useEffect, useState, useRef } from "react";
import { socket } from "../Services/socketService";
import '../Styles/Chat.css'
import { getContactsService, getConversationsService, getMessagesService, sendMessageService } from "../Services/chatService";
import { postMethod } from "../api/endpoints";


export default function Chat({ user }) {
    const messagesEndRef = useRef(null);

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

    /* 
    MELHORIA FUTURA:
        Usar um metodo post HTTP para marcar as mensagens como lidas e salvar isso no backend, e ao mesmo tempo usar um socket.emit para avisar os outros usuários que as mensagens foram lidas
    */

    // Executado quando abre uma nova conversa
    async function selectConversation(c) {
        if (currentConversation.length > 0) {
            socket.emit("leaveConversation", currentConversation.id);
        }

        setCurrentConversation(c);
        await getMessages(c.id);

        // Aqui ele tira as mensagens não lidas da conversa quando você abre ela
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === c.id
                    ? { ...conversation, _count: { messages: 0 } }
                    : conversation
            )
        );

        // Marcar as mensagens como lidas
        socket.emit("markMessagesAsRead", { conversationId: c.id, userId: user.id });

        socket.emit("joinConversation", c.id);
    }

    async function getConversations() {
        const id = user.id;

        var c = (await getConversationsService(id));
        setConversations(c.conversations);
    }

    // Atualiza a ultima mensagem de uma conversa
    function updateLastMessage(message) {
        const conversationId = message.conversationId ?? message.to;
        if (!conversationId) return;

        // Para saber se marca a mensagem como não lida ou não
        const unreadNumber = currentConversation.id === conversationId ? 0 : 1;

        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, lastMessage: message, _count: { messages: conversation._count.messages + unreadNumber } }
                    : conversation
            )
        );
    }

    // Detectar que clicou no enter
    async function handleKeyPress(event) {
        if (event.key === 'Enter') {
            await sendMessage();
        }
    }

    // Enviar uma mensagem
    async function sendMessage() {
        if (messageInput === "") return;
        let newMessage = {
            content: messageInput,
            to: currentConversation.id,
            conversationId: currentConversation.id,
            sender: user,
        }

        // Envia para o server a mensagem, que envia para os outros e salva no banco
        socket.emit("chatMessage", newMessage);

        updateLastMessage(newMessage);

        setMessages([...messages, newMessage]);
        setMessageInput("");
    }

    // carrega todas as mensagens de um determinado contato
    async function getMessages(cId) {
        var messages = await getMessagesService(cId);
        setMessages(messages.messages);
    }

    function checkUnreadMessages(c) {
        return c._count.messages > 0 ? "unread" : "";
    }


    //=============================== TODO ========================================
    // - OK Salvar as mensagens no banco de dados
    // - OK Carregar as mensagens do banco de dados quando abrir um chat
    // - OK Marcar mensagem como lida
    // - Deixar bonitinho uma badge para mostrar mensagens não lidas na lista de conversas
    // - Adicionar no objeto da mensagem se foi lida ou não para mostrar diferente na lista de conversas
    // - QUASE Configurar a notificação para quando não estiver com o chat aberto 
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

    // useEffect para receber mensagens quando o chat está aberto
    useEffect(() => {
        const handleChatMessage = (data) => {
            if (data.sender.id === user.id) return;

            updateLastMessage(data);

            setMessages((prev) => [...prev, data]);
        };

        socket.on("chatMessage", handleChatMessage);

        return () => socket.off("chatMessage", handleChatMessage);
    }, [user.id]);

    // useEffect para receber notificações quando chat não está aberto
    useEffect(() => {
        const handleNotification = (data) => {
            if (data.sender.id === user.id) return;
            //console.log("notificação recebida: ", data);

            updateLastMessage(data);
        }

        socket.on("chatNotification", handleNotification);
        return () => socket.off("chatNotification", handleNotification);
    }, [currentConversation]);

    // useEffect para scrollar para baixo quando abrir uma conversa
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                        <div className={`contact-item ${checkUnreadMessages(c)}`} key={c.id} onClick={() => selectConversation(c)}>
                            <h4>{c.title}</h4>

                            <span>{(c.lastMessage || (c.messages && c.messages[0])) ? (c.lastMessage || c.messages[0]).content : ""}</span>
                        </div>
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
                                    <p>{m.content}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
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
        {/* elemento invisível para scroll */}

    </div>)
}
