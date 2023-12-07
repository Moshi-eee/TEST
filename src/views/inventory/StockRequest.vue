<script setup>
import { ref, onMounted, watch } from "vue";
import { useInventoryStore } from "@/stores/inventoryStore";

import getItem from "./transfer/getItem.vue";
import Resource from "@/api/resource.js";
import router from "@/router";

const asset_request_api = new Resource("asset/requestAsset");
const inventoryStore = useInventoryStore();

onMounted(() => {
  getDate();
  CheckItem();
});

const CheckItem = () => {
  if (inventoryStore.get_is_clicked) {
    form.value.type = "In";
    form.value.title = "Refill Stocks";
    form.value.description = "Refill Stocks";
    for (let i = 0; i < inventoryStore.get_needToResupply.length; i++) {
      form.value.asset_items_id.push({
        asset_items_id: inventoryStore.get_needToResupply[i].item.id,
        id: null,
        asset_requests_id: null,
        type: form.value.type,
        qty: 100,
        serial: null,
        internal_serial: null,
        status_asset: "Not Received",
      });
    }
    inventoryStore.restock_clicked(false);
  }
};

//#region --->declarations --->
const reqType = ref([
  {
    name: "Stock In",
    value: "In",
  },
  {
    name: "Stock Out",
    value: "Out",
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
  title: [(v) => !!v || "Required Field"],
  description: [(v) => !!v || "Required Field"],
  qty: [(v) => !!v || "Required Field"],
  type: [(v) => !!v || "Required Field"],
  status_asset: [(v) => !!v || "Required Field"],
  asset_items_id: [(v) => !!v || "Required Field"],
});

const item_data = ref([]);
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
const assetQTY = (item) => {
  form.value.qty = item;
};
const snackbar = ref(false);
const text = ref("");
const timeout = ref(1000);
//#endregion --->endregion --->endregion --->endregion --->endregion

//#region CRUD operations
const save_request = async () => {
  const res = await asset_request_api
    .store(form.value)
    .then((data) => {
      text.value = "Request saved.";
      snackbar.value = data.data;
      form.value = {
        user_id: null,
        title: null,
        description: null,
        qty: 0,
        type: null,
        status: "Incomplete",
        asset_items_id: [],
      };
      //
    })
    .catch((err) => {
      text.value = "Please check all fields.";
      snackbar.value = true;
      console.log(err);
    });
};
watch(snackbar, () => {
  if (!snackbar.value && text.value == "Request saved.") {
    router.push("/asset/transaction");
  }
});
//#endregion
const dateStr = ref("");
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  dateStr.value = `${month}/${day}/${year}`;
};
</script>
<template>
  <getItem
    @item="items"
    @qty="assetQTY"
    :transactionData="form.asset_items_id"
  />
  <v-row>
    <v-col cols="12" md="6" sm="12">
      <h2>Stock Request Form</h2>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="2" sm="12" align="right">
      <h2>{{ dateStr }}</h2>
    </v-col>
  </v-row>
  <v-form validate-on="submit" @submit.prevent="save_request">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" md="2" align="right">
            <v-select
              label="Request Type"
              v-model="form.type"
              :items="reqType"
              :rules="rules.type"
              item-title="name"
              item-value="value"
              class="text-field"
              variant="underlined"
            ></v-select>
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
              variant="underlined"
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-divider :thickness="3" class="mb-5"></v-divider>
        <h3 class="mb-4">Select Item</h3>
        <v-row v-for="(n, index) in form.asset_items_id" :key="[index]">
          <v-col cols="12" md="5">
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
          <v-spacer></v-spacer>
          <v-col cols="12" md="2">
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
          <v-col cols="6" md="1">
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
