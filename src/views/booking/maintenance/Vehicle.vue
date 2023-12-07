<script setup>
import { onMounted, ref } from "vue";

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("booking/maintenance/vehicle");

onMounted(async () => {
  fetch();
});

const serverItems = ref([]);
const keywords = ref(null);
const actions = ref(null);
const nextpage = ref(1);
const itemid = ref(null);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const dialog = ref(false);
const headers = [
  {
    title: "Code",
    align: "start",
    sortable: true,
    key: "code",
  },
  { title: "Description", align: "left", key: "description" },
  { title: "Capacity", align: "left", key: "sit_count" },

  { title: "Plate No.", align: "left", key: "plate_no" },
  { title: "Status", align: "left", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  code: "",
  description: "",
  plate_no: "",
  status: "",
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    code: "",
    description: "",
    plate_no: "",
    status: "",
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    code: e.code,
    description: e.description,
    plate_no: e.plate_no,
    status: e.status,
  };
  dialog.value = true;
};

const deleteItem = async (e) => {
  const res = await apibusinessunit.destroy(e.id);
  fetch();
};

const update = async () => {
  const res = await apibusinessunit.update(itemid.value, form.value);
  fetch();
  itemid.value = null;
  actions.value = null;

  dialog.value = false;
  form.value = {
    code: "",
    description: "",
    plate_no: "",
    status: "",
  };
};

const save = async () => {
  const res = await apibusinessunit.store(form.value);
  fetch();
  dialog.value = false;
  form.value = {
    code: "",
    description: "",
    plate_no: "",
    status: "",
  };
};

const fetch = async () => {
  const { data } = await apibusinessunit.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  console.log(data);
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
</script>

<template>
  <h2 class="mb-3">Vehicle</h2>
  <v-row justify="start">
    <v-col cols="4">
      <v-btn @click="dialog = !dialog">Add New</v-btn>
    </v-col>
    <v-col cols="8">
      <v-text-field
        clearable
        label="Search"
        required
        density="compact"
        variant="underlined"
        v-model="keywords"
        @blur="fetch"
        @keypress.enter="fetch"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Vehicle</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Code *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.code"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Name *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Plate No *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.plate_no"
                  @keypress.enter="save"
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  label="Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.status"
                  :items="['active', 'deactive']"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="Close">
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            v-if="actions != 'edit'"
            @click="save"
          >
            Save
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            v-if="actions == 'edit'"
            @click="update"
          >
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    v-model:page="nextpage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    class="elevation-1"
    item-value="name"
    @update:options="fetch"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table-server>
</template>
