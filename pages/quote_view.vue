<script setup lang="ts">
import { usePDFStore } from "~/stores/pdf";
const pdfStore = usePDFStore();
const { customer_id, employee_id, quote_id, products } = storeToRefs(pdfStore);
const pdfElement = ref("pdfElement");
const pdfOutput = ref("");

async function handleCreatePDF() {
  pdfOutput.value = await useNuxtApp()
    .$html2pdf()
    .from(pdfElement.value)
    .outputPdf()
    .output("bloburi");
}

// type propType = {
//   customer_id: String;
//   employee_id: String;
//   quote_id: String;
//   products: { product_id: String; quantity: Number }[];
// };
// const props = defineProps<propType>();

const formData = ref({
  qdate: "03/21/2024",
  po_number: "0000001",
  customer_id: "783749",
  customer_name: "Bits Manufacturing Co.",
  customer_address: "123 Wilson Way",
  customer_city: "Sulphur Springs",
  customer_state: "Texas",
  customer_zip: "75482",
  employee_name: "Dakota Soles",
  cbilling_address: "123 Wilson Way",
  cbilling_city: "Sulphur Springs",
  cbilling_state: "Texas",
  cbilling_zip: "75482",
  products: [
    {
      product_pn: "00001",
      product_size: "2in",
      product_name: "Gizmo Gapper",
      pquantity: "5",
      amount_per_case: "1",
      cost_per_product: "2",
      net_amount: "10",
    },
    {
      product_pn: "00002",
      product_size: "4in",
      product_name: "Limbus Snatcher",
      pquantity: "3",
      amount_per_case: "2",
      cost_per_product: "4",
      net_amount: "24",
    },
  ],
  subtotal: "23",
  total_cost: "25",
});
onMounted(async () => {
  const payloadProduct = products.value.map((product) => {
    return {
      product_id: product._id,
      quantity: product.quantity,
    };
  });
  const { data } = await useFetch(`/api/documents/generateQuote`, {
    method: "POST",
    body: {
      customer_id: customer_id.value,
      employee_id: employee_id.value,
      quote_id: quote_id.value,
      products: payloadProduct,
    },
  });
  if (data.value && !(typeof data.value == "string")) {
    formData.value = data.value;
  }
  await handleCreatePDF();
});

definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <div>
    <BasePageHeader page="Dashboard" />

    <div class="relative h-full px-2 py-1">
      <div class="absolute -z-[99999]">
        <div ref="pdfElement" class="w-[8in] px-4 py-2">
          <div class="header flex justify-between">
            <div class="text-2xl font-bold">Cowboy Distribution</div>
            <div class="text-2xl font-bold">Quote</div>
          </div>
          <div class="subHeader flex justify-between px-2 py-3">
            <div class="px-8 text-sm">
              Cowboy Distribution LLC
              <br />PO Box 184 <br />Sulphur Springs, TX 75483
            </div>
            <div class="text-sm">
              Quote Date: {{ formData.qdate }}<br />
              P.O. #: {{ formData.po_number }}
            </div>
          </div>
          <div class="quoteDetails flex justify-between py-2">
            <div class="customerDetails">
              Cust. #: {{ formData.customer_id }}<br />
              <div class="py-2">
                Ship To: {{ formData.customer_name }}<br />
                <div class="pl-[0.7in]">
                  {{ formData.customer_address }}<br />
                  {{ formData.customer_city }}, {{ formData.customer_state }}
                  {{ formData.customer_zip }}
                </div>
              </div>
              <div class="py-2">
                Bill To: {{ formData.customer_name }}<br />
                <div class="pl-[0.7in]">
                  {{ formData.cbilling_address }}<br />
                  {{ formData.cbilling_city }}, {{ formData.cbilling_state }}
                  {{ formData.cbilling_zip }}
                </div>
              </div>
            </div>
            <div class="employeeDetails">
              Quoted By: {{ formData.employee_name }}
            </div>
          </div>
          <div
            class="grid border-collapse grid-cols-5 items-center divide-x divide-inherit border border-black text-center leading-3"
          >
            <div class="col-span-1 pb-3 pl-1 text-left">Product/Desc</div>
            <div class="col-span-1 pb-3">Qty</div>
            <div class="col-span-1 pb-3">Product Per Case</div>
            <div class="col-span-1 pb-3">Unit Price</div>
            <div class="col-span-1 pb-3 pr-1 text-right">Amt</div>
          </div>
          <div
            class="grid grid-cols-5 items-center text-center"
            v-for="product in formData.products"
          >
            <div class="col-span-1 justify-self-start text-start">
              <div class="font-bold">{{ product.product_pn }},</div>
              {{ product.product_name }}
              {{ product.product_size }}
            </div>

            <div class="quantity col-span-1 px-1">
              {{ product.pquantity }}
            </div>
            <div class="unitAmount col-span-1 px-1">
              {{ product.amount_per_case }}
            </div>
            <div class="unitPrice col-span-1 px-1">
              ${{ formatWithCommas(product.cost_per_product) }}
            </div>
            <div class="netAmount col-span-1 justify-self-end px-1">
              ${{ formatWithCommas(product.net_amount) }}
            </div>
          </div>
          <!-- <div
            class="tableHeader flex border-collapse border-spacing-2 grid-cols-5 items-center justify-between border-y-2 border-solid border-black"
          >
            <div class="isColumn border-r-2 border-solid border-black px-1">
              <div class="-translate-y-[.07in] justify-self-start">
                Product & Description
              </div>
            </div>
            <div class="isColumn border-r-2 border-solid border-black px-1">
              <div class="mx-auto -translate-y-[.07in]">Quantity Ordered</div>
            </div>
            <div class="isColumn border-r-2 border-solid border-black px-1">
              <div class="mx-auto -translate-y-[.07in]">Product Per Case</div>
            </div>
            <div class="isColumn border-r-2 border-solid border-black px-1">
              <div class="mx-auto -translate-y-[.07in]">Unit Price</div>
            </div>
            <div class="isColumn -translate-y-[.07in] justify-self-end px-1">
              Amount
            </div>
          </div>
          <div class="productsShown">
            <div v-for="product in formData.products">
              <div class="flex justify-between py-2">
                <div class="productDesc justify-self-start px-1">
                  <div class="font-bold">{{ product.product_pn }},</div>
                  {{ product.product_name }}
                  {{ product.product_size }}
                </div>
                <div class="quantity mx-auto px-1">
                  {{ product.pquantity }}
                </div>
                <div class="unitAmount mx-auto px-1">
                  {{ product.amount_per_case }}
                </div>
                <div class="unitPrice mx-auto px-1">
                  {{ product.cost_per_product }}
                </div>
                <div class="netAmount justify-self-end px-1">
                  {{ product.net_amount }}
                </div>
              </div>
            </div>
          </div> -->
          <div class="totals">
            <div class="flex justify-end pb-2 pt-4">
              Subtotal: ${{ formatWithCommas(formData.subtotal) }}
            </div>
            <div class="flex justify-end">
              Invoice Total: ${{ formatWithCommas(formData.total_cost) }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex h-full px-2 py-8">
        <div class="h-[100%] w-[70%]">
          <embed
            width="100%"
            height="100%"
            v-if="pdfOutput"
            id="pdfOutput"
            type="application/pdf"
            :src="pdfOutput"
          />
        </div>
        <div class="h-[100%] w-[30%] px-2 py-8">
          <NuxtLink
            to="/invoice_view"
            class="rounded bg-accent-default px-4 py-1 text-sm"
            >View Invoice
          </NuxtLink>
          <button class="my-4 rounded bg-accent-default px-4 py-1 text-sm">
            Send Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
