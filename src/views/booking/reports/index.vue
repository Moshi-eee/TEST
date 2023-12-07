<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import router from "@/router";
import Resource from "@/api/resource.js";
import { useBookingStore } from "@/stores/bookingStore.js";
const bookStore = useBookingStore();

const apibookinglist = new Resource("booking/sports");
const apibusinessunit = new Resource("user/maintenance/business_unit");
const apisports = new Resource("booking/maintenance/sports");

onMounted(async () => {
  fetch();
  fetchsports();
  fetchbusiness();
});
const exportExcel = () => {
  const excelContent = convertToExcel(exportItems.value);
  const blob = new Blob([excelContent], { type: "text/csv; charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "export_data.csv");
  link.click();
};
const convertToExcel = (data) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((header) => obj[header]));
  const headerRow = headers.join(",");
  const excelRows = [headerRow, ...rows.map((row) => row.join(","))];
  return excelRows.join("\n");
};
const exportItems = ref([]);
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
    title: "Transaction date",
    align: "left",
    key: "created_date",
    width: "128",
  },

  {
    title: "Sports",
    align: "left",
    sortable: true,
    key: "sports.code",
    sortable: false,
  },
  {
    title: "Type",
    align: "left",
    key: "type",

    sortable: false,
  },
  {
    title: "User ID",
    align: "left",
    key: "userprofile.emp_code",
    width: "115",
    sortable: false,
  },
  {
    title: "Book Date & Time",
    align: "center",
    key: "booked_datetime",
    width: "115",
    sortable: false,
  },
  {
    title: "Duration/mis",
    align: "center",
    key: "duration",
    width: "1",
    sortable: false,
  },
  {
    title: "Companions",
    align: "left",
    key: "companions",
    width: "10",
    sortable: false,
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
  code: "",
  name: "",
  status: "",
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    code: "",
    name: "",
    status: "",
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    code: e.code,
    name: e.name,
    status: e.status,
  };
  dialog.value = true;
};

const deleteItem = async (e) => {
  const res = await apibookinglist.destroy(e.id);
  fetch();
};

const update = async () => {
  const res = await apibookinglist.update(itemid.value, form.value);
  fetch();
  itemid.value = null;
  actions.value = null;

  dialog.value = false;
  form.value = {
    code: "",
    name: "",
    status: "",
  };
};

const fetch = async () => {
  loading.value = true;

  const { data } = await apibookinglist.list({
    sports: filtersports.value,
    business: filterbusiness.value,
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });

  if (searchClicked.value) {
    bookStore.set_report(data.all.data);
    bookStore.set_reportDate(dateStart, dateEnd);
    serverItems.value = data.all.data;
    totalItems.value = data.total;
    itemsPerPage.value = data.per_page;
    exportItems.value = [];
    data.all.data.filter(reportExport);

    function reportExport(reportExport) {
      exportItems.value.push({
        created_date: reportExport.created_date,
        sport_id: reportExport.sports.code,
        user_id: reportExport.userprofile.emp_code,
        booked_datetime: reportExport.booked_datetime,
        duration: reportExport.duration,
        companions: reportExport.companions,
        booking_status: reportExport.booking_status,
        started: reportExport.started,
        ended: reportExport.ended,
      });
    }
  }
  loading.value = false;
  console.log(data.all.data);
};

const filtersportsitems = ref([]);
const filtersports = ref(null);
const fetchsports = async () => {
  loading.value = true;

  const { data } = await apisports.list({
    keyword: keywords.value,
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });

  filtersportsitems.value = data.data;
  loading.value = false;
};

const filterbusinessunititems = ref([]);
const filterbusiness = ref(null);
const fetchbusiness = async () => {
  loading.value = true;

  const { data } = await apibusinessunit.list({
    keyword: keywords.value,
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });

  filterbusinessunititems.value = data.data;
  loading.value = false;
};

const dateStart = ref(null);
const dateEnd = ref(null);
const searchClicked = ref(false);
const onClickedSearch = async () => {
  if (
    (dateStart.value != null && dateEnd.value != null) ||
    filtersportsitems.value != null ||
    filterbusinessunititems.value != null
  ) {
    searchClicked.value = true;
    serverItems.value = [];
    fetch();
  }
};
const onReset = async () => {
  searchClicked.value = false;
  dateEnd.value = null;
  dateStart.value = null;
  filtersportsitems.value = null;
  filterbusinessunititems.value = null;
  serverItems.value = [];
  keywords.value = null;
  nextpage.value = 1;
  totalItems.value = 0;
  itemsPerPage.value = 10;
  sortBy.value = [];
};
const companionItem = ref([]);
const dialogComp = ref(false);
const viewCompanions = async (data) => {
  companionItem.value = data;
  dialogComp.value = true;
};
const openNewTab = async (url) => {
  window.open(url, "_blank");
};
</script>

<template>
  <h2 class="mb-3">Reports</h2>
  <v-row>
    <v-col cols="12" md="9" style="padding-top: 30px">
      <v-row> </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="2">
      <v-text-field
        clearable
        type="date"
        label="Date Start"
        density="compact"
        variant="underlined"
        v-model="dateStart"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <v-text-field
        clearable
        label="Date End"
        type="date"
        density="compact"
        variant="underlined"
        v-model="dateEnd"
      ></v-text-field>
    </v-col>

    <v-col cols="12" md="2">
      <v-autocomplete
        label="Sports"
        clearable
        density="compact"
        variant="underlined"
        v-model="filtersports"
        :items="filtersportsitems"
        item-value="id"
        item-title="code"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" md="2">
      <v-autocomplete
        label="Business Unit"
        clearable
        density="compact"
        variant="underlined"
        v-model="filterbusiness"
        :items="filterbusinessunititems"
        item-value="id"
        item-title="code"
      ></v-autocomplete>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="10">
      <v-btn
        class="no-print"
        @click="openNewTab('/bookingprintreport')"
        style="position: relative; top: 10px; left: 0px"
        >print</v-btn
      >
      <v-btn
        style="position: relative; top: 10px; left: 10px"
        @click.prevent="exportExcel"
        >export xlsx</v-btn
      >
    </v-col>
    <v-col cols="12" md="2" align="end">
      <v-btn @click="onClickedSearch()">Search</v-btn>
      <v-icon @click="onReset()" v-if="searchClicked" style="padding-left: 10px"
        >mdi-close</v-icon
      >
    </v-col>
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
  <v-row>
    <v-col cols="12">
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
          <v-icon size="small" class="me-2" @click="editItem(item)">
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
              background: '#ffc107',
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
    </v-col>
  </v-row>
</template>

<style scoped>
@media print {
  /* Hide elements with the "no-print" class during printing */
  .no-print {
    display: none;
  }

  /* Add any additional print-specific styles here */
}
</style>
