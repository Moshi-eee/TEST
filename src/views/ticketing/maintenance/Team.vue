<script setup>
import { ref } from "vue";
import Resource from "@/api/resource.js";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

const apiticketing = new Resource("ticketing/maintenance/team");

const serverItems = ref([]);
const keywords = ref(null);
const actions = ref(null);
const nextpage = ref(1);
const itemid = ref(null);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const dialog = ref(false);

const form = ref({
  id: "",
  code: "",
  name: "",
});
const rules = ref({
  code: [(v) => !!v || "Required Field"],
  name: [(v) => !!v || "Required Field"],
});

const headers = [
  { title: "Code", align: "start", key: "code", sortable: false },
  { title: "Name", align: "left", key: "name", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];
//#region fetching Teams
const fetch = async () => {
  loading.value = true;

  const { data } = await apiticketing.list({
    keyword: keywords.value,
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  serverItems.value = data.data;
  totalItems.value = data.total;
  itemsPerPage.value = data.per_page;
  loading.value = false;
};
//#endregion

//#region CRUD operations
const save = async () => {
  if (actions.value == "edit") {
    const res = await apiticketing.update(itemid.value, form.value);
  } else {
    const res = await apiticketing.store(form.value);
  }
  Close();
};
//#endregion

const Close = () => {
  dialog.value = false;
  actions.value = null;
  form.value = {
    id: "",
    code: "",
    name: "",
  };
};
const editItem = async (e) => {
  actions.value = "edit";
  itemid.value = e.id;
  form.value = {
    code: e.code,
    name: e.name,
  };
  dialog.value = true;
};
</script>
<template>
  <h2 class="mb-3">Team</h2>
  <v-row>
    <v-col cols="12" md="2">
      <v-btn
        @click="dialog = !dialog"
        :disabled="!authStore.check('view-ticket-maintenance-team-can-add')"
        >New Team</v-btn
      >
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="3">
      <v-text-field
        clearable
        label="Search"
        variant="underlined"
        v-model="keywords"
        @update:model-value="fetch"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-form validate-on="submit lazy" @submit.prevent="save">
        <v-card-title>
          <span class="text-h5 pa-2">Team</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Team Name *"
                  required
                  v-model="form.code"
                  :rules="rules.code"
                  density="compact"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Team description *"
                  required
                  v-model="form.name"
                  :rules="rules.name"
                  density="compact"
                  variant="underlined"
                ></v-text-field>
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
            :disabled="
              !authStore.check('view-ticket-maintenance-team-can-add') &&
              !authStore.check('view-ticket-maintenance-team-can-edit')
            "
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
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
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        :disabled="!authStore.check('view-ticket-maintenance-team-can-edit')"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>
  </v-data-table-server>
</template>

<style scoped></style>
