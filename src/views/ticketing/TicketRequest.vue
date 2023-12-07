<script setup>
import { onMounted, ref } from "vue";
import { useTicketStore } from "@/stores/ticketStore.js";
import Resource from "@/api/resource.js";
import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

const apiticketing = new Resource("ticketing/reports");
const apitype = new Resource("data/tickettype");
const apiagent = new Resource("ticketing/maintenance/team-group");
const ticketStore = useTicketStore();

const nextpage = ref(1);
const tab = ref(3);
const loading = ref(true);
const newRequest = ref(false);
const addcomment = ref(false);

onMounted(async () => {
  listen();
  fetchtype();
  fetch();
  fetchAgent();
});
const snackbar = ref(false);
const text = ref("");

const OpentotalItems = ref(0);
const PendingtotalItems = ref(0);
const ResolvedtotalItems = ref(0);
const UnassignedtotalItems = ref(0);
const ClosedtotalItems = ref(0);
const OpenItems = ref([]);
const PendingItems = ref([]);
const ResolvedItems = ref([]);
const UnassignedItems = ref([]);
const ClosedItems = ref([]);

const serverItems = ref([]);

const clearVariable = () => {
  OpenItems.value = [];
  PendingItems.value = [];
  ResolvedItems.value = [];
  UnassignedItems.value = [];
  ClosedItems.value = [];
  OpentotalItems.value = 0;
  PendingtotalItems.value = 0;
  ResolvedtotalItems.value = 0;
  UnassignedtotalItems.value = 0;
  ClosedtotalItems.value = 0;
};

const fetch = async () => {
  clearVariable();
  loading.value = true;
  const { data } = await apiticketing.list({
    priority: filterPriority.value,
    dateStart: dateStart.value,
    limit: 10000000,
    page: nextpage.value,
  });
  data.data.filter(getTicket);
  function getTicket(ticket) {
    switch (ticket.status) {
      case "Open":
        OpentotalItems.value += 1;
        OpenItems.value.push(ticket);
        break;
      case "Pending":
        PendingtotalItems.value += 1;
        PendingItems.value.push(ticket);
        break;
      case "Resolved":
        ResolvedtotalItems.value += 1;
        ResolvedItems.value.push(ticket);
        break;
      case "Unassigned":
        UnassignedtotalItems.value += 1;
        UnassignedItems.value.push(ticket);
        break;
      case "Closed":
        ClosedtotalItems.value += 1;
        ClosedItems.value.push(ticket);
        break;
    }
  }
  Opentable();
  loading.value = false;
};

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

const headers = [
  {
    title: "Info",
    sortable: false,
    key: "title",
  },
  {
    title: "User Details",
    sortable: false,
    key: "user_details",
  },

  {
    title: "Ticket No",
    sortable: false,
    key: "ticket_no",
  },
  {
    title: "Agents",
    sortable: false,
    key: "ticket_team_group_id",
    align: "center",
  },
  { title: "Type", align: "left", key: "type", sortable: false },
  { title: "Status", align: "left", key: "status", sortable: false },
  { title: "Priority", align: "left", key: "priority", sortable: false },
  {
    title: "Date Created",
    sortable: false,
    key: "created_date",
  },
  {
    sortable: false,
    key: "rating",
    align: "center",
  },
  { key: "actions", sortable: false },
];

const type = ref([]);
const fetchtype = async () => {
  const { data } = await apitype.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  const a = data.data;
  type.value = a;
};

const form = ref({
  title: "",
  description: "",
  ticket_type_id: "",
});

