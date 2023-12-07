<script setup>
import { onMounted, ref, computed, watch } from "vue";
import Resource from "@/api/resource.js";

const sportApi = new Resource("booking/sports");

onMounted(async () => {
  fetch();
  fetchGym();
});
const serverItems = ref([]);
const keywords = ref(null);
const actions = ref(null);
const nextpage = ref(1);
const itemid = ref(null);
const loading = ref(true);
const isLoading = ref(false);
const totalItems = ref(0);
const itemsPerPage = ref(10);
const sortBy = ref([]);
const dialog = ref(false);
const snackbar = ref(false);
const text = ref(null);
const sportslist = ref([]);

const form = ref({
  booked_datetime: null,
  duration: null,
  companions: null,
  type: null,
});
const bookgym = async () => {
  try {
    const { data } = await sportApi.store({
      sport_id: "gym",
      booked_datetime: form.value.booked_datetime,
      duration: form.value.duration == "0",
      companions: form.value.companions == "n/a",
    });

    snackbar.value = true;
    text.value = "Successfully booked";
  } catch (error) {
    snackbar.value = true;
    text.value = error.response.data.message;
  }
  form.value.booked_datetime = null;
  form.value.duration = null;
  form.value.companions = null;
};
const fetch = async () => {
  loading.value = true;

  const { data } = await sportApi.list({
    keyword: keywords.value,
    key: sortBy.value.length >= 1 ? sortBy.value[0].key : "id",
    order: sortBy.value.length >= 1 ? sortBy.value[0].order : "desc",
    limit: itemsPerPage.value,
    page: nextpage.value,
  });
  loading.value = false;
};
const fetchGym = async () => {
  if (!form.value.booked_datetime) {
    return;
  }

  isLoading.value = true;
  const selectedDate = new Date(form.value.booked_datetime);
  const selectedDateOnly = selectedDate.toISOString().slice(0, 10);

  try {
    const { data } = await sportApi.list({
      keyword: "",
      key: "",
      order: "",
      limit: "",
      date: selectedDateOnly,
    });
    sportslist.value = [];
    data.all.data.forEach((item) => {
      const itemDate = new Date(item.booked_datetime);
      const itemDateOnly = itemDate.toISOString().slice(0, 10);
      if (
        itemDateOnly === selectedDateOnly &&
        item.sports.code === "gym" &&
        item.booking_status !== "Done" &&
        item.booking_status !== "Cancel"
      ) {
        sportslist.value.push(item);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};
const calculateEndTime = (duration, startTime) => {
  const startTimeObj = new Date(startTime);
  let endTimeObj;
  if (duration == 60 || duration == 120) {
    endTimeObj = new Date(startTimeObj.getTime() + duration * 60000);
  } else {
    console.error("Unsupported duration:", duration);
    return null;
  }
  const formattedEndTime = endTimeObj.toLocaleString();
  return formattedEndTime;
};
const minDate = computed(() => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
});
</script>

<template>
  <v-card class="mb-4" color="#2196f3"
    ><v-card-title>
      <h2 class="text-center">GYM</h2>
    </v-card-title>
  </v-card>

  <v-row>
    <v-col cols="12" md="4">
      <v-card class="mx-auto my-" max-width="600">
        <!-- <v-col cols="12" sm="6" md="12" class="mt-5">
          <v-select
            label="Type*"
            :items="['Court A', 'Court B', 'Court C']"
            variant="solo"
            required
            v-model="form.type"
          >
          </v-select>
        </v-col> -->
        <v-col cols="12" sm="6" md="12">
          <v-text-field
            label="Date & Time*"
            type="datetime-local"
            variant="solo"
            required
            :min="minDate"
            v-model="form.booked_datetime"
            @update:modelValue="fetchGym()"
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="12" sm="6" md="12">
          <v-select
            label="Duration*"
            :items="['1 Hour', '2 Hours']"
            variant="solo"
            required
            v-model="form.duration"
          >
          </v-select>
        </v-col> -->
        <!-- <v-col cols="12" sm="6" md="12">
          <v-combobox
            chips
            multiple
            label="Companions*"
            variant="solo"
            required
            v-model="form.companions"
          ></v-combobox>
        </v-col> -->
        <small class="required-text">* indicates required field</small>
        <v-col cols="12" sm="6" md="12" class="text-right">
          <v-btn density="comfortable" class="save" @click="bookgym()">
            Save
          </v-btn>
        </v-col>
      </v-card>
    </v-col>
    <v-col cols="12" md="8"
      ><v-card>
        <h5 class="text-center">GYM Schedule</h5>
        <div class="table-container">
          <v-table>
            <thead>
              <tr>
                <th class="text-left" style="font-size: 14px">Name</th>
                <th class="text-center" style="font-size: 14px">Date</th>
              </tr>
            </thead>

            <tbody>
              <!-- Show loading indicator while isLoading is true -->
              <tr v-if="isLoading">
                <td colspan="2" class="text-center">Loading...</td>
              </tr>

              <!-- Display the data if isLoading is false -->
              <tr v-else v-for="item in sportslist" :key="item.id">
                <td class="text-left" style="font-size: 12px">
                  {{ item.userprofile.emp_code }}
                </td>
                <td class="text-center" style="font-size: 12px">
                  {{ item.booked_datetime }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div></v-card
      >
    </v-col>
  </v-row>
  <v-snackbar v-model="snackbar" :timeout="2000" class="snackbar-top-right">
    <div class="snackbar-text">{{ text }}</div>
  </v-snackbar>
</template>

<style scoped>
.save {
  color: #2196f3;
}
.save:hover {
  color: #0d47a1; /* Change this to your desired hover color */
}
.snackbar-top-right {
  position: fixed;
  left: 80px;
  right: 0;
  transform: translate(-10px, -770px); /* Adjust positioning as needed */
  display: flex;
  justify-content: flex-end;
}
.snackbar-text {
  text-align: center; /* Adjust text alignment as needed */
}
.required-text {
  margin-left: 10px;
  color: red;
}
</style>
