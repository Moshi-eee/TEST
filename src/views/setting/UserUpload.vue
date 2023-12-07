<script setup>
import { onMounted, ref } from "vue";

import { uploadexcel } from "@/api/dataApi.js";

const datas = ref([]);
const loading = ref(false);
const headers = [
  { title: "biometrics", align: "left", key: "biometrics", width: "150" },
  { title: "emp_type", align: "left", key: "emp_type", width: "150" },
  { title: "emp_id", align: "left", key: "emp_id", width: "150" },
  { title: "last_name", align: "left", key: "last_name", width: "150" },
  { title: "first_name", align: "left", key: "first_name", width: "150" },
  { title: "middle_name", align: "left", key: "middle_name", width: "150" },
  { title: "gender", align: "left", key: "gender", width: "150" },
  { title: "birth_date", align: "left", key: "birth_date", width: "150" },
  {
    title: "marital_status",
    align: "left",
    key: "marital_status",
    width: "150",
  },
  { title: "nationality", align: "left", key: "nationality", width: "150" },
  { title: "contact_no", align: "left", key: "contact_no", width: "350" },
  {
    title: "business_units",
    align: "left",
    key: "business_units",
    width: "150",
  },
  { title: "email", align: "left", key: "email", width: "150" },
  { title: "religion", align: "left", key: "religion", width: "200" },

  { title: "street", align: "left", key: "street", width: "350" },
  { title: "barangay", align: "left", key: "barangay", width: "200" },
  {
    title: "city_municipality",
    align: "left",
    key: "city_municipality",
    width: "150",
  },
  { title: "province", align: "left", key: "province", width: "200" },
  {
    title: "educational_attainment",
    align: "left",
    key: "educational_attainment",
    width: "150",
  },
  { title: "school_name", align: "left", key: "school_name", width: "200" },
  { title: "degree", align: "left", key: "degree", width: "200" },

  { title: "type", align: "left", key: "type", width: "150" },
  { title: "rank", align: "left", key: "rank", width: "150" },
  { title: "emp_status", align: "left", key: "emp_status", width: "150" },
  { title: "department", align: "left", key: "department", width: "250" },
  { title: "position", align: "left", key: "position", width: "250" },
  { title: "date_join", align: "left", key: "date_join", width: "150" },
  {
    title: "date_regularization",
    align: "left",
    key: "date_regularization",
    width: "150",
  },

  {
    title: "date_resignation",
    align: "left",
    key: "date_resignation",
    width: "150",
  },
  {
    title: "reason_resignation",
    align: "left",
    key: "reason_resignation",
    width: "150",
  },

  { title: "sss_no", align: "left", key: "sss_no", width: "150" },
  { title: "philh_no", align: "left", key: "philh_no", width: "150" },
  { title: "pagibig_no", align: "left", key: "pagibig_no", width: "150" },
  { title: "tin_no", align: "left", key: "tin_no", width: "150" },
  {
    title: "account_number",
    align: "left",
    key: "account_number",
    width: "150",
  },
  {
    title: "account_date_recv",
    align: "left",
    key: "account_date_recv",
    width: "150",
  },
  { title: "remarks", align: "left", key: "remarks", width: "250" },
  { title: "basic_salary", align: "left", key: "basic_salary", width: "250" },
];

const convertToBase64 = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (e) => {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: "binary",
      cellDates: false,
    });
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var roa = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheetName]
      );
      if (roa.length > 0) {
        result[sheetName] = roa;
      }
    });
    console.log(result.Sheet1);
    datas.value = result.Sheet1;
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};

const save = async () => {
  if (datas.value) {
    loading.value = true;
    await uploadexcel(datas.value)
      .then((e) => {
        console.log(e);
        loading.value = false;
        datas.value = [];
        loading.value = false;
      })
      .catch(function (error) {
        datas.value = [];
        console.log("Error: ", error);
        loading.value = false;
      });
    datas.value = [];
    loading.value = false;
  }
};
</script>
<template>
  <v-row class="mb-4">
    <v-col col="12" md="6">
      <v-file-input
        label="EXCEL Employee Master File"
        accept=".xlsx"
        @change="convertToBase64"
        clearable
        required
        hide-details
        density="compact"
        variant="underlined"
        :loading="loading"
        :disabled="loading"
      ></v-file-input>
    </v-col>
    <v-col col="12" md="6">
      <v-sheet class="mb-3">
        <v-btn :loading="loading" :disabled="loading" @click="save"
          >Upload</v-btn
        ></v-sheet
      >
    </v-col>
  </v-row>
  Total:{{ datas.length }}

  <v-data-table-virtual
    density="compact"
    :headers="headers"
    :items="datas"
    :loading="loading"
    :disabled="loading"
    class="elevation-1"
    height="650"
  ></v-data-table-virtual>
</template>
