import { defineStore } from "pinia";
import { type ContactModel } from "~/server/utils/types/types";

export const useEmployeeStore = defineStore("employee", () => {
  const showCreateDialog = ref(false);
  const showModifyDialog = ref(false);
  const showDeleteAlert = ref(false);

  const employees = ref<ContactModel[]>([]);
  const selectedEmployee = ref<ContactModel>();

  async function getEmployees() {
    const { data, error } = await useFetch<ContactModel[]>(
      "/api/employees/getEmployees",
    );

    if (error.value) {
      console.log(error.value);
    } else if (data.value) {
      employees.value = data.value;
      return data.value;
    }
  }
  async function addEmployee(employee: any) {
    const { data, error } = await useFetch<ContactModel>("/api/auth/register", {
      method: "POST",
      body: employee,
    });
    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function addCustomer(employee_id: string, customer_id: string) {
    const { data, error } = await useFetch("/api/employees/addCustomer", {
      method: "POST",
      body: {
        employee_id,
        customer_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function modifyEmployee(employee: any) {
    const { data, error } = await useFetch("/api/employees/modify/employee", {
      method: "PUT",
      body: employee,
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }

  async function deleteEmployee(employee_id: string) {
    const { data, error } = await useFetch("/api/employees/delete/employee", {
      method: "POST",
      body: {
        employee_id,
      },
    });

    if (error.value) {
      console.log(error.value);
    } else {
      return data.value;
    }
  }
  return {
    employees,
    selectedEmployee,
    showCreateDialog,
    showModifyDialog,
    showDeleteAlert,
    getEmployees,
    addEmployee,
    addCustomer,
    modifyEmployee,
    deleteEmployee,
  };
});
