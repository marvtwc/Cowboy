<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { useCustomerStore } from "~/stores/customers";
const customerStore = useCustomerStore();
const { showCreateDialog } = storeToRefs(customerStore);
</script>
<template>
  <div>
    <BasePageHeader page="Customers">
      <button
        @click="showCreateDialog = true"
        class="rounded-sm border border-white/10 bg-blue-600/80 px-6 py-1 text-blue-200 shadow-[0_2px_8px] shadow-blue-500/10"
      >
        Add
      </button>
    </BasePageHeader>
    <div>
      <CustomerTable />
      <CustomerEditDialog />
      <CustomerCreateDialog />
    </div>
  </div>
</template>
