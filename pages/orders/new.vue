<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { usePDFStore } from "~/stores/pdf";
const pdfStore = usePDFStore();
const {
  customer_id,
  employee_id,
  quote_id,
  products: pdfStoreProducts,
} = storeToRefs(pdfStore);
import { useCustomerStore } from "~/stores/customers";
import { useProductStore } from "~/stores/products";
import { useAuth } from "#imports";
const { data: auth } = useAuth();
const customerStore = useCustomerStore();
const productStore = useProductStore();
const { getCustomers } = customerStore;
const { getProducts } = productStore;
const { customers } = storeToRefs(customerStore);
const { products } = storeToRefs(productStore);
await getProducts();
await getCustomers();

const selectedProducts = ref([]);
const productsColumns = [
  {
    accessorKey: "part_number",
    header: "Part #",
  },
  {
    accessorKey: "product_name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "cost_per_product",
    header: "Cost",
  },
  {
    accessorKey: " ",
    header: "Total",
    cell: ({ row }) => {
      return row.original.quantity * row.original.cost_per_product;
    },
  },
];

const orderTotal = computed(() => {
  if (selectedProducts.value.length === 0) return 0;

  if (selectedProducts.value.length === 1) {
    return (
      selectedProducts.value[0].quantity *
      selectedProducts.value[0].cost_per_product
    );
  }
  const prices = selectedProducts.value.map(
    (product) => product.quantity * product.cost_per_product,
  );
  return prices.reduce((total, cost) => total + cost);
});

const handleProductUpdate = (newProduct) => {
  const foundIndex = selectedProducts.value.findIndex(
    (product) => product._id === newProduct._id,
  );
  if (foundIndex > -1) {
    if (newProduct.quantity === 0) {
      selectedProducts.value.splice(foundIndex, 1);
    } else {
      selectedProducts.value[foundIndex] = newProduct;
    }
  } else {
    selectedProducts.value.push(newProduct);
  }
};

const isReadyToSubmit = computed(() => {
  return selectedProducts.value.length > 0;
});
async function onViewQuote() {
  if (!isReadyToSubmit.value) return;
  // get all data ready
  const quoteContent = selectedProducts.value.map((product) => {
    return {
      product: product._id,
      quantity: product.quantity,
      margin: product.margin,
    };
  });
  // create order
  // TODO: Get employee id from auth
  const { data: orderResponse, err } = await useFetch(
    "/api/orders/createOrder",
    {
      method: "POST",
      body: {
        customer: selectedCustomer.value._id,
        employee: auth.value?.user?._id,
      },
    },
  );
  if (!orderResponse.value) {
    return console.log(err);
  }
  const payload = {
    order_id: orderResponse.value.oid,
    quote: {
      vendor: "65ceaddf3a9b8f1abe9cd9ac",
      customer: selectedCustomer.value._id,
      quote_content: quoteContent,
    },
  };
  // send payload
  const { data: quoteResponse, error } = await useFetch(
    "/api/quotes/createQuote",
    {
      method: "POST",
      body: payload,
    },
  );

  if (error.value) {
    console.log(error.value);
  }
  if (
    quoteResponse.value &&
    quoteResponse.value.qid &&
    selectedCustomer.value
  ) {
    customer_id.value = selectedCustomer.value._id;
    employee_id.value = auth.value?.user?._id;
    quote_id.value = quoteResponse.value.qid;
    pdfStoreProducts.value = selectedProducts.value;
    useRouter().push("/quote_view");
  }
}

const selectedCustomer = ref(customers.value[0] ? customers.value[0] : null);
const handleCustomerComboChange = (customer) => {
  selectedCustomer.value = customer;
};
</script>
<template>
  <div>
    <BasePageHeader page="New Quote" />
    <div class="flex flex-col gap-6">
      <div class="flex gap-4">
        <fieldset v-if="selectedCustomer" class="flex flex-col gap-1">
          <label for="">Customer</label>
          <BaseCombo @update="handleCustomerComboChange" :options="customers" />
        </fieldset>
        <fieldset v-if="selectedCustomer" class="flex flex-col gap-1">
          <label for="customer_margin">Customer Margin</label>
          <input
            class="h-full"
            type="number"
            v-model="selectedCustomer.margin"
            id="customer_margin"
          />
        </fieldset>
      </div>
      <div class="stretch overflow-hidden">
        <div class="flex max-h-96 flex-wrap gap-4 overflow-y-auto">
          <!-- <ProductBox
            @update="handleProductUpdate"
            v-for="product in products"
            :product="product"
          /> -->
          <ProductList v-model="selectedProducts" />
        </div>
      </div>
      <div class="flex gap-4">
        <div class="grow">
          <Table
            class="h-80 overflow-auto"
            v-if="selectedProducts.length > 0"
            :data="selectedProducts"
            :columns="productsColumns"
          />
        </div>
        <div
          class="flex flex-col justify-center gap-4 bg-base-default p-8 text-center"
        >
          <div class="flex flex-col gap-2">
            <p class="text-xl font-bold">Order Total</p>
            <p>${{ orderTotal }}</p>
          </div>
          <div class="flex justify-center gap-2">
            <button :disabled="!isReadyToSubmit" @click="onViewQuote">
              View Quote
            </button>
            <button disabled>View Invoice</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
