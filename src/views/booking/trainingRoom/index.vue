<template>
  <v-window>
    <v-window-item>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
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
                src="https://img.freepik.com/free-photo/conference-room-interior-modern-office-with-white-walls-monitor_181624-22217.jpg"
              ></v-img>
              <v-card-item>
                <v-card-title>TRAINING ROOM</v-card-title>

                <v-card-subtitle> </v-card-subtitle>
              </v-card-item>
              <v-card-text
                :style="{
                  'font-family': 'Calibri Light, Calibri, sans-serif',
                  'font-size': '15px',
                }"
              >
                <div>
                  A training room is a designated room used for the purposes of
                  informing a company's employees about new skills and
                  information relevant to their work.
                </div>
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>

              <v-card-actions>
                <v-dialog v-model="dialog8" persistent width="1000">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="primary"
                      v-bind="props"
                      :disabled="trainbtn"
                      variant="elevated"
                      class="mx-auto"
                      :style="{}"
                    >
                      Book Now
                    </v-btn>
                  </template>
                  <v-card class="custom-card-room">
                    <v-card-title class="custom-card-title">
                      <span class="text-h5">TRAINING ROOM</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="2">
                            <v-text-field
                              label="Date & Time From*"
                              type="datetime-local"
                              variant="underlined"
                              v-model="form.booked_datetime"
                              required
                              :min="minDate"
                              @update:modelValue="fetchTrainingRoom()"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="2">
                            <v-text-field
                              label="Date & Time To*"
                              type="datetime-local"
                              variant="underlined"
                              v-model="form.booked_datetime_to"
                              required
                              :min="minDateTo"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="1" class="mt-4">
                            <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchTrainingRoom"
                                ></v-btn> -->
                          </v-col>
                          <v-col
                            cols="12
                              "
                            md="4"
                          >
                            <div class="centered-container">
                              <h5 class="text-center">
                                Training Room Schedule
                              </h5>
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
                                        class="text-center"
                                        style="font-size: 14px"
                                      >
                                        Date From
                                      </th>
                                      <th
                                        class="text-center"
                                        style="font-size: 14px"
                                      >
                                        Date To
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
                                        class="text-center"
                                        style="font-size: 12px"
                                      >
                                        {{ item.booked_datetime }}
                                      </td>
                                      <td
                                        class="text-center"
                                        style="font-size: 12px"
                                      >
                                        {{ item.booked_datetime_to }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </v-table>
                              </div>
                            </div>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="12" md="4">
                            <v-text-field
                              label="Purpose*"
                              variant="underlined"
                              v-model="form.purpose"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="2">
                            <v-text-field
                              label="Seats*"
                              variant="underlined"
                              required
                              v-model="form.seats"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="2"
                            ><v-text-field
                              label="Duration"
                              variant="underlined"
                              v-model="duration"
                              readonly
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="4">
                            <v-autocomplete
                              label="Equipments*"
                              variant="underlined"
                              v-model="form.equipments"
                              :items="equipmentlist"
                              item-value="code"
                              item-title="code"
                              multiple
                            ></v-autocomplete>
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
                        @click="closeDialog8()"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        class="save-button"
                        variant="text"
                        @click="booktrainingroom()"
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
const apiequip = new Resource("booking/maintenance/training-equipment");

export default {
  data: () => ({
    form: {
      booked_datetime: null,
      booked_datetime_to: null,
      purpose: null,
      seats: null,
      equipments: null,
    },
    sportslist: [],
    isLoading: false,
    equipmentlist: [],
    trainbtn: null,
    dialog8: false,
    dur: null,
    text: null,
    snackbar: false,
    selection: 1,
    model: null,
  }),
  async mounted() {
    this.fetchall();
    this.fetchequipment();
    this.fetchTrainingRoom();
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
      this.trainbtn = this.sportslist[9].status == "Deactive" ? true : false;
    },
    async fetchequipment() {
      const { data } = await apiequip.list({
        keyword: "",
        key: "",
        order: "",
        limit: "",
      });
      this.equipmentlist = data.data;
      // console.log(this.equipmentlist);
    },
    closeDialog8() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.booked_datetime_to = "";
      this.form.purpose = "";
      this.form.seats = "";
      this.form.equipments = [];
      this.form.duration = "";

      // Close the dialog
      this.dialog8 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    async fetchTrainingRoom() {
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
            if (item.sports.code == "trainingroom") {
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
    async booktrainingroom() {
      await sportApi
        .store({
          sport_id: "trainingroom",
          booked_datetime: this.form.booked_datetime,
          booked_datetime_to: this.form.booked_datetime_to,
          purpose: this.form.purpose,
          sit_capacity: this.form.seats,
          equipment_id: this.form.equipments,
          duration: this.dur,
          companions: this.form.companions == "n/a",
        })

        .then(({ data }) => {
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog8 = false;
        })
        .catch((request) => {
          this.snackbar = true;
          this.text = request.response.data.message;
        });
      this.form.booked_datetime = null;
      this.form.booked_datetime_to = null;
      this.form.purpose = null;
      this.form.seats = null;
      this.form.equipments = null;
      this.duration = null;
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
    minDateTo() {
      const now = new Date();
      // Format the date and time to match the datetime-local input format (YYYY-MM-DDTHH:mm)
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const min = String(now.getMinutes()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    },
    duration() {
      if (this.form.booked_datetime && this.form.booked_datetime_to) {
        const startDateTime = new Date(this.form.booked_datetime);
        const endDateTime = new Date(this.form.booked_datetime_to);

        // Calculate the time difference in milliseconds
        const timeDifference = endDateTime - startDateTime;

        // Convert the time difference to hours
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));

        // Calculate the remaining minutes
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.dur = this.duration = timeDifference / (1000 * 60);

        return `${hours} hours ${minutes} minutes`;
      }
      return "";
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
    "form.booked_datetime_to": function (newVal) {
      if (newVal) {
        const selectedDateTime = new Date(newVal).getTime();
        const currentDateTime = new Date().getTime();
        if (selectedDateTime < currentDateTime) {
          // If the selected date and time is in the past, reset it to the current time
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, "0");
          const min = String(now.getMinutes()).padStart(2, "0");
          this.form.booked_datetime_to = `${
            this.form.booked_datetime_to.split("T")[0]
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
