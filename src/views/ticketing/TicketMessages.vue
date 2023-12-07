<script setup>
import { onMounted, ref } from "vue";
import { useTicketStore } from "@/stores/ticketStore.js";
import router from "@/router";
import Resource from "@/api/resource.js";
import Echo from "laravel-echo";
import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

const ticketStore = useTicketStore();
const apitags = new Resource("ticketing/maintenance/tags");
const apigroups = new Resource("ticketing/maintenance/group");
const apiagent = new Resource("ticketing/maintenance/team-group");
const apireport = new Resource("ticketing/reports");

const apicomment = new Resource("ticketing/comment");

const apifile = new Resource("ticketing/ticketfile");

const agentItem = ref([]);
const isStatusClosed = ref(null);
onMounted(async () => {
  checkStatus();
  if (authStore.check("view-ticket-request-can-edit-update")) {
    fetchtag();
    fetchgroup();
  }
  if (ticketStore.get_group != "") {
    agentItem.value = ticketStore.get_agent;
  }
  isStatusClosed.value = ticketStore.get_ticket.status;
  if (ticketStore.get_ticket.status == "Closed") {
    loading.value = true;
  } else {
    loading.value = false;
  }
  fetchcomment();
  listen();
  fetchfiles();
});

const loading = ref(true);

const tagItem = ref([]);
const comments = ref();
const allcomments = ref([]);

const files = ref([]);
const convertToBase64 = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    files.value = reader.result;
  };
  reader.onerror = (error) => {
    // console.log("Error: ", error);
  };
};

const filetattach = async () => {
  if (files.value) {
    const res = await apifile.store({
      ticket_report_id: ticketStore.get_ticket.id,
      picture_path: files.value,
    });
    files.value = null;
    // console.log(res);
    fetchfiles();
  }
};
const snackBar = ref(false);
const allfiels = ref([]);
const fetchfiles = async () => {
  allfiels.value = [];
  const { data } = await apifile.list({
    keyword: ticketStore.get_ticket.id,
    key: "",
    order: "",
    limit: "",
    page: 1,
  });
  allfiels.value = data.data;
};

const fetchcomment = async () => {
  allcomments.value = [];
  const { data } = await apicomment.list({
    keyword: ticketStore.get_ticket.id,
    key: "created_at",
    order: "desc",
    limit: -1,
    page: 1,
  });
  allcomments.value = data.data;
};

const commentsend = async () => {
  if (comments.value) {
    const res = await apicomment.store({
      ticket_report_id: ticketStore.get_ticket.id,
      comments: comments.value,
    });
    comments.value = null;
  }
};
const listen = async () => {
  window.Echo.channel("ticket." + ticketStore.get_ticket.id).listen(
    "NewChat",
    (comment) => {
      // allcomments.value.push(comment.ticket_comments);
      // console.log(comment);
      fetchcomment();
      // scrollToEnd();
    }
  );
};
const scrollToEnd = () => {
  var chatList = document.getElementById("chatList");
  chatList.scrollTop = chatList.scrollHeight;
};

const fetchtag = async () => {
  const { data } = await apitags.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  tagItem.value = data.data;
};

const groupItem = ref([]);

const fetchgroup = async () => {
  const { data } = await apigroups.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  groupItem.value = data.data;
};
const searchAgent = ref(false);
const fetchAgent = async () => {
  console.log(ticketStore.get_ticket.ticket_group_id);
  if (ticketStore.get_group != ticketStore.get_ticket.ticket_group_id) {
    ticketStore.get_ticket.ticket_team_group_id = [];
    agentItem.value = [];
    if (ticketStore.get_ticket.ticket_group_id != 10) {
      const { data } = await apiagent.list({
        group: ticketStore.get_ticket.ticket_group_id,
        keyword: "",
        key: "",
        order: "",
        limit: 100,
        page: 1,
      });
      agentItem.value = data.data;
    } else {
      const { data } = await apiagent.list({
        keyword: "",
        key: "",
        order: "",
        limit: 100,
        page: 1,
      });
      agentItem.value = data.data;
    }
  }
};
const closeTicket = async () => {
  // console.log(ticketStore.get_ticket.note == null);
  if (
    ticketStore.get_ticket.note == null ||
    ticketStore.get_ticket.note == ""
  ) {
    snackBar.value = true;
  } else {
    ticketStore.get_ticket.status = "Closed";
    snackBar.value = false;
    update();
  }
};
const update = async () => {
  const res = await apireport
    .update(ticketStore.get_ticket.id, ticketStore.get_ticket)
    .then((data) => {
      router.push("/ticket/request");
    })
    .catch((e) => {
      // console.log(e.response.data.message);
    });
};

