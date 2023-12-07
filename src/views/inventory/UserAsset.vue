<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";

import Resource from "@/api/resource.js";

const asset_userAsset_api = new Resource("asset/userAsset");
const authStore = useAuthStore();

//#region ---> array declarations
const user_asset_data = ref([]);
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

  { title: "Status", align: "left", key: "status_asset", sortable: false },
];
//#endregion ---> array declarations
const nextpage = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const loading = ref(true);
const search = ref("");

const fetch_transaction = async () => {
  loading.value = true;
  const { data } = await asset_userAsset_api.list({
    search: search.value,
    limit: itemsPerPage.value,
    page: nextpage.value,
    user_id: authStore.user.id,
  });
  // console.log(data.data);
  totalItems.value = data.total;
  user_asset_data.value = data.data;
  loading.value = false;
};
</script>
<template>
  <v-row>
    <v-col cols="12" md="3" class="mt-5">
      <h2>User Asset</h2>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="3">
      <v-text-field
        clearable
        placeholder="Search item name"
        variant="underlined"
        v-model="search"
        append-inner-icon="mdi-magnify"
        @update:model-value="fetch_transaction"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:page="nextpage"
    :headers="headers"
    :items-length="totalItems"
    :items="user_asset_data"
    :loading="loading"
    class="elevation-1"
    item-value="name"
    density="compact"
    @update:options="fetch_transaction"
  >
    <template v-slot:item.request.type="{ item }">
      <span v-if="item.transaction.request.type == 'In'"
        >Stock {{ item.transaction.request.type }}</span
      >
      <span v-else-if="item.transaction.request.type == 'Out'"
        >Stock {{ item.transaction.request.type }}</span
      >
      <span v-else>{{ item.transaction.request.type }}</span>
    </template>
    <template v-slot:item.status_asset="{ item }">
      <span v-if="item.transaction.request.type == 'Transfer Out'">
        Requested Asset ({{ item.transaction.status_asset }})
      </span>
      <span v-else>Returned Asset ({{ item.transaction.status_asset }}) </span>
    </template>
  </v-data-table-server>
</template>

<style lang="scss" scoped></style>
