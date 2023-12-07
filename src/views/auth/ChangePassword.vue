<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import router from "@/router";

const userStore = useAuthStore();
const loading = ref(false);
const snackbar = ref(false);
const text = ref(null);
const rules = ref({
  password: [(v) => !!v || "Enter your email password"],
});

const form = ref({
  user_id: null,
  password: "",
});

onMounted(async () => {
  form.value["user_id"] = userStore.get_user.id;
  // console.log(form.value);
});

const login = async () => {
  if (form.value.password) {
    if (form.value.password.length < 8) {
      snackbar.value = true;
      text.value = "Minimum 8 characters required";
    }
    loading.value = true;
    await userStore.register(form.value).then((e) => {
      snackbar.value = true;
      text.value = "Successfully changed your password";
      setTimeout(() => router.push("/account/profile"), 500);
    });
  }
};
</script>
<template>
  <v-sheet
    class="bg-deep-purple-100 pa-12 justify-space-between justify-center"
    rounded
    style="height: 100%"
  >
    <br /><br /><br /><br /><br /><br /><br /><br />
    <v-card class="mx-auto px-6 py-8 mb-10" max-width="344">
      <v-img
        class="mx-15 justify-space-between mb-10"
        :src="'/CentralOneLogo.png'"
        max-height="100"
        max-width="200"
        contain
      ></v-img>
      <v-form>
        <v-text-field
          v-model="form.password"
          type="password"
          :rules="rules.password"
          :loading="loading"
          :disabled="loading"
          clearable
          label="Change Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          @click="login"
          :loading="loading"
          :disabled="loading"
        >
          Update Password
        </v-btn>
      </v-form>

      <br />
    </v-card>
    <br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </v-sheet>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
