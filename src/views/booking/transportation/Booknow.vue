<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("booking/service");
const apimonitoring = new Resource("booking/monitoring-service");
const apischedvehicle = new Resource("booking/schedule/sched-vehicle");
const apipurpose = new Resource("booking/maintenance/sched-purpose");
const apipickup = new Resource("booking/maintenance/sched_pickup");

onMounted(async () => {
  fetch();
  fetchdestination();
  fetchpurpose();
});

const purposelist = ref([]);
const fetchpurpose = async () => {
  const { data } = await apipurpose.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  purposelist.value = data.data;
  // console.log(data.data);
};
const pickup = ref([]);
const fetchpickup = async () => {
  console.log(form.value.sched_vehicle_id);
  pickup.value = [];
  if (form.value.sched_vehicle_id) {
    const { data } = await apipickup.list({
      location: form.value.sched_vehicle_id,
      limit: 1000,
    });
    pickup.value = data.data;
    console.log(data.data);
  }
};

const sched_time_loc = ref([]);
const fetchdestination = async () => {
  sched_time_loc.value = [];
  const { data } = await apischedvehicle.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  sched_time_loc.value = data.data;
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
    title: "Employee ID",
    align: "start",
    sortable: false,
    key: "user.emp_code",
    width: "200",
  },

  {
    title: "Destination Route",
    align: "start",
    sortable: false,
    key: "sched_vehicle.location_des.name",
  },
  {
    title: "Pick Up",
    align: "start",
    sortable: false,
    key: "pickup.code",
  },
  {
    title: "Vehicle",
    align: "center",
    sortable: false,
    key: "vehicle_info",
    width: "200",
  },
  {
    title: "Date",
    align: "center",
    sortable: false,
    key: "sched_date",
    width: "200",
  },
  {
    title: "Time",
    align: "center",
    key: "sched_vehicle.sched_time",
    width: "200",
  },
  {
    title: "Porpose",
    align: "center",
    sortable: false,
    key: "sched_purpose.name",
  },
  {
    title: "Status",
    align: "end",
    sortable: false,
    key: "status",
    width: "100",
  },
  {
    title: "Actions",
    align: "end",
    key: "actions",
    sortable: false,
    width: "100",
  },
];

const form = ref({
  sched_date: "",
  sched_vehicle_id: "",
  status: "",
  sched_purpose_id: "",
  sched_pickup_id: "",
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    sched_date: "",
    sched_vehicle_id: "",
    status: "",
    sched_purpose_id: "",
    sched_pickup_id: "",
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    sched_date: e.sched_date,
    sched_vehicle_id: e.sched_vehicle_id,
    status: e.status,
    sched_purpose_id: e.sched_purpose_id,
    sched_pickup_id: e.sched_pickup_id,
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
        sched_date: "",
        sched_vehicle_id: "",
        status: "",
        sched_purpose_id: "",
        sched_pickup_id: "",
      };
      fetch();
    })
    .catch((e) => {
      snackbar.value = true;
      text.value = "Check Required fields";
      loading.value = false;
    });
};

const minDate = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate() + 1).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const save = async () => {
  loading.value = true;
  const res = await apibusinessunit
    .store(form.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Successfully Booked";
      dialog.value = false;
      form.value = {
        sched_date: "",
        sched_vehicle_id: "",
        status: "",
        sched_purpose_id: "",
        sched_pickup_id: "",
      };
      fetch();
    })
    .catch((e) => {
      if (e.response.data.message == "Validation Error") {
        snackbar.value = true;
        text.value = "Check Required fields";
        loading.value = false;
      } else {
        snackbar.value = true;
        text.value = e.response.data.message;
        loading.value = false;
      }
    });
};

const fetch = async () => {
  loading.value = true;
  const { data } = await apibusinessunit.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "id",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  console.log(data.data);
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
</script>

<template>
  <h2 class="mb-3">Book List</h2>
  <v-row justify="start">
    <v-col cols="9">
      <v-btn @click="dialog = !dialog">Book Now</v-btn>
    </v-col>
    <v-col cols="3">
      <v-text-field
        type="date"
        label="Select Date"
        required
        density="compact"
        variant="underlined"
        :loading="loading"
        :disabled="loading"
        v-model="keywords"
        @update:modelValue="fetch"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Book Now</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Date *"
                  type="date"
                  :min="minDate()"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.sched_date"
                  :loading="loading"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Destination *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                  :items="sched_time_loc"
                  item-title="location_des.name"
                  item-value="id"
                  v-model="form.sched_vehicle_id"
                  @update:modelValue="fetchpickup"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :subtitle="item.raw.sched_time"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Pickup Location *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                  :items="pickup"
                  item-title="code"
                  item-value="id"
                  v-model="form.sched_pickup_id"
                >
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  label="Purpose *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  :loading="loading"
                  :disabled="loading"
                  :items="purposelist"
                  item-title="name"
                  item-value="id"
                  v-model="form.sched_purpose_id"
                >
                </v-select>
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
    <template v-slot:item.vehicle_info="{ item }">
      {{ item.vehicle_id ? item.vehicle.code : "" }} -
      {{ item.vehicle_id ? item.vehicle.plate_no : "" }}
    </template>
  </v-data-table-server>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
