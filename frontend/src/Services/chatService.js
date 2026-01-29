import { getAllContacts } from "../api/endpoints";

export async function getContactsService() {
    const response = await getAllContacts();
    //console.log(response);
    return response;
}