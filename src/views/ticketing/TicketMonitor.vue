<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";
import { useTicketStore } from "@/stores/ticketStore.js";

onMounted(async () => {
  fetchtype();
  fetchtags();
  fetchAgent();
});
const ticketStore = useTicketStore();
const apireport = new Resource("ticketing/reports");
const apiagent = new Resource("ticketing/maintenance/team-group");
const apitype = new Resource("ticketing/maintenance/type");
const apitags = new Resource("ticketing/maintenance/tags");
const sortBy = ref([]);
const serverItems = ref([]);
const typeItems = ref([]);
const tagItems = ref([]);
const nextpage = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const loading = ref(true);
const searchClicked = ref(false);
const keywords = ref(null);
const filterType = ref(null);
const filterTags = ref(null);
const filterStatus = ref(null);
const filterPriority = ref(null);
const dateStart = ref(null);
const dateEnd = ref(null);
const headers = [
  { title: "Ticket", align: "start", sortable: false, key: "ticket_no" },
  {
    title: "Customer Name",
    align: "left",
    key: "customer_info",
    sortable: false,
  },
  { title: "Type", align: "left", key: "type", sortable: false },
  { title: "Status", align: "left", key: "status", sortable: false },
  { title: "Priority", align: "left", key: "priority", sortable: false },
  { title: "Created", align: "left", key: "created_date", sortable: false },
  { title: "", key: "actions", sortable: false },
];
const agentItem = ref([]);
const fetchAgent = async () => {
  const { data } = await apiagent.list({
    group: "",
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  agentItem.value = data.data;
};
const teamItem = ref(null);
const groupItem = ref(null);
const selectedAgents = ref([]);
const fetch = async () => {
  loading.value = true;

  const { data } = await apireport.list({
    type: filterType.value,
    tags: filterTags.value,
    status: filterStatus.value,
    priority: filterPriority.value,
    keyword: keywords.value,
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
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

const fetchtype = async () => {
  const { data } = await apitype.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  typeItems.value = data.data;
};

const fetchtags = async () => {
  const { data } = await apitags.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  tagItems.value = data.data;
};

const onClickedSearch = async () => {
  searchClicked.value = true;
  fetch();
};
const onReset = async () => {
  searchClicked.value = false;
  dateEnd.value = null;
  dateStart.value = null;
  filterPriority.value = null;
  filterStatus.value = null;
  filterType.value = null;
  filterTags.value = null;
  fetch();
};

const ticketItems = ref([]);
const dialog = ref(false);
const statusColor = ref(null);
const priorityColor = ref(null);
const duration = ref(null);
const viewTicket = async (data) => {
  selectedAgents.value = [];
  ticketItems.value = data;
  statusColor.value =
    ticketItems.value.status == "Closed"
      ? "#767676"
      : ticketItems.value.status == "Unassigned"
      ? "#00A1F2"
      : ticketItems.value.status == "Resolved"
      ? "#2CD651"
      : ticketItems.value.status == "pending"
      ? "#FF6A6B"
      : "#7E91F0";
  priorityColor.value =
    ticketItems.value.priority == "Urgent"
      ? "#FF6565"
      : ticketItems.value.priority == "High"
      ? "#FA8B3C"
      : ticketItems.value.priority == "Medium"
      ? "#F5D02A"
      : "#2DD051";
  dialog.value = true;
  if (data.ticket_team_group_id != null) {
    data.ticket_team_group_id.forEach((agents) => {
      for (let i = 0; i < agentItem.value.length; i++) {
        if (agentItem.value[i].userprofile.user_id == agents) {
          if (groupItem.value != agentItem.value[i].group.code) {
            groupItem.value = agentItem.value[i].group.code;
          }
          if (teamItem.value != agentItem.value[i].team.code) {
            teamItem.value = agentItem.value[i].team.code;
          }
          selectedAgents.value.push(agentItem.value[i]);
        }
      }
    });
  }
};
const ticketmessage = async () => {
  ticketStore.set_ticket(ticketItems);
};
</script>
<template>
  <h2 class="mb-3">Ticket Monitoring</h2>
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
        :items="['Open', 'Pendings', 'Resolved', 'Closed', 'Unassigned']"
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
    <v-col cols="12" align="end">
      <v-btn @click="onClickedSearch()">Search</v-btn>
      <v-icon @click="onReset()" v-if="searchClicked" style="padding-left: 10px"
        >mdi-close</v-icon
      >
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title align="center">
          <span class="text-h5 pa-2"
            ><b>{{ ticketItems.ticket_no }}({{ ticketItems.title }})</b></span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <b> Customer: </b> <br />
                    {{ ticketItems.userprofile.first_name }}
                    {{ ticketItems.userprofile.middle_name }}
                    {{ ticketItems.userprofile.last_name }}
                    ({{
                      ticketItems.userprofile.department
                        ? ticketItems.userprofile.department.name
                        : ""
                    }})
                  </v-col>
                  <v-col
                    cols="12"
                    v-if="ticketItems.ticket_team_group_id != null"
                  >
                    <b> Agents: </b> <br />
                    <v-chip size="small" v-for="a in selectedAgents" :key="a">
                      {{ a.userprofile.first_name }}
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="12"
                    v-if="ticketItems.ticket_team_group_id != null"
                  >
                    <b> Group: </b> <br />
                    {{ groupItem }}
                  </v-col>
                  <v-col
                    cols="12"
                    v-if="ticketItems.ticket_team_group_id != null"
                  >
                    <b> Team: </b> <br />
                    {{ teamItem }}
                  </v-col>
                  <v-col cols="12" align="center">
                    <v-btn @click="ticketmessage">Go to Thread</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="6">
                    <b>Status: </b>
                    <v-chip :color="statusColor">
                      {{ ticketItems.status }}</v-chip
                    >
                  </v-col>
                  <v-col cols="12" md="6">
                    <b>Priority: </b>
                    <v-chip :color="priorityColor">
                      {{ ticketItems.priority }}</v-chip
                    >
                  </v-col>
                  <v-col cols="12">
                    <b>Ticket Type: </b>
                    {{ ticketItems.tickettype.code }}
                  </v-col>
                  <v-col cols="12" v-if="ticketItems.ticket_tag_id != null">
                    <b>Ticket Tags: </b>
                    {{ ticketItems.tickettags.code }}
                  </v-col>
                  <v-col cols="12" md="6">
                    <b> Ticket Created: </b>
                    <br />
                    {{ ticketItems.created_date }}
                  </v-col>
                  <v-col cols="12" md="6" v-if="ticketItems.status == 'Closed'">
                    <b> Ticket Closed: </b>
                    <br />
                    {{ ticketItems.close_date }}
                  </v-col>
                  <v-col cols="12" md="6" v-if="ticketItems.status == 'Closed'">
                    <b> Duration: </b>
                    <br />
                    <i
                      >{{
                        Math.abs(
                          Math.round(
                            (new Date(ticketItems.created_date) -
                              new Date(ticketItems.close_date)) /
                              1000 /
                              60
                          )
                        )
                      }}
                      minutes</i
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card height="auto" variant="outlined">
                  <v-card-title align="center"> DESCRIPTION </v-card-title>

                  <v-card-text align="center">
                    {{ ticketItems.description }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" v-if="ticketItems.rating != null">
                <v-card height="auto" variant="outlined">
                  <v-card-title align="center"> FEEDBACK </v-card-title>

                  <v-card-text align="center">
                    <v-col cols="12">
                      {{ ticketItems.comments }}
                    </v-col>
                    <v-col cols="12"> </v-col>
                    <b> Ratings: </b><br />
                    <v-rating
                      :length="5"
                      :size="32"
                      active-color="blue"
                      :model-value="1"
                      v-model="ticketItems.rating"
                      disabled
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" v-if="ticketItems.note != null">
                <v-card height="auto" variant="outlined">
                  <v-card-title align="center"> NOTE </v-card-title>

                  <v-card-text align="center">
                    {{ ticketItems.note }}
                  </v-card-text>
                </v-card>
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
        density="compact"
        @update:options="fetch"
      >
        <template v-slot:item.ticket_no="{ item }">
          {{ item.ticket_no }}
          (
          {{ item.title }}
          )
        </template>
        <template v-slot:item.customer_info="{ item }">
          {{ item.userprofile.first_name }}
          {{ item.userprofile.middle_name }}
          {{ item.userprofile.last_name }}
          (
          {{
            item.userprofile.department ? item.userprofile.department.name : ""
          }}
          )
        </template>
        <template v-slot:item.type="{ item }">
          <v-chip size="small" label variant="outlined">
            Ticket Type: {{ item.tickettype.code }}
          </v-chip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip v-if="item.status == 'Open'" color="#7E91F0" size="small">
            Status: {{ item.status }}
          </v-chip>

          <v-chip v-if="item.status == 'pending'" color="#FF6A6B" size="small">
            Status:{{ item.status }}
          </v-chip>
          <v-chip v-if="item.status == 'Resolved'" color="#2CD651" size="small">
            Status:{{ item.status }}
          </v-chip>
          <v-chip
            v-if="item.status == 'Unassigned'"
            color="#00A1F2"
            size="small"
          >
            Status:{{ item.status }}
          </v-chip>
          <v-chip v-if="item.status == 'Closed'" color="#767676" size="small">
            Status:{{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.priority="{ item }">
          <v-chip v-if="item.priority == 'Low'" color="#2DD051" size="small">
            Priority:{{ item.priority }}
          </v-chip>
          <v-chip v-if="item.priority == 'Medium'" color="#F5D02A" size="small">
            Priority:{{ item.priority }}
          </v-chip>
          <v-chip v-if="item.priority == 'High'" color="#FA8B3C" size="small">
            Priority:{{ item.priority }}
          </v-chip>
          <v-chip v-if="item.priority == 'Urgent'" color="#FF6565" size="small">
            Priority:{{ item.priority }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="me-2" @click="viewTicket(item)">
            mdi-monitor
          </v-icon>
        </template>
      </v-data-table-server>
    </v-col>
  </v-row>
</template>

<style scoped></style>
