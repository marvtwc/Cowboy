import type { Schema } from "mongoose";
import { defineStore } from "pinia";
import type { InvoiceModel } from "~/server/utils/types/types";

export const useInvoiceStore = defineStore("invoice", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const invoices = ref<InvoiceModel[]>([]);
  const selectedInvoice = ref<InvoiceModel>();

  async function getInvoices() {
    const { data, error } = await useFetch<InvoiceModel[]>(
      "/api/invoices/getInvoices",
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      invoices.value = data.value;
    }
  }

  async function addInvoice(invoice: any) {
    const { data, error } = await useFetch("/api/invoices/create/invoice", {
      method: "POST",
      body: invoice,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyInvoice(invoice: any) {
    const { data, error } = await useFetch("/api/invoices/modify/invoice", {
      method: "PUT",
      body: invoice,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteInvoice(invoice_id: string) {
    const { data, error } = await useFetch("/api/invoices/delete/invoice", {
      method: "POST",
      body: {
        invoice_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  return {
    invoices,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    selectedInvoice,
    getInvoices,
    addInvoice,
    modifyInvoice,
    deleteInvoice,
  };
});
