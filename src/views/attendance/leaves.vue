<script setup>
import { onMounted, ref, reactive } from "vue";
import Resource from "@/api/resource.js";
const dialog = ref(false);

const apileave_request = new Resource("hris/leave_request");

onMounted(() => {
  fetch_leave_requests();
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

const headers = [
  { title: "Date From", align: "start", key: "date_in", width: "300" },
  { title: "Date To", align: "start", key: "date_out", width: "300" },
  {
    title: "Reason",
    align: "start",
    sortable: true,
    key: "reason",
    width: "70%",
  },

  {
    title: "Approved By",
    align: "center",
    sortable: true,
    key: "approve",
    width: "150",
  },
  {
    title: "Approved Status",
    align: "center",
    sortable: true,
    key: "general_approver_status",
    width: "150",
  },
  {
    title: "Status",
    align: "center",
    sortable: true,
    key: "status",
    width: "100",
  },
  { title: "Action", align: "end", sortable: true, key: "action" },
];
const Close = async () => {
  dialog.value = false;
  itemid.value = null;
  actions.value = null;
  form.value = {
    date_in: null,
    date_out: null,
    reason: null,
    status: "Active",
    leave_type_id: null,
    time_in: null,
    time_out: null,
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
  leave_type_id: null,
  time_in: null,
  time_out: null,
  sup_head_id: null,
  dep_head_id: null,
  hr_head_id: null,
  general_approver_id: null,
  general_approver_status: null,
});

const leave_type = ref([
  {
    id: 0,
    code: "Vacation Leave",
  },
  {
    id: 1,
    code: "Sick Leave",
  },
]);

const save = async () => {
  console.log(itemid.value);
  if (actions.value == null) {
    const res = await apileave_request.store(form.value).then((data) => {
      console.log(data);
      Close();
    });
  } else {
    const res = await apileave_request
      .update(itemid.value, form.value)
      .then((data) => {
        console.log(data);
        Close();
      });
  }
};

const fetch_leave_requests = async () => {
  loading.value = true;
  const { data } = await apileave_request.list({
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
    leave_type_id: 0,
    time_in: null,
    time_out: null,
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
  <h2 class="mb-3">Leaves</h2>
  <v-row justify="start">
    <v-col cols="12" md="8">
      <v-btn @click="dialog = !dialog">File Leave</v-btn>
    </v-col>
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
    <v-dialog v-model="dialog" persistent width="700">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Leave Request</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  label="Type of Leave *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.leave_type_id"
                  :items="leave_type"
                  item-title="code"
                  item-value="id"
                  :loading="loading"
                  :disabled="loading"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <span>Period Cover</span>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Date From *"
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
              <v-col cols="6">
                <v-text-field
                  label="Date To *"
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
                  :loading="loading"
                  :disabled="loading"
                  :items="['active', 'deactive']"
                  v-model="form.status"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  label="Approved Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                  :items="['Cancel', 'Approved']"
                  v-model="form.general_approver_status"
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
  >
    <template v-slot:item.action="{ item }">
      <v-tooltip location="top" text="Edit">
        <template v-slot:activator="{ props }">
          <v-icon size="small" @click="edit(item)" v-bind="props">
            mdi-pencil</v-icon
          >
        </template>
      </v-tooltip>
    </template>
  </v-data-table-server>
</template>

<style scoped></style>
