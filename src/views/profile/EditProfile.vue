<script setup>
import userform from "@/views/user/component/UserForm2.vue";
</script>
<template>
  <v-card>
    <v-col>
      <h1 class="mb-3">Employee</h1>
      <h3 class="mb-2">Personal Information</h3>
      <div class="mb-3">
        <small class="required-text">*indicates required field</small>
      </div>
      <userform></userform>
    </v-col>
  </v-card>
</template>
