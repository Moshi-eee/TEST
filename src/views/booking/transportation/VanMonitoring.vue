<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
import { createVSched } from "@/api/dataApi.js";

const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apimonitoring = new Resource("booking/monitoring-van");

onMounted(async () => {
  fetch();
});

const opt = ref([]);
const filter = (e) => {
  return vehicledriver.value.filter(
    (s) => s.sched_vehicle_id === e.sched_vehicle_id
  );
};

const snackbar = ref(false);
const text = ref(null);
const serverItems = ref([]);
const keywords = ref(null);
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
    key: "sched_vehicle.location_des.name",
    width: "200",
  },
  {
    title: "Date",
    align: "start",
    sortable: false,
    key: "sched_date",
    width: "100",
  },
  {
    title: "Time",
    align: "start",
    key: "sched_vehicle.sched_time",
    width: "100",
  },
  {
    title: "Count",
    align: "start",
    sortable: false,
    key: "usercount",
    width: "100",
  },
  {
    title: "Vehicle & Driver",
    align: "center",
    sortable: false,
    key: "vehidrive",
    width: "500",
  },
  {
    title: "Actions",
    align: "end",
    key: "actions",
    sortable: false,
    width: "100",
  },
];

const minDate = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate() + 1).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const vehicledriver = ref([]);

const fetch = async () => {
  // loading.value = true;
  const { data } = await apimonitoring.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "id",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "asc",
    limit: itemsPerPage.value ? itemsPerPage.value : 100,
    page: nextpage.value,
  });
  console.log(data.data);
  // vehicledriver.value = data.vehicle;
  // serverItems.value = data.sched.data;
  // totalItems.value = data.sched.data;
  // itemsPerPage.value = data.sched.per_page;
  loading.value = false;
};

const form = ref({
  booking_service_id: null,
  vehicle_id: null,
  driver_id: null,
});
const vehicle_id = ref();
const driver_id = ref();

const editItem = async (e) => {
  // console.log(e);
  itemid.value = e;
  dialog.value = true;
};

const save = async () => {
  loading.value = true;
  form.value.sched_vehicle_id = itemid.value.sched_vehicle_id;
  form.value.sched_date = itemid.value.sched_date;
  form.value.vehicle_id = vehicle_id.value;
  form.value.driver_id = driver_id.value;

  const res = await apimonitoring
    .store(form.value)
    .then((e) => {
      console.log(e);
      snackbar.value = true;
      text.value = "Successfully Booked";
      dialog.value = false;
      form.value = {
        vehicle_id: "",
        sched_vehicle_id: "",
        driver_id: "",
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

const Close = async () => {
  dialog.value = false;
  form.value = {
    sched_date: "",
    sched_vehicle_id: "",
    status: "",
  };
};
</script>

<template>
  <h2 class="mb-3">Van Monitoring</h2>
  <v-row justify="start">
    <v-col cols="9"> </v-col>
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
    <v-dialog v-model="dialog" persistent width="700">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Assign Vehicle</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="5">
                <v-autocomplete
                  label="Vechicle *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="vehicle_id"
                  :loading="loading"
                  :disabled="loading"
                  :items="opt.vehicle"
                  item-title="code"
                  item-value="id"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :subtitle="
                        'PN:' + item.raw.plate_no + '- C:' + item.raw.sit_count
                      "
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="5">
                <v-autocomplete
                  label="Driver *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="driver_id"
                  :loading="loading"
                  :disabled="loading"
                  :items="opt.driver"
                  item-title="emp_code"
                  item-value="user_id"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :subtitle="
                        item.raw.first_name +
                        ' ' +
                        item.raw.middle_name +
                        ' ' +
                        item.raw.last_name
                      "
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-btn @click="save">Add</v-btn>
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
    <template v-slot:item.vehidrive="{ item }">
      <v-chip v-for="n in filter(item)" :key="n.id">
        {{ n.userprofile.emp_code }} -
        {{ n.userprofile.first_name }}
        {{ n.userprofile.middle_name }}
        {{ n.userprofile.last_name }} : {{ n.vehicle.code }} -{{
          n.vehicle.plate_no
        }}/{{ n.vehicle.sit_count }}
      </v-chip>
    </template>
  </v-data-table-server>
</template>
