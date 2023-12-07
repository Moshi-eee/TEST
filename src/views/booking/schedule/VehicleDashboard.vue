<script setup>
import { ref } from "vue";

const dashboardFilter = ref("Year");

//#region ---> Graph Series --->
const statusSeries = ref([1, 1]);
const routeSeries = ref([1, 1, 1, 1]);
//#endregion

//#region ---> Graph Label --->
const statusLabel = ref(["STAY-IN STAFF", "STAY-OUT STAFF"]);
const routeLabel = ref([
  "MARIVELES",
  "BAGAC",
  "DINALUPIHAN - CAMELLA TUYO",
  "LALAWIGAN FOUR LANES",
]);
//#endregion

//#region ---> Graph Settings --->
const status = ref({
  series: statusSeries.value,
  chartOptions: {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
            total: {
              showAlways: true,
              show: true,
              color: "#FFFFFF",
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    colors: ["#3164C9", "#E0321C", "#2CD651", "#00A1F2", "#767676"],
    labels: statusLabel.value,
    title: {
      text: "Status",
    },
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        tools: {
          download: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          png: {
            filename: undefined,
          },
        },
      },
    },
    legend: {
      show: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: true,
      },
    },
  },
});
const route = ref({
  series: routeSeries.value,
  chartOptions: {
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
            total: {
              showAlways: true,
              show: true,
              color: "white",
            },
          },
        },
      },
    },
    colors: ["#3268ce", "#D43B19", "#fc9a04", "#178d1c", "#767676"],
    labels: routeLabel.value,
    title: {
      text: "Routes",
    },
    stroke: {
      width: 0,
    },
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        tools: {
          download: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          png: {
            filename: undefined,
          },
        },
      },
    },
    legend: {
      show: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
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

const updateGraph = () => {
  switch (dashboardFilter.value) {
    case "Day":
      console.log(dashboardFilter.value);
      break;
    case "Week":
      console.log(dashboardFilter.value);
      break;
    case "Month":
      console.log(dashboardFilter.value);
      break;
    case "Year":
      console.log(dashboardFilter.value);
      break;
  }
};
</script>
<template>
  <!-- Upper Part Design -->
  <v-row>
    <v-col cols="12" md="2" sm="12">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        height="100px"
      >
        <v-card-title> Title</v-card-title>
        <v-card-text>
          <h2>Total</h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="2" sm="12">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        height="100px"
      >
        <v-card-title> Title</v-card-title>
        <v-card-text>
          <h2>Total</h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="2" sm="12">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        height="100px"
      >
        <v-card-title> Title</v-card-title>
        <v-card-text>
          <h2>Total</h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="2" sm="12">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        height="100px"
      >
        <v-card-title> Title</v-card-title>
        <v-card-text>
          <h2>Total</h2>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="2" sm="12">
      <v-card
        variant="outlined"
        :loading="loading"
        :disabled="loading"
        class="rounded-shaped"
        height="100px"
      >
        <v-card-title> Title</v-card-title>
        <v-card-text>
          <h2>Total</h2>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="2" class="mt-5">
      <v-select
        :items="['Day', 'Week', 'Month', 'Year']"
        variant="outlined"
        v-model="dashboardFilter"
        @update:model-value="updateGraph"
      ></v-select>
    </v-col>
  </v-row>
  <!-- End -->

  <!-- Graph -->
  <v-row>
    <v-col cols="12" md="6" sm="12">
      <v-card
        variant="outlined"
        height="350px"
        width="auto"
        align="center"
        :loading="loading"
      >
        <apexchart
          width="100%"
          height="100%"
          type="pie"
          :options="status.chartOptions"
          :series="status.series"
        ></apexchart>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card
        variant="outlined"
        height="350px"
        width="auto"
        align="center"
        :loading="loading"
      >
        <apexchart
          width="100%"
          height="100%"
          type="pie"
          :options="route.chartOptions"
          :series="route.series"
        ></apexchart>
      </v-card>
    </v-col>
  </v-row>
  <!-- End -->
</template>

<style lang="scss" scoped></style>
