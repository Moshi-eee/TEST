<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const newPassword = ref("");
const confirmPassword = ref("");
const passwordMatch = ref("");

const visible_current = ref(false);
const visible_new = ref(false);
const visible_confirm = ref(false);

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    new_password(value) {
      if (
        value?.length >= 8 &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*()\-_=+{};:,<.>]/.test(value)
      ) {
        return true;
      } else if (value?.length < 8) {
        return "Password needs to be at least 8 characters.";
      } else if (!/[a-z]/.test(value)) {
        return "Password needs at least one lowercase letter.";
      } else if (!/[0-9]/.test(value)) {
        return "Password needs at least one number.";
      } else {
        return "Password needs at least one special character.";
      }
    },

    confirm_password(value) {
      if (
        value === new_password.value.value &&
        value?.length >= 8 &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*()\-_=+{};:,<.>]/.test(value)
      ) {
        return true;
      } else if (value !== new_password.value.value) {
        return "Passwords do not match.";
      } else if (value?.length < 8) {
        return "Password needs to be at least 8 characters.";
      } else if (!/[a-z]/.test(value)) {
        return "Password needs at least one lowercase letter.";
      } else if (!/[0-9]/.test(value)) {
        return "Password needs at least one number.";
      } else {
        return "Password needs at least one special character.";
      }
    },
  },
});

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});

const current_password = useField("current_password");
const new_password = useField("new_password");
const confirm_password = useField("confirm_password");
</script>

<template>
  <form @submit.prevent="submit">
    <v-row>
      <v-col cols="12" md="5"> </v-col>
    </v-row>
    <v-card max-width="900" height="550" elevation="15">
      <v-card-item>
        <v-card-title class="change-password"> Change Password </v-card-title>
        <v-card-subtitle> </v-card-subtitle>
      </v-card-item>

      <v-card-text> </v-card-text>
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            class="current-password"
            label="Current Password"
            :append-inner-icon="visible_current ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible_current ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            @click:append-inner="visible_current = !visible_current"
          ></v-text-field> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="5">
          <v-text-field
            class="new-password"
            label="New Password"
            :append-inner-icon="visible_new ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible_new ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            @click:append-inner="visible_new = !visible_new"
            v-model="new_password.value.value"
            :counter="10"
            :error-messages="new_password.errorMessage.value"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            class="confirm-password"
            label="Confirm Password"
            :append-inner-icon="visible_confirm ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible_confirm ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            @click:append-inner="visible_confirm = !visible_confirm"
            v-model="confirm_password.value.value"
            :counter="10"
            :error-messages="confirm_password.errorMessage.value"
          ></v-text-field> </v-col
      ></v-row>
      <v-row>
        <v-col cols="12" md="5">
          <v-card-title class="password"> Password Requirements: </v-card-title>
          <v-card-subtitle class="password"
            >Minimum 8 characters long - the more, the better
          </v-card-subtitle>
          <v-card-subtitle class="password"
            >At least one lowercase character
          </v-card-subtitle>
          <v-card-subtitle class="password"
            >At least one number, and special character</v-card-subtitle
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn type="submit" class="submit"> SAVE CHANGES </v-btn>
          <v-btn @click="handleReset"> clear </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </form>
</template>

<style scoped>
.current-password {
  margin-left: 5%;
}
.new-password {
  margin-left: 5%;
}
.confirm-password {
  margin-left: 5%;
}
.change-password {
  margin-left: 0%;
}
.password {
  margin-left: 1%;
}
.submit {
  margin: 5%;
}
</style>
