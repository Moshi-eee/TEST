<script setup>
import { ref, onMounted } from "vue";

import userform from "@/views/user/component/UserForm.vue";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();
onMounted(async () => {
  await userStore.set_user2([]);
});
</script>

<template>
  <v-card>
    <v-col>
      <h1 class="mb-3">Employee</h1>
      <div class="mb-5">
        <h3>Personal Information</h3>
        <small class="required-text">*indicates required field</small>
      </div>
      <userform></userform>
    </v-col>
  </v-card>
</template>
