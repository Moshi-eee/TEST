<script setup>
import { ref, onMounted, watch } from "vue";
import getItem from "./transfer/getItem.vue";
import userItemTable from "./transfer/userItemTable.vue";
import Resource from "@/api/resource.js";
import router from "@/router";

onMounted(() => {
  fetch_transaction();
  getDate();
});
const user_asset_data = ref([]);
const user_asset_data_temp = ref([]);
const asset_request_api = new Resource("asset/requestAsset");
const asset_userAsset_api = new Resource("asset/userAsset");
const asset_userList_api = new Resource("data/userlist");

//#region --->declarations --->
const reqType = ref([
  {
    name: "Request Asset",
    value: "Transfer Out",
  },
  {
    name: "Return Asset",
    value: "Return Asset",
  },
]);
const form = ref({
  user_id: null,
  title: null,
  description: null,
  qty: 0,
  type: null,
  status: "Incomplete",
  asset_items_id: [],
});
const rules = ref({
  department: [(v) => !!v || "Required Field"],
  emp_code: [(v) => !!v || "Required Field"],
  emp_name: [(v) => !!v || "Required Field"],
  title: [(v) => !!v || "Required Field"],
  description: [(v) => !!v || "Required Field"],
  qty: [(v) => !!v || "Required Field"],
  type: [(v) => !!v || "Required Field"],
  status_asset: [(v) => !!v || "Required Field"],
  asset_items_id: [(v) => !!v || "Required Field"],
});
const dateStr = ref(null);
const department = ref(null);
const item_data = ref([]);
const user_data = ref([]);
const user_name = ref(null);

const snackbar = ref(false);
const text = ref("");
const timeout = ref(1000);

//#endregion --->endregion --->endregion --->endregion --->endregion

const fetch_transaction = async () => {
  const { data } = await asset_userAsset_api.list({
    user_id: "",
  });
  data.data.filter(getItemOnHand);

  function getItemOnHand(data) {
    if (
      data.transaction.request.type == "Transfer Out" &&
      data.transaction.status_asset == "Received"
    ) {
      user_asset_data_temp.value.push(data);
    }
  }
  user_data.value = [];
};

const Clear = () => {
  user_data.value = [];
  form.value = {
    user_id: null,
    title: null,
    description: null,
    qty: 0,
    type: null,
    status: "Incomplete",
    asset_items_id: [],
  };
};
const fetch_userList = async () => {
  Clear();
  const { data } = await asset_userList_api.list({
    department: department.value,
    limit: 1000000,
  });
  user_data.value = data.data;
};

//#region CRUD operations
const save_request = async (e) => {
  e.preventDefault();

  const res = await asset_request_api
    .store(form.value)
    .then((data) => {
      console.log(data);
      text.value = "Request saved.";
      snackbar.value = data.data;
      Clear();
    })
    .catch((err) => {
      text.value = "Please check all fields.";
      snackbar.value = true;
      console.log(err);
    });
};
//#endregion
const additem = async () => {
  form.value.asset_items_id.push({
    id: null,
    asset_items_id: null,
    asset_requests_id: null,
    type: form.value.type,
    qty: 0,
    serial: null,
    internal_serial: null,
    status_asset: "Not Received",
  });
};
const removeitem = async (index) => {
  form.value.asset_items_id.splice(index, 1);
};
const items = (item) => {
  item_data.value = item.data;
};
const ReturnItem = (item) => {
  form.value.asset_items_id = item;
  // console.log(form.value.asset_items_id);
};

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  dateStr.value = `${month}/${day}/${year}`;
};
const selectedtype = () => {
  form.value.asset_items_id = [];
};
const selecteduser = () => {
  user_asset_data.value = [];
  user_asset_data_temp.value.filter(getItem);
  user_data.value.filter(getUser);

  function getItem(data) {
    if (data.user_id == form.value.user_id) {
      user_asset_data.value.push(data);
    }
  }

  function getUser(data) {
    if (data.user_id == form.value.user_id) {
      user_name.value =
        data.first_name + " " + data.middle_name + " " + data.last_name;
    }
  }
};
watch(snackbar, () => {
  if (!snackbar.value && text.value == "Request saved.") {
    router.push("/asset/transaction");
  }
});
</script>
<template>
  <getItem @item="items" :transactionData="form.asset_items_id" />
  <v-row>
    <v-col cols="12" md="6" sm="12">
      <h2>User Request Form</h2>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="2" sm="12" align="right">
      <h2>{{ dateStr }}</h2>
    </v-col>
  </v-row>
  <v-form validate-on="submit lazy" @submit.prevent="save_request">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" md="3" align="right">
            <v-text-field
              label="Select Department"
              v-model="department"
              :rules="rules.department"
              class="text-field"
              variant="underlined"
              @blur="fetch_userList"
              @keypress.enter="fetch_userList"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" align="right">
            <v-autocomplete
              label="Employee Code"
              v-model="form.user_id"
              :rules="rules.emp_code"
              :items="user_data"
              item-title="emp_code"
              item-value="user_id"
              class="text-field"
              variant="underlined"
              @update:model-value="selecteduser"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" align="right">
            <v-text-field
              label="Employee Name"
              v-model="user_name"
              :rules="rules.emp_name"
              class="text-field"
              variant="underlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" align="right">
            <v-autocomplete
              label="Request Type"
              v-model="form.type"
              :items="reqType"
              :rules="rules.type"
              item-title="name"
              item-value="value"
              class="text-field"
              variant="underlined"
              @update:model-value="selectedtype"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="10">
            <v-text-field
              label="Title"
              variant="underlined"
              v-model="form.title"
              :rules="rules.title"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>

          <v-col cols="12" md="12">
            <v-textarea
              label="Description"
              :rules="rules.description"
              v-model="form.description"
              auto-grow
              variant="underlined"
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-divider :thickness="3" class="mb-5"></v-divider>
        <div v-if="form.type == 'Transfer Out' || form.type == null">
          <h3 class="mb-4">Select Item</h3>
          <v-row v-for="(n, index) in form.asset_items_id" :key="[index]">
            <v-col cols="12" md="5" class="mt-2">
              <v-autocomplete
                label="Select item name"
                required
                v-model="n.asset_items_id"
                :rules="rules.asset_items_id"
                clearable
                density="compact"
                :items="item_data"
                item-title="name"
                item-value="id"
                variant="underlined"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="4" v-if="form.type == 'Return Asset'">
              <v-text-field
                label="Enter Serial Number"
                variant="underlined"
                v-model="n.internal_serial"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2" class="mt-2">
              <v-text-field
                label="Quantity"
                type="number"
                min="0"
                v-model="n.qty"
                :rules="rules.qty"
                required
                clearable
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="1" class="mt-2">
              <v-btn
                variant="outlined"
                density="compact"
                @click="removeitem(index)"
                prepend-icon="mdi-minus"
              >
                remove
              </v-btn>
            </v-col>
          </v-row>
          <v-btn
            variant="outlined"
            density="compact"
            @click="additem"
            prepend-icon="mdi-plus"
          >
            add item
          </v-btn>
        </div>
        <userItemTable
          :itemOnhand="user_asset_data"
          @returnItem="ReturnItem"
          v-else
        />
        <br />
        <br />
        <v-divider :thickness="3" class="mb-5"></v-divider>
        <v-row>
          <v-col>
            <v-btn type="submit">Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
