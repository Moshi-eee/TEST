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
                src="https://img.freepik.com/free-photo/boys-playing-with-console_23-2147824909.jpg"
              ></v-img>
              <v-card-item>
                <v-card-title>GAME CONSOLE</v-card-title>

                <v-card-subtitle> </v-card-subtitle>
              </v-card-item>
              <v-card-text
                :style="{
                  'font-family': 'Calibri Light, Calibri, sans-serif',
                  'font-size': '15px',
                }"
              >
                <div>
                  A game console is a specialized electronic device designed
                  primarily for playing video games. These devices typically
                  connect to a television or monitor and come with dedicated
                  game controllers. Game consoles offer a wide variety of gaming
                  experiences, ranging from single-player adventures to
                  multiplayer competitions.
                </div>
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>

              <v-card-actions>
                <v-dialog v-model="dialog" persistent width="1200">
                  <template v-slot:activator="{ props }">
                    <!-- <v-btn
                      color="primary"
                      v-bind="props"
                      :disabled="consolebtn"
                      variant="elevated"
                      class="mx-auto"
                      :style="{}"
                    >
                      Book Now
                    </v-btn> -->
                    <h2 class="mx-auto">COMING SOON!!</h2>
                  </template>
                  <v-card class="custom-card-console">
                    <v-card-title class="custom-card-title">
                      <span class="text-h5">PS5</span>
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-select
                                label="Type*"
                                :items="['PS5 Dorm 2', 'PS5 Dorm 3']"
                                variant="underlined"
                                v-model="form.type"
                                class="smaller-combobox"
                                required
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-text-field
                                label="Date & Time*"
                                type="datetime-local"
                                variant="underlined"
                                v-model="form.booked_datetime"
                                required
                                :min="minDate"
                                @update:modelValue="fetchConsole()"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-4">
                              <!-- <v-btn
                                    icon="mdi mdi-card-search-outline"
                                    size="small"
                                    @click="fetchConsole"
                                  ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour']"
                                variant="underlined"
                                v-model="form.duration"
                                class="smaller-combobox"
                                required
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="11">
                              <v-combobox
                                chips
                                multiple
                                label="Companions*"
                                v-model="form.companions"
                                variant="underlined"
                                required
                              ></v-combobox>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6">
                          <div>
                            <!-- Add a title above the v-table -->
                            <h5 class="text-center">Console Schedule</h5>

                            <!-- Wrap the v-table in a container with a fixed height and scroll overflow -->
                            <div class="table-container">
                              <v-table>
                                <thead>
                                  <tr>
                                    <th
                                      class="text-left"
                                      style="font-size: 14px"
                                    >
                                      Name
                                    </th>
                                    <th
                                      class="text-left"
                                      style="font-size: 14px"
                                    >
                                      Date From
                                    </th>
                                    <th
                                      class="text-left"
                                      style="font-size: 14px"
                                    >
                                      Date To
                                    </th>
                                    <th
                                      class="text-left"
                                      style="font-size: 14px"
                                    >
                                      Type
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <!-- Show loading indicator while isLoading is true -->
                                  <tr v-if="isLoading">
                                    <td colspan="2" class="text-center">
                                      Loading...
                                    </td>
                                  </tr>

                                  <!-- Display the data if isLoading is false -->
                                  <tr
                                    v-else
                                    v-for="item in sportsList"
                                    :key="item.id"
                                  >
                                    <td
                                      class="text-left"
                                      style="font-size: 12px"
                                    >
                                      {{ item.userprofile.emp_code }}
                                    </td>
                                    <td
                                      class="text-left"
                                      style="font-size: 12px"
                                    >
                                      {{ item.booked_datetime }}
                                    </td>
                                    <td
                                      class="text-left"
                                      style="font-size: 12px"
                                    >
                                      {{
                                        calculateEndTime(
                                          item.duration,
                                          item.booked_datetime
                                        )
                                      }}
                                    </td>
                                    <td
                                      class="text-left"
                                      style="font-size: 12px"
                                    >
                                      {{ item.type }}
                                    </td>
                                  </tr>
                                </tbody>
                              </v-table>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      <v-container> </v-container>
                      <small class="required-text"
                        >*indicates required field</small
                      >
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="close-button"
                        variant="text"
                        @click="closeDialog()"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        class="save-button"
                        variant="text"
                        @click="bookconsole()"
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
    dialog: false,
    consolebtn: null,
    isLoading: false,

    text: null,
    snackbar: false,
    selection: 1,
    model: null,
  }),
  async mounted() {
    this.fetchAllStatus();
    this.fetchConsole();
  },
  methods: {
    calculateEndTime(duration, startTime) {
      // Parse the start time string into a Date object
      const startTimeObj = new Date(startTime);

      // Calculate the end time based on the duration
      let endTimeObj;

      if (duration == 60) {
        // If duration is 60 minutes
        endTimeObj = new Date(startTimeObj.getTime() + duration * 60000);
      } else if (duration == 120) {
        // If duration is 120 minutes
        endTimeObj = new Date(startTimeObj.getTime() + duration * 60000);
      } else {
        // Handle other cases as needed
        console.error("Unsupported duration:", duration);
        return null;
      }

      // Format the end time as needed (example: using toLocaleString())
      const formattedEndTime = endTimeObj.toLocaleString();

      return formattedEndTime;
    },
    closeDialog() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    async fetchAllStatus() {
      const { data } = await apisportlist.list({
        keyword: "",
        key: "",
        order: "",
        limit: "",
      });
      this.sportslist = data.data;
      this.consolebtn = this.sportslist[8].status == "Deactive" ? true : false;
    },
    async fetchConsole() {
      if (!this.form.booked_datetime) {
        // If datetime is null or empty, do nothing
        return;
      }

      this.isLoading = true;

      const selectedDate = new Date(this.form.booked_datetime);
      const selectedDateOnly = selectedDate.toISOString().slice(0, 10);

      try {
        const { data } = await sportApi.list({
          keyword: "",
          key: "",
          order: "",
          limit: "",
          date: selectedDateOnly,
        });
        this.sportsList = [];
        // Filter the data based on the selected date and code "basketball"
        data.all.data.filter((item) => {
          const itemDate = new Date(item.booked_datetime);
          const itemDateOnly = itemDate.toISOString().slice(0, 10);
          // Filter by date and item.sports.code

          if (itemDateOnly == selectedDateOnly) {
            if (item.sports.code == "console") {
              console.log(item);

              if (
                item.booking_status != "Done" &&
                item.booking_status != "Cancel"
              ) {
                this.sportsList.push(item);
              }
              // this.sportsList.push(item);
            }
          }
        });
        // Force a reactivity update to refresh the view
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      } finally {
        // Set isLoading to false when data fetching is done, whether successful or not
        this.isLoading = false;
      }
    },
    handleDateTimeInput() {
      // Call fetchConsole only when the date portion changes
      this.fetchConsole();
    },
    async bookconsole() {
      await sportApi
        .store({
          sport_id: "console",
          booked_datetime: this.form.booked_datetime,
          duration:
            this.form.duration == "1 Hour"
              ? 60
              : this.form.duration == "2 Hours"
              ? 120
              : 0,
          companions: this.form.companions,
          type: this.form.type,
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
      this.form.type = null;
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
    dateValue() {
      // Extracting only the date portion from the datetime value
      if (this.form.booked_datetime) {
        return this.form.booked_datetime.split("T")[0];
      }
      return null;
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
  background-color: #ff7f04; /* Background color for the card title */
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
