<script setup>
import assetTransactionTable from "./transaction/assetTransactionTable.vue";
import filtering from "./transaction/filtering.vue";

import { onMounted, ref, watch } from "vue";
import Resource from "@/api/resource.js";
const asset_transaction_api = new Resource("asset/transaction");
onMounted(async () => {
  fetch_transaction();
});
//#region ---> array declarations
const transaction_data = ref([]);
//#endregion ---> array declarations

const loading = ref(true);
const is_saved = ref(false);
const snackbar = ref(false);
const text = ref(null);
const timeout = ref(1500);

const fetch_transaction = async (item = false) => {
  loading.value = true;
  const { data } = await asset_transaction_api.list({
    dateStart: !item ? "" : item.dateStart,
    dateEnd: !item ? "" : item.dateEnd,
    type: !item ? "" : item.type,
    status_asset: !item ? "" : item.status_asset,
    search: !item ? "" : item.search,
  });
  transaction_data.value = data;
  // console.log(transaction_data.value);
  loading.value = false;
};
//#region Transaction CRUD methods
const update_items = async (item) => {
  // console.log(item);
  const res = await asset_transaction_api.update(item.id, item).then((data) => {
    text.value = data.message;
    snackbar.value = true;
    is_saved.value = !data.data;
  });
};
//#endregion
//#region Methods
watch(snackbar, () => {
  console.log(is_saved.value);
  if (!snackbar.value && is_saved.value) {
    fetch_transaction();
  }
});
//#endregion
</script>
<template>
  <h2>Report</h2>
  <br />
  <filtering @itemlist="fetch_transaction" />
  <v-row>
    <v-col cols="12" md="12" sm="12">
      <assetTransactionTable
        :transactionItems="transaction_data"
        :loading="loading"
        @update="update_items"
      />
    </v-col>
  </v-row>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
