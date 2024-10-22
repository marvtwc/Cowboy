<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { type ProductModel } from "~/server/utils/types/types";
import { useQuoteStore } from "~/stores/quotes";
const quoteStore = useQuoteStore();
const { getQuote, deleteQuote } = quoteStore;

const router = useRouter();
const quoteId = router.currentRoute.value.params.quote_id;
const quote = await getQuote(quoteId as string);

const searchValue = ref("");

const quoteColumns = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
];

interface columnProduct extends ProductModel {
  quantity: number;
}
const columnProducts: {
  accessorKey: keyof columnProduct;
  header: string;
}[] = [
  {
    accessorKey: "part_number",
    header: "Part #",
  },
  {
    accessorKey: "product_name",
    header: "Name",
  },
  {
    accessorKey: "cost_per_product",
    header: "Cost",
  },
  {
    accessorKey: "amount_per_case",
    header: "Per Case",
  },
  {
    accessorKey: "cases_per_pallet",
    header: "Per Pallet",
  },
  {
    accessorKey: "pallet_per_truck",
    header: "Per Truck",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "unit_measure",
    header: "Unit",
  },
];
</script>
<template>
  <div>
    <BasePageHeader page="Quote Details" />
    <Table
      class="grow"
      :data="quote.quotes"
      :columns="quoteColumns"
      :search="searchValue"
    >
    </Table>
  </div>
</template>
