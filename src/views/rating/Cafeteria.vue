<script setup>
import { onMounted, ref } from "vue";
import Resource from "@/api/resource.js";
const apifoodlist = new Resource("rating/schedule/sched-food");
const apifoodmenutoday = new Resource("rating/food-survey");

onMounted(async () => {
  fetchMenu();
});

// const datenow = new Date();
const keywords = ref(null);
const TodayMenu = ref(null);
const fetchMenu = async () => {
  const { data } = await apifoodlist.list({
    menutoday: "menutoday",
    keyword: "",
    key: "",
    order: "",
    limit: 100,
    page: 1,
  });
  TodayMenu.value = data.data;

  //   console.log(TodayMenu.value[0].food_menu.name);
};
const form = ref({
  like: null,
  dislike: null,
  note: null,
  status: null,
});

const save = async () => {
  const res = await apifoodmenutoday.store(form.value);
  dialog.value = false;
  form.value = {
    food_sched_id: null,
    like: null,
    dislike: null,
    note: null,
    status: null,
  };
  fetchMenu();
};

const dialog = ref(false);
const opendialog = (e, b) => {
  form.value.food_sched_id = e.id;
  form.value.like = b == "like" ? 1 : 0;
  form.value.dislike = b == "dislike" ? 1 : 0;
  dialog.value = true;
};
const Close = () => {
  dialog.value = false;
};

// Function to get the current formatted date and time
const getCurrentDateTime = () => {
  return new Date().toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });
};

// Start the clock update
const updateClock = () => {
  clock.value = getCurrentDateTime();
  setInterval(() => {
    clock.value = getCurrentDateTime();
  }, 1000);
};

// Initialize the clock
const clock = ref(getCurrentDateTime());
updateClock();
</script>

<template>
  <h2 class="mb-3">
    <h5 class="mb-3">Food Schedule : {{ clock }}</h5>
  </h2>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="n in TodayMenu" :key="n">
        <v-card align="center">
          <v-img
            :src="n.food_menu.picture_path"
            :width="259"
            :height="200"
          ></v-img>

          <v-card-item>
            <v-card-title class="text-h9 text-center">{{
              n.food_menu.name
            }}</v-card-title>
            <v-card-subtitle>
              {{ n.sched_type }}
            </v-card-subtitle>
            <v-row>
              <v-col>
                <v-btn
                  block
                  prepend-icon="mdi mdi-thumb-up-outline"
                  variant="tonal"
                  @click="opendialog(n, 'like')"
                >
                  LIKE
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  block
                  prepend-icon="mdi mdi-thumb-down-outline"
                  variant="tonal"
                  @click="opendialog(n, 'dislike')"
                >
                  DISLIKE
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" persistent width="500">
        <v-card>
          <v-card-title>
            <span class="text-h5 pa-2">Add Comment</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea label="Comment*" v-model="form.note"></v-textarea>
                </v-col>
                <v-col cols="12" v-if="actions == 'edit'">
                  <v-select
                    label="Status *"
                    clearable
                    required
                    density="compact"
                    variant="underlined"
                    v-model="form.status"
                    :items="['active', 'deactive']"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="Close">
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              v-if="actions != 'edit'"
              @click="save"
            >
              Save
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              v-if="actions == 'edit'"
              @click="update"
            >
              update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
