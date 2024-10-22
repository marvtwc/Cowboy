import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const customers = ref<CustomerModel[]>([]);
  const selectedCustomer = ref<CustomerModel>();

  async function getCustomers() {
    const { data, error } = await useFetch<CustomerModel[]>(
      "/api/customers/allCustomer",
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      customers.value = data.value;
    }
  }
  async function getCustomersWithId(employee_id: string) {
    const { data, error } = await useFetch<CustomerModel[]>(
      "/api/customers/allCustomer",
      {
        params: {
          employee: employee_id,
        },
      },
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      return data.value;
    }
  }
  async function getCustomer(customer_id: string) {
    await getCustomers();
    const customer = customers.value.find(
      (customer) => customer._id === customer_id,
    );

    if (customer) {
      return customer;
    } else {
      return null;
    }
  }
  async function addCustomer(customer: any) {
    const { data, error } = await useFetch("/api/customers/create/customer", {
      method: "POST",
      body: customer,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyCustomer(customer: any) {
    const { data, error } = await useFetch("/api/customers/modify/customer", {
      method: "PUT",
      body: customer,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteCustomer(customer_id: string) {
    const { data, error } = await useFetch("/api/customers/delete/customer", {
      method: "POST",
      body: {
        customer_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }
  return {
    customers,
    selectedCustomer,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    getCustomers,
    getCustomersWithId,
    getCustomer,
    addCustomer,
    modifyCustomer,
    deleteCustomer,
  };
});
