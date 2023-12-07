<script setup>
import { ref, watch } from "vue";
import Resource from "@/api/resource.js";

const asset_location_api = new Resource("asset/maintenance/location");
const headers = [
  {
    title: "ID",
    align: "start",
    key: "id",
    sortable: false,
    width: "5%",
  },
  { title: "Code", align: "start", key: "code", sortable: false },
  { title: "Description", align: "left", key: "description", sortable: false },
  { title: "Status", align: "left", key: "status", sortable: false },
  { title: "Action", align: "left", key: "actions", sortable: false },
];
const form = ref({
  id: "",
  code: "",
  description: "",
  status: "active",
});
const nextpage = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const location_data = ref([]);
const loading = ref(false);
const dialog = ref(false);
const search = ref("");
const rules = ref({
  code: [(v) => !!v || "Required Field"],
  description: [(v) => !!v || "Required Field"],
});

const fetch_location = async () => {
  loading.value = true;
  const { data } = await asset_location_api.list({
    search: search.value,
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  location_data.value = data.data;
  loading.value = false;
};
const OpenDialog = (cat = null) => {
  if (cat != null) {
    form.value.id = cat.id;
    form.value.code = cat.code;
    form.value.description = cat.description;
    form.value.status = cat.status;
  }
  dialog.value = true;
};
const Close = () => {
  form.value.id = "";
  form.value.code = "";
  form.value.description = "";
  form.value.status = "";
  dialog.value = false;
};
const save = async () => {
  if (form.value.id == null) {
    const res = await asset_location_api.store(form.value);
  } else {
    const res = await asset_location_api.update(form.value.id, form.value);
  }
  Close();
};
watch(search, () => {
  fetch_location();
});
</script>

<template>
  <h2>Item location</h2>
  <v-row>
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="save">
          <v-card-title>
            <span class="text-h5 pa-2">New location</span>
          </v-card-title>
          <br />
          <v-card-text align="center">
            <v-text-field
              required
              density="compact"
              variant="underlined"
              placeholder="Enter location code"
              v-model="form.code"
              :rules="rules.code"
            ></v-text-field>
            <v-textarea
              placeholder="Enter location description"
              required
              rows="3"
              density="compact"
              variant="underlined"
              v-model="form.description"
              :rules="rules.description"
            ></v-textarea>
            <v-select
              density="compact"
              variant="outlined"
              style="width: 250px"
              v-model="form.status"
              :items="['active', 'deactive']"
              v-if="form.id != null && form.id != ''"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" type="submit">
              Submit
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="Close">
              Close
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6" class="mt-5">
          <v-btn prepend-icon="mdi-plus" @click="OpenDialog"
            >New location</v-btn
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="3">
          <v-text-field
            clearable
            label="Search"
            variant="underlined"
            v-model="search"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        v-model:page="nextpage"
        :headers="headers"
        :items-length="totalItems"
        :items="location_data"
        :loading="loading"
        class="elevation-1"
        item-value="name"
        density="compact"
        @update:options="fetch_location"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip location="top" text="Edit">
            <template v-slot:activator="{ props }">
              <v-icon size="small" @click="OpenDialog(item)" v-bind="props">
                mdi-pencil</v-icon
              >
            </template>
          </v-tooltip>
        </template>
      </v-data-table-server>
    </v-col>
  </v-row>
</template>
<style scoped></style>
