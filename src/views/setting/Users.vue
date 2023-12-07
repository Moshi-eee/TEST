<script setup>
import { onMounted, ref } from "vue";

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("setting/user");
import { roleslist, changePass } from "@/api/dataApi.js";

onMounted(async () => {
  fetch();
  fetchrole();
});

const roles = ref([]);
const fetchrole = async () => {
  const data = await roleslist();
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
  { title: "Employee ID", align: "left", key: "emp_code", width: "150" },
  { title: "First Name", align: "left", key: "first_name", width: "200" },
  { title: "Middle Name", align: "left", key: "middle_name", width: "200" },
  { title: "Last Name", align: "left", key: "last_name", width: "200" },
  { title: "Suffix", align: "left", key: "suffix" },
  { title: "Role", align: "left", key: "role" },
  { title: "Actions", align: "end", key: "actions", sortable: false },
];

const form = ref({
  roles: [],
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    roles: [],
  };
};

const srole = ref([]);

const resetpass = async (e) => {
  const data = await changePass({ user_id: e.user_id });
  console.log(data);
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.user_id;
  srole.value = [];
  console.log(e.user_id);
  for (let i = 0; i < e.user.roles.length; i++) {
    srole.value.push(e.user.roles[i].name);
  }
  form.value = {
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
  // console.log(data);
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
</script>

<template>
  <h2 class="mb-3">User</h2>
  <v-row justify="start">
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
          <span class="text-h5 pa-2">User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  label="Roles *"
                  required
                  clearable
                  chips
                  v-model="form.roles"
                  :items="roles"
                  density="compact"
                  multiple
                  variant="underlined"
                >
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
    <template v-slot:item.role="{ item }">
      <v-chip v-for="n in item.user.roles" :key="n.name">
        {{ n.name }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" class="me-2" @click="resetpass(item)">
        mdi-lock-reset
      </v-icon>
    </template>
  </v-data-table-server>
</template>
