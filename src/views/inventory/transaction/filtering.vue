<script setup>
import { onMounted, ref } from "vue";
import { useAssetMaintenanceStore } from "@/stores/assetMaintenanceStore";

const assetStore = useAssetMaintenanceStore();
onMounted(async () => {});

const filterItem = {
  dateStart: "",
  dateEnd: "",
  type: "",
  status: "",
  search: "",
};
const reqType = ref(["In", "Out", "Transfer Out", "Return Asset"]);
const reqStatus = ["Not Received", "Received", "Broken", "Cancel"];

const dateStart = ref(null);
const dateEnd = ref(null);
const type = ref(null);
const status_asset = ref(null);
const search = ref(null);

const emit = defineEmits(["itemlist"]);
const fetch_item = () => {
  emit("itemlist", filterItem.value);
};

//#region ---> Watch Functions
const updateTable = () => {
  filterItem.value = {
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
    type: type.value,
    status_asset: status_asset.value,
    search: search.value,
  };
  fetch_item();
};
//#endregion
</script>
<template>
  <v-row>
    <v-col cols="12" md="2" class="mt-2">
      <v-text-field
        type="date"
        label="Date Start"
        density="compact"
        variant="underlined"
        v-model="dateStart"
        :max="dateEnd"
        clearable
        @update:model-value="updateTable"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2" class="mt-2">
      <v-text-field
        label="Date End"
        type="date"
        density="compact"
        variant="underlined"
        v-model="dateEnd"
        :min="dateStart"
        clearable
        @update:model-value="updateTable"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2" class="mt-2">
      <v-select
        clearable
        density="compact"
        variant="underlined"
        label="Select item type"
        v-model="type"
        :items="reqType"
        class="text-field"
        @update:model-value="updateTable"
      ></v-select>
    </v-col>
    <v-col cols="12" md="2" class="mt-2">
      <v-select
        clearable
        density="compact"
        variant="underlined"
        label="Select item status"
        v-model="status_asset"
        :items="reqStatus"
        item-title="code"
        @update:model-value="updateTable"
      ></v-select>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="3">
      <v-text-field
        clearable
        placeholder="Search item name / Request Title"
        variant="underlined"
        v-model="search"
        append-inner-icon="mdi-magnify"
        @update:model-value="updateTable"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