const statusCheck = async () => {
  if (
    ticketStore.get_ticket.status == "Unassigned" &&
    ticketStore.get_ticket.ticket_team_group_id != null
  ) {
    ticketStore.get_ticket.status = "Open";
  }
};
const openAgent = async () => {
  searchAgent.value = true;
};
const form = ref({
  tempAgentItem: [],
  tempGroupItem: "",
  tempStatus: "",
  tempTags: "",
  tempNotes: "",
});
const editItems = ref(false);
const EditItems = async () => {
  if (editItems.value) {
    editItems.value = false;
    agentItem.value = form.tempAgentItem;
    if (form.tempAgentItem.length == 0) {
      ticketStore.get_ticket.ticket_team_group_id = null;
    }
    ticketStore.get_ticket.ticket_group_id = form.tempGroupItem;
    ticketStore.get_ticket.status = form.tempStatus;
    ticketStore.get_ticket.ticket_tag_id = form.tempTags;
    ticketStore.get_ticket.note = form.tempNotes;
    searchAgent.value = false;
  } else {
    editItems.value = true;
    form.tempAgentItem = agentItem.value;
    form.tempGroupItem = ticketStore.get_ticket.ticket_group_id;

    form.tempStatus = ticketStore.get_ticket.status;
    form.tempTags = ticketStore.get_ticket.ticket_tag_id;
    form.tempNotes = ticketStore.get_ticket.note;
  }
};
const statusColor = ref(null);
const priorityColor = ref(null);
const checkStatus = async () => {
  statusColor.value =
    ticketStore.get_ticket.status == "Closed"
      ? "#767676"
      : ticketStore.get_ticket.status == "Unassigned"
      ? "#00A1F2"
      : ticketStore.get_ticket.status == "Resolved"
      ? "#2CD651"
      : ticketStore.get_ticket.status == "Pending"
      ? "#FF6A6B"
      : "#7E91F0";
  priorityColor.value =
    ticketStore.get_ticket.priority == "Urgent"
      ? "#FF6565"
      : ticketStore.get_ticket.priority == "High"
      ? "#FA8B3C"
      : ticketStore.get_ticket.priority == "Medium"
      ? "#F5D02A"
      : "#2DD051";
};

const rules = ref({
  status: [(v) => !!v || "Required Field"],
  ticket_tag_id: [(v) => !!v || "Required Field"],
  ticket_group_id: [(v) => !!v || "Required Field"],
  ticket_team_group_id: [(v) => !!v || "Required Field"],
});
</script>

