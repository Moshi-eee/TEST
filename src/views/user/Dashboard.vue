<script setup>
import { onMounted, ref } from "vue";

import { userdashboard } from "@/api/dataApi.js";

import { useDisplay } from "vuetify";
const { width } = useDisplay();

onMounted(async () => {
  fetch();
});

const options = {
  chart: {
    id: "vuechart-example",
  },
  colors: ["#0f4172", "#c4c4c4", "#f7e61b", "#961726", "#212528"],
  xaxis: {
    categories: [],
  },
};
const series = ref([
  {
    name: "COCW",
    type: "column",
    data: [],
  },
  {
    name: "COGL",
    type: "column",
    data: [],
  },
  {
    name: "CGBPI",
    type: "column",
    data: [],
  },
  {
    name: "COJW",
    type: "column",
    data: [],
  },
  {
    name: "COBPI",
    type: "column",
    data: [],
  },
]);

const item = ref([]);
const loading = ref(false);
const fetch = async () => {
  loading.value = true;
  const { data } = await userdashboard();
  // console.log(data);
  item.value = data;
  loading.value = false;
  updateChart();
};
const active = ref();
const thismonth = ref();
const female = ref();
const male = ref();
const local = ref();
const expat = ref();
const attrition = ref();
const cobpi = ref();
const cgdpi = ref();
const cojw = ref();
const cocw = ref();
const cogl = ref();
const dep = ref([]);
const pos = ref([]);
const updateChart = () => {
  dep.value = [];
  pos.value = [];

  // console.log(());
  //
  if (filter.value == "Today") {
    active.value = item.value.today.total;
    thismonth.value = item.value.today.hired_month;
    female.value = item.value.today.female;
    male.value = item.value.today.male;
    local.value = item.value.today.local;
    expat.value = item.value.today.expat;
    attrition.value = item.value.today.attrition;
    cobpi.value = item.value.today.cobpi;
    cgdpi.value = item.value.today.cosk;
    cojw.value = item.value.today.cojw;
    cocw.value = item.value.today.cocw;
    cogl.value = item.value.today.cogl;
    dep.value = item.value.today.department;
    pos.value = item.value.today.position;

    series.value[0].data = item.value.graph.today.cocw;
    series.value[1].data = item.value.graph.today.cogl;
    series.value[2].data = item.value.graph.today.cosk;
    series.value[3].data = item.value.graph.today.cojw;
    series.value[4].data = item.value.graph.today.cobpi;
  } else if (filter.value == "This Week") {
    active.value = item.value.week.total;
    thismonth.value = item.value.week.hired_month;
    female.value = item.value.week.female;
    male.value = item.value.week.male;
    local.value = item.value.week.local;
    expat.value = item.value.week.expat;
    attrition.value = item.value.week.attrition;
    cobpi.value = item.value.week.cobpi;
    cgdpi.value = item.value.week.cosk;
    cojw.value = item.value.week.cojw;
    cocw.value = item.value.week.cocw;
    cogl.value = item.value.week.cogl;
    dep.value = item.value.week.department;
    pos.value = item.value.week.position;
    series.value[0].data = item.value.graph.week.cocw;
    series.value[1].data = item.value.graph.week.cogl;
    series.value[2].data = item.value.graph.week.cosk;
    series.value[3].data = item.value.graph.week.cojw;
    series.value[4].data = item.value.graph.week.cobpi;
  } else if (filter.value == "This Month") {
    active.value = item.value.month.total;
    thismonth.value = item.value.month.hired_month;
    female.value = item.value.month.female;
    male.value = item.value.month.male;
    local.value = item.value.month.local;
    expat.value = item.value.month.expat;
    attrition.value = item.value.month.attrition;
    cobpi.value = item.value.month.cobpi;
    cgdpi.value = item.value.month.cosk;
    cojw.value = item.value.month.cojw;
    cocw.value = item.value.month.cocw;
    cogl.value = item.value.month.cogl;
    dep.value = item.value.month.department;
    pos.value = item.value.month.position;
    series.value[0].data = item.value.graph.month.cocw;
    series.value[1].data = item.value.graph.month.cogl;
    series.value[2].data = item.value.graph.month.cosk;
    series.value[3].data = item.value.graph.month.cojw;
    series.value[4].data = item.value.graph.month.cobpi;
  } else if (filter.value == "This Year") {
    active.value = item.value.year.total;
    thismonth.value = item.value.year.hired_month;
    female.value = item.value.year.female;
    male.value = item.value.year.male;
    local.value = item.value.year.local;
    expat.value = item.value.year.expat;
    attrition.value = item.value.year.attrition;
    cobpi.value = item.value.year.cobpi;
    cgdpi.value = item.value.year.cosk;
    cojw.value = item.value.year.cojw;
    cocw.value = item.value.year.cocw;
    cogl.value = item.value.year.cogl;
    dep.value = item.value.year.department;
    pos.value = item.value.year.position;
    // series.value[0].data = item.value.year.cocw;
    // series.value[1].data = item.value.year.cogl;
    // series.value[2].data = item.value.year.cosk;
    // series.value[3].data = item.value.year.cojw;
    // series.value[4].data = item.value.year.cobpi;
  } else {
    active.value = item.value.all.total;
    thismonth.value = item.value.all.hired_month;
    female.value = item.value.all.female;
    male.value = item.value.all.male;
    local.value = item.value.all.local;
    expat.value = item.value.all.expat;
    attrition.value = item.value.all.attrition;
    cobpi.value = item.value.all.cobpi;
    cgdpi.value = item.value.all.cosk;
    cojw.value = item.value.all.cojw;
    cocw.value = item.value.all.cocw;
    cogl.value = item.value.all.cogl;
    dep.value = item.value.all.department;
    pos.value = item.value.all.position;
    // series.value[0].data = item.value.all.cocw;
    // series.value[1].data = item.value.all.cogl;
    // series.value[2].data = item.value.all.cosk;
    // series.value[3].data = item.value.all.cojw;
    // series.value[4].data = item.value.all.cobpi;
  }
};

