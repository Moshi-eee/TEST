<script setup>
import { onMounted, ref } from "vue";

import Resource from "@/api/resource.js";
const apifoods = new Resource("rating/maintenance/food");
const apifoodlist = new Resource("rating/schedule/sched-food");

onMounted(async () => {
  fetch();
  fetchMenu();
});

const foodMenu = ref(null);
const fetchMenu = async () => {
  const { data } = await apifoods.list({
    keyword: keywords.value,
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  foodMenu.value = data.data;
};
const type = ref(null);
const date = ref(null);
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
    title: "Image",
    align: "left",
    key: "picture_path",
    width: "200",
    sortable: false,
  },
  { title: "Menus", align: "left", width: "400", key: "food_menu.name" },
  {
    title: "Date",
    align: "left",
    key: "date",
    width: "200",
    sortable: true,
  },

  {
    title: "Schedule Type",
    align: "center",
    key: "sched_type",
    width: "300",
    sortable: false,
  },
  { title: "Status", key: "status", width: "200", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  date: null,
  food_id: null,
  sched_type: null,
  status: null,
});

const Close = async () => {
  actions.value = null;
  dialog.value = false;
  form.value = {
    picture_path: null,
    name: null,
    status: null,
  };
};

const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    date: e.date,
    food_id: e.food_menu.name,
    status: e.status,
    sched_type: e.sched_type,
  };
  dialog.value = true;
};

const deleteItem = async (e) => {
  const res = await apifoodlist.destroy(e.id);
  fetch();
};

const update = async () => {
  const res = await apifoodlist.update(itemid.value, form.value);
  fetch();
  itemid.value = null;
  actions.value = null;

  dialog.value = false;
  form.value = {
    picture_path: null,
    name: null,
    status: null,
  };
};

const save = async () => {
  const res = await apifoodlist.store(form.value);
  fetch();
  dialog.value = false;
  form.value = {
    picture_path: null,
    name: null,
    status: null,
  };
};

const fetch = async () => {
  loading.value = true;

  const { data } = await apifoodlist.list({
    type: type.value,
    date: date.value,
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "id",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });

  if (searchClicked.value) {
    serverItems.value = data.data;
    totalItems.value = data.total;
    itemsPerPage.value = data.per_page;
  }
  loading.value = false;
};

const searchClicked = ref(false);
const onClickedSearch = async () => {
  if (date != null || type.value != null) {
    searchClicked.value = true;
    serverItems.value = [];
    fetch();
  }
};
</script>

<template>
  <h2 class="mb-3">Food Schedule</h2>
  <v-row>
    <v-col cols="4" class="mb-4">
      <v-btn @click="dialog = !dialog">Add New</v-btn>
    </v-col>
    <v-col cols="12" md="3">
      <v-text-field
        clearable
        type="date"
        label="Date"
        density="compact"
        variant="underlined"
        v-model="date"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="3">
      <v-select
        label="Schedule Type"
        :items="['Breakfast', 'Lunch', 'Dinner', 'Supper']"
        variant="underlined"
        density="compact"
        v-model="type"
      >
      </v-select>
    </v-col>
    <v-col cols="12" md="2" class="mb-4">
      <v-btn @click="onClickedSearch()">Search</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Add Dish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  clearable
                  type="date"
                  label="Date"
                  density="compact"
                  v-model="form.date"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  hide-selected
                  label="Menus*"
                  variant="underlined"
                  :items="foodMenu"
                  v-model="form.food_id"
                  item-value="id"
                  item-title="name"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  label="Status *"
                  clearable
                  required
                  density="compact"
                  variant="underlined"
                  v-model="form.status"
                  :items="['active', 'deactive']"
                ></v-select>
              </v-col>
              <!-- <v-col cols="12" v-if="actions == 'edit'">
                <v-select
                  label="Type*"
                  :items="foodMenu"
                  variant="underlined"
                  v-model="form.food_id"
                  class="smaller-combobox"
                >
                </v-select>
              </v-col> -->
              <v-col cols="12">
                <v-select
                  label="Type*"
                  :items="['Breakfast', 'Lunch', 'Dinner', 'Supper']"
                  variant="underlined"
                  v-model="form.sched_type"
                  class="smaller-combobox"
                >
                </v-select>
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
    <template v-slot:item.picture_path="{ item }">
      <v-avatar
        :image="item.food_menu.picture_path"
        rounded="0"
        size="70"
      ></v-avatar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <!-- <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>
  </v-data-table-server>
</template>
