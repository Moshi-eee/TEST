<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("user/list");
const apibu = new Resource("user/maintenance/business_unit");
const apidep = new Resource("user/maintenance/department");

onMounted(async () => {
  // fetch();
  fetchdep();

  fetchbusinessunit();
});
const departs = ref([]);
const fetchdep = async () => {
  const { data } = await apidep.list({
    limit: 1000,
  });
  departs.value = data.data;
  // console.log(departs.value);
};

const business_unit = ref([]);
const fetchbusinessunit = async () => {
  const { data } = await apibu.list();
  business_unit.value = data.data;
};

const snackbar = ref(false);
const text = ref(null);
const serverItems = ref([]);
const keywords = ref(null);
const actions = ref(null);
const nextpage = ref(1);
const itemid = ref(null);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const dialog = ref(false);
const headers = [
  {
    title: "Employee ID",
    align: "start",
    key: "emp_code",
    width: "150",
  },
  { title: "Biometric", align: "left", key: "biometric", width: "100" },
  { title: "First Name", align: "left", key: "first_name", width: "170" },
  { title: "Middle Name", align: "left", key: "middle_name", width: "170" },
  { title: "Last Name", align: "left", key: "last_name", width: "170" },
  { title: "Suffix", align: "center", key: "suffix", width: "80" },
  { title: "Gender", align: "center", key: "gender", width: "80" },
  {
    title: "Category",
    align: "center",
    key: "emp_type",
    width: "150",
  },
  {
    title: "Employee Status",
    align: "center",
    key: "emp_status",
    width: "200",
  },
  { title: "Status", align: "center", key: "type", width: "100" },
];

const filtergender = ref();
const filtercategory = ref();
const filterrank = ref();
const filterempstatus = ref();
const filterempstatus2 = ref();
const filterbusiness = ref();
const filterdepart = ref();

const exportItems = ref([]);
const downloaditem = ref([]);

const fetch = async () => {
  exportItems.value = [];
  downloaditem.value = [];

  const { data } = await apibusinessunit.list({
    report: "generate",
    filterdepart: filterdepart.value,
    filterbusiness: filterbusiness.value,
    filterempstatus2: filterempstatus2.value,
    filterempstatus: filterempstatus.value,
    filterrank: filterrank.value,
    filtercategory: filtercategory.value,
    filtergender: filtergender.value,
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: 10,
    page: nextpage.value,
  });
  exportItems.value = data.report;
  serverItems.value = data.table.data;
  totalItems.value = data.table.total;
  itemsPerPage.value = data.table.per_page;
};

