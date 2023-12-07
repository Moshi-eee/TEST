<script setup>
import Resource from "@/api/resource.js";
import { onMounted, onUnmounted, ref } from "vue";
import { useInventoryStore } from "@/stores/inventoryStore";

const inventoryStore = useInventoryStore();
const asset_item_api = new Resource("asset/maintenance/item");
const asset_userAsset_api = new Resource("asset/userAsset");
const asset_transaction_api = new Resource("asset/transaction");

//#region Life Cycle Hooks
onMounted(() => {
  fetch_item();
  fetch_userAsset();
  fetch_transaction();

  inventoryStore.fetch_inventory();
  getDate();
});
onUnmounted(() => {
  clearInterval(interval.value);
});
//#endregion

const dashboard = ref("dashboard");
const dashboard_filter = ref("Received");
const search_name = ref(null);
const panel = ref(null);
const dateStr = ref("");
const item_data = ref([]);
const user_data = ref([]);
const userAsset_data = ref([]);
const interval = ref(null);
const time = ref(null);

//#region ---> Graph Series --->
const stocks = ref([
  {
    name: "Stock In",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: "Stock Out",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: "Transfer Out",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: "Return Asset",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
]);

//#endregion

//#region fetching items
const fetch_item = async () => {
  const { data } = await asset_item_api.list({
    limit: -1,
  });
  item_data.value = data.data;
};
const fetch_userAsset = async () => {
  user_data.value = [];
  userAsset_data.value = [];
  panel.value = ref(null);
  const { data } = await asset_userAsset_api.list({
    dashboard: dashboard.value,
    search_name: search_name.value,
    limit: -1,
  });
  user_data.value = data[0];
  inventoryStore.set_user_transaction(data[1]);
};
const fetch_transaction = async () => {
  const { data } = await asset_transaction_api.list({
    dashboard: dashboard.value,
    limit: -1,
  });
  data.filter(getStocks);
  function getStocks(item) {
    const date_received = new Date(item.date_received).getMonth();
    switch (item.request.type) {
      case "In":
        stocks.value[0].data[date_received] += 1;
        break;
      case "Out":
        stocks.value[1].data[date_received] += 1;
        break;
      case "Transfer Out":
        stocks.value[2].data[date_received] += 1;
        break;
      case "Return Asset":
        stocks.value[3].data[date_received] += 1;
        break;
    }
  }
};
//#endregion

//#region Methods --->
const getDate = () => {
  const today = new Date(); //January is 0!
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  dateStr.value = `${mm}/${dd}/${yyyy}`;
  interval.value = setInterval(() => {
    time.value = Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format();
  }, 1000);
};
const getItemsOnHand = (item_id) => {
  userAsset_data.value = [];
  inventoryStore.get_user_inventory.filter(getUserItem);
  function getUserItem(item) {
    if (item.user_id == item_id.user_id) {
      userAsset_data.value.push(item);
    }
  }
};
//#endregion ---> Methods

//#region ---> Graph Settings --->
const status = ref({
  series: stocks.value,
  chartOptions: {
    chart: {
      height: 380,
      type: "line",
      zoom: {
        enabled: false,
      },
      background: "#fff",
    },
    fill: {
      type: "gradient",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },

    title: {
      text: "Stock Transaction by Month",
      align: "center",
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      show: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: true,
      },
    },
  },
});
//#endregion
</script>
<template>
  <!-- Upper Part Design -->
  <v-row>
    <v-col cols="12" md="6" sm="12">
      <apexchart
        width="100%"
        height="100%"
        type="line"
        :options="status.chartOptions"
        :series="status.series"
      ></apexchart>
    </v-col>
    <v-col cols="12" md="4" sm="12" v-if="item_data">
      <v-card>
        <v-card-title>Total Items</v-card-title>
        <v-table
          density="compact"
          fixed-header
          height="360px"
          :loading="loading"
        >
          <thead>
            <tr>
              <th class="text-left" width="80%">Item Name</th>
              <th class="text-left">qty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in item_data" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.qty }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="2" sm="12">
      <p align="right" class="dashboard-date">{{ dateStr }}</p>
      <p align="right" class="dashboard-date">{{ time }}</p>
      <!-- <v-select
        :items="['Received', 'Not Received']"
        density="compact"
        variant="outlined"
        v-model="dashboard_filter"
      ></v-select> -->
      <v-card density="compact" height="80px">
        <v-card-title>High Stock</v-card-title>
        <v-card-text>
          <h2>{{ inventoryStore.get_highStock.length }}</h2>
        </v-card-text>
      </v-card>
      <br />
      <v-card density="compact" height="80px">
        <v-card-title>Low Stock</v-card-title>
        <v-card-text>
          <h2>{{ inventoryStore.get_lowStock.length }}</h2>
        </v-card-text> </v-card
      ><br />
      <v-card density="compact" height="80px">
        <v-card-title>Out of Stock</v-card-title>
        <v-card-text>
          <h2>{{ inventoryStore.get_outOfStock.length }}</h2>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- End -->
  <!-- LOWER DESIGN-->
  <v-row>
    <v-col cols="12" md="3" sm="12">
      <v-card>
        <v-card-title>Out Of Stock</v-card-title>
        <v-table density="compact" fixed-header height="300px">
          <thead>
            <tr>
              <th class="text-left" width="80%">Item Name</th>
              <th class="text-left">qty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventoryStore.get_outOfStock" :key="item.id">
              <td>{{ item.item.name }}</td>
              <td>{{ item.qty }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="3" sm="12">
      <v-card>
        <v-card-title>Low Of Stock</v-card-title>
        <v-table density="compact" fixed-header height="300px">
          <thead>
            <tr>
              <th class="text-left" width="80%">Item Name</th>
              <th class="text-left">qty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventoryStore.get_lowStock" :key="item.id">
              <td>{{ item.item.name }}</td>
              <td>{{ item.qty }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" md="2"> User Assets </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="4" class="mt-2">
              <v-text-field
                clearable
                density="compact"
                label="Search Name"
                variant="underlined"
                v-model="search_name"
                append-inner-icon="mdi-magnify"
                @update:model-value="fetch_userAsset"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-table density="compact" fixed-header height="300px">
            <v-expansion-panels class="mb-6" variant="popout" v-model="panel">
              <v-expansion-panel
                v-for="item in user_data.length"
                :key="item.id"
              >
                <v-expansion-panel-title
                  expand-icon="mdi-menu-down"
                  @click="getItemsOnHand(user_data[item - 1])"
                >
                  {{ user_data[item - 1].userprofile.first_name }}
                  {{ user_data[item - 1].userprofile.last_name }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-table density="compact" height="120px">
                    <thead>
                      <tr>
                        <th class="text-left">Item Name</th>
                        <th class="text-left">qty</th>
                        <th class="text-left">type</th>
                        <th class="text-left">status</th>
                        <th class="text-left">received date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in userAsset_data" :key="item.id">
                        <td>{{ item.transaction.item.name }}</td>
                        <td>{{ item.transaction.qty }}</td>
                        <td>{{ item.transaction.request.type }}</td>
                        <td>{{ item.transaction.status_asset }}</td>
                        <td>{{ item.transaction.date_received }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- End-->
</template>

<style scoped>
.dashboard-date {
  font-size: 20px;
}
</style>
