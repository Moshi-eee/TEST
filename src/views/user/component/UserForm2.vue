<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useDisplay } from "vuetify";
import { create_user } from "@/api/data_v2_Api.js";
import { useUserStore } from "@/stores/userStore.js";

import router from "@/router";

import Resource from "@/api/resource_v2.js";

const apiUser = new Resource("employee/employee");
const userStore = useUserStore();
const sss_mask = ref("##-#######-#");

const userdata = userStore.get_user;
const educ = ref([]);
const family = ref([]);
onMounted(async () => {
  fetch_create_user();

  if (userdata.education.length > 0) {
    educ.value = userdata ? userdata.education : null;
  }
  if (userdata.family.length > 0) {
    family.value = userdata ? userdata.family : null;
  }
});

const snackbar = ref(false);
const text = ref(null);

const authStore = useAuthStore();
const { width } = useDisplay();

const loading = ref(false);

const default_data = ref([]);

const fetch_create_user = async () => {
  const { data } = await create_user();
  default_data.value = data;
  console.log(data);
  selectuser();
};
const selectuser = () => {
  form.value.immediate_supervisor1 = userdata.immediate_supervisor1
    ? default_data.value.user_list.filter(
        (s) => s.user_id === userdata.immediate_supervisor1
      )[0].emp_code
    : null;
  form.value.immediate_supervisor2 = userdata.immediate_supervisor2
    ? default_data.value.user_list.filter(
        (s) => s.user_id === userdata.immediate_supervisor2
      )[0].emp_code
    : null;
  form.value.immediate_supervisor3 = userdata.immediate_supervisor3
    ? default_data.value.user_list.filter(
        (s) => s.user_id === userdata.immediate_supervisor3
      )[0].emp_code
    : null;
};

const rules = ref({
  rfid: [
    (v) => !!v || "Required Field",
    (v) => (v && v.length < 10) || "Characters must be less than 10 characters",
    (v) =>
      (v && v.length >= 8) || "Characters must be greater than 8 characters",
  ],

  biometric: [
    (v) => !!v || "Required Field",
    (v) => (v && v.length < 10) || "Characters must be less than 10 characters",
    (v) =>
      (v && v.length >= 8) || "Characters must be greater than 8 characters",
  ],
  emp_code: [
    (v) => !!v || "Required Field",
    (v) => (v && v.length < 12) || "Characters must be less than 10 characters",
    (v) =>
      (v && v.length <= 10) || "Characters must be greater than 8 characters",
  ],
  emp_type: [(v) => !!v || "Required Field"],
  first_name: [(v) => !!v || "Required Field"],
  last_name: [(v) => !!v || "Required Field"],
  gender: [(v) => !!v || "Required Field"],
  marital_status: [(v) => !!v || "Required Field"],
  birth_date: [(v) => !!v || "Required Field"],
  birth_place: [(v) => !!v || "Required Field"],
  nationality_id: [(v) => !!v || "Required Field"],
  contact_no: [(v) => !!v || "Required Field"],
  type: [(v) => !!v || "Required Field"],
  rank: [(v) => !!v || "Required Field"],
  emp_status: [(v) => !!v || "Required Field"],
  business_unit_id: [(v) => !!v || "Required Field"],
  position_id: [(v) => !!v || "Required Field"],
  department_id: [(v) => !!v || "Required Field"],
  date_hired: [(v) => !!v || "Required Field"],
  date_provisionary: [(v) => !!v || "Required Field"],
  email: [
    (v) => !!v || "Required Field",
    (v) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || "Invalid e-mail.";
    },
  ],
  salutation: [(v) => !!v || "Required Field"],
});