const loopdata = () => {
  downloaditem.value = [];

  for (let i = 0; i < exportItems.value.length; i++) {
    downloaditem.value.push({
      emp_id: exportItems.value[i].emp_code
        ? exportItems.value[i].emp_code
        : "",
      rfid: exportItems.value[i].rfid
        ? exportItems.value[i].rfid.replace(",", "").substring(0, 11)
        : "",
      biometrics: exportItems.value[i].biometric
        ? exportItems.value[i].biometric
        : "",
      emp_type: exportItems.value[i].emp_type
        ? exportItems.value[i].emp_type
        : "",
      salutation: exportItems.value[i].salutation
        ? exportItems.value[i].salutation
        : "",
      first_name: exportItems.value[i].first_name
        ? exportItems.value[i].first_name
        : "",
      middle_name: exportItems.value[i].middle_name
        ? exportItems.value[i].middle_name
        : "",
      last_name: exportItems.value[i].last_name
        ? exportItems.value[i].last_name
        : "",
      suffix: exportItems.value[i].suffix ? exportItems.value[i].suffix : "",
      nick_name: exportItems.value[i].nick_name
        ? exportItems.value[i].nick_name
        : "",
      gender: exportItems.value[i].gender ? exportItems.value[i].gender : "",
      birth_date: exportItems.value[i].birth_date
        ? exportItems.value[i].birth_date
        : "",
      marital_status: exportItems.value[i].marital_status
        ? exportItems.value[i].marital_status
        : "",
      nationality: exportItems.value[i].nationality
        ? exportItems.value[i].nationality.name
        : null,
      contact_no: exportItems.value[i].contact_no
        ? exportItems.value[i].contact_no
        : "",
      email: exportItems.value[i].user ? exportItems.value[i].user.email : null,
      religion: exportItems.value[i].religion
        ? exportItems.value[i].religion.code
        : null,
      pre_street: exportItems.value[i].street
        ? exportItems.value[i].street.replace(",", "")
        : "",
      pre_barangay: exportItems.value[i].barangay
        ? exportItems.value[i].barangay.replace(",", "")
        : "",
      pre_city_municipality: exportItems.value[i].city_municipality
        ? exportItems.value[i].city_municipality.replace(",", "")
        : "",
      pre_province: exportItems.value[i].province
        ? exportItems.value[i].province.replace(",", "")
        : "",
      per_street: exportItems.value[i].p_street
        ? exportItems.value[i].p_street.replace(",", "")
        : "",
      per_barangay: exportItems.value[i].p_barangay
        ? exportItems.value[i].p_barangay.replace(",", "")
        : "",
      per_city_municipality: exportItems.value[i].p_city_municipality
        ? exportItems.value[i].p_city_municipality.replace(",", "")
        : "",
      per_province: exportItems.value[i].p_province
        ? exportItems.value[i].p_province
        : "",
      // educational_attainment_1: exportItems.value[i].suffix,
      // school_name_1: exportItems.value[i].suffix,
      // degree_1: exportItems.value[i].suffix,
      // date_year_1: exportItems.value[i].suffix,
      // educational_attainment_2: exportItems.value[i].suffix,
      // school_name_2: exportItems.value[i].suffix,
      // degree_2: exportItems.value[i].suffix,
      // date_year_2: exportItems.value[i].suffix,
      business_units: exportItems.value[i].business_unit
        ? exportItems.value[i].business_unit.name
        : "",
      sub_business_units: exportItems.value[i].sub_business_unit
        ? exportItems.value[i].sub_business_unit.name
        : "",
      billing_units: exportItems.value[i].billing_unit_id,
      loding_room: "",
      type: exportItems.value[i].type ? exportItems.value[i].type : "",
      rank: exportItems.value[i].rank ? exportItems.value[i].rank : "",
      emp_status: exportItems.value[i].emp_status
        ? exportItems.value[i].emp_status
        : "",
      department: exportItems.value[i].department
        ? exportItems.value[i].department.name
        : "",
      position: exportItems.value[i].position
        ? exportItems.value[i].position.name
        : "",
      date_join: exportItems.value[i].date_hired
        ? exportItems.value[i].date_hired
        : "",
      date_regularization: exportItems.value[i].date_regularization
        ? exportItems.value[i].date_regularization
        : "",
      date_resignation: exportItems.value[i].date_resignation
        ? exportItems.value[i].date_resignation
        : "",
      reason_resignation: exportItems.value[i].reason_resignation
        ? exportItems.value[i].reason_resignation
        : "",
      sss_no: exportItems.value[i].sss_no ? exportItems.value[i].sss_no : "",
      philh_no: exportItems.value[i].philh_no
        ? exportItems.value[i].philh_no
        : "",
      pagibig_no: exportItems.value[i].pagibig_no
        ? exportItems.value[i].pagibig_no
        : "",
      tin_no: exportItems.value[i].tin_no ? exportItems.value[i].tin_no : "",
      account_number: exportItems.value[i].account_number
        ? exportItems.value[i].account_number
        : "",
      account_date_recv: exportItems.value[i].account_date_recv
        ? exportItems.value[i].account_date_recv
        : "",
      basic_salary: "",
      supervisor_1: exportItems.value[i].immediate_supervisor1
        ? exportItems.value[i].immediate_supervisor1
        : "",
      supervisor_2: exportItems.value[i].immediate_supervisor2
        ? exportItems.value[i].immediate_supervisor2
        : "",
      supervisor_3: exportItems.value[i].immediate_supervisor3
        ? exportItems.value[i].immediate_supervisor3
        : "",
    });
  }
};

const exportExcel = () => {
  loopdata();
  const excelContent = convertToExcel(downloaditem.value);
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
</script>

<template>
  <h2 class="mb-3">Employee Reports</h2>
  <v-row justify="start" class="mb-3">
    <v-col>
      <v-select
        clearable
        label="Gender"
        required
        density="compact"
        variant="underlined"
        :items="['Male', 'Female']"
        v-model="filtergender"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        clearable
        label="Category"
        required
        density="compact"
        variant="underlined"
        :items="['Expat', 'Local']"
        v-model="filtercategory"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        clearable
        label="Business Units"
        required
        density="compact"
        variant="underlined"
        :items="business_unit"
        v-model="filterbusiness"
        item-title="name"
        item-value="id"
      ></v-select>
    </v-col>
    <v-col>
      <v-autocomplete
        clearable
        label="Department"
        required
        density="compact"
        variant="underlined"
        :items="departs"
        item-title="name"
        item-value="id"
        v-model="filterdepart"
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-select
        clearable
        label="Rank"
        required
        density="compact"
        variant="underlined"
        :items="[
          'Executive',
          'Manager',
          'Supervisor',
          'Rank and File',
          'Team Leader',
        ]"
        v-model="filterrank"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        clearable
        label="Employment Status"
        required
        density="compact"
        variant="underlined"
        :items="[
          'Regular',
          'Probationary',
          'Project base',
          'Fix Term',
          'Others',
        ]"
        v-model="filterempstatus"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        clearable
        label="Employee Status"
        required
        density="compact"
        variant="underlined"
        :items="['Active', 'Separated', 'Not Joining']"
        v-model="filterempstatus2"
      ></v-select>
    </v-col>
    <v-col>
      <v-btn @click="fetch">Search</v-btn>
      <v-btn @click="exportExcel">Download</v-btn>
    </v-col>
  </v-row>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    v-model:page="nextpage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    class="elevation-1"
    item-value="name"
    density="compact"
    @update:options="fetch"
  >
  </v-data-table-server>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
