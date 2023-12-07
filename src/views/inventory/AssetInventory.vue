<script setup>
import { onMounted, ref } from "vue";
import { useInventoryStore } from "@/stores/inventoryStore";

import Resource from "@/api/resource.js";
import router from "@/router";

const inventoryStore = useInventoryStore();

const asset_inventory_api = new Resource("asset/inventory");

const headers = [
  {
    title: "Code",
    align: "start",
    key: "item.code",
    sortable: false,
  },
  { title: "Type", align: "left", key: "item.type.code", sortable: false },
  { title: "Brand", align: "left", key: "item.brand.code", sortable: false },
  { title: "Name", align: "left", key: "item.name", sortable: false },

  { title: "Quantity", align: "left", key: "qty", sortable: false },
  { title: "Status", align: "left", key: "status", sortable: false },
  // { title: "Action", align: "left", key: "actions", sortable: false },
];

onMounted(async () => {
  inventoryStore.fetch_inventory();
});

const nextpage = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const loading = ref(true);
const search = ref("");

//#region ---> array declarations
const inventory_data = ref([]);
//#endregion ---> array declarations

//#region ---> Fetching Data from Database
const fetch_inventory = async () => {
  loading.value = true;
  const { data } = await asset_inventory_api.list({
    search: search.value,
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  inventory_data.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;

  loading.value = false;
  // console.log(inventoryStore.get_highStock);
};
//#endregion -----> end of fetching

const RestockItems = () => {
  inventoryStore.restock_clicked(true);
  router.push("/asset/request");
};
</script>
<template>
  <v-row>
    <v-col cols="12" md="6">
      <h2>
        <p>
          <b>Inventory</b>

          <b v-if="inventoryStore.get_needToResupply.length > 0">
            ({{ inventoryStore.get_needToResupply.length }} items - need to
            restock)
            <v-tooltip location="top" text="Restock Items">
              <template v-slot:activator="{ props }">
                <v-icon size="small" v-bind="props" @click="RestockItems"
                  >mdi-restore-alert
                </v-icon>
              </template>
            </v-tooltip>
          </b>
        </p>
      </h2>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="3">
      <v-text-field
        clearable
        placeholder="Search item name/code/brand/type"
        variant="underlined"
        v-model="search"
        append-inner-icon="mdi-magnify"
        @update:model-value="fetch_inventory"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        v-model:page="nextpage"
        :headers="headers"
        :items-length="totalItems"
        :items="inventory_data"
        :loading="loading"
        class="elevation-1"
        item-value="name"
        density="compact"
        @update:options="fetch_inventory"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip location="top" text="Add Stock">
            <template v-slot:activator="{ props }">
              <v-icon size="small" @click="addStock(item)" v-bind="props">
                mdi-package-up</v-icon
              >
            </template>
          </v-tooltip>
        </template>
        <template v-slot:item.qty="{ item }">
          <p>
            {{ item.qty }}
          </p>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            variant="flat"
            color="yellow"
            v-if="item.qty < item.item.minimum_qty && item.qty > 0"
            size="small"
          >
            Low Stock
          </v-chip>
          <v-chip
            variant="flat"
            color="red"
            v-else-if="item.qty <= 0"
            size="small"
          >
            Out of Stock
          </v-chip>
          <v-chip variant="flat" color="green" v-else size="small">
            High Stock
          </v-chip>
        </template>
      </v-data-table-server>
    </v-col>
  </v-row>
</template>
<!-- <small
style="color: orangered"
v-if="
  item.qty < item.item.minimum_qty && item.qty > 0
"
>
*low of stock*</small
>
<small style="color: red" v-if="item.qty <= 0">
*out of stock*
</small> -->

<style scoped></style>