<template>
  <h2 class="mb-3">
    ({{ ticketStore.get_ticket.created_at }}) - Ticket #: ({{
      ticketStore.get_ticket.ticket_no
    }})
    <v-icon
      size="small"
      @click="EditItems()"
      v-if="authStore.check('view-ticket-request-can-edit-update')"
    >
      mdi-lead-pencil
    </v-icon>
  </h2>
  <v-row>
    <v-col cols="12" md="3">
      <v-form validate-on="submit lazy" @submit.prevent="update">
        <v-col cols="12" v-if="editItems">
          <v-autocomplete
            :disabled="!authStore.check('view-ticket-request-can-edit-update')"
            required
            hide-details
            density="compact"
            variant="underlined"
            label="Status"
            :items="['Open', 'Pending', 'Resolved']"
            chips
            v-model="ticketStore.get_ticket.status"
            :rules="rules.status"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" v-if="!editItems">
          <b>Status: </b>
          <v-chip :color="statusColor">
            {{ ticketStore.get_ticket.status }}
          </v-chip>
        </v-col>
        <v-col cols="12" v-if="!editItems">
          <b>Priority: </b>
          <v-chip :color="priorityColor"
            >{{ ticketStore.get_ticket.priority }}
          </v-chip>
        </v-col>
        <v-col cols="12" v-if="editItems">
          <v-autocomplete
            :disabled="!authStore.check('view-ticket-request-can-edit-update')"
            required
            hide-details
            density="compact"
            variant="underlined"
            label="Select Tags"
            :items="tagItem"
            item-title="code"
            item-value="id"
            v-model="ticketStore.get_ticket.ticket_tag_id"
            :rules="rules.ticket_tag_id"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" v-if="!editItems && ticketStore.get_ticket.tickettags">
          <b>Ticket Tag: </b>
          <v-chip
            >{{
              ticketStore.get_ticket.tickettags
                ? ticketStore.get_ticket.tickettags.code
                : ""
            }}
          </v-chip>
        </v-col>
        <v-col cols="12" v-if="editItems">
          <v-autocomplete
            :disabled="!authStore.check('view-ticket-request-can-edit-update')"
            required
            hide-details
            density="compact"
            variant="underlined"
            label="Select group"
            :items="groupItem"
            item-title="code"
            item-value="id"
            v-model="ticketStore.get_ticket.ticket_group_id"
            :rules="rules.ticket_group_id"
            @blur="fetchAgent"
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          v-if="!editItems && ticketStore.get_ticket.ticket_group_id != null"
        >
          <b>Group: </b>
          <v-chip>{{ ticketStore.get_ticket.ticketgroup.code }} </v-chip>
        </v-col>
        <v-col cols="12" v-if="editItems && searchAgent">
          <v-autocomplete
            :disabled="!authStore.check('view-ticket-request-can-edit-update')"
            required
            hide-details
            density="compact"
            variant="underlined"
            label="Select Agents"
            :items="agentItem"
            item-title="userprofile.first_name"
            item-value="user_id"
            chips
            v-model="ticketStore.get_ticket.ticket_team_group_id"
            :rules="rules.ticket_team_group_id"
            multiple
            @blur="statusCheck"
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          v-if="
            !editItems && ticketStore.get_ticket.ticket_team_group_id != null
          "
        >
          <b>Agents: </b>
          <v-chip v-for="a in agentItem" :key="a">
            {{ a.userprofile.first_name }}
          </v-chip>
        </v-col>
        <v-col cols="12" v-if="editItems">
          <v-btn
            block
            append-icon="mdi-magnify"
            :disabled="
              ticketStore.get_ticket.ticket_group_id == ticketStore.get_group
            "
            v-if="!searchAgent"
            @click="openAgent"
            >Search Agent</v-btn
          >
        </v-col>
        <v-col cols="12" v-if="editItems">
          <v-textarea
            :disabled="loading"
            class="mb-3"
            required
            hide-details
            density="compact"
            v-model="ticketStore.get_ticket.note"
            label="Agent Notes"
            variant="outlined"
            rows="9"
          ></v-textarea>
        </v-col>
        <v-col cols="12" v-if="!editItems">
          <v-card variant="plain" height="250px" elevation="5">
            <v-card-title align="center"> Agent Notes </v-card-title>
            <v-divider></v-divider>
            <v-card-text align="center">
              {{ ticketStore.get_ticket.note }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" align="center" v-if="editItems">
          <v-col
            cols="12"
            md="12"
            sm="12"
            v-if="
              (authStore.check('view-ticket-request-can-edit-update') &&
                ticketStore.get_ticket.note == null) ||
              ticketStore.get_ticket.note == ''
            "
          >
            <v-btn block type="submit" :disabled="isStatusClosed == 'Closed'"
              >UPDATE</v-btn
            >
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="12"
            v-if="authStore.check('view-ticket-request-can-edit-update')"
          >
            <v-btn
              block
              @click="closeTicket()"
              :disabled="isStatusClosed == 'Closed'"
              v-if="isStatusClosed != 'Unassigned'"
              >Closed Ticket</v-btn
            >
            <v-snackbar v-model="snackBar">
              ADD AGENT ACTION NOTE.
              <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackBar = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-col>
        </v-col>
      </v-form>
    </v-col>

    <v-col cols="12" md="4">
      <v-container>
        <v-card variant="plain" height="350px" elevation="5">
          <v-card-title align="center"> Description </v-card-title>
          <v-divider></v-divider>
          <v-card-text align="center">
            {{ ticketStore.get_ticket.description }}
          </v-card-text>
        </v-card>
      </v-container>
      <v-container>
        <v-card variant="plain" height="300px" elevation="5">
          <v-list height="305px">
            <v-list-subheader>Attached Files</v-list-subheader>
            <v-list-item v-for="(n, index) in allfiels" :key="index">
              <v-btn :href="n.path" target="_blank" block variant="plain">
                File_{{ n.id }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </v-col>
    <v-col cols="12" md="5">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-card
              height="500px"
              width="auto"
              variant="plian"
              id="messages"
              elevation="5"
            >
              <v-list lines="one">
                <v-list-subheader>Chats</v-list-subheader>

                <v-list-item
                  v-for="n in allcomments.slice().reverse()"
                  :key="n"
                >
                  <v-card rounded="0">
                    <v-row>
                      <v-col
                        cols="12"
                        md="2"
                        sm="12"
                        v-if="n.user_id == authStore.user.id"
                      >
                        <!-- <v-list-item-title>
                          {{ n.userprofile.emp_code }} -
                          {{ n.userprofile.first_name }}
                        </v-list-item-title> -->
                      </v-col>
                      <v-col
                        cols="12"
                        md="10"
                        sm="12"
                        v-if="n.user_id == authStore.user.id"
                      >
                        <v-list-item-subtitle>
                          <v-card
                            width="auto"
                            style="background-color: blue; color: white"
                            min-height="50px"
                            max-height="auto"
                            align="center"
                          >
                            <v-card-text>
                              {{ n.comments }}
                            </v-card-text>
                            <v-list-item-subtitle align="right">
                              {{ n.created_at }}
                            </v-list-item-subtitle>
                          </v-card>
                        </v-list-item-subtitle>
                      </v-col>

                      <v-col
                        cols="12"
                        md="10"
                        sm="12"
                        v-if="n.user_id != authStore.user.id"
                      >
                        <v-list-item-subtitle>
                          <v-card
                            width="auto"
                            style="background-color: #474747; color: white"
                            min-height="50px"
                            max-height="auto"
                            align="center"
                          >
                            <v-card-text>
                              {{ n.comments }}
                            </v-card-text>
                            <v-list-item-subtitle align="right">
                              {{ n.created_at }}
                            </v-list-item-subtitle>
                          </v-card>
                        </v-list-item-subtitle>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        sm="12"
                        v-if="n.user_id != authStore.user.id"
                      >
                        <!-- <v-list-item-title>
                          {{ n.userprofile.emp_code }} -
                          {{ n.userprofile.first_name }}
                        </v-list-item-title> -->
                      </v-col>
                    </v-row>
                  </v-card>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
            v-if="authStore.check('view-ticket-request-can-chat')"
          >
            <v-text-field
              auto-grow
              required
              hide-details
              density="compact"
              variant="underlined"
              prepend-inner-icon="mdi-comment"
              v-model="comments"
              width="auto"
              :disabled="ticketStore.get_ticket.status == 'Closed'"
              @keypress.enter="commentsend"
              style="padding-top: 10px"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="8"
            v-if="authStore.check('view-ticket-request-can-attachfile')"
          >
            <v-file-input
              variant="underlined"
              @change="convertToBase64"
              :disabled="ticketStore.get_ticket.status == 'Closed'"
            >
            </v-file-input>
          </v-col>
          <v-col
            cols="12"
            md="4"
            v-if="authStore.check('view-ticket-request-can-attachfile')"
          >
            <v-btn
              block
              @click="filetattach"
              :disabled="isStatusClosed == 'Closed'"
              >Upload</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-row>
</template>

<style scoped>
#messages {
  flex-direction: column-reverse;
  height: 100px;
  overflow-y: scroll;
}
</style>
