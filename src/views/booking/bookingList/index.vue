<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
const userStore = useAuthStore();

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("booking/sports");

onMounted(async () => {
  fetch();
  listen();
});

const listen = async () => {
  window.Echo.channel("booking-list").listen("BookingRefresh", (comment) => {
    fetch();
  });
};

const alldatas = ref([]);

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
    title: "Actions",
    align: "start",
    key: "actions",
    sortable: false,
    width: "1",
  },
  {
    title: "Transaction Date",
    align: "center",
    sortable: false,
    key: "created_date",
    width: "128",
  },
  {
    title: "Facility",
    align: "left",
    sortable: false,
    key: "sports.code",
    width: "3",
  },
  {
    title: "Type",
    align: "left",
    key: "type",
    sortable: false,
    width: "200",
  },
  {
    title: "Client",
    align: "left",
    key: "userprofile.emp_code",
    sortable: false,
    width: "115",
  },
  {
    title: "Schedule",
    align: "left",
    key: "booked_datetime",
    sortable: false,
    width: "128",
  },
  {
    title: "Duration/mins",
    align: "center",
    key: "duration",
    sortable: false,
    width: "1",
  },
  {
    title: "Companions",
    align: "center",
    key: "companions",
    sortable: false,
    width: "10",
  },

  {
    title: "Status",
    align: "center",
    key: "booking_status",
    width: "20",
    sortable: false,
  },
  {
    title: "Start Date & Time",
    align: "center",
    key: "started",
    width: "160",
    sortable: false,
  },
  {
    title: "End Date & Time",
    align: "center",
    key: "ended",
    width: "160",
    sortable: false,
  },
  {
    title: "Reason",
    align: "center",
    key: "comments",
    width: "150",
    sortable: false,
  },
  {
    title: "Purpose",
    align: "left",
    key: "purpose",
    width: "150",
    sortable: false,
  },

  {
    title: "Date To (trainingroom)",
    align: "center",
    key: "booked_datetime_to",
    width: "160",
    sortable: false,
  },
  {
    title: "Number of Seats",
    align: "center",
    key: "sit_capacity",
    sortable: false,
    width: "2",
  },
  {
    title: "Equipment Used",
    align: "left",
    key: "equipment_id",
    sortable: false,
  },
];

const form = ref({
  booking_status: "",
  comments: "",
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    booking_status: "",
    comments: "",
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    booking_status: e.booking_status,
    comments: e.comments,
  };
  dialog.value = true;
};

// const deleteItem = async (e) => {
//   const res = await apibusinessunit.destroy(e.id);
//   fetch();
// };

const update = async () => {
  const res = await apibusinessunit.update(itemid.value, form.value);
  console.log(res);
  fetch();
  itemid.value = null;
  actions.value = null;

  dialog.value = false;
  form.value = {
    booking_status: "",
    comments: "",
  };
};

const save = async () => {
  const res = await apibusinessunit.store(form.value);
  fetch();
  dialog.value = false;
  form.value = {
    booking_status: "",
    comments: "",
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
  alldatas.value = data.all.data;
  serverItems.value = data.limit.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
  // console.log(alldatas.value);
};

const companionItem = ref([]);
const dialogComp = ref(false);
const viewCompanions = async (data) => {
  companionItem.value = data;
  dialogComp.value = true;
};
</script>

<template>
  <h2 class="mb-3">Booking List</h2>
  <v-row justify="start">
    <v-col cols="4"> </v-col>
    <v-col cols="8">
      <v-sheet class="mb-3">
        <v-text-field
          clearable
          label="Search Employee Number"
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
          <span class="text-h5 pa-2">Booking Status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  v-if="
                    !userStore.check(
                      'view-booking-mybook-list-can-changes-status'
                    )
                  "
                  label="Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.booking_status"
                  :items="['Cancel']"
                ></v-select>
                <v-select
                  v-else
                  label="Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.booking_status"
                  :items="['Confirm', 'Ongoing', 'Done', 'Cancel']"
                ></v-select>
              </v-col>
              <v-col cols="12" md="12" v-if="form.booking_status == 'Cancel'">
                <v-textarea
                  v-model="form.comments"
                  label="Reason"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="Close"
            :style="{
              'font-family': 'Calibri Light, Calibri, sans-serif',
              'font-weight': 'bold',
            }"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            v-if="actions != 'edit'"
            @click="save"
            :style="{
              'font-family': 'Calibri Light, Calibri, sans-serif',
              'font-weight': 'bold',
            }"
          >
            Save
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            v-if="actions == 'edit'"
            @click="update"
            :style="{
              'font-family': 'Calibri Light, Calibri, sans-serif',
              'font-weight': 'bold',
            }"
          >
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row>
    <v-dialog v-model="dialogComp" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Companions List</span>
        </v-card-title>
        <v-card-text>
          <template v-for="n in companionItem" :key="n">
            {{ n }}
          </template>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialogComp = !dialogComp"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card-text>
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
        v-if="
          item.booking_status == 'Pending' ||
          item.booking_status == 'Confirm' ||
          item.booking_status == 'Ongoing'
        "
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>

    <template v-slot:item.companions="{ item }">
      <v-chip
        class="ma-2"
        variant="elevated"
        @click="viewCompanions(item.companions)"
        :style="{
          'font-family': 'Calibri Light, Calibri, sans-serif',
        }"
        >{{ item.companions.length }}</v-chip
      >

      <!-- <v-chip v-for="(n, index) in item.companions" :key="index">
        {{ n }}
      </v-chip> -->
    </template>
    <template v-slot:item.booking_status="{ item }">
      <v-chip
        v-if="item.booking_status == 'Pending'"
        :style="{
          background: 'grey',
          color: 'white',
          'font-family': 'Calibri Light, Calibri, sans-serif',
        }"
      >
        {{ item.booking_status }}
      </v-chip>
      <v-chip
        v-if="item.booking_status == 'Confirm'"
        :style="{
          background: '#007bff',
          color: 'white',
          'font-family': 'Calibri Light, Calibri, sans-serif',
        }"
      >
        {{ item.booking_status }}
      </v-chip>
      <v-chip
        v-if="item.booking_status == 'Ongoing'"
        :style="{
          background: '#FFEB3B',
          color: 'black',
          'font-family': 'Calibri Light, Calibri, sans-serif',
        }"
      >
        {{ item.booking_status }}
      </v-chip>
      <v-chip
        v-if="item.booking_status == 'Cancel'"
        :style="{
          background: '#dc3545',
          color: 'white',
          'font-family': 'Calibri Light, Calibri, sans-serif',
        }"
      >
        {{ item.booking_status }}
      </v-chip>
      <v-chip
        v-if="item.booking_status == 'Done'"
        :style="{
          background: '#28a745',
          color: 'white',
          'font-family': 'Calibri Light, Calibri, sans-serif',
        }"
      >
        {{ item.booking_status }}
      </v-chip>
    </template>
  </v-data-table-server>
</template>
