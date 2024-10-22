<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { useVendorStore } from "~/stores/vendors";
const vendorStore = useVendorStore();
const { showCreateDialog } = storeToRefs(vendorStore);
</script>
<template>
  <div>
    <BasePageHeader page="Vendors">
      <button
        @click="showCreateDialog = true"
        class="rounded-sm border border-white/10 bg-blue-600/80 px-6 py-1 text-blue-200 shadow-[0_2px_8px] shadow-blue-500/10"
      >
        Add
      </button>
    </BasePageHeader>
    <div>
      <VendorTable />

      <VendorCreateDialog />
      <VendorEditDialog />
    </div>
  </div>
</template>
