<script setup>
import { onMounted, ref } from "vue";
import { createVSched } from "@/api/dataApi.js";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apischedvehicle = new Resource("booking/schedule/sched-vehicle");

onMounted(async () => {
  fetch();
  fetchoption();
});
const opt = ref([]);
const fetchoption = async () => {
  loading.value = true;
  const data = await createVSched();
  opt.value = data.data;
  loading.value = false;
};
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
    title: "Destination Route",
    align: "start",
    sortable: false,
    key: "location_des.name",
  },
  { title: "Time", align: "start", sortable: false, key: "sched_time" },
  { title: "Status", align: "start", sortable: false, key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  sched_time: "",
  location: "",
  status: "",
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    sched_time: "",
    location: "",
    status: "",
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    sched_time: e.sched_time,
    location: e.location,
    status: e.status,
  };
  dialog.value = true;
};

const update = async () => {
  loading.value = true;

  const res = await apischedvehicle
    .update(itemid.value, form.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Update Successfully";
      itemid.value = null;
      actions.value = null;
      dialog.value = false;
      form.value = {
        sched_time: "",
        location: "",
        status: "",
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
  const res = await apischedvehicle
    .store(form.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Successfully Login";
      dialog.value = false;
      form.value = {
        sched_time: "",
        location: "",
        status: "",
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
  const { data } = await apischedvehicle.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  console.log();
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
</script>

<template>
  <h2 class="mb-3">Vehicle Schedule</h2>
  <v-row justify="start">
    <v-col cols="4">
      <v-btn
        @click="dialog = !dialog"
        :disabled="
          !authStore.check('view-employee-maintenance-position-can-add')
        "
        >Add New</v-btn
      >
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
          <span class="text-h5 pa-2">Vehicle Schedule</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  required
                  density="compact"
                  variant="underlined"
                  label="Route"
                  :items="opt.location"
                  v-model="form.location"
                  item-title="code"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Time *"
                  clearable
                  type="time"
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.sched_time"
                  :loading="loading"
                  :disabled="loading"
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
              !authStore.check('view-employee-maintenance-position-can-add')
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
              !authStore.check('view-employee-maintenance-position-can-edit')
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
          !authStore.check('view-employee-maintenance-position-can-edit')
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
