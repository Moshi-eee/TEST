<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import router from "@/router";
import Resource from "@/api/resource.js";
import { useRatingStore } from "@/stores/ratingStore.js";
const apifoodmenutoday = new Resource("rating/food-survey");
const apifoods = new Resource("rating/maintenance/food");
const apifoodlist = new Resource("rating/schedule/sched-food");

const rateStore = useRatingStore();

onMounted(async () => {
  fetch();
  fetchSchedType();
});

const dateComments = ref(null);
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
  { title: "Date", align: "left", key: "", width: "150" },
  {
    title: "Cutoff Period",
    align: "start",
    sortable: true,
    key: "food_sched.sched_type",
    width: "100",
    align: "start",
    sortable: false,
  },

  {
    title: "Actions",
    align: "left",
    key: "food_sched.food_menu.name",
    width: "40",
    align: "start",
    sortable: false,
  },
];

const form = ref({
  code: "",
  name: "",
  status: "",
  note: "",
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
  form.value.note = e.note;
  dialog.value = true;
  // console.log(e);
};

const deleteItem = async (e) => {
  const res = await apifoodmenutoday.destroy(e.id);
  fetch();
};

const update = async () => {
  const res = await apifoodmenutoday.update(itemid.value, form.value);
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
const created_at = ref(null);
const type = ref([]);
const sched_type = ref(null);
const fetchSchedType = async () => {
  loading.value = true;

  const { data } = await apifoodlist.list({
    keyword: keywords.value,
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });

  sched_type.value = data.data;
  loading.value = false;
};

const fetch = async () => {
  loading.value = true;

  const { data } = await apifoodmenutoday.list({
    created_at: created_at.value,
    dateComments: date.value,
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "id",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });

  if (searchClicked.value) {
    rateStore.set_report(data.data);
    rateStore.set_reportDate(created_at);
    serverItems.value = data.data;
    totalItems.value = data.total;
    itemsPerPage.value = data.per_page;
  }
  loading.value = false;
  // console.log(data);
};

const onReset = async () => {
  serverItems.value = [];
  keywords.value = null;
  nextpage.value = 1;
  totalItems.value = 0;
  itemsPerPage.value = 10;
  sortBy.value = [];
};

const searchClicked = ref(false);
const onClickedSearch = async () => {
  if (date.value != null) {
    searchClicked.value = true;
    serverItems.value = [];
    fetch();
  }
};
const openNewTab = async (url) => {
  window.open(url, "_blank");
};
</script>

<template>
  <h2 class="mb-3">Payslips</h2>

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
        label="Date"
        density="compact"
        variant="underlined"
        v-model="date"
      ></v-text-field>
    </v-col>

    <!-- <v-col cols="12" md="2">
      <v-autocomplete
        label="Type"
        clearable
        density="compact"
        variant="underlined"
        :items="['Breakfast', 'Lunch', 'Dinner', 'Supper']"
      ></v-autocomplete>
    </v-col> -->
  </v-row>
  <v-row>
    <v-col cols="12" md="10">
      <v-btn
        class="no-print"
        @click="openNewTab('/ratingprintreport')"
        style="position: relative; top: 10px; left: 0px"
        >print</v-btn
      >
      <!-- <v-btn style="position: relative; top: 10px; left: 10px" @click="download"
        >export xlsx</v-btn
      > -->
    </v-col>
    <v-col cols="12" md="2" align="end">
      <v-btn @click="onClickedSearch()">Search</v-btn>
      <v-icon @click="onReset()" v-if="searchClicked" style="padding-left: 10px"
        >mdi-close</v-icon
      >
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="750" height="650">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Comments</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  readonly
                  label="Comments"
                  v-model="form.note"
                  variant="outlined"
                  :style="{ height: '450px' }"
                ></v-textarea>
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
        </v-card-actions>
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
