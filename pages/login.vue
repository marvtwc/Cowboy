<script setup lang="ts">
definePageMeta({
  middleware: "guest",
  layout: "guest",
});
const username = ref("");
const password = ref("");

const { signIn } = useAuth();

async function handleLogin() {
  try {
    const res = await signIn("credentials", {
      username: username.value,
      password: password.value,
    });
    console.log(res);

    useRouter().push({
      name: "index",
    });
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <form
    class="relative mt-36 flex h-fit w-full max-w-xs flex-col items-center gap-3 rounded-md border border-base-500/50 bg-base-default px-8 pb-8 pt-4 shadow-lg drop-shadow-lg"
    @submit.prevent="handleLogin"
  >
    <h1 class="text-2xl leading-loose">Login</h1>
    <div class="flex w-full flex-col gap-2 text-white">
      <input
        class="w-full"
        type="text"
        v-model="username"
        placeholder="Username"
      />
      <input
        class="w-full"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <button
      @click="handleLogin"
      class="mt-2 w-full rounded-sm border border-white/10 bg-blue-600/80 px-6 py-1 text-blue-200 shadow-[0_2px_8px] shadow-blue-500/10"
    >
      Submit
    </button>
    <!-- <NuxtLink class="underline" to="/register">Register</NuxtLink> -->
  </form>
</template>
