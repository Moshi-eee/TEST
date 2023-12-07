<script setup>
import { ref } from "vue";

import receiveTransaction from "./receiveTransaction.vue";

defineProps({ transactionItems: Object, loading: Object });
const headers = [
  {
    title: "Invoice",
    align: "left",
    key: "request.invoice_no",
    sortable: false,
  },
  { title: "Title", align: "left", key: "request.title", sortable: false },

  { title: "Name", align: "left", key: "item.name", sortable: false },
  {
    title: "Type",
    align: "center",
    key: "request.type",
    sortable: false,
  },
  { title: "Quantity", align: "center", key: "qty", sortable: true },
  // { title: "Price", align: "left", key: "price", sortable: true },
  { title: "Serial", align: "left", key: "serial", sortable: false },
  {
    title: "Internal Serial",
    align: "left",
    key: "internal_serial",
    sortable: false,
  },
  {
    title: "Request Date",
    align: "left",
    key: "request.date_created",
    sortable: false,
  },
  {
    title: "Received Date",
    align: "left",
    key: "date_received",
    sortable: false,
  },

  { title: "Status", align: "left", key: "status_asset", sortable: false },
];

const dialog = ref(false);
const item_data = ref([]);
const emit = defineEmits(["update"]);
const items = ref([]);
const updateInventory = (item) => {
  console.log(item);
  item_data.value = item;
  dialog.value = true;
  switch (item.request.type) {
    case "Return Asset":
      items.value = ["Received", "Broken", "Cancel"];
      break;
    default:
      items.value = ["Received", "Cancel"];
  }
};
const CloseDialog = (close) => {
  dialog.value = close;
};

const save_item = (item) => {
  // console.log(item);
  CloseDialog(false);
  emit("update", item);
};
</script>

<template>
  <receiveTransaction
    :dialog="dialog"
    :item="item_data"
    :type="items"
    @close="CloseDialog"
    @item="save_item"
  />
  <v-data-table
    :items-per-page="10"
    :headers="headers"
    :items-length="transactionItems.length"
    :items="transactionItems"
    :loading="loading"
    class="elevation-1"
    width="auto"
    density="compact"
  >
    <template v-slot:item.request.type="{ item }">
      <p>
        {{
          item.request.type == "In"
            ? "Stock In"
            : item.request.type == "Out"
            ? "Stock Out"
            : item.request.type == "Transfer Out"
            ? "Request Asset"
            : item.request.type
        }}
      </p>
    </template>
    <template v-slot:item.status_asset="{ item }">
      <v-tooltip
        location="top"
        text="status"
        v-if="item.status_asset == 'Not Received'"
      >
        <template v-slot:activator="{ props }">
          <v-btn size="small" v-bind="props" @click="updateInventory(item)">
            {{ item.status_asset }}
          </v-btn>
        </template>
      </v-tooltip>
      <span v-else> {{ item.request.type }} ({{ item.status_asset }}) </span>
    </template>
  </v-data-table>
</template>
