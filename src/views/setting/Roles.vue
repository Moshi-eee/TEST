<script setup>
import { onMounted, ref } from "vue";
import { permissionlist } from "@/api/dataApi.js";

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("setting/role");

onMounted(async () => {
  fetch();
  fetchrole();
});

const roles = ref([]);
const fetchrole = async () => {
  const data = await permissionlist();
  roles.value = data.data;
};
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
  { title: "Name", align: "left", key: "name" },
  { title: "Permissions", align: "left", key: "permissions", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  name: "",
  roles: [],
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    name: "",
    roles: [],
  };
};

const srole = ref([]);

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  srole.value = [];
  for (let i = 0; i < e.permissions.length; i++) {
    srole.value.push(e.permissions[i].name);
  }
  form.value = {
    name: e.name,
    roles: srole.value,
  };
  dialog.value = true;
};

const update = async () => {
  const res = await apibusinessunit.update(itemid.value, form.value);
  console.log(res);

  fetch();
  itemid.value = null;
  actions.value = null;

  dialog.value = false;
  form.value = {
    name: "",
    roles: [],
  };
};

const save = async () => {
  const res = await apibusinessunit.store(form.value);
  fetch();
  dialog.value = false;
  form.value = {
    name: "",
    roles: [],
  };
};

const fetch = async () => {
  loading.value = true;

  const { data } = await apibusinessunit.list({
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
</script>

<template>
  <h2 class="mb-3">Roles</h2>
  <v-row justify="start">
    <v-col cols="4">
      <v-sheet class="mb-3">
        <v-btn @click="dialog = !dialog">Add New</v-btn></v-sheet
      >
    </v-col>
    <v-col cols="8">
      <v-sheet class="mb-3">
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
      </v-sheet>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Roles</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name *"
                  required
                  clearable
                  v-model="form.name"
                  variant="underlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Roles *"
                  required
                  chips
                  closable-chips
                  v-model="form.roles"
                  :items="roles"
                  density="compact"
                  multiple
                  variant="underlined"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 2">
                      <span>{{ item.title }}</span>
                    </v-chip>
                    <span
                      v-if="index === 2"
                      class="text-grey text-caption align-self-center"
                    >
                      (+{{ value.length - 2 }} others)
                    </span>
                  </template>
                </v-autocomplete>
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
      <!-- <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>
    <template v-slot:item.permissions="{ item }">
      <template v-for="(n, index) in item.permissions" :key="n.id">
        <v-chip v-if="index < 2">
          {{ n.name }}
        </v-chip>
        <v-chip v-if="index === 2">
          (+{{ item.permissions.length - 2 }} others)
        </v-chip>
      </template>
    </template>
  </v-data-table-server>
</template>
