<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";
const apiAttendance = new Resource("hris/bio");

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
  { title: "Biometric", align: "start", sortable: true, key: "emp_code" },
  {
    title: "Emp ID",
    align: "start",
    sortable: false,
    key: "userprofile.emp_code",
  },
  { title: "Name", align: "start", key: "name" },
  { title: "Department", align: "start", key: "userprofile.department.name" },
  {
    title: "Department",
    align: "start",
    key: "userprofile.business_unit.name",
  },

  { title: "Punch Time", align: "start", key: "punch_time" },
  { title: "Punch State", align: "start", sortable: false, key: "punch_state" },
  {
    title: "Terminal Alias",
    align: "start",
    sortable: false,
    key: "terminal_alias",
  },
];

const fetch = async () => {
  loading.value = true;
  const { data } = await apiAttendance.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "id",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  console.log(data);
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
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

const edit = (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    date_in: e.date_in,
    date_out: null,
    reason: null,
    status: e.status,
    time_in: e.time_in,
    time_out: e.time_out,
    new_in: null,
    new_out: null,
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
  <h2 class="mb-3">Attendance</h2>
  <v-row justify="start">
    <v-col cols="12" md="3">
      <v-btn @click="dialog = !dialog">Attendance Request</v-btn>
    </v-col>
    <v-col cols="12" md="5"></v-col>
    <v-col cols="12" md="4">
      <v-text-field
        clearable
        label="Search"
        density="compact"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">No Biometric</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Date *"
                  type="date"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Time In *"
                  type="time"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Time Out *"
                  type="time"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
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
                  :loading="loading"
                  :disabled="loading"
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
          <v-btn color="blue-darken-1" variant="text" v-if="actions != 'edit'">
            Save
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" v-if="actions == 'edit'">
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
    <template v-slot:item.punch_state="{ item }">
      {{ item.punch_state == 0 ? "Time In" : "Time Out" }}
    </template>

    <template v-slot:item.name="{ item }">
      {{ item.userprofile.last_name }}, {{ item.userprofile.first_name }}
      {{ item.userprofile.middle }}
    </template>
  </v-data-table-server>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>

<style scoped></style>
