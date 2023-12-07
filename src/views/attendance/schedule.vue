<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apischedule = new Resource("hris/schedule");

onMounted(async () => {
  fetch_schedule_requests();
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
    title: "Orig Date in",
    align: "start",
    sortable: false,
    key: "date_in",
  },
  { title: "Orig Time In", align: "left", sortable: false, key: "time_in" },
  { title: "Orig Time Out", align: "left", sortable: false, key: "time_out" },

  {
    title: "New Date Out",
    align: "start",
    sortable: false,
    key: "date_out",
  },
  { title: "Sched Type", align: "left", sortable: false, key: "sched_type" },
  { title: "Status", align: "start", sortable: true, key: "status" },

  {
    title: "Approved status",
    align: "start",
    sortable: true,
    key: "general_approver_status",
  },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  date_in: null,
  date_out: null,
  reason: null,
  status: "Active",
  time_in: null,
  time_out: null,
  new_in: null,
  new_out: null,
  sup_head_id: null,
  dep_head_id: null,
  hr_head_id: null,
  general_approver_id: null,
  general_approver_status: null,
});

const Close = async () => {
  dialog.value = false;
  itemid.value = null;
  actions.value = null;
  form.value = {
    date_in: null,
    date_out: null,
    reason: null,
    status: "Active",
    time_in: null,
    time_out: null,
    new_in: null,
    new_out: null,
    sup_head_id: null,
    dep_head_id: null,
    hr_head_id: null,
    general_approver_id: null,
    general_approver_status: null,
  };
};
const save = async () => {
  console.log(itemid.value);
  if (actions.value == null) {
    const res = await apischedule.store(form.value).then((data) => {
      console.log(data);
      Close();
    });
  } else {
    const res = await apischedule
      .update(itemid.value, form.value)
      .then((data) => {
        console.log(data);
        Close();
      });
  }
};
const fetch_schedule_requests = async () => {
  loading.value = true;
  const { data } = await apischedule.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "date_in",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "asc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
const edit = (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    date_in: e.date_in,
    date_out: e.date_out,
    reason: e.reason,
    status: e.status,
    time_in: e.time_in,
    time_out: e.time_out,
    sup_head_id: null,
    dep_head_id: null,
    hr_head_id: null,
    general_approver_id: null,
    general_approver_status: e.general_approver_status,
  };
  dialog.value = true;
};
</script>

<template>
  <h2 class="mb-3">Schedule</h2>
  <v-row justify="start">
    <v-col cols="8">
      <v-btn @click="dialog = !dialog">Request Change Schedule</v-btn>
    </v-col>
    <v-col cols="4">
      <v-text-field
        clearable
        label="Search"
        density="compact"
        variant="underlined"
      ></v-text-field
    ></v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="700">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Request Change Schedule</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span>Original Shift</span>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Date *"
                  type="date"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.date_in"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Time In *"
                  type="time"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.time_in"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Time Out *"
                  type="time"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.time_out"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <span>New Shift</span>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Date *"
                  type="date"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.date_out"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Time In *"
                  type="time"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.new_in"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Time Out *"
                  type="time"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.new_out"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Reason *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.reason"
                  :loading="loading"
                  :disabled="loading"
                ></v-textarea>
              </v-col>
              <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  label="Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.status"
                  :loading="loading"
                  :disabled="loading"
                  :items="['active', 'deactive']"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  label="Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.general_approver_status"
                  :loading="loading"
                  :disabled="loading"
                  :items="['pending', 'approved']"
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
            @click="save"
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
      <v-tooltip location="top" text="Edit">
        <template v-slot:activator="{ props }">
          <v-icon size="small" @click="edit(item)" v-bind="props">
            mdi-pencil</v-icon
          >
        </template>
      </v-tooltip>
    </template>
  </v-data-table-server>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