const save = async () => {
  const res = await apiticketing
    .store(form.value)
    .then((data) => {
      if (data.data != 0) {
        newRequest.value = false;
        clearVariable();
      }
      text.value = data.message;
      snackbar.value = true;
    })

    .catch((e) => {
      console.log(e.response.data.message);
    });
};
const feedback = ref(null);
const update = async () => {
  editData.value.comments = feedback.value;
  addcomment.value = false;
  const res = await apiticketing
    .update(editData.value.id, editData.value)
    .then((err) => {
      addcomment.value = false;
      editData.value = [];
      feedback.value = null;
    });
};
const groupItem = ref(null);
const selectedAgents = ref([]);
const ticketmessage = async (res) => {
  if (res.ticket_team_group_id != null) {
    res.ticket_team_group_id.forEach((agents) => {
      for (let i = 0; i < agentItem.value.length; i++) {
        if (agentItem.value[i].userprofile.user_id == agents) {
          if (groupItem.value != agentItem.value[i].group.code) {
            groupItem.value = agentItem.value[i].group.code;
          }
          selectedAgents.value.push(agentItem.value[i]);
        }
      }
    });
  }
  ticketStore.set_group(groupItem.value);
  ticketStore.set_agent(selectedAgents.value);
  ticketStore.set_ticket(res);
};
const filterPriority = ref(null);
const dateStart = ref(null);
const editData = ref([]);

const update_rating = async (res, isComment = false) => {
  editData.value = res;
  console.log(editData.value);
  if (isComment) {
    addcomment.value = true;
  } else {
    if (editData.value.status == "Closed") {
      console.log(editData.value.comments == null);
      if (editData.value.comments == null) {
        addcomment.value = true;
      }
    }
  }
};
const listen = async () => {
  window.Echo.channel("ticket-list").listen("TicketRefresh", (comment) => {
    fetch();
  });
};

const rules = ref({
  title: [(v) => !!v || "Required Field"],
  ticket_type_id: [(v) => !!v || "Required Field"],
  description: [(v) => !!v || "Required Field"],
});

