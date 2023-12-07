<script setup>
import { onMounted, ref } from "vue";

import Resource from "@/api/resource.js";
const apifoods = new Resource("rating/maintenance/food");

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
    title: "Image",
    align: "left",
    key: "avatar",
    width: "200",
    sortable: false,
  },
  { title: "Name", align: "left", key: "name" },
  { title: "Status", align: "left", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  picture_path: null,
  name: null,
  status: null,
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    picture_path: null,
    name: null,
    status: null,
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    name: e.name,
    status: e.status,
  };
  dialog.value = true;
};

const deleteItem = async (e) => {
  const res = await apifoods.destroy(e.id);
  fetch();
};

const update = async () => {
  const res = await apifoods.update(itemid.value, form.value);
  fetch();
  itemid.value = null;
  actions.value = null;

  dialog.value = false;
  form.value = {
    picture_path: null,
    name: null,
    status: null,
  };
};

const save = async () => {
  const res = await apifoods.store(form.value);
  fetch();
  dialog.value = false;
  form.value = {
    picture_path: null,
    name: null,
    status: null,
  };
};

const fetch = async () => {
  loading.value = true;

  const { data } = await apifoods.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};

const convertToBase64 = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    form.value.picture_path = reader.result;
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};
</script>

<template>
  <h2 class="mb-3">Menus</h2>
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
          <span class="text-h5 pa-2">Food</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  label="Picture *"
                  accept="image/*"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  @change="convertToBase64"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Name *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.name"
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
    <template v-slot:item.avatar="{ item }">
      <v-avatar :image="item.picture_path" rounded="0" size="80"></v-avatar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table-server>
</template>
