import { defineStore } from "pinia";

export const useVendorStore = defineStore("vendors", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const vendors = ref<VendorModel[]>([]);
  const selectedVendor = ref<VendorModel>();
  const comboOptions = computed(() => {
    return vendors.value?.map((vendor) => {
      return {
        _id: vendor._id,
        name: vendor.name,
      };
    });
  });

  async function getVendors() {
    const { data, error } = await useFetch<VendorModel[]>(
      "/api/vendors/allVendor",
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      vendors.value = data.value;
    }
  }
  async function addVendor(vendor: any) {
    const { data, error } = await useFetch("/api/vendors/create/vendor", {
      method: "POST",
      body: vendor,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyVendor(vendor: any) {
    const { data, error } = await useFetch("/api/vendors/modify/vendor", {
      method: "PUT",
      body: vendor,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteVendor(vendor_id: string) {
    const { data, error } = await useFetch("/api/vendors/delete/vendor", {
      method: "POST",
      body: {
        vendor_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }
  return {
    vendors,
    selectedVendor,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    comboOptions,
    getVendors,
    addVendor,
    modifyVendor,
    deleteVendor,
  };
});
