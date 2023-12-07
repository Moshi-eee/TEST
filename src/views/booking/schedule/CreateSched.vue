<script setup>
import { onMounted, ref } from "vue";
import { createVSched } from "@/api/dataApi.js";
import router from "@/router";

import Resource from "@/api/resource.js";
const apischedvehicle = new Resource("booking/schedule/sched-vehicle");
const dates = ref();
const form = ref([]);
const loading = ref(false);
onMounted(async () => {
  add();
  fetch();
});
const opt = ref([]);
const fetch = async () => {
  loading.value = true;
  const data = await createVSched();
  opt.value = data.data;
  loading.value = false;
};
const add = async () => {
  form.value.push({
    time: null,
    location: null,
    route: null,
    driver: null,
    car: null,
  });
};
const minus = async (e) => {
  form.value.splice(e, 1);
};
const save = async () => {
  await apischedvehicle
    .store({
      date: dates.value,
      sched: form.value,
    })
    .then((e) => {
      form.value = [];
      dates.value = null;
    });
};
</script>
<template>
  <h2 class="mb-3">Create Vehicle Schedule</h2>
  <v-row>
    <v-col col="12" md="2">
      <v-text-field
        label="Date"
        type="date"
        v-model="dates"
        required
        density="compact"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
  {{ form }}

  <v-row v-for="(n, index) in form" :key="[index]">
    <v-col col="12" md="2">
      <v-text-field
        label="Time"
        type="time"
        v-model="n.time"
        required
        density="compact"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col col="12" md="3">
      <v-select
        required
        density="compact"
        variant="underlined"
        label="Destination"
        v-model="n.location"
        :items="opt.location"
        item-title="code"
        item-value="id"
      ></v-select>
    </v-col>
    <v-col col="12" md="1">
      <v-select
        required
        density="compact"
        variant="underlined"
        label="Route"
        v-model="n.route"
        item-title="name"
        item-value="id"
        :items="['Inbound', 'Outbound']"
      ></v-select>
    </v-col>
    <v-col col="12" md="2">
      <v-select
        required
        density="compact"
        variant="underlined"
        label="Driver"
        v-model="n.driver"
        :items="opt.driver"
        item-title="emp_code"
        item-value="user_id"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :subtitle="item.raw.first_name + ' ' + item.raw.last_name"
          ></v-list-item>
        </template>
      </v-select>
    </v-col>
    <v-col col="12" md="2">
      <v-select
        required
        density="compact"
        variant="underlined"
        label="Car"
        v-model="n.car"
        :items="opt.vehicle"
        item-title="code"
        item-value="id"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :subtitle="item.raw.plate_no"
          ></v-list-item>
        </template>
      </v-select>
    </v-col>
    <v-col col="12">
      <v-icon icon="mdi mdi-plus" @click="add"></v-icon
      ><v-icon icon="mdi-minus" @click="minus(index)"></v-icon>
    </v-col>
  </v-row>
  <v-col col="12" md="2">
    <v-btn
      color="blue-darken-1"
      variant="text"
      @click="router.push('/booking/schedule/vehicle')"
    >
      Close
    </v-btn>
    <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
  </v-col>
</template>
