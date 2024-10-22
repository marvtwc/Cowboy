<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { h } from "vue";
import { NuxtLink } from "#components";
import { useOrderStore } from "~/stores/orders";
import { useCustomerStore } from "~/stores/customers";
const orderStore = useOrderStore();
const customerStore = useCustomerStore();
const { getOrder } = orderStore;
const { getCustomer } = customerStore;
const router = useRouter();
const orderId = router.currentRoute.value.params.order_id;
const order = await getOrder(orderId as string);

const searchValue = ref("");

const quotesColumns = [
  {
    accessorKey: "_id",
    header: "Quote ID",
    cell: ({ row }) => {
      return h(
        NuxtLink,
        { to: `/quotes/${row.original._id}` },
        {
          default: () => row.original._id,
        },
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "quote_content",
    header: "Products",
    cell: ({ getValue }) => {
      return getValue().length;
    },
  },
];
</script>
<template>
  <div>
    <BasePageHeader page="Order Details" />
    <div class="flex h-[calc(100vh-12rem)] flex-col gap-4">
      <Table
        class="grow"
        :data="order.quotes"
        :columns="quotesColumns"
        :search="searchValue"
      >
      </Table>
      <Table
        class="grow"
        :data="order.invoices"
        :columns="quotesColumns"
        :search="searchValue"
      >
      </Table>
    </div>
  </div>
</template>
