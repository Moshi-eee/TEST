<script setup>
import { ref } from "vue";

const items = defineProps({ itemOnhand: Object, loading: Object });
const select = ref([]);
const headers = [
  {
    title: "Title",
    align: "left",
    key: "transaction.request.title",
    sortable: false,
  },

  {
    title: "Name",
    align: "left",
    key: "transaction.item.name",
    sortable: false,
  },
  {
    title: "Quantity",
    align: "center",
    key: "transaction.qty",
    sortable: true,
  },
  // { title: "Price", align: "left", key: "price", sortable: true },
  //   { title: "Serial", align: "left", key: "serial", sortable: false },
  {
    title: "Internal Serial",
    align: "left",
    key: "transaction.internal_serial",
    sortable: false,
  },
  {
    title: "Request Date",
    align: "left",
    key: "transaction.date_created",
    sortable: false,
  },
  {
    title: "Received Date",
    align: "left",
    key: "transaction.date_received",
    sortable: false,
  },

  { title: "", align: "left", key: "actions", sortable: false },
];
const emit = defineEmits(["returnItem"]);
const selectedItem = () => {
  emit("returnItem", select.value);
};
</script>

<template>
  <v-data-table
    :items-per-page="10"
    v-model="select"
    @update:model-value="selectedItem"
    :headers="headers"
    :items-length="itemOnhand.length"
    :items="itemOnhand"
    item-value="transaction"
    :loading="loading"
    class="elevation-1"
    width="auto"
    density="compact"
    show-select
  >
  </v-data-table>
</template>
