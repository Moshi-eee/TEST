<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("user/maintenance/allowance");

onMounted(async () => {
  fetch();
});
const snackbar = ref(false);
const text = ref(null);
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
  { title: "Name", align: "left", key: "name" },
  { title: "Category", align: "left", key: "category" },
  { title: "Term", align: "left", key: "term" },
  { title: "Amount", align: "left", key: "amount" },
  { title: "Status", align: "left", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  code: "",
  name: "",
  status: "",
  category: "",
  amount: "",
  term: "",
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    code: "",
    name: "",
    status: "",
    category: "",
    amount: "",
    term: "",
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    code: e.code,
    name: e.name,
    status: e.status,
    category: e.category,
    amount: e.amount,
    term: e.term,
  };
  dialog.value = true;
};

const update = async () => {
  loading.value = true;

  const res = await apibusinessunit
    .update(itemid.value, form.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Update Successfully";
      itemid.value = null;
      actions.value = null;
      dialog.value = false;
      form.value = {
        code: "",
        name: "",
        status: "",
        category: "",
        amount: "",
        term: "",
      };
      fetch();
    })
    .catch((e) => {
      snackbar.value = true;
      text.value = "Check Required fields";
      loading.value = false;
    });
};

const save = async () => {
  loading.value = true;
  const res = await apibusinessunit
    .store(form.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Successfully Login";
      dialog.value = false;
      form.value = {
        code: "",
        name: "",
        status: "",
        category: "",
        amount: "",
        term: "",
      };
      fetch();
    })
    .catch((e) => {
      snackbar.value = true;
      text.value = "Check Required fields";
      loading.value = false;
    });
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
  <h2 class="mb-3">Allowance</h2>
  <v-row justify="start">
    <v-col cols="4">
      <v-btn
        @click="dialog = !dialog"
        :disabled="
          !authStore.check('view-employee-maintenance-allowance-type-can-add')
        "
        >Add New
      </v-btn>
    </v-col>
    <v-col cols="8">
      <v-text-field
        clearable
        label="Search"
        required
        density="compact"
        variant="underlined"
        :loading="loading"
        :disabled="loading"
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
          <span class="text-h5 pa-2">Allowance</span>
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
                  :loading="loading"
                  :disabled="loading"
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
                  :loading="loading"
                  :disabled="loading"
                  v-model="form.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Category *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :items="['special', 'non-special']"
                  :loading="loading"
                  :disabled="loading"
                  v-model="form.category"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Term *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :items="['daily', 'monthly', 'yearly']"
                  :loading="loading"
                  :disabled="loading"
                  v-model="form.term"
                  @keypress.enter="save"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Amount *"
                  type="number"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                  v-model="form.amount"
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
                  :loading="loading"
                  :disabled="loading"
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
            :disabled="
              !authStore.check(
                'view-employee-maintenance-allowance-type-can-add'
              )
            "
            @click="save"
          >
            Save
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            v-if="actions == 'edit'"
            :disabled="
              !authStore.check(
                'view-employee-maintenance-allowance-type-can-edit'
              )
            "
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
      <v-icon
        size="small"
        class="me-2"
        :disabled="
          !authStore.check('view-employee-maintenance-allowance-type-can-edit')
        "
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table-server>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
