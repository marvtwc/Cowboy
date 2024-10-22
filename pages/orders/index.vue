<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <div>
    <BasePageHeader page="Orders">
      <NuxtLink
        to="/orders/new"
        class="rounded-sm border border-white/10 bg-blue-600/80 px-6 py-1 text-blue-200 shadow-[0_2px_8px] shadow-blue-500/10"
        >Create</NuxtLink
      >
    </BasePageHeader>
    <div class="flex flex-col gap-4">
      <OrderTable class="h-[calc(100vh-12rem)]" />
      <OrderCreateDialog />
      <!-- <OrderEditDialog /> -->
    </div>
  </div>
</template>