const form = ref({
  porpose: "ForApporval",
  user_id: userdata ? userdata.user_id : null,
  biometric: userdata ? userdata.biometric : null,
  emp_code: userdata ? userdata.emp_code : null,
  emp_type: userdata ? userdata.emp_type : null,
  first_name: userdata ? userdata.first_name : null,
  middle_name: userdata ? userdata.middle_name : null,
  last_name: userdata ? userdata.last_name : null,
  suffix: userdata ? userdata.suffix : null,
  nationality_id: userdata ? userdata.nationality_id : null,
  gender: userdata ? userdata.gender : null,
  marital_status: userdata ? userdata.marital_status : null,
  birth_date: userdata ? userdata.birth_date : null,
  birth_place: userdata ? userdata.birth_place : null,
  street: userdata ? userdata.street : null,
  barangay: userdata ? userdata.barangay : null,
  city_municipality: userdata ? userdata.city_municipality : null,
  province: userdata ? userdata.province : null,
  zip_code: userdata ? userdata.zip_code : null,
  p_street: userdata ? userdata.p_street : null,
  p_barangay: userdata ? userdata.p_barangay : null,
  p_city_municipality: userdata ? userdata.p_city_municipality : null,
  p_province: userdata ? userdata.p_province : null,
  p_zip_code: userdata ? userdata.p_zip_code : null,
  religion_id: userdata ? userdata.religion_id : null,
  contact_no: userdata ? userdata.contact_no : null,
  email: userdata.user ? userdata.user.email : null,
  // avatar_path: userdata ? userdata.avatar_path : null,
  education: [],
  family_data: [],
  sss_no: userdata ? userdata.sss_no : null,
  pagibig_no: userdata ? userdata.pagibig_no : null,
  philh_no: userdata ? userdata.philh_no : null,
  tin_no: userdata ? userdata.tin_no : null,
  rank: userdata ? userdata.rank : null,
  type: userdata ? userdata.type : null,
  emp_status: userdata ? userdata.emp_status : null,
  position_id: userdata ? userdata.position_id : null,
  department_id: userdata ? userdata.department_id : null,
  business_unit_id: userdata ? userdata.business_unit_id : null,
  lodging_id: userdata ? userdata.lodging_id : null,
  date_hired: userdata ? userdata.date_hired : null,
  date_provisionary: userdata ? userdata.date_provisionary : null,
  date_regularization: userdata ? userdata.date_regularization : null,
  date_resignation: userdata ? userdata.date_resignation : null,
  reason_resignation: userdata ? userdata.reason_resignation : null,
  account_number: userdata ? userdata.account_number : null,
  account_date_recv: userdata ? userdata.account_date_recv : null,
  remarks: userdata ? userdata.remarks : null,
  rfid: userdata ? userdata.rfid : null,
  salutation: userdata ? userdata.salutation : null,
  immediate_supervisor1: userdata ? userdata.immediate_supervisor1 : null,
  immediate_supervisor2: userdata ? userdata.immediate_supervisor2 : null,
  immediate_supervisor3: userdata ? userdata.immediate_supervisor3 : null,
  sub_business_unit_id: userdata ? userdata.sub_business_unit_id : null,
  billing_unit_id: userdata ? userdata.billing_unit_id : null,

  comp_relationship: userdata ? userdata.comp_relationship : null,
  comp_name: userdata ? userdata.comp_name : null,
  comp_occupation: userdata ? userdata.comp_occupation : null,
  comp_contact_no: userdata ? userdata.comp_contact_no : null,
  comp_bdate: userdata ? userdata.comp_bdate : null,
  incase_relationship: userdata ? userdata.incase_relationship : null,
  incase_name: userdata ? userdata.incase_name : null,
  incase_occupation: userdata ? userdata.incase_occupation : null,
  incase_contact_no: userdata ? userdata.incase_contact_no : null,
  incase_bdate: userdata ? userdata.incase_bdate : null,
});

const addeduc = async () => {
  educ.value.push({
    name: "",
    course: "",
    level: "",
    date_end: "",
  });
};
const removeeduc = async (index) => {
  educ.value.splice(index, 1);
};
const addfamily = async () => {
  family.value.push({
    name: "",
    relation: "",
    age: "",
    occupation: "",
    contact_no: "",
    birthday: "",
  });
};
const removefamily = async (index) => {
  family.value.splice(index, 1);
};
const back = () => {
  router.push("/account/profile");
};
const convertToBase64 = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    form.value.avatar_path = reader.result;
  };
  reader.onerror = (error) => {
    // console.log("Error: ", error);
  };
};
const myForm = ref();

const savedata = async () => {
  myForm.value?.validate().then(({ valid: isValid }) => {
    console.log(isValid);
    if (isValid) {
      if (userdata.length > 0) {
        save();
      } else {
        updatedata();
      }
    }
  });
};

