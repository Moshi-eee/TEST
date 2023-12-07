<script setup>
import { ref } from "vue";
import { useAssetMaintenanceStore } from "@/stores/assetMaintenanceStore";

const assetStore = useAssetMaintenanceStore();

const category_data = assetStore.get_category.data.data;
const location_data = assetStore.get_location.data.data;
const brand_data = assetStore.get_brand.data.data;
const type_data = assetStore.get_type.data.data;

const filterItem = {
  asset_category: "",
  asset_locations: "",
  asset_item_brands: "",
  asset_types: "",
  search: "",
};
const asset_category = ref(null);
const asset_locations = ref(null);
const asset_item_brands = ref(null);
const asset_types = ref(null);
const search = ref(null);

const emit = defineEmits(["itemlist"]);
const fetch_item = () => {
  emit("itemlist", filterItem.value);
};

//#region ---> Watch Functions
const updateTable = () => {
  filterItem.value = {
    asset_category: asset_category.value,
    asset_locations: asset_locations.value,
    asset_item_brands: asset_item_brands.value,
    asset_types: asset_types.value,
    search: search.value,
  };
  fetch_item();
};
//#endregion
</script>
<template>
  <v-col cols="12" md="2" class="mt-2">
    <v-autocomplete
      clearable
      density="compact"
      variant="underlined"
      label="Select item type"
      v-model="asset_types"
      :items="type_data"
      item-title="code"
      @update:model-value="updateTable"
    ></v-autocomplete>
  </v-col>
  <v-col cols="12" md="2" class="mt-2">
    <v-autocomplete
      clearable
      density="compact"
      variant="underlined"
      label="Select item category"
      v-model="asset_category"
      :items="category_data"
      item-title="code"
      @update:model-value="updateTable"
    ></v-autocomplete>
  </v-col>
  <v-col cols="12" md="2" class="mt-2">
    <v-autocomplete
      clearable
      density="compact"
      variant="underlined"
      label="Select item brand"
      v-model="asset_item_brands"
      :items="brand_data"
      item-title="code"
      @update:model-value="updateTable"
    ></v-autocomplete>
  </v-col>
  <v-col cols="12" md="2" class="mt-2">
    <v-autocomplete
      clearable
      density="compact"
      variant="underlined"
      label="Select item location"
      v-model="asset_locations"
      :items="location_data"
      item-title="code"
      @update:model-value="updateTable"
    ></v-autocomplete>
  </v-col>
  <v-spacer></v-spacer>
  <v-col cols="12" md="3">
    <v-text-field
      clearable
      placeholder="Search code/name/brand"
      variant="underlined"
      v-model="search"
      append-inner-icon="mdi-magnify"
      @update:model-value="updateTable"
    ></v-text-field>
  </v-col>
</template>
