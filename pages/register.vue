<script setup lang="ts">
definePageMeta({
  middleware: "guest",
  layout: "guest",
});
const form = ref({
  email: "email@email.com",
  username: "username",
  password: "password",
  name: "name",
});

async function handleFormSubmit() {
  try {
    useFetch("api/auth/register", { method: "POST", body: form.value });
    useRouter().push({
      name: "login",
    });
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <form
    class="flex max-w-md flex-col items-center gap-3"
    @submit.prevent="handleFormSubmit"
  >
    <h1 class="text-2xl">Register</h1>
    <div class="flex flex-col gap-2 text-neutral-900">
      <input
        class="px-2"
        type="text"
        v-model="form.email"
        placeholder="Email"
      />
      <input class="px-2" type="text" v-model="form.name" placeholder="Name" />
      <input
        class="px-2"
        type="text"
        v-model="form.username"
        placeholder="Username"
      />
      <input
        class="px-2"
        type="password"
        v-model="form.password"
        placeholder="Password"
      />
      <button class="bg-blue-500 text-white" type="submit">Submit</button>
    </div>
    <BaseSeperator />
    <NuxtLink class="underline" to="/login">Login</NuxtLink>
  </form>
</template>
