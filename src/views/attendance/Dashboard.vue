<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";
const apidashboard = new Resource("hris/scheduling/dashboard");

import { useDisplay } from "vuetify";
const { width } = useDisplay();

onMounted(async () => {
  fetch();
});

const attend = ref([]);
const fetch = async () => {
  const { data } = await apidashboard.list({});
  attend.value = data;
  // console.log(data);
};
</script>

<template>
  <h2 class="mb-3">Dashboard</h2>

  <v-table fixed-header density="compact" height="300px">
    <thead>
      <tr>
        <th class="text-left">Emp ID</th>
        <th class="text-center">Date Sched.</th>
        <th class="text-center">Time In</th>
        <th class="text-center">Punch In</th>
        <th class="text-right">Time In Diff.</th>
        <th class="text-center">Time Out</th>
        <th class="text-center">Punch Out</th>
        <th class="text-right">Time Out Diff.</th>
        <th class="text-center">Schedule Type</th>
        <th class="text-center">Holiday</th>
        <th class="text-center">Amend. Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in attend" :key="item.name">
        <td>{{ item.emp_code }}</td>
        <td class="text-center">{{ item.sched_date }}</td>
        <td class="text-center">{{ item.sched_time_in }}</td>
        <td class="text-center">{{ item.attend_time_in }}</td>
        <td class="text-right">{{ item.time_in_diff }}</td>
        <td class="text-center">{{ item.sched_time_out }}</td>
        <td class="text-center">{{ item.attend_time_out }}</td>
        <td class="text-right">{{ item.time_out_diff }}</td>
        <td class="text-center">{{ item.sched_type }}</td>
        <td class="text-center">{{ item.holiday }}</td>
        <td class="text-center"></td>
      </tr>
    </tbody>
  </v-table>
</template>
