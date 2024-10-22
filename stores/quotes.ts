import type { Schema } from "mongoose";
import { defineStore } from "pinia";
import type { QuoteModel } from "~/server/utils/types/types";
import { useOrderStore } from "./orders";

export const useQuoteStore = defineStore("quote", () => {
  const { orders } = storeToRefs(useOrderStore());
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const quotes = ref<QuoteModel[]>([]);
  const quote = ref<QuoteModel>();
  const selectedQuote = ref<QuoteModel>();

  async function getQuotes() {
    const { data, error } = await useFetch<QuoteModel[]>(
      "/api/quotes/getQuotes",
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      quotes.value = data.value;
    }
  }

  async function getQuote(quote_id: string) {
    const quote = orders.value.find((order) => {
      const found = order.quotes.find((q) => {
        return q._id === quote_id;
      });

      if (found) {
        return found;
      }
    });
    if (!quote) {
      console.log("No Order found");
    } else if (quote) {
      return quote;
    }
  }

  async function addQuote(quote: any) {
    const { data, error } = await useFetch("/api/quotes/create/quote", {
      method: "POST",
      body: quote,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyQuote(quote: any) {
    const { data, error } = await useFetch("/api/quotes/modify/quote", {
      method: "PUT",
      body: quote,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteQuote(quote_id: string) {
    const { data, error } = await useFetch("/api/quotes/delete/quote", {
      method: "POST",
      body: {
        quote_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  return {
    quotes,
    quote,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    selectedQuote,
    getQuotes,
    getQuote,
    addQuote,
    modifyQuote,
    deleteQuote,
  };
});