const Opentable = () => {
  serverItems.value = [];
  switch (tab.value) {
    case 0:
      serverItems.value = OpenItems.value;
      break;
    case 1:
      serverItems.value = PendingItems.value;
      break;
    case 2:
      serverItems.value = ResolvedItems.value;

      break;
    case 3:
      serverItems.value = UnassignedItems.value;
      break;
    case 4:
      serverItems.value = ClosedItems.value;
      break;
  }
};
</script>
<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" location="top">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-row class="mb-3">
    <v-col cols="12" md="7" sm="12">
      <h2 class="mb-3">Ticket Request</h2>
      <v-btn @click="newRequest = !newRequest" prepend-icon="mdi-pencil"
        >New Request</v-btn
      >
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="3" sm="12">
      <v-text-field
        clearable
        type="date"
        label="Date"
        density="compact"
        variant="underlined"
        v-model="dateStart"
        style="padding-top: 7px"
      ></v-text-field>
    </v-col>
    <!-- <v-col cols="12" md="2" sm="12">
      <v-select
        clearable
        label="Select"
        :items="['Low', 'Medium', 'High', 'Urgent']"
        v-model="filterPriority"
        variant="underlined"
      ></v-select>
    </v-col> -->
  </v-row>
  <v-row>
    <v-dialog v-model="addcomment" width="600">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">Feedback</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" v-if="editData.comments != null">
                <v-textarea
                  label="Feedback"
                  required
                  v-model="editData.comments"
                  density="compact"
                  variant="underlined"
                ></v-textarea>
              </v-col>
              <v-col cols="12" v-if="editData.comments == null">
                <v-textarea
                  label="Feedback"
                  required
                  v-model="feedback"
                  density="compact"
                  variant="underlined"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="update"
            v-if="editData.comments == null"
          >
            Submit
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="addcomment = !addcomment"
            v-if="editData.comments != null"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row>
    <v-dialog v-model="newRequest" width="600">
      <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="save">
          <v-card-title>
            <span class="text-h5 pa-2">New Request</span>
            <small>*indicates required field</small>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Subject *"
                    required
                    v-model="form.title"
                    :rules="rules.title"
                    clearable
                    hide-details
                    density="compact"
                    variant="underlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    label="Select Type*"
                    v-model="form.ticket_type_id"
                    :rules="rules.ticket_type_id"
                    :items="type"
                    item-title="code"
                    item-value="code"
                    hide-details
                    clearable
                    required
                    density="compact"
                    variant="underlined"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description *"
                    required
                    v-model="form.description"
                    :rules="rules.description"
                    clearable
                    density="compact"
                    variant="underlined"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="newRequest = !newRequest"
            >
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" type="submit">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
  <v-tabs v-model="tab" align-tabs="left" show-arrows>
    <v-tab :value="Open" @click="Opentable">Open ({{ OpentotalItems }})</v-tab>
    <v-tab :value="Pending" @click="Opentable"
      >Pending ({{ PendingtotalItems }})</v-tab
    >
    <v-tab :value="Resolved" @click="Opentable"
      >Resolved ({{ ResolvedtotalItems }})</v-tab
    >
    <v-tab :value="Unassigned" @click="Opentable"
      >Unassigned ({{ UnassignedtotalItems }})</v-tab
    >
    <v-tab :value="Closed" @click="Opentable"
      >Closed ({{ ClosedtotalItems }})</v-tab
    >
  </v-tabs>

  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :items-per-page="10"
          :headers="headers"
          :items-length="totalSelectedItems"
          :items="serverItems"
          :loading="loading"
          class="elevation-1"
          item-value="name"
          width="auto"
          density="compact"
        >
          <template v-slot:item.title="{ item }">
            <p @click="ticketmessage(item)">
              {{ item.title }}
            </p>
          </template>
          <template v-slot:item.ticket_no="{ item }">
            <p @click="ticketmessage(item)">
              {{ item.ticket_no }}
            </p>
          </template>
          <template v-slot:item.created_date="{ item }">
            <p @click="ticketmessage(item)">
              {{ item.created_date }}
            </p>
          </template>
          <template v-slot:item.user_details="{ item }">
            <p @click="ticketmessage(item)">
              {{ item.userprofile.first_name }}
              {{ item.userprofile.middle_name }}
              {{ item.userprofile.last_name }}
              (
              {{
                item.userprofile.department
                  ? item.userprofile.department.name
                  : ""
              }}
              )
            </p>
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

            <v-chip
              v-if="item.status == 'pending'"
              color="#FF6A6B"
              size="small"
            >
              Status:{{ item.status }}
            </v-chip>
            <v-chip
              v-if="item.status == 'Resolved'"
              color="#2CD651"
              size="small"
            >
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
            <v-chip
              v-if="item.priority == 'Medium'"
              color="#F5D02A"
              size="small"
            >
              Priority:{{ item.priority }}
            </v-chip>
            <v-chip v-if="item.priority == 'High'" color="#FA8B3C" size="small">
              Priority:{{ item.priority }}
            </v-chip>
            <v-chip
              v-if="item.priority == 'Urgent'"
              color="#FF6565"
              size="small"
            >
              Priority:{{ item.priority }}
            </v-chip>
          </template>
          <template v-slot:item.ticket_team_group_id="{ item }">
            <template v-for="n in agentItem" :key="n">
              <template v-for="a in item.ticket_team_group_id" :key="a">
                <p @click="ticketmessage(item)">
                  <v-chip size="small" v-if="a == n.user_id">
                    {{ n.userprofile.first_name }}
                  </v-chip>
                </p>
              </template>
            </template>
          </template>
          <template v-slot:item.rating="{ item }">
            <v-rating
              :length="5"
              :size="32"
              active-color="blue"
              v-model="item.rating"
              @click="update_rating(item)"
              v-if="
                authStore.check('view-ticket-report-rating') &&
                item.status == 'Closed'
              "
              :disabled="item.status != 'Closed' || item.rating != null"
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip location="top" text="Action">
              <template v-slot:activator="{ props }">
                <v-icon
                  size="small"
                  v-if="item.status != 'Closed'"
                  @click="ticketmessage(item)"
                  v-bind="props"
                >
                  mdi-arrow-right-bold</v-icon
                >
              </template>
            </v-tooltip>
            <v-tooltip location="top" text="Feedback">
              <template v-slot:activator="{ props }">
                <v-icon
                  size="small"
                  v-if="item.status == 'Closed'"
                  @click="update_rating(item, true)"
                  v-bind="props"
                >
                  mdi-comment-outline</v-icon
                >
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
