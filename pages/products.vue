<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { useProductStore } from "~/stores/products";
const productStore = useProductStore();
const { showCreateDialog } = storeToRefs(productStore);
</script>
<template>
  <div>
    <BasePageHeader page="Products">
      <button
        @click="showCreateDialog = true"
        class="rounded-sm border border-white/10 bg-blue-600/80 px-6 py-1 text-blue-200 shadow-[0_2px_8px] shadow-blue-500/10"
      >
        Add
      </button>
    </BasePageHeader>
    <div>
      <ProductTable />
      <ProductEditDialog />
      <ProductCreateDialog />
      <ProductDeleteAlert />
      <!-- <ProductList /> -->
    </div>
  </div>
</template>
