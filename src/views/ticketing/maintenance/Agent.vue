<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

const apiticketing = new Resource("ticketing/maintenance/team-group");
const apiteam = new Resource("ticketing/maintenance/team");
const apigroup = new Resource("ticketing/maintenance/group");
const apiuser = new Resource("data/userlist");
const apiDefault = new Resource("data/create_user");

onMounted(async () => {
  fetch();
  fetchteam();
  fetchgroup();
  fetchdepartment();
});

const serverItems = ref([]);
const keywords = ref(null);
const actions = ref(false);
const nextpage = ref(1);
const itemid = ref(null);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const dialog = ref(false);
const headers = [
  { title: "Team Code", align: "start", key: "team.code", sortable: false },
  { title: "Group Code", align: "left", key: "group.code" },
  {
    title: "Agent Name",
    align: "left",
    key: "name",
    sortable: false,
  },
  {
    title: "Department",
    align: "left",
    key: "userprofile.department.name",
    sortable: false,
  },
  // { title: "Actions", key: "actions", align: "center", sortable: false },
];
const form = ref({
  ticket_team_id: null,
  ticket_group_id: null,
  user_id: null,
});

const Close = async () => {
  actions.value = false;
  dialog.value = false;
  form.value = {
    ticket_team_id: "",
    ticket_group_id: "",
    user_id: "",
  };
  dep.value = "";
};

const save = async () => {
  const res = await apiticketing
    .store(form.value)
    .then((data) => {
      //console.log(data);
      fetch();
      fetchuser();
      Close();
    })
    .catch((e) => {
      //console.log(e.response.data.message);
    });
};

const editItem = async (e) => {
  actions.value = true;
  itemid.value = e.id;
  console.log(e);
  form.value = {
    id: e.id,
    ticket_team_id: e.team.code,
    ticket_group_id: e.group.code,
    user_id: e.userprofile.emp_code,
  };
  dialog.value = true;
};

const update = async () => {
  user.value.filter(searchAgentbyCode);
  const res = await apiticketing.update(itemid.value, form.value);
  console.log(res);
  fetch();
  itemid.value = null;
  actions.value = false;

  Close();
};
const fetch = async () => {
  loading.value = true;

  const { data } = await apiticketing.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  console.log(data);
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};

const team = ref([]);
const fetchteam = async () => {
  const { data } = await apiteam.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });

  const a = data.data;
  for (let i = 0; i < data.data.length; i++) {
    team.value.push(a[i].code);
  }
};

const department = ref([]);
const fetchdepartment = async () => {
  const { data } = await apiDefault.list();
  department.value = data.department;
};

const group = ref([]);
const fetchgroup = async () => {
  const { data } = await apigroup.list({
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });

  const a = data.data;
  for (let i = 0; i < data.data.length; i++) {
    // group.id.push(a[i].id);
    // group.code.push(a[i].code);
    group.value.push(a[i].code);
  }
};
const haveData = ref(true);
const user = ref([]);
const dep = ref(null);
const fetchuser = async () => {
  const { data } = await apiuser.list({
    department: dep.value,
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  user.value = data.data;
  haveData.value = false;
  if (actions) {
    for (let i = 0; i < serverItems.value.length; i++) {
      removeUser(serverItems.value[i].userprofile.user_id);
    }
  }
};
const removeUser = async (user_id) => {
  const newUser = ref([]);
  for (let i = 0; i < user.value.length; i++) {
    {
      if (user.value[i].user_id != user_id) {
        newUser.value.push(user.value[i]);
      }
    }
  }
  user.value = newUser.value;
};
const onClickAgent = async () => {
  fetchuser();
};

const rules = ref({
  ticket_team_id: [(v) => !!v || "Required Field"],
  ticket_group_id: [(v) => !!v || "Required Field"],
  dep: [(v) => !!v || "Required Field"],
  user_id: [(v) => !!v || "Required Field"],
});
</script>

<template>
  <h2 class="mb-3">Agent</h2>

  <v-row>
    <v-col cols="12" md="9">
      <v-btn
        @click="dialog = !dialog"
        :disabled="
          !authStore.check('view-ticket-maintenance-agent_team-can-add')
        "
        >New Agent</v-btn
      >
    </v-col>
    <v-col cols="12" md="3">
      <v-text-field
        clearable
        label="Search"
        variant="underlined"
        v-model="keywords"
        @blur="fetch"
        @keypress.enter="fetch"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-form validate-on="submit lazy" @submit.prevent="save">
          <v-card-title>
            <span class="text-h5 pa-2">Agent Team</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    label="Select Team*"
                    v-model="form.ticket_team_id"
                    :rules="rules.ticket_team_id"
                    :items="team"
                    variant="underlined"
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    label="Select Group*"
                    v-model="form.ticket_group_id"
                    :rules="rules.ticket_group_id"
                    :items="group"
                    clearable
                    variant="underlined"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    label="Select Department*"
                    v-model="dep"
                    :rules="rules.dep"
                    :items="department"
                    clearable
                    variant="underlined"
                    @blur="onClickAgent"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :disabled="haveData"
                    label="Select Agent*"
                    v-model="form.user_id"
                    :rules="rules.user_id"
                    :items="user"
                    item-title="first_name"
                    item-value="user_id"
                    clearable
                    persistent-hint
                    variant="underlined"
                  ></v-autocomplete>
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
              v-if="!actions"
              :disabled="
                !authStore.check('view-ticket-maintenance-agent_team-can-add')
              "
              type="submit"
            >
              Save
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              v-if="actions"
              :disabled="
                !authStore.check('view-ticket-maintenance-agent_team-can-edit')
              "
              @click="update"
            >
              update
            </v-btn>
          </v-card-actions>
        </v-form>
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
    <template v-slot:item.name="{ item }">
      {{ item.userprofile.first_name }} {{ item.userprofile.middle_name }}
      {{ item.userprofile.last_name }}
      <!-- <v-icon
        size="small"
        :disabled="
          !authStore.check('view-ticket-maintenance-agent_team-can-edit')
        "
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->
    </template>
  </v-data-table-server>
</template>

<style scoped></style>
