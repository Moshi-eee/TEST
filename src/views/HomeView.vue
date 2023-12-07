<script setup>
import { useBookingStore } from "@/stores/bookingStore.js";
const bookStore = useBookingStore();
</script>

<template>
  <div>{{ bookStore.report }}</div>
</template>
