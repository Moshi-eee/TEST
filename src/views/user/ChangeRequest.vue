<script setup>
import { onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore.js";
const authStore = useAuthStore();

import Resource from "@/api/resource_v2.js";

const apiUser = new Resource("employee/change-request");

onMounted(async () => {
  fetch();
});
const snackbar = ref(false);
const text = ref(null);
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
    title: "Employee ID",
    align: "start",
    sortable: true,
    key: "userprofile.emp_code",
  },
  { title: "Status", align: "left", key: "status" },
  { title: "Date Request", align: "left", key: "created_at" },
  { title: "Date Update", align: "left", key: "updated_at" },
  { title: "Actions", key: "actions", sortable: false },
];

const form = ref({
  code: "",
  name: "",
  status: "",
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
const user = ref([]);
const user_amend = ref([]);
const editItem = async (e) => {
  itemid.value = e.user_id;
  const { data } = await apiUser.get(e.user_id);
  user.value = data["current"];
  user_amend.value = data["amenmend"] ? data["amenmend"]["info_data"] : [];

  dialog.value = true;
};

const update = async () => {
  loading.value = true;

  const res = await apiUser
    .update(itemid.value, user_amend.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Update Successfully";
      itemid.value = null;
      actions.value = null;
      dialog.value = false;
      form.value = {
        code: "",
        name: "",
        status: "",
      };
      fetch();
    })
    .catch((e) => {
      snackbar.value = true;
      text.value = "Check Required fields";
      loading.value = false;
    });
};

const fetch = async () => {
  loading.value = true;
  const { data } = await apiUser.list({
    keyword: keywords.value,
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
</script>

<template>
  <h2 class="mb-3">Change Request</h2>
  <v-row justify="start">
    <v-col cols="4"></v-col>
    <v-col cols="8">
      <v-text-field
        clearable
        label="Search"
        required
        density="compact"
        variant="underlined"
        :loading="loading"
        :disabled="loading"
        v-model="keywords"
        @blur="fetch"
        @keypress.enter="fetch"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-dialog v-model="dialog" persistent width="1200">
      <v-card>
        <v-card-title>
          <span class="text-h5 pa-2">For Approval</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2">
              <v-card>
                <div
                  class="v-card--material pa-3 v-card-profile v-card v-sheet theme--light"
                >
                  <div class="d-flex grow flex-wrap mb-3">
                    <div>
                      <v-img
                        :src="user.avatar_path"
                        :width="200"
                        :height="200"
                        cover
                      />
                      <div
                        class="v-responsive__content"
                        style="width: 400px"
                      ></div>
                    </div>
                  </div>
                  <div class="v-card__text text-center">
                    <h6 class="display-1 mb-1 grey--text">
                      {{ user.position_id ? user.position.name : null }}
                    </h6>
                    <h4 class="display-2 font-weight-light mb-3 black--text">
                      {{ user.last_name }}, {{ user.first_name }}
                      {{ user.middle_name }} {{ user.suffix }}<br />
                      <h5 class="display-2 font-weight-light mb-3 black--text">
                        {{ user.emp_code }}
                      </h5>
                    </h4>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="10">
              <v-card>
                <v-card min-height="50px">
                  <v-row>
                    <v-col cols="12" md="7" class="mt-2">
                      <h2>
                        <v-icon start icon="mdi-account-outline"></v-icon>
                        Profile Details
                      </h2>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row>
                  <v-col cols="12" md="6" class="custom-margin-first">
                    <h4 class="user">
                      Salutation: {{ user.salutation }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.salutation != user.salutation"
                      >
                        {{ user_amend.salutation }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      First Name: {{ user.first_name }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.first_name != user.first_name"
                      >
                        {{ user_amend.first_name }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Middle Name: {{ user.middle_name }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.middle_name != user.middle_name"
                      >
                        {{ user_amend.middle_name }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Last Name: {{ user.last_name }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.last_name != user.last_name"
                      >
                        {{ user_amend.last_name }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Suffix: {{ user.suffix }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.suffix != user.suffix"
                      >
                        {{ user_amend.suffix }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Nationality:
                      {{ user.nationality_id ? user.nationality.code : null }}

                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.nationality_id != user.nationality_id"
                      >
                        {{
                          user_amend.nationality_id
                            ? user_amend.nationality.code
                            : null
                        }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Gender: {{ user.gender }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.gender != user.gender"
                      >
                        {{ user_amend.gender }}
                      </v-chip>
                    </h4>
                  </v-col>
                  <v-col cols="12" md="3" class="custom-margin-first">
                    <h4 class="user">
                      Marital Status: {{ user.marital_status }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.marital_status != user.marital_status"
                      >
                        {{ user_amend.marital_status }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Birthday: {{ user.birth_date }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.birth_date != user.birth_date"
                      >
                        {{ user_amend.birth_date }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Place of Birth: {{ user.birth_place }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.birth_place != user.birth_place"
                      >
                        {{ user_amend.birth_place }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Religion:
                      {{ user.religion_id ? user.religion.name : null }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.religion_id != user.religion_id"
                      >
                        {{
                          user_amend.religion_id
                            ? user_amend.religion.code
                            : null
                        }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Contact Number: {{ user.contact_no }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.contact_no != user.contact_no"
                      >
                        {{ user_amend.contact_no }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Email: {{ user.user ? user.user.email : null }}
                    </h4>
                  </v-col>
                  <v-divider :thickness="4" class="mb-1"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" class="custom-margin-first">
                    <v-chip class="mb-7"> Present Address </v-chip>
                    <h4 class="user">
                      Province: {{ user.province }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.province != user.province"
                      >
                        {{ user_amend.province }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Municipality/City: {{ user.city_municipality }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="
                          user_amend.city_municipality != user.city_municipality
                        "
                      >
                        {{ user_amend.city_municipality }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Barangay: {{ user.barangay }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.barangay != user.barangay"
                      >
                        {{ user_amend.barangay }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Street: {{ user.street }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.street != user.street"
                      >
                        {{ user_amend.street }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Zipcode: {{ user.zip_code }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.zip_code != user.zip_code"
                      >
                        {{ user_amend.zip_code }}
                      </v-chip>
                    </h4>
                  </v-col>
                  <v-col cols="12" md="3" class="custom-margin-first">
                    <v-chip class="mb-7"> Permanent Address </v-chip>
                    <h4 class="user">
                      Province: {{ user.p_province }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.p_province != user.p_province"
                      >
                        {{ user_amend.p_province }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Municipality/City: {{ user.p_city_municipality }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="
                          user_amend.p_city_municipality !=
                          user.p_city_municipality
                        "
                      >
                        {{ user_amend.p_city_municipality }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Barangay: {{ user.p_barangay }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.p_barangay != user.p_barangay"
                      >
                        {{ user_amend.p_barangay }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Street: {{ user.p_street }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.p_street != user.p_street"
                      >
                        {{ user_amend.p_street }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Zipcode: {{ user.p_zip_code }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.p_zip_code != user.p_zip_code"
                      >
                        {{ user_amend.p_zip_code }}
                      </v-chip>
                    </h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-divider :thickness="4" class="mb-1"></v-divider>
                  <v-chip class="custom-margin-head">
                    Educational Background
                  </v-chip>
                </v-row>
                <v-row v-for="(n, index) in user.education" :key="index">
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Attainment</h4>
                    {{ n.level }}
                  </v-col>
                  <v-col cols="12" md="4" class="custom-margin-first">
                    <h4 class="user">School Name</h4>
                    {{ n.name }}
                  </v-col>
                  <v-col cols="12" md="3" class="custom-margin-first">
                    <h4 class="user">Course</h4>
                    {{ n.course }}
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Graduated Date</h4>
                    {{ n.date_end }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-divider :thickness="4" class="mb-1"></v-divider>
                  <v-chip class="custom-margin-head"> Family Data </v-chip>
                </v-row>
                <v-row v-for="(n, index) in user.family" :key="index">
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Relationship</h4>
                    {{ n.relation }}
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Name</h4>
                    {{ n.name }}
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Occupation</h4>
                    {{ n.occupation }}
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Contact Number</h4>
                    {{ n.contact_no }}
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Birth Date</h4>
                    {{ n.birthday }}
                  </v-col>
                </v-row>

                <v-row>
                  <v-divider :thickness="4" class="mb-1"></v-divider>
                  <v-chip class="custom-margin-head">
                    In Case of Emergency</v-chip
                  >
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Relationship</h4>
                    {{ user.incase_relationship }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="
                        user_amend.incase_relationship !=
                        user.incase_relationship
                      "
                    >
                      {{ user_amend.incase_relationship }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Name</h4>
                    {{ user.incase_name }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="user_amend.incase_name != user.incase_name"
                    >
                      {{ user_amend.incase_name }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Occupation</h4>
                    {{ user.incase_occupation }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="
                        user_amend.incase_occupation != user.incase_occupation
                      "
                    >
                      {{ user_amend.incase_occupation }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Contact Number</h4>
                    {{ user.incase_contact_no }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="
                        user_amend.incase_contact_no != user.incase_contact_no
                      "
                    >
                      {{ user_amend.incase_contact_no }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Birth Date</h4>
                    {{ user.incase_bdate }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="user_amend.incase_bdate != user.incase_bdate"
                    >
                      {{ user_amend.incase_bdate }}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-divider :thickness="4" class="mb-1"></v-divider>
                  <v-chip class="custom-margin-head">
                    Company Relationship</v-chip
                  >
                </v-row>
                <v-row>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Relationship</h4>
                    {{ user.comp_relationship }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="
                        user_amend.comp_relationship != user.comp_relationship
                      "
                    >
                      {{ user_amend.comp_relationship }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Name</h4>
                    {{ user.comp_name }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="user_amend.comp_name != user.comp_name"
                    >
                      {{ user_amend.comp_name }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Occupation</h4>
                    {{ user.comp_occupation }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="user_amend.comp_occupation != user.comp_occupation"
                    >
                      {{ user_amend.comp_occupation }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Contact Number</h4>
                    {{ user.comp_contact_no }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="user_amend.comp_contact_no != user.comp_contact_no"
                    >
                      {{ user_amend.comp_contact_no }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12" md="2" class="custom-margin-first">
                    <h4 class="user">Birth Date</h4>
                    {{ user.comp_bdate }}
                    <v-chip
                      color="red"
                      size="small"
                      v-if="user_amend.comp_bdate != user.comp_bdate"
                    >
                      {{ user_amend.comp_bdate }}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-divider :thickness="4" class="mb-1"></v-divider>
                <v-row>
                  <v-col cols="12" md="6" class="custom-margin-first">
                    <v-chip class="mb-3"> Government Information </v-chip>
                    <h4 class="user">
                      SSS Number: {{ user.sss_no }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.sss_no != user.sss_no"
                      >
                        {{ user_amend.sss_no }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Pagibig Number: {{ user.pagibig_no }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.pagibig_no != user.pagibig_no"
                      >
                        {{ user_amend.pagibig_no }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Philhealth Number: {{ user.philh_no }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.philh_no != user.philh_no"
                      >
                        {{ user_amend.philh_no }}
                      </v-chip>
                    </h4>
                    <h4 class="user">
                      Tin Number: {{ user.tin_no }}
                      <v-chip
                        color="red"
                        size="small"
                        v-if="user_amend.tin_no != user.tin_no"
                      >
                        {{ user_amend.tin_no }}
                      </v-chip>
                    </h4>
                  </v-col>
                  <v-col cols="12" md="3" class="custom-margin-first">
                    <v-chip class="mb-3"> Bank Information </v-chip>
                    <h4 class="user">
                      Account Number: {{ user.account_number }}
                    </h4>
                    <h4 class="user">
                      Date Receive: {{ user.account_date_recv }}
                    </h4>
                    <h4 class="user">Remarks: {{ user.remarks }}</h4>
                  </v-col>
                </v-row>
                <v-divider :thickness="4" class="mb-1"></v-divider>
                <v-row>
                  <v-col cols="12" md="6" class="custom-margin-first">
                    <v-chip class="mb-3"> Employment Information </v-chip>
                    <h4 class="user">RFID: {{ user.rfid }}</h4>
                    <h4 class="user">Biometric: {{ user.biometric }}</h4>
                    <h4 class="user">Employee ID: {{ user.emp_code }}</h4>
                    <h4 class="user">Employee Category: {{ user.emp_type }}</h4>

                    <h4 class="user">
                      Employment Status: {{ user.emp_status }}
                    </h4>
                    <h4 class="user">Employee Status: {{ user.type }}</h4>
                    <h4 class="user">Rank: {{ user.rank }}</h4>
                    <h4 class="user">Joined Date: {{ user.date_hired }}</h4>
                    <h4 class="user">
                      Provisionary Date: {{ user.date_provisionary }}
                    </h4>
                    <h4 class="user">
                      Regularization Date: {{ user.date_regularization }}
                    </h4>
                    <h4 class="user">
                      Resignation Date: {{ user.date_resignation }}
                    </h4>
                    <h4 class="user">
                      Reason of Resignation: {{ user.reason_resignation }}
                    </h4>
                  </v-col>
                  <v-col cols="12" md="3" class="custom-margin-first">
                    <v-chip class="mb-3"> Department Information </v-chip>
                    <h4 class="user">
                      Position:
                      {{ user.position_id ? user.position.name : null }}
                    </h4>
                    <h4 class="user">
                      Department:
                      {{ user.department_id ? user.department.name : null }}
                    </h4>
                    <h4 class="user">
                      Business Unit:
                      {{
                        user.business_unit_id ? user.business_unit.name : null
                      }}
                    </h4>
                    <h4 class="user">
                      Sub Business Unit:
                      {{
                        user.sub_business_unit_id
                          ? user.sub_business_unit.code
                          : null
                      }}
                    </h4>
                    <h4 class="user">
                      Lodging:
                      {{ user.lodging_id ? user.lodging.code : null }}
                    </h4>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="Close">
            Close
          </v-btn>

          <v-btn color="blue-darken-1" variant="text" @click="update">
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
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        v-if="item.status == 'Pending'"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table-server>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
