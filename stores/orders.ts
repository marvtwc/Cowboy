import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const orders = ref<any[]>([]);
  const selectedOrder = ref<any>();

  async function getOrders(employee_id: string) {
    orders.value = [];

    const { data, error } = await useFetch<any[]>(
      "/api/orders/getAllOrdersWithDetails",
      {
        params: {
          employee: employee_id,
        },
      },
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      orders.value = data.value;
    }
  }

  // TODO: Figure out edge case of not loading big boy data on first load
  async function getOrder(order_id: string) {
    const order = orders.value.find((order) => {
      console.log(order._id, order_id);
      return order._id === order_id;
    });
    if (!order) {
      console.log("Order not found");
    } else if (order) {
      return order;
    }
  }

  async function addOrder(order: any) {
    const { data, error } = await useFetch("/api/orders/create/order", {
      method: "POST",
      body: order,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyOrder(order: any) {
    const { data, error } = await useFetch("/api/orders/modify/order", {
      method: "PUT",
      body: order,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteOrder(order_id: string) {
    const { data, error } = await useFetch("/api/orders/delete/order", {
      method: "POST",
      body: {
        order_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  return {
    orders,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    selectedOrder,
    getOrders,
    getOrder,
    addOrder,
    modifyOrder,
    deleteOrder,
  };
});
