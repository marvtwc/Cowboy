import type { Schema } from "mongoose";
import { defineStore } from "pinia";
import type { ProductModel } from "~/server/utils/types/types";

export interface SelectedProductType extends ProductModel {
  vendor_name?: string;
}
export const useProductStore = defineStore("product", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const products = ref<SelectedProductType[]>([]);
  const selectedProduct = ref<SelectedProductType>();
  const hideTypeColumn = ref(false);
  const filteredProducts = computed(() => {
    if (selectedCategory.value === "All") {
      hideTypeColumn.value = false;
      return products.value;
    } else {
      hideTypeColumn.value = true;
      return products.value.filter(
        (product: SelectedProductType) =>
          product.type.toLowerCase() === selectedCategory.value.toLowerCase(),
      );
    }
  });

  const categories = computed(() => {
    let categories = ["All"];
    products.value.forEach((product: SelectedProductType) => {
      const category =
        product.type.charAt(0).toUpperCase() + product.type.slice(1);
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories;
  });
  const selectedCategoryIndex = ref(0);
  const selectedCategory = computed(
    () => categories.value[selectedCategoryIndex.value],
  );

  type AllProductsResponseType = (Omit<ProductModel, "vendor_owned"> & {
    vendor_owned: { _id: Schema.Types.ObjectId; name: string };
  })[];

  async function getProducts() {
    const { data, error } = await useFetch("/api/products/allProducts");

    if (error.value) {
      console.log(error.value);
    } else {
      const productsData = data.value as AllProductsResponseType;
      products.value = productsData.map((product) => {
        const { vendor_owned, ...rest } = product;
        return {
          ...rest,
          vendor_owned: product.vendor_owned?._id,
          vendor_name: product.vendor_owned?.name,
        };
      });
      return products;
    }
  }

  async function addProduct(product: any) {
    const { data, error } = await useFetch("/api/products/create/product", {
      method: "POST",
      body: product,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyProduct(payload: any) {
    const { data, error } = await useFetch("/api/products/modify/product", {
      method: "PUT",
      body: payload,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteProduct(product_id: string) {
    const { data, error } = await useFetch("/api/products/delete/product", {
      method: "POST",
      body: {
        product_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  return {
    products,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    selectedProduct,
    filteredProducts,
    categories,
    selectedCategoryIndex,
    selectedCategory,
    hideTypeColumn,
    getProducts,
    addProduct,
    modifyProduct,
    deleteProduct,
  };
});
