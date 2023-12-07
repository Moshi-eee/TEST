<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("user/emp_schedule");
const apiUser = new Resource("user/list");
const apisched = new Resource("user/template_schedule");

onMounted(async () => {
  fetch();
  fetchusers();
  fetchsched();
});

const userlist = ref([]);
const fetchusers = async () => {
  const { data } = await apiUser.list({
    report: "schedule",
  });
  userlist.value = data.report;
};

const sched_list = ref([]);
const fetchsched = async () => {
  const { data } = await apisched.list({
    keyword: "",
    key: "",
    order: "",
    limit: "",
    page: "",
  });
  sched_list.value = data.data;
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
    title: "Title",
    align: "start",
    sortable: true,
    key: "title",
  },
  //   { title: "Employee", align: "left", key: "user_id", sortable: false },
  { title: "Date From", align: "left", key: "date_from", sortable: false },
  { title: "Date To", align: "left", key: "date_to", sortable: false },
  // { title: "Time In", align: "left", key: "time_in", sortable: false },
  // { title: "Time Out", align: "left", key: "time_out", sortable: false },
  // { title: "Rest Day", align: "left", key: "rest_day", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  title: "",
  date_from: "",
  date_to: "",
  info: [],
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    title: "",
    date_from: "",
    date_to: "",
    info: [],
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    title: e.title,
    date_from: e.date_from,
    date_to: e.date_to,
    info: e.info,
  };
  dialog.value = true;
};

const deleteItem = async (e) => {
  const res = await apibusinessunit.destroy(e.id);
  fetch();
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
        title: "",
        date_from: "",
        date_to: "",
        info: [],
      };
      fetch();
    })
    .catch((e) => {
      snackbar.value = true;
      text.value = "Check Required fields";
      loading.value = false;
    });
};

const addemp = async () => {
  form.value.info.push({
    user_id: "",
    sched: "",
    rest_day: [],
  });
};
const removeeduc = async (index) => {
  form.value.info.splice(index, 1);
};
const save = async () => {
  loading.value = true;
  const res = await apibusinessunit
    .store(form.value)
    .then((e) => {
      console.log(e);
      snackbar.value = true;
      text.value = "Successfully Login";
      dialog.value = false;
      form.value = {
        title: "",
        date_from: "",
        date_to: "",
        info: [],
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
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "created_at",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
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
  <h2 class="mb-3">Employee Scheduling</h2>
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
        :loading="loading"
        :disabled="loading"
        v-model="keywords"
        @blur="fetch"
        @keypress.enter="fetch"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="1000">
      <v-card>
        <span class="text-h5 pa-2">Add Schedule</span>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Title"
                clearable
                required
                density="compact"
                variant="underlined"
                :loading="loading"
                :disabled="loading"
                v-model="form.title"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Date From *"
                type="date"
                clearable
                required
                density="compact"
                variant="underlined"
                :loading="loading"
                :disabled="loading"
                v-model="form.date_from"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Date  To *"
                type="date"
                clearable
                required
                density="compact"
                variant="underlined"
                :loading="loading"
                :disabled="loading"
                v-model="form.date_to"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row v-for="(n, index) in form.info" :key="index">
                <v-col cols="3">
                  <v-select
                    label="Employee ID *"
                    clearable
                    required
                    density="compact"
                    variant="underlined"
                    item-title="emp_code"
                    item-value="user_id"
                    :loading="loading"
                    :disabled="loading"
                    v-model="n.user_id"
                    :items="userlist"
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        :subtitle="
                          item.raw.last_name +
                          ', ' +
                          item.raw.first_name +
                          ' ' +
                          item.raw.middle_name
                        "
                      ></v-list-item>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    label="Schedule *"
                    clearable
                    required
                    density="compact"
                    variant="underlined"
                    :loading="loading"
                    :disabled="loading"
                    :items="sched_list"
                    v-model="n.sched"
                    item-title="name"
                    item-value="id"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    label="Rest Day *"
                    clearable
                    required
                    density="compact"
                    variant="underlined"
                    :loading="loading"
                    :disabled="loading"
                    v-model="n.rest_day"
                    multiple
                    :items="[
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ]"
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-btn block @click="removeeduc(index)"> Remove </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-btn @click="addemp">ADD Employee</v-btn>
          </v-row>
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
