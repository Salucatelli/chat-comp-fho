import { getAllContacts, getSomething, postSometing } from "../api/endpoints";

export async function getContactsService() {
    const response = await getAllContacts();
    return response;
}

export async function getConversationsService(id) {
    const response = await getSomething("/conversations/" + id);
    return response;
}

export async function postMethod(url, object) {
    const response = await postSometing(url, object);
    return response;
}