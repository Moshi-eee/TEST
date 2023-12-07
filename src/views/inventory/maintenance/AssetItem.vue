<script setup>
import Resource from "@/api/resource.js";

import { onMounted, ref } from "vue";
import add from "./items/add.vue";
import edit from "./items/edit.vue";
import filtering from "./items/filtering.vue";
import { useAssetMaintenanceStore } from "@/stores/assetMaintenanceStore";

const assetStore = useAssetMaintenanceStore();
onMounted(async () => {
  assetStore.fetch_category();
  assetStore.fetch_location();
  assetStore.fetch_brand();
  assetStore.fetch_type();
});

const asset_item_api = new Resource("asset/maintenance/item");

onMounted(async () => {});

//#region ---> Data Variables HEADERS
const headers = [
  { title: "Item Code", align: "start", key: "code", sortable: false },
  { title: "Item Type", align: "left", key: "type.code", sortable: false },
  { title: "Item Brand", align: "left", key: "brand.code", sortable: false },
  { title: "Item Name", align: "left", key: "name", sortable: false },
  { title: "Category", align: "left", key: "category.code", sortable: false },
  { title: "Description", align: "left", key: "description", sortable: false },
  { title: "Location", align: "left", key: "location.code", sortable: false },
  { title: "Image", align: "left", key: "picture_path", sortable: false },
  { title: "Min. Qty", align: "left", key: "minimum_qty", sortable: false },
  { title: "Quantity", align: "left", key: "qty", sortable: false },
  { title: "Action", align: "left", key: "actions", sortable: false },
];

const nextpage = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const loading = ref(false);
const newItem = ref(false);
const update = ref(false);
const dialogImg = ref(false);
const pic_path = ref("");
//#endregion

//#region ---> array declarations
const item_data = ref([]);
const update_item_data = ref([]);
const form = ref({
  id: "",
  code: null,
  name: null,
  asset_category_id: null,
  asset_locations_id: null,
  asset_item_brands_id: null,
  asset_types_id: null,
  description: null,
  item_price: 0,
  minimum_qty: 100,
  qty: 0,
  picture_path: null,
});
//#endregion ---> array declarations

//#region ---> fetch Item data
const fetch_item = async (filter = false) => {
  loading.value = true;
  const { data } = await asset_item_api.list({
    type: filter ? filter.asset_types : "",
    brand: filter ? filter.asset_item_brands : "",
    location: filter ? filter.asset_locations : "",
    category: filter ? filter.asset_category : "",
    search: filter ? filter.search : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  item_data.value = data.data;
  loading.value = false;
};
//#endregion

//#region ---> Opening Dialog
const NewItem = (is_open) => {
  newItem.value = is_open;
};
const UpdateItem = (item) => {
  update.value = true;
  update_item_data.value = item;
};
const Close = (is_open) => {
  newItem.value = is_open;
  update.value = is_open;
  form.value = {
    id: "",
    code: null,
    name: null,
    asset_category_id: null,
    asset_locations_id: null,
    asset_item_brands_id: null,
    asset_types_id: null,
    description: null,
    item_price: 0,
    minimum_qty: 100,
    qty: 0,
    picture_path: null,
  };
};
const fullImage = (image) => {
  pic_path.value = image;
  dialogImg.value = true;
};
//#endregion

//#region --->save Items
const save_items = async (itemData) => {
  const res = await asset_item_api
    .store(itemData)
    .then(() => {
      Close();
    })
    .catch((error) => {
      console.log("error : " + error);
    });
};
//#endregion

//#region --->update Items
const update_items = async (itemData) => {
  const res = await asset_item_api
    .update(itemData.id, itemData)
    .then((data) => {
      // console.log(data);
      Close();
    })
    .catch((error) => {
      console.log("error : " + error);
    });
};
//#endregion
</script>
<template>
  <h2>Items List</h2>
  <v-row>
    <v-dialog v-model="dialogImg" width="auto">
      <v-card align="center">
        <v-img :width="600" cover :src="pic_path"></v-img>
        <!-- <v-avatar :image="pic_path" rounded="0" size="500"></v-avatar> -->
      </v-card>
    </v-dialog>
    <v-col cols="12" md="12">
      <v-btn prepend-icon="mdi-plus" @click="NewItem(true)">Item</v-btn>
    </v-col>
    <filtering @itemlist="fetch_item" />

    <add :dialog="newItem" :form="form" @dialog="Close" @save="save_items" />

    <edit
      :dialog="update"
      :item="update_item_data"
      @dialog="Close"
      @update="update_items"
    />

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      v-model:page="nextpage"
      :headers="headers"
      :items-length="totalItems"
      :items="item_data"
      :loading="loading"
      class="elevation-1"
      item-value="name"
      density="compact"
      @update:options="fetch_item"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip location="top" text="Edit">
          <template v-slot:activator="{ props }">
            <v-icon size="small" @click="UpdateItem(item)" v-bind="props">
              mdi-pencil</v-icon
            >
          </template>
        </v-tooltip>
      </template>
      <template v-slot:item.picture_path="{ item }">
        <v-img
          :src="item.picture_path"
          rounded="0"
          size="50"
          @click="fullImage(item.picture_path)"
        ></v-img>
      </template>
    </v-data-table-server>
  </v-row>
</template>
