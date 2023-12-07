+
<template>
  <v-window>
    <v-window-item>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3">
            <v-card
              class="mx-auto my-1"
              max-width="300"
              :class="['ma-4', selectedClass]"
            >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear
                  :active="isActive"
                  color="deep-purple"
                  height="4"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-img
                cover
                height="220"
                src="https://img.freepik.com/free-photo/health-club-without-people-with-exercise-equipment_637285-8446.jpg"
              ></v-img>
              <v-card-item>
                <v-card-title>GYM</v-card-title>

                <v-card-subtitle> </v-card-subtitle>
              </v-card-item>
              <v-card-text
                :style="{
                  'font-family': 'Calibri Light, Calibri, sans-serif',
                  'font-size': '15px',
                }"
              >
                <div>
                  A gym, short for "gymnasium," is a facility designed to
                  promote physical fitness and exercise. It typically provides a
                  range of equipment and services to help individuals improve
                  their strength, endurance, flexibility, and overall health.
                </div>
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>

              <!-- <v-card-title>Booking Availability Time</v-card-title> -->

              <!-- <div class="px-4">
                    <v-chip-group v-model="selection">
                      <v-chip>5:30PM</v-chip>

                      <v-chip>7:30PM</v-chip>

                      <v-chip>8:00PM</v-chip>

                      <v-chip>9:00PM</v-chip>
                    </v-chip-group>
                  </div> -->
              <v-card-actions>
                <v-dialog v-model="dialog" persistent width="600">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="primary"
                      v-bind="props"
                      :disabled="gymbtn"
                      variant="elevated"
                      class="mx-auto"
                      :style="{}"
                    >
                      Book Now
                    </v-btn>
                  </template>
                  <v-card class="custom-card-gym">
                    <v-card-title class="custom-card-title">
                      <span class="text-h5">GYM</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="Date & Time*"
                              type="datetime-local"
                              variant="underlined"
                              v-model="form.booked_datetime"
                              required
                              :min="minDate"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small class="required-text"
                        >*indicates required field</small
                      >
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="close-button"
                        variant="text"
                        @click="dialog = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        class="save-button"
                        variant="text"
                        @click="bookgym()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
  </v-window>
  <v-snackbar v-model="snackbar" :timeout="2000">
    <div align="center">{{ text }}</div>
  </v-snackbar>
</template>

<script>
import Resource from "@/api/resource.js";
const sportApi = new Resource("booking/sports");
const apisportlist = new Resource("booking/maintenance/sports");
export default {
  data: () => ({
    form: {
      booked_datetime: null,
      duration: null,
      companions: null,
      type: null,
    },
    sportslist: [],
    gymbtn: null,
    dialog: false,
    text: null,
    snackbar: false,
    selection: 1,
    model: null,
  }),
  async mounted() {
    this.fetchall();
  },
  methods: {
    async fetchall() {
      const { data } = await apisportlist.list({
        keyword: "",
        key: "",
        order: "",
        limit: "",
      });
      this.sportslist = data.data;
      this.gymbtn = this.sportslist[7].status == "Deactive" ? true : false;
    },
    async bookgym() {
      await sportApi
        .store({
          sport_id: "gym",
          booked_datetime: this.form.booked_datetime,

          duration: this.form.duration == "0",
          companions: this.form.companions == "n/a",
        })
        .then(({ data }) => {
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog = false;
        })
        .catch((request) => {
          this.snackbar = true;
          this.text = request.response.data.message;
        });
      this.form.booked_datetime = null;
      this.form.duration = null;
      this.form.companions = null;
    },
  },
  computed: {
    minDate() {
      const now = new Date();
      // Format the date and time to match the datetime-local input format (YYYY-MM-DDTHH:mm)
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const min = String(now.getMinutes()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    },
  },
  watch: {
    "form.booked_datetime": function (newVal) {
      if (newVal) {
        const selectedDateTime = new Date(newVal).getTime();
        const currentDateTime = new Date().getTime();
        if (selectedDateTime < currentDateTime) {
          // If the selected date and time is in the past, reset it to the current time
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, "0");
          const min = String(now.getMinutes()).padStart(2, "0");
          this.form.booked_datetime = `${
            this.form.booked_datetime.split("T")[0]
          }T${hh}:${min}`;
        }
      }
    },
  },
};
</script>

<style scoped>
/* Style for the custom card title */
.custom-card-title {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  background-color: #2196f3; /* Background color for the card title */
  color: #fff; /* Text color for the card title */
  padding: 8px; /* Adjust the padding as needed */
}
/* Style the input field */
.v-input {
  border-color: #2196f3; /* Change the input border color to match your theme */
}
/* Style the input text color */
.v-input__control input {
  color: #000; /* Change the text color to match your theme */
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 5pxpx;
}
/* Style the input focus color */
.v-input--is-focused .v-input__control input {
  border-color: #1976d2; /* Change the focus border color to match your theme */
}
/* Style the dropdown menu */
.v-menu__content {
  background-color: #fff; /* Change the background color */
  color: #000; /* Change the text color */
  border: 1px solid #ccc; /* Change the border color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Change the box shadow */
}

/* Style the option items */
.v-list-item {
  padding: 8px 16px; /* Adjust padding as needed */
  font-size: 14px; /* Adjust font size as needed */
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}
/* Style the label */
.v-label {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 10pxpx;
  letter-spacing: 2px;
  word-spacing: 2px;
  color: #000000;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none; /* Change the label text color to match your theme */
}
/* Style for the required text */
.required-text {
  color: #f44336; /* Red color for emphasis */
  font-size: 12px; /* Adjust the font size as needed */
  margin-top: 8px; /* Adjust the margin as needed */
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  padding-left: 15px;
}
.close-button {
  background-color: #e73827;
  color: white;
}
.save-button {
  background-color: #25cc0f;
  color: white;
}
</style>
