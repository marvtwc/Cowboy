import { defineStore } from "pinia";

export const useContactStore = defineStore("contact", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const contacts = ref<ContactModel[]>([]);
  const selectedContact = ref<ContactModel>();

  interface SelectedEntity extends CustomerModel, VendorModel {
    type: "customer" | "vendor";
  }
  const selectedEntity = ref<SelectedEntity>();

  async function getContacts() {
    const { data, error } = await useFetch<ContactModel[]>(
      "/api/contacts/allContacts",
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      contacts.value = data.value;
    }
  }
  async function getContact(contact_id: string) {
    await getContacts();
    const contact = contacts.value.find(
      (contact) => contact._id === contact_id,
    );

    if (contact) {
      return contact;
    } else {
      return null;
    }
  }
  async function addContact(contact: any) {
    const { data, error } = await useFetch("/api/contacts/create/contact", {
      method: "POST",
      body: contact,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyContact(contact: any) {
    const { data, error } = await useFetch("/api/contacts/modify/contact", {
      method: "PUT",
      body: contact,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteContact(contact_id: string) {
    const { data, error } = await useFetch("/api/contacts/delete/contact", {
      method: "POST",
      body: {
        contact_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }
  return {
    contacts,
    selectedContact,
    selectedEntity,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    getContacts,
    getContact,
    addContact,
    modifyContact,
    deleteContact,
  };
});
