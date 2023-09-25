import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const buffer = JSON.parse(data);
  return buffer;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((cont) => cont.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const [result] = contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