const filter = ref([]);
</script>
<template>
  <v-row v-if="width <= 500">
    <v-col cols="12" md="2">
      <v-select
        label="Filter"
        density="compact"
        variant="underlined"
        v-model="filter"
        @update:modelValue="updateChart"
        :items="['Today', 'This Week', 'This Month', 'This Year', 'All']"
      ></v-select>
    </v-col>
    <v-col col="12" md="3">
      <v-card variant="outlined">
        <v-table fixed-header height="400px" density="compact">
          <thead>
            <tr>
              <th class="text-left">Category</th>
              <th class="text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Active</td>
              <td>{{ active }}</td>
            </tr>
            <tr>
              <td>Female</td>
              <td>{{ female }}</td>
            </tr>
            <tr>
              <td>Male</td>
              <td>{{ male }}</td>
            </tr>
            <tr>
              <td>Local</td>
              <td>{{ local }}</td>
            </tr>
            <tr>
              <td>Expat</td>
              <td>{{ expat }}</td>
            </tr>
            <tr>
              <td>Attrition</td>
              <td>{{ attrition }}</td>
            </tr>
            <tr>
              <td>COBPI</td>
              <td>{{ cobpi }}</td>
            </tr>
            <tr>
              <td>COJW</td>
              <td>{{ cojw }}</td>
            </tr>
            <tr>
              <td>CGDPI</td>
              <td>{{ cgdpi }}</td>
            </tr>
            <tr>
              <td>COGL</td>
              <td>{{ cogl }}</td>
            </tr>
            <tr>
              <td>COCW</td>
              <td>{{ cocw }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-if="width >= 500">
    <v-col cols="12" md="2">
      <v-select
        label="Filter"
        density="compact"
        variant="underlined"
        v-model="filter"
        @update:modelValue="updateChart"
        :items="['Today', 'This Week', 'This Month', 'This Year', 'All']"
      ></v-select>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="Total Active">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6">
              {{ active }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="Female">
          <template v-slot:subtitle>
            <v-icon icon="mdi-face-woman" size="18" class="me-1 pb-1"></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ female }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="Male">
          <template v-slot:subtitle>
            <v-icon icon="mdi-face-man" size="18" class="me-1 pb-1"></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ male }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="Local">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-convert"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ local }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="Expat">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-convert"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ expat }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="width >= 500">
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="Attrition">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ attrition }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="COBPI">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ cobpi }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="COJW">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ cojw }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="CGDPI">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ cgdpi }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="COGL">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ cogl }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col col="12" md="2">
      <v-card
        class="mx-auto"
        variant="outlined"
        :loading="loading"
        :disabled="loading"
      >
        <v-card-item title="COCW">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-account-group"
              size="18"
              class="me-1 pb-1"
            ></v-icon>

            Employee
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h5" cols="6"> {{ cocw }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col col="12" md="6">
      <v-card variant="outlined">
        <v-table fixed-header height="400px" density="compact">
          <thead>
            <tr>
              <th class="text-left">Department</th>
              <th class="text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dep" :key="item.department_id">
              <td>{{ item.department.name }}</td>
              <td>{{ item.dep }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
    <v-col col="12" md="6">
      <v-card variant="outlined">
        <v-table fixed-header height="400px" density="compact">
          <thead>
            <tr>
              <th class="text-left">Position</th>
              <th class="text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pos" :key="item.position_id">
              <td>{{ item.position.name }}</td>
              <td>{{ item.pos }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
    <v-col col="12" md="12">
      <v-card
        variant="outlined"
        :width="width <= 500 ? 325 : ''"
        height="400px"
      >
        <apexchart
          width="100%"
          height="100%"
          type="line"
          :options="options"
          :series="series"
        ></apexchart>
      </v-card>
    </v-col>
  </v-row>
</template>
