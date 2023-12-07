<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();
import router from "@/router";
import { useUserStore } from "@/stores/userStore.js";
const userStore = useUserStore();
import Resource from "@/api/resource.js";
const apibusinessunit = new Resource("user/list");
const apibusinessunits = new Resource("user/maintenance/business_unit");
import { useDisplay } from "vuetify";
const { width } = useDisplay();
onMounted(async () => {
  fetch();
  fetchbusinessunit();
  await userStore.set_user2([]);
});

const businessunit = ref([]);
const fetchbusinessunit = async () => {
  const { data } = await apibusinessunits.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
  });
  const a = data.data;
  for (let i = 0; i < a.length; i++) {
    businessunit.value.push([a[i].name]);
  }
};

const serverItems = ref([]);
const filter = ref(null);
const keywords = ref(null);
const nextpage = ref(1);

const actions = ref(null);
const itemid = ref(null);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const headers = [
  {
    title: "Avatar",
    align: "start",
    key: "avatar",
    width: "100",
  },
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
  { title: "Actions", align: "end", key: "actions", sortable: false },
];

const Create = async () => {
  router.push("/user/create");
};

const editItem = async (e) => {
  await userStore.set_user(e);
};

const deleteItem = async (e) => {
  const res = await apibusinessunit.destroy(e.id);
  fetch();
};

const fetch = async () => {
  loading.value = true;
  const { data } = await apibusinessunit.list({
    keyword: keywords.value,
    filter: filter.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "created_at",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  // console.log(data.table.data);
  serverItems.value = data.table.data;
  totalItems.value = data.table.total;
  itemsPerPage.value = data.table.per_page;
  loading.value = false;
};
</script>

<template>
  <h1 class="mb-3">Employee List</h1>
  <v-row justify="start">
    <v-col cols="12" md="4">
      <v-btn
        :disabled="!authStore.check('view-employee-employee-master-can-add')"
        @click="Create"
        :block="width <= 500 ? true : false"
        >Add New</v-btn
      >
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        clearable
        label="Search"
        density="compact"
        variant="underlined"
        v-model="keywords"
        @keypress.enter="fetch"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <v-select
        label="Business Unit"
        clearable
        density="compact"
        variant="underlined"
        v-model="filter"
        @update:modelValue="fetch"
        :items="businessunit"
      ></v-select>
    </v-col>
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
    <template v-slot:item.avatar="{ item }">
      <v-avatar :image="item.avatar_path"></v-avatar>
      <!-- <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon> -->
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        :disabled="!authStore.check('view-employee-employee-master-can-edit')"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon> -->
    </template>
  </v-data-table-server>
</template>
