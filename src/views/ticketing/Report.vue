<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";

import { useAuthStore } from "@/stores/authStore.js";
import { useTicketStore } from "@/stores/ticketStore.js";
const authStore = useAuthStore();
const ticketStore = useTicketStore();

onMounted(async () => {
  fetchtype();
  fetchtags();
  fetchAgent();
});

const apireport = new Resource("ticketing/reports");
const apitype = new Resource("ticketing/maintenance/type");
const apitags = new Resource("ticketing/maintenance/tags");
const apiagent = new Resource("ticketing/maintenance/team-group");

const exportItems = ref([]);
const keywords = ref(null);
const nextpage = ref(1);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);

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

const headers = [
  { title: "Ticket ID", align: "start", key: "ID", sortable: false },
  { title: "Title", align: "left", key: "Title", sortable: false },
  {
    title: "Ticket Type",
    align: "left",
    key: "Type",
    sortable: false,
  },
  {
    title: "Ticket Tag",
    align: "left",
    key: "Tag",
    sortable: false,
  },
  {
    title: "Customer Name",
    align: "left",
    key: "Customer",
    sortable: false,
  },
  {
    title: "Department",
    align: "left",
    key: "Department",
    sortable: false,
  },
  { title: "Group Name", align: "left", key: "Group", sortable: false },
  { title: "Team Name", align: "left", key: "Team", sortable: false },
  {
    title: "Agent Name",
    align: "left",
    key: "Agent",
    sortable: false,
  },
  { title: "Priority", align: "left", key: "Priority", sortable: false },
  { title: "Status", align: "left", key: "Status", sortable: false },
  { title: "Created", align: "left", key: "Created", sortable: false },
  { title: "Closed", align: "left", key: "Closed", sortable: false },
  { title: "Duration", align: "left", key: "Duration", sortable: false },
  { title: "Rating", align: "left", key: "Ratings", sortable: false },
];
const agentItem = ref([]);
const fetchAgent = async (user_id) => {
  const { data } = await apiagent.list({
    user_id: user_id,
    group: "",
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  agentItem.value = data.data;
};

const fetch = async () => {
  loading.value = true;

  const { data } = await apireport.list({
    type: filterType.value,
    tags: filterTags.value,
    status: filterStatus.value,
    priority: filterPriority.value,
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  if (searchClicked.value) {
    exportItems.value = [];
    totalItems.value = data.total;
    itemsPerPage.value = data.per_page;
    data.data.filter(reportExport);

    function reportExport(reportExport) {
      const ticketdate = new Date(reportExport.created_date);
      const dd = String(ticketdate.getDate()).padStart(2, "0");
      const mm = String(ticketdate.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = ticketdate.getFullYear();
      const date_started = yyyy + "/" + mm + "/" + dd;
      const close_date = null;
      if (reportExport.status == "Closed") {
        const c_ticketdate = new Date(reportExport.close_date);
        const c_dd = String(c_ticketdate.getDate()).padStart(2, "0");
        const c_mm = String(c_ticketdate.getMonth() + 1).padStart(2, "0"); //January is 0!
        const c_yyyy = c_ticketdate.getFullYear();
        close_date = c_yyyy + "/" + c_mm + "/" + c_dd;
      }

      exportItems.value.push({
        ID: reportExport.ticket_no,
        Title: reportExport.title,
        Type: reportExport.tickettype.code,
        Tag: reportExport.tickettags ? reportExport.tickettags.code : "",
        Customer:
          reportExport.userprofile.first_name +
          " " +
          reportExport.userprofile.last_name,
        Department: reportExport.userprofile.department
          ? reportExport.userprofile.department.name
          : "",
        Group: reportExport.ticketgroup ? reportExport.ticketgroup.code : "",
        Team: getAgent(reportExport.ticket_team_group_id).team,
        Agent: getAgent(reportExport.ticket_team_group_id).name,
        Priority: reportExport.priority,
        Status: reportExport.status,
        Created: date_started,
        Closed: close_date,
        Ratings: reportExport.rating,
      });
    }

    function getAgent(agents) {
      var agentText = "";
      var teamValue = "";
      if (agents != null) {
        for (var j = 0; j < agents.length; j++) {
          for (var i = 0; i < agentItem.value.length; i++) {
            if (agents[j] == agentItem.value[i].user_id) {
              agentText +=
                "(" +
                agentItem.value[i].userprofile.first_name +
                " " +
                agentItem.value[i].userprofile.last_name +
                ")";
              if (!teamValue.includes(agentItem.value[i].team.code))
                teamValue = agentItem.value[0].team.code;
            }
          }
        }
      }

      return { name: agentText, team: teamValue };
    }
  }
  loading.value = false;
};
const OpenNewTab = async (url) => {
  ticketStore.set_ticket(exportItems.value, url);
};
const typeItems = ref([]);
const filterType = ref(null);
const fetchtype = async () => {
  const { data } = await apitype.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  const a = data.data;
  typeItems.value = a;
};

const tagItems = ref([]);
const filterTags = ref(null);
const fetchtags = async () => {
  const { data } = await apitags.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  const a = data.data;
  tagItems.value = a;
};

const filterStatus = ref(null);
const filterPriority = ref(null);
const dateStart = ref(null);
const dateEnd = ref(null);
const searchClicked = ref(false);
const onClickedSearch = async () => {
  if (
    (dateStart.value != null && dateEnd.value != null) ||
    filterStatus.value != null ||
    filterPriority.value != null ||
    filterTags.value != null ||
    filterType.value != null
  ) {
    searchClicked.value = true;
    fetch();
  }
};
const onReset = async () => {
  searchClicked.value = false;
  dateEnd.value = null;
  dateStart.value = null;
  filterPriority.value = null;
  filterStatus.value = null;
  filterType.value = null;
  filterTags.value = null;
  keywords.value = null;
  nextpage.value = 1;
  totalItems.value = 0;
  itemsPerPage.value = 10;
  sortBy.value = [];
  exportItems.value = [];
};
</script>

<template>
  <h2 class="mb-3">Report</h2>
  <v-row>
    <v-col cols="12" md="2">
      <v-text-field
        type="date"
        label="Date Start"
        density="compact"
        variant="underlined"
        v-model="dateStart"
        :max="dateEnd"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <v-text-field
        label="Date End"
        type="date"
        density="compact"
        variant="underlined"
        v-model="dateEnd"
        :min="dateStart"
      ></v-text-field>
    </v-col>

    <v-col cols="12" md="2">
      <v-autocomplete
        label="Ticket Type"
        :items="typeItems"
        item-title="code"
        item-value="id"
        density="compact"
        variant="underlined"
        v-model="filterType"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" md="2">
      <v-autocomplete
        label="Ticket Tags"
        density="compact"
        variant="underlined"
        v-model="filterTags"
        :items="tagItems"
        item-title="code"
        item-value="id"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" md="2">
      <v-autocomplete
        label="Status"
        density="compact"
        variant="underlined"
        v-model="filterStatus"
        :items="['Open', 'Pending', 'Resolved', 'Closed', 'Unassigned']"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" md="2">
      <v-autocomplete
        label="Priority"
        density="compact"
        variant="underlined"
        v-model="filterPriority"
        :items="['Low', 'Medium', 'High', 'Urgent']"
      ></v-autocomplete>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="10">
      <v-btn
        :disabled="
          !authStore.check('view-ticket-report-report-can-print') ||
          exportItems.length <= 0
        "
        @click.prevent="OpenNewTab('/ticketprint')"
        style="margin-left: 5px"
        >Print</v-btn
      >
      <v-btn
        :disabled="
          !authStore.check('view-ticket-report-report-can-export') ||
          exportItems.length <= 0
        "
        @click.prevent="exportExcel"
        style="margin-left: 5px"
        >Export</v-btn
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
    <v-col cols="12">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        v-model:sort-by="sortBy"
        v-model:page="nextpage"
        :headers="headers"
        :items-length="totalItems"
        :items="exportItems"
        :loading="loading"
        class="elevation-1"
        item-value="name"
        density="compact"
        @update:options="fetch"
      >
      </v-data-table-server>
    </v-col>
  </v-row>
</template>

<style scoped></style>
