import { defineStore } from "pinia";

export const usePDFStore = defineStore("pdf", () => {
  const customer_id = ref();
  const employee_id = ref();
  const quote_id = ref();
  const products = ref<{ product_id: String; quantity: Number }[]>([]);

  return { customer_id, employee_id, quote_id, products };
});
