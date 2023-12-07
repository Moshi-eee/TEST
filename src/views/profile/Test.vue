<script setup></script>

<template>
  <v-row>
    <v-col cols="12" md="2">
      <v-card>
        <div
          class="v-card--material pa-3 v-card-profile v-card v-sheet theme--light"
        >
          <div class="d-flex grow flex-wrap">
            <div
              class="v-avatar mx-auto v-card--material__avatar elevation-6 grey"
              style="height: 128px; min-width: 128px; width: 128px"
            >
              <div class="v-responsive v-image">
                <div
                  class="v-responsive__sizer"
                  style="padding-bottom: 100%"
                ></div>
                <div
                  class="v-image__image v-image__image--cover"
                  style="
                    background-image: url('https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg');
                    background-position: center center;
                  "
                ></div>
                <div class="v-responsive__content" style="width: 400px"></div>
              </div>
            </div>
          </div>
          <div class="v-card__text text-center">
            <h6 class="display-1 mb-1 grey--text">IT Technician</h6>
            <h4 class="display-2 font-weight-light mb-3 black--text">
              Ronel Victor Martinez <br />
              <h5 class="display-2 font-weight-light mb-3 black--text">
                COBPI-0015
              </h5>
            </h4>
          </div>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="10">
      <v-card class="fill-height">
        <v-card class="custom-width margin-sides">
          <div class="d-flex grow flex-wrap justify-center">
            <div
              class="text-start v-card--material__heading mb-n6 v-sheet theme--dark elevation-6 success pa-7"
              style="width: 100%"
            >
              <v-row>
                <v-col cols="12" md="2">
                  <h1 class="user-profile">User Profile</h1>
                </v-col>
                <v-col cols="12" md="10">
                  <v-btn icon="mdi mdi-update" class="update-button"> </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
        <v-row>
          <v-col cols="12" md="2" class="custom-margin">
            <v-select
              label="Salutation"
              :items="['Mr', 'Mrs', 'Ms']"
              variant="underlined"
              density="compact"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="First Name"
              variant="underlined"
              density="compact"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-text-field
              label="Middle Name"
              variant="underlined"
              density="compact"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-text-field
              label="Last Name"
              variant="underlined"
              density="compact"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-select
              label="Suffix"
              :items="['Jr', 'Sr', 'II', 'III', 'PhD', 'Engr', 'MS', 'Dr.']"
              variant="underlined"
              density="compact"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-autocomplete
              label="Nationality"
              variant="underlined"
              density="compact"
              readonly
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-select
              label="Gender"
              :items="['Male', 'Female']"
              variant="underlined"
              density="compact"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-select
              label="Marital Status"
              :items="['Single', 'Married', 'Separated', 'Divorced', 'Widowed']"
              variant="underlined"
              density="compact"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-text-field
              label="Birthday"
              type="date"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Place of Birth"
              variant="underlined"
              readonly
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-select
              label="Religion"
              variant="underlined"
              density="compact"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-text-field
              label="Contact no."
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Email"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-file-input
              label="Picture"
              accept="image/*"
              clearable
              @change="convertToBase64"
              @blur="convertToBase64"
              density="compact"
              variant="underlined"
              readonly
            ></v-file-input>
          </v-col>
          <v-divider :thickness="4" class="mb-4"></v-divider>
          <h3 class="custom-margin-head">Present Address</h3>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="custom-margin">
            <v-combobox
              label="Province"
              density="compact"
              variant="underlined"
              readonly
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-combobox
              label="Municipality / City"
              density="compact"
              variant="underlined"
              readonly
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-combobox
              label="Barangay"
              density="compact"
              variant="underlined"
              readonly
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Street"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1" class="custom-margin">
            <v-text-field
              label="Zipcode"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-divider :thickness="4" class="mb-4"></v-divider>
          <h3 class="custom-margin-head">Permanent Address</h3>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="custom-margin">
            <v-combobox
              label="Province"
              density="compact"
              variant="underlined"
              readonly
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-combobox
              label="Municipality / City"
              density="compact"
              variant="underlined"
              readonly
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-combobox
              label="Barangay"
              density="compact"
              variant="underlined"
              readonly
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Street"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1" class="custom-margin">
            <v-text-field
              label="Zipcode"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-divider :thickness="3" class="mb-5"></v-divider>
          <h3 class="custom-margin-head">Educational Background</h3>
        </v-row>
        <v-row>
          <v-row v-for="(n, index) in educ" :key="[index]">
            <v-col cols="12" md="2" class="custom-margin">
              <v-select
                label="Attainment "
                density="compact"
                variant="underlined"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="3" class="custom-margin">
              <v-text-field
                label="Name School "
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="custom-margin">
              <v-text-field
                label="Course "
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2" class="custom-margin">
              <v-text-field
                label="Graduated Date: "
                type="date"
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="1" class="custom-margin">
              <v-btn
                variant="outlined"
                density="compact"
                @click="removeeduc(index)"
                class="custom-margin-remove"
              >
                - remove
              </v-btn>
            </v-col>
          </v-row>

          <v-btn
            variant="outlined"
            density="compact"
            class="custom-margin-add-1"
          >
            + add new
          </v-btn>
          <v-divider :thickness="3" class="mb-5"></v-divider>
          <h3 class="custom-margin-head">Family Data</h3>
        </v-row>
        <v-row>
          <v-row v-for="(n, index) in family" :key="[index]">
            <v-col cols="12" md="2" class="custom-margin">
              <v-select
                label="Relationship "
                density="compact"
                variant="underlined"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="3" class="custom-margin">
              <v-text-field
                label="Name "
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="2" class="custom-margin">
              <v-text-field
                label="Occupation "
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2" class="custom-margin">
              <v-text-field
                label="Contact No "
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="2" class="custom-margin">
              <v-text-field
                label="Birth Date "
                type="date"
                density="compact"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="1" class="custom-margin">
              <v-btn
                variant="outlined"
                density="compact"
                @click="removefamily(index)"
                class="custom-margin-remove"
              >
                - remove
              </v-btn>
            </v-col>
          </v-row>
          <v-btn variant="outlined" density="compact" class="custom-margin-add">
            + add new
          </v-btn>
          <v-divider :thickness="3" class="mb-5"></v-divider>
          <h3 class="custom-margin-head">Goverment Information</h3>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="SSS No."
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Pag-ibig No."
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Philhealth No."
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-text-field
              label="Tin No."
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-divider :thickness="3" class="mb-5"></v-divider>
          <h3 class="custom-margin-head">Employment Information</h3>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="RFID"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Biometic"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Employee Code"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-select
              label="Employee Category"
              density="compact"
              :items="['Expat', 'Local']"
              variant="underlined"
              readonly
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-select
              label="Rank"
              density="compact"
              :items="['Executive', 'Manager', 'Supervisor', 'Rank and File']"
              variant="underlined"
              readonly
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-select
              label="Employment Status"
              density="compact"
              :items="[
                'Regular',
                'Probationary',
                'Project Base',
                'Fix Term',
                'Others',
              ]"
              variant="underlined"
              readonly
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-select
              label="Employee Status"
              density="compact"
              :items="['Active', 'Seperated']"
              variant="underlined"
              readonly
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Atm Account No"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-text-field
              label="ATM Date Receive"
              type="date"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-text-field
              label="Atm Remarks"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-autocomplete
              label="Position"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-autocomplete
              label="Department"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-autocomplete
              label="Business Units"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-autocomplete
              label="Sub Business Units "
              density="compact"
              variant="underlined"
              readonly
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-autocomplete
              label="Lodging"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Date Join"
              type="date"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Date Provisionary"
              type="date"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-text-field
              label="Date Regularization"
              type="date"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="custom-margin">
            <v-text-field
              label="Date Resignation"
              type="date"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="9" class="custom-margin">
            <v-text-field
              label="Reason of resignation"
              density="compact"
              variant="underlined"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-combobox
              label="Immediate Supervisor"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" md="3" class="custom-margin">
            <v-combobox
              label="Immediate Supervisor"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" md="4" class="custom-margin">
            <v-combobox
              label="Immediate Supervisor"
              density="compact"
              variant="underlined"
              readonly
            >
            </v-combobox>
          </v-col>
        </v-row>
        <v-divider :thickness="3" class="mb-5"></v-divider>
        <v-btn color="blue darken-1" variant="text">Close</v-btn>
        <v-btn
          color="blue darken-1"
          variant="text"
          type="submit"
          :loading="loading"
          >Update Profile</v-btn
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.fill-height {
  height: 100%;
}

.margin-sides {
  margin-left: 1%; /* Adjust spacing on the left */
  margin-right: 1%; /* Adjust spacing on the right */
}
.custom-margin {
  margin-left: 1%;
  margin-top: 1%; /* Adjust the left margin as needed */
}
.custom-margin-head {
  margin-left: 2%;
  margin-top: 1%; /* Adjust the left margin as needed */
}
.custom-margin-add-1 {
  margin-left: 2%;
}
.custom-margin-add {
  margin-left: 2%;
  margin-top: 1%; /* Adjust the left margin as needed */
}
.custom-margin-remove {
  margin-right: 2%;
  margin-top: 1%; /* Adjust the left margin as needed */
}
.update-button {
  margin-left: 97%;
  margin-bottom: 1%;
  background-color: #4caf50;
}
</style>
