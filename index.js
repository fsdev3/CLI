import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactsPath,
} from "./contacts.js";
import { Command } from "commander";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      return console.log(contactList);

    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);

    case "add":
      const addContact = await addContact(name, email, phone);
      return console.log(addContact);

    case "remove":
      const removeContactById = await removeContact(id);
      return console.log(removeContactById);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "rsKkOQUi80UsgVPCcLZZW" });
// invokeAction({ action: "add" });
// invokeAction({ action: "list" });
// invokeAction({ action: "list" });
