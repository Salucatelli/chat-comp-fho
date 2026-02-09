import { getAllContacts, getMethod, postMethod } from "../api/endpoints";

export async function getContactsService() {
    const response = await getAllContacts();
    return response;
}

export async function getConversationsService(id) {
    const response = await getMethod("/conversations/" + id);
    return response;
}

// export async function postMethod(url, object) {
//     const response = await postMethod(url, object);
//     return response;
// }

export async function sendMessageService(data) {
    console.log(data);
    const resp = await postMethod("/sendMessage", { senderId: data.sender.id, conversationId: data.to, content: data.content });

    //console.log("Resposta da API: ", resp);
    return resp;
}

export async function getMessagesService(id) {
    const response = await getMethod("/getMessages/" + id);
    return response;
}