<script setup>
import { onMounted, ref, reactive } from "vue";
import Resource from "@/api/resource.js";
import { getrating } from "@/api/ratingApi.js";

onMounted(async () => {});
const apireport = new Resource("ticketing/reports");
const nextpage = ref(1);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const dialog = ref(false);
const searchAgent = ref([]);

const serverItems = ref([]);
const fetch = async () => {
  loading.value = true;
  const { data } = await getrating({
    search: searchAgent.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};

const reportItem = ref([]);
const reportLength = ref(0);
const user_id = ref(null);
const dateStartRating = ref(null);
const dateEndRating = ref(null);
const fetchReport = async () => {
  loading.value = true;
  reportLength.value = 0;
  reportItem.value = [];

  const { data } = await apireport.list({
    userid: user_id.value,
    dateStartRating: dateStartRating.value,
    dateEndRating: dateEndRating.value,
    keyword: "",
    key: "",
    order: "",
    limit: 50,
    page: 1,
  });
  console.log(data.data);
  reportItem.value = data.data;
  reportLength.value = reportItem.value.length;
  loading.value = false;
};
const headers = [
  {
    title: "Agent Name",
    align: "left",
    key: "userprofile.first_name",
    sortable: false,
  },
  { title: "Star Ave.", align: "left", key: "avg", sortable: false },
  { title: "Actions", key: "action", sortable: false },
];
const openTickets = async (res = null) => {
  user_id.value = res.user_id;
  console.log(user_id.value);
  dialog.value = true;
  fetchReport();
};
</script>

<template>
  <h2 class="mb-3">Ratings</h2>
  <v-row justify="end">
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            type="datetime-local"
            label="Date Start"
            density="compact"
            variant="underlined"
            v-model="dateStartRating"
            :max="dateEnd"
            style="padding-top: 7px"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Date End"
            type="datetime-local"
            density="compact"
            variant="underlined"
            v-model="dateEndRating"
            :min="dateStart"
            style="padding-top: 7px"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <v-row align-md="right">
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" align="end">
          <!-- <v-autocomplete
            prepend-icon="mdi-magnify"
            label="Search Agent"
            :items="serverItems"
            item-title="userprofile.first_name"
            item-value="userprofile.first_name"
            hide-details
            clearable
            required
            density="compact"
            variant="underlined"
            v-model="searchAgent"
          ></v-autocomplete> -->
        </v-col>
        <!-- <v-col cols="12" md="2">
          <v-btn @click="fetch"> SEARCH</v-btn>
        </v-col> -->
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" width="1080">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Tickets: {{ reportLength }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-table fixed-header height="300px">
                  <thead>
                    <tr>
                      <th class="text-left">Title No.</th>
                      <th class="text-left">Title</th>
                      <th class="text-left">Customer Name</th>
                      <th class="text-left">Ticket Closed</th>
                      <th class="text-left">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ticket in reportItem" :key="ticket">
                      <td>{{ ticket.ticket_no }}</td>
                      <td>{{ ticket.title }}</td>
                      <td>
                        {{ ticket.userprofile.first_name }}
                        {{ ticket.userprofile.middle_name }}
                        {{ ticket.userprofile.last_name }}
                      </td>
                      <td>{{ ticket.close_date }}</td>
                      <td>
                        {{ ticket.rating }}
                        <v-icon
                          size="small"
                          style="padding-bottom: 2px; padding-right: 6px"
                          >mdi-star</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = !dialog">
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
    density="compact"
    @update:options="fetch"
  >
    <template v-slot:item.userprofile.first_name="{ item }">
      {{ item.userprofile.first_name }}
      {{ item.userprofile.middle_name }}
      {{ item.userprofile.last_name }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-tooltip location="top" text="Action">
        <template v-slot:activator="{ props }">
          <v-icon size="small" v-bind="props" @click="openTickets(item)">
            mdi-arrow-right-bold</v-icon
          >
        </template>
      </v-tooltip>
    </template>
  </v-data-table-server>
</template>

<style scoped></style>
