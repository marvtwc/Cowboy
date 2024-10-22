<script setup lang="ts">
import {h, cloneVNode} from 'vue'
const pdfElement = ref("pdfElement");
const pdfOutput = ref("");

async function handleCreatePDF() {

    

    pdfOutput.value = await useNuxtApp()
        .$html2pdf()
        .from(pdfElement.value)
        .outputPdf()
        .output("bloburi");
}
const formData= ref({
        qdate: "03/21/2024",
        po_number: "0000001",
        customer_id:"783749",
        customer_name:"Bits Manufacturing Co.",
        customer_address:"123 Wilson Way",
        customer_city:"Sulphur Springs",
        customer_state:"Texas",
        customer_zip:"75482",
        employee_name:"Dakota Soles",
        cbilling_address:"123 Wilson Way",
        cbilling_city:"Sulphur Springs",
        cbilling_state:"Texas",
        cbilling_zip:"75482",
        products: [
            {product_pn:"00001",product_size:"2in",product_name: "Gizmo Gapper",pquantity:"5",amount_per_case:"1",cost_per_product:"2",net_amount:"10"},
            {product_pn:"00002",product_size:"4in",product_name: "Limbus Snatcher",pquantity:"3",amount_per_case:"2",cost_per_product:"4",net_amount:"24"}
        ],
        subtotal:"23",
        total_cost:"25"
})



onMounted(async () => {
    const {data } = await useFetch(
    `/api/documents/generateQuote`,
    {
        method: 'POST',
        body: {
        customer_id:"65de564283bf715be420b46b",
        employee_id: "65de588e697161bb2818559b",
        quote_id:"65dfc3e12f59b07742eb4e00",
        products: [
            {
                product_id:"65de70cc6df2738661e8d3b3",
                quantity:2
            },
            {
                product_id:"65e1247f4e97794de129e2ba",
                quantity:2
            }
        ]
        },
    }
    )
    console.log(data)
    await handleCreatePDF();
});

definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <div>
    <BasePageHeader page="Dashboard" />
    <div class="relative h-full py-1 px-2">
        <div class="absolute translate-y-[100in]">
            <div ref="pdfElement" class="py-2 px-4 w-[8in]">
                <div class="header flex justify-between">
                    <div class="font-bold text-2xl">Cowboy Distribution</div>
                    <div class="font-bold text-2xl">Invoice</div>
                </div>
                <div class="subHeader py-3 px-2 flex justify-between">
                    <div class="text-sm px-8">
                        Cowboy Distribution LLC
                        <br/>PO Box 184
                        <br/>Sulphur Springs, TX 75483
                    </div>
                    <div class="text-sm">
                        Quote Date: {{formData.qdate}}<br>
                        P.O. #: {{ formData.po_number }}
                    </div>
                </div>
                <div class="quoteDetails py-2 flex justify-between">
                    <div class="customerDetails">
                        Cust. #: {{ formData.customer_id }}<br/>
                        <div class="py-2">
                            Ship To: {{ formData.customer_name}}<br/>
                            <div class="pl-[0.7in]">
                                {{ formData.customer_address }}<br/>
                                {{ formData.customer_city }}, {{ formData.customer_state }} {{ formData.customer_zip }}
                            </div>
                        </div>
                        <div class="py-2">
                            Bill To: {{ formData.customer_name}}<br/>
                            <div class="pl-[0.7in]">
                                {{ formData.cbilling_address }}<br/>
                                {{ formData.cbilling_city }}, {{ formData.cbilling_state }} {{ formData.cbilling_zip }}
                            </div>
                        </div>
                    </div>
                    <div class="employeeDetails">
                        Quoted By: {{ formData.employee_name }}
                    </div>
                </div>
                <div class="border-spacing-2 tableHeader grid-cols-5 border-y-2 border-collapse border-solid border-black flex justify-between">
                        <div class="border-r-2 border-solid border-black isColumn px-1">
                            <div class="justify-self-start -translate-y-[.07in]">Product & Description</div>
                        </div>
                        <div class="border-r-2 border-solid border-black isColumn px-1">
                            <div class="mx-auto -translate-y-[.07in]">Quantity Ordered</div>
                        </div>
                        <div class="border-r-2 border-solid border-black isColumn px-1">
                            <div class=" mx-auto -translate-y-[.07in]">Product Per Case</div>
                        </div>
                        <div class="border-r-2 border-solid border-black isColumn px-1">
                            <div class="mx-auto -translate-y-[.07in]">Unit Price</div>
                        </div>
                        <div class="isColumn px-1 justify-self-end -translate-y-[.07in]">Amount</div>
                </div>
                <div class="productsShown">
                    <div v-for="product in formData.products">
                        <div class="py-2 justify-between flex">
                            <div class="productDesc px-1 justify-self-start">
                                <div class="font-bold">
                                    {{ product.product_pn }},
                                </div>
                                {{ product.product_name }}
                                {{ product.product_size }}
                            </div>
                            <div class="quantity px-1 mx-auto">
                                {{ product.pquantity}}
                            </div>
                            <div class="unitAmount px-1 mx-auto">
                                {{ product.amount_per_case }}
                            </div>
                            <div class="unitPrice px-1 mx-auto">
                                {{ product.cost_per_product }}
                            </div>
                            <div class="netAmount px-1 justify-self-end">
                                {{ product.net_amount }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="totals">
                    <div class="justify-end pt-4 pb-2 flex">
                        Subtotal: {{formData.subtotal}}
                    </div>
                    <div class="justify-end flex">
                        Invoice Total: {{formData.total_cost}}
                    </div>
                </div>
            </div>
        </div>
        <div class="flex h-full py-8 px-2">
            <div class="w-[70%] h-[100%]">
                <embed width="100%" height="100%"
                v-if="pdfOutput"
                id="pdfOutput"
                type="application/pdf"
                :src="pdfOutput"
                />
            </div>
            <div class="w-[30%] h-[100%] py-2 px-2">
                <button class="rounded bg-accent-default px-4 py-1 text-sm">
                    Send Email
                </button>
            </div>
        </div>
    </div>
  </div>
</template>