const save = async () => {
  form.value.education = educ;
  form.value.family_data = family;
  await apiUser
    .store(form.value)
    .then((e) => {
      snackbar.value = true;
      text.value = "Save Successfully";
      setTimeout(() => router.push("/account/profile"), 500);
    })
    .catch((e) => {
      if (e.response.data.message == "Validation Error.") {
        if (e.response.data.data.biometric) {
          console.log(e.response.data.data.biometric);
          snackbar.value = true;
          text.value = e.response.data.data.biometric[0];
          loading.value = false;
        } else if (e.response.data.data.emp_code) {
          console.log(e.response.data.data.emp_code);
          snackbar.value = true;
          text.value = e.response.data.data.emp_code[0];
          loading.value = false;
        } else {
          snackbar.value = true;
          text.value = "Check required fields";
          loading.value = false;
        }
      } else {
        // console.log(e.response.data.message);
        loading.value = false;
      }
    });
};
const updatedata = async () => {
  loading.value = true;
  form.value.education = educ;
  form.value.family_data = family;
  const data = await apiUser
    .update(userStore.get_user.id, form.value)
    .then((e) => {
      console.log(e);
      if (e.data == "Error" || e.data == "error") {
        snackbar.value = true;
        text.value = e.message;
      } else {
        snackbar.value = true;
        text.value = "Update Successfully";
      }
      setTimeout(() => router.push("/account/profile"), 500);
    })
    .catch((e) => {
      // console.log(e);
      if (e.response.data.message == "Validation Error.") {
        if (e.response.data.data.biometric) {
          console.log(e.response.data.data.biometric);
          snackbar.value = true;
          text.value = e.response.data.data.biometric[0];
          loading.value = false;
        } else if (e.response.data.data.emp_code) {
          console.log(e.response.data.data.emp_code);
          snackbar.value = true;
          text.value = e.response.data.data.emp_code[0];
          loading.value = false;
        } else {
          snackbar.value = true;
          text.value = "Check required fields";
          loading.value = false;
        }
      } else {
        // console.log(e.response.data.message);
        loading.value = false;
      }
    });
};
</script>
<template>
  <v-form ref="myForm" validate-on="submit lazy" @submit.prevent="savedata">
    <v-row>
      <v-col cols="12" md="1">
        <v-select
          hide-selected
          label="Salutation *"
          v-model="form.salutation"
          :rules="rules.salutation"
          density="compact"
          variant="underlined"
          :items="['Mr', 'Mrs', 'Ms']"
          :loading="loading"
          :disabled="loading"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          label="First Name *"
          v-model="form.first_name"
          :rules="rules.first_name"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Middle Name "
          v-model="form.middle_name"
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Last Name *"
          v-model="form.last_name"
          :rules="rules.last_name"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1">
        <v-select
          hide-selected
          label="Suffix"
          v-model="form.suffix"
          density="compact"
          variant="underlined"
          :items="['Jr', 'Sr', 'II', 'III', 'PhD', 'Engr', 'MS', 'Dr.']"
          :loading="loading"
          :disabled="loading"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          hide-selected
          label="Religion"
          required
          v-model="form.religion_id"
          density="compact"
          :items="default_data ? default_data.religion : []"
          item-title="code"
          item-value="id"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-autocomplete
          hide-selected
          label="Nationality *"
          v-model="form.nationality_id"
          :rules="rules.nationality_id"
          required
          density="compact"
          :items="default_data ? default_data.nationality : []"
          item-title="code"
          item-value="id"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          hide-selected
          label="Gender *"
          v-model="form.gender"
          :rules="rules.gender"
          required
          density="compact"
          :items="['Male', 'Female']"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          hide-selected
          label="Marital Status *"
          v-model="form.marital_status"
          :rules="rules.marital_status"
          required
          density="compact"
          :items="['Single', 'Married', 'Separated', 'Divorced', 'Widowed']"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Birthday *"
          v-model="form.birth_date"
          :rules="rules.birth_date"
          type="date"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Place of Birth *"
          v-model="form.birth_place"
          :rules="rules.birth_place"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Contact No.*"
          v-model="form.contact_no"
          :rules="rules.contact_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          label="Email*"
          v-model="form.email"
          :rules="rules.email"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
          type="email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-file-input
          label="Picture"
          accept="image/*"
          @change="convertToBase64"
          @blur="convertToBase64"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-divider :thickness="3" class="mb-5"></v-divider>
    <h3 class="mb-4">Present Address</h3>
    <v-row>
      <v-col cols="12" md="2">
        <v-text-field
          label="Province"
          v-model="form.province"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Municipality / City"
          v-model="form.city_municipality"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Barangay"
          v-model="form.barangay"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Street"
          v-model="form.street"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Zipcode"
          v-model="form.zip_code"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider :thickness="3" class="mb-5"></v-divider>
    <h3 class="mb-4">Permanent Address</h3>
    <v-row>
      <v-col cols="12" md="2">
        <v-text-field
          label="Province"
          v-model="form.p_province"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Municipality / City"
          v-model="form.p_city_municipality"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Barangay"
          v-model="form.p_barangay"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Street"
          v-model="form.p_street"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Zipcode"
          v-model="form.p_zip_code"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider :thickness="3" class="mb-5"></v-divider>
    <h3 class="mb-4">Educational Background</h3>
    <!-- {{ educ }} -->
    <v-row v-for="(n, index) in educ" :key="[index]" class="mb-3">
      <v-col cols="12" md="2">
        <v-select
          hide-selected
          label="Attainment "
          required
          v-model="n.level"
          density="compact"
          :items="default_data ? default_data.educational_attainment : []"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Name School "
          v-model="n.name"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Course "
          v-model="n.course"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Graduated Date: "
          v-model="n.date_end"
          type="date"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          variant="outlined"
          :block="width <= 1000 ? true : false"
          density="compact"
          @click="removeeduc(index)"
        >
          - DEL
        </v-btn>
      </v-col>
    </v-row>
    <v-btn
      class="mb-3"
      variant="outlined"
      :block="width <= 1000 ? true : false"
      density="compact"
      @click="addeduc"
    >
      + add
    </v-btn>
    <v-divider :thickness="3" class="mb-5"></v-divider>

    <h3 class="mb-4">Family Data</h3>
    <v-row v-for="(n, index) in family" :key="[index]" class="mb-3">
      <v-col cols="12" md="2">
        <v-select
          hide-selected
          label="Relationship "
          v-model="n.relation"
          required
          density="compact"
          :items="default_data ? default_data.relative_type : []"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Name "
          v-model="n.name"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Occupation "
          v-model="n.occupation"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Contact No "
          v-model="n.contact_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Birth Date "
          v-model="n.birthday"
          type="date"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="1">
        <v-btn
          variant="outlined"
          density="compact"
          :block="width <= 1000 ? true : false"
          @click="removefamily(index)"
        >
          - DEL
        </v-btn>
      </v-col>
    </v-row>
    <v-btn
      class="mb-3"
      variant="outlined"
      :block="width <= 1000 ? true : false"
      density="compact"
      @click="addfamily"
    >
      + add
    </v-btn>

    <h3 class="mb-4">In Case of Emergency</h3>
    <v-row>
      <v-col cols="12" md="2">
        <v-select
          hide-selected
          label="Relationship "
          required
          density="compact"
          :items="default_data ? default_data.relative_type : []"
          v-model="form.incase_relationship"
          item-title="code"
          item-value="code"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          label="Name "
          v-model="form.incase_name"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Occupation "
          v-model="form.incase_occupation"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Contact No "
          v-model="form.incase_contact_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Birth Date "
          v-model="form.incase_bdate"
          type="date"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
    </v-row>

    <h3 class="mb-4">Company Relationship</h3>

    <v-row>
      <v-col cols="12" md="2">
        <v-select
          hide-selected
          label="Relationship "
          required
          density="compact"
          :items="default_data ? default_data.relative_type : []"
          v-model="form.comp_relationship"
          item-title="code"
          item-value="code"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          label="Name "
          v-model="form.comp_name"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Occupation "
          v-model="form.comp_occupation"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Contact No "
          v-model="form.comp_contact_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          label="Birth Date "
          v-model="form.comp_bdate"
          type="date"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider :thickness="3" class="mb-5"></v-divider>

    <h3 class="mb-4">Goverment Information</h3>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="SSS No"
          v-model="form.sss_no"
          :mask="sss_mask"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Pag-ibig No"
          v-model="form.pagibig_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Philhealth No"
          v-model="form.philh_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="Tin No"
          v-model="form.tin_no"
          required
          density="compact"
          variant="underlined"
          :loading="loading"
          :disabled="loading"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider :thickness="3" class="mb-5"></v-divider>
    <v-btn
      color="blue darken-1"
      variant="text"
      :loading="loading"
      :disabled="loading"
      @click="back"
      >Close</v-btn
    >
    <v-btn
      color="blue darken-1"
      variant="text"
      type="submit"
      :loading="loading"
      v-if="userdata.length == 0"
      >Save</v-btn
    >
    <v-btn
      color="blue darken-1"
      variant="text"
      type="submit"
      :loading="loading"
      v-else
      >Update</v-btn
    >
  </v-form>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>
