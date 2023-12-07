<template>
  <v-window>
    <v-window-item>
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
              src="https://img.freepik.com/free-photo/silhouette-view-basketball-player-holding-basket-ball-black-wall_155003-1370.jpg"
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Basketball</v-card-title>
              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Basketball is one of the most popular sports in the world and
                one of the most widely viewed. It is a team sport that involves
                two teams of five active players each trying to score points
                against one another by throwing a ball through a 300 cm (10
                feet) high hoop (the 'basket') under organised rules.
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog" persistent width="1050">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="basketbtn"
                    variant="elevated"
                    class="mx-auto"
                    :style="{}"
                  >
                    Book Now
                  </v-btn>
                </template>

                <v-card class="custom-card">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">BASKETBALL</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-row>
                          <v-col cols="12" md="9" class="mt-5">
                            <v-select
                              label="Type*"
                              :items="['Outdoor']"
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
                              @update:modelValue="fetchBasketball()"
                              required
                              :min="minDate"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="3" class="mt-4">
                            <!-- <v-btn
                                icon="mdi mdi-card-search-outline"
                                size="small"
                              ></v-btn> -->
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="9">
                            <v-select
                              label="Duration*"
                              :items="['1 Hour', '2 Hours']"
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
                              v-model="form.companions"
                              label="Companions*"
                              variant="underlined"
                              required
                            ></v-combobox>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <!-- Add a title above the v-table -->
                          <h5 class="text-center">Basketball Schedule</h5>

                          <!-- Wrap the v-table in a container with a fixed height and scroll overflow -->
                          <div class="table-container">
                            <v-table>
                              <thead>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
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
                                  <td class="text-left" style="font-size: 12px">
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
                                    {{
                                      calculateEndTime(
                                        item.duration,
                                        item.booked_datetime
                                      )
                                    }}
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
                      @click="bookbasket()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
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
              src="https://img.freepik.com/free-photo/badminton-concept-with-shuttlecock-racket_23-2149940866.jpg"
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Badminton</v-card-title>
              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Badminton is a racket sport played by either two opposing
                players (singles) or two opposing pairs (doubles), who take
                positions on opposite halves of a rectangular court that is
                divided by a net.
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog1" persistent width="1050">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="badmintonbtn"
                    variant="elevated"
                    class="mx-auto"
                  >
                    Book Now
                  </v-btn>
                </template>
                <v-card class="custom-card-badminton">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">BADMINTON</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-select
                                label="Type*"
                                :items="['Court A', 'Court B', 'Court C']"
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
                                @update:modelValue="fetchBadminton()"
                                required
                                :min="minDate"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-4">
                              <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchBadminton"
                                ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour', '2 Hours']"
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
                            <h5 class="text-center">Badminton Schedule</h5>

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
                                    <th
                                      class="text-center"
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
                                      class="text-center"
                                      style="font-size: 12px"
                                    >
                                      {{ item.booked_datetime }}
                                    </td>
                                    <td
                                      class="text-center"
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
                                      class="text-center"
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
                      @click="closeDialog1()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      class="save-button"
                      variant="text"
                      @click="bookbadminton()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
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
              src="https://img.freepik.com/free-photo/table-tennis-ping-pong_1232-2632.jpg

                  "
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Table Tennis</v-card-title>

              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Table tennis, also known as Ping-Pong, is an indoor game played
                on a flat table between two players. The objective of the game
                is to hit the ball over the net and bounce it to the other side
                of the table in a way that the opponent misses hitting it back.
                <br />
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog2" persistent width="1050">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="tbltennisbtn"
                    variant="elevated"
                    class="mx-auto"
                    :style="{}"
                  >
                    Book Now
                  </v-btn>
                </template>
                <v-card class="custom-card-tabletennis">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">TABLE TENNIS</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-select
                                label="Type*"
                                :items="['Table A', 'Table B']"
                                variant="underlined"
                                v-model="form.type"
                                class="smaller-combobox"
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-text-field
                                label="Date & Time*"
                                type="datetime-local"
                                v-model="form.booked_datetime"
                                variant="underlined"
                                required
                                :min="minDate"
                                @update:modelValue="fetchTabletennis()"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-4">
                              <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchTabletennis"
                                ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour', '2 Hours']"
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
                            <h5 class="text-center">Table Tennis Schedule</h5>

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
                                    <th
                                      class="text-center"
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
                                      class="text-center"
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
                      @click="closeDialog2()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      class="save-button"
                      variant="text"
                      @click="booktabletennis()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
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
              src="https://img.freepik.com/free-photo/tennis-racket-new-tennis-ball-freshly-painted-tennis-court_146671-18857.jpg

                  "
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Tennis</v-card-title>

              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Tennis is a racket sport that can be played individually against
                a single opponent (singles) or between two teams of two players
                each (doubles). Each player uses a tennis racket that is strung
                with cord to strike a hollow rubber ball covered with felt over
                a net and into the opponent's court.
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog4" persistent width="950">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="tennisbtn"
                    variant="elevated"
                    class="mx-auto"
                    :style="{}"
                  >
                    Book Now
                  </v-btn>
                </template>
                <v-card class="custom-card-tennis">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">TENNIS</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-row> </v-row>
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-text-field
                                label="Date & Time*"
                                type="datetime-local"
                                variant="underlined"
                                v-model="form.booked_datetime"
                                required
                                :min="minDate"
                                @update:modelValue="fetchTennis()"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-8">
                              <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchTennis"
                                ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour', '2 Hours']"
                                variant="underlined"
                                class="smaller-combobox"
                                v-model="form.duration"
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
                            <h5 class="text-center">Tennis Schedule</h5>

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
                                      class="text-left"
                                      style="font-size: 12px"
                                    >
                                      {{ item.booked_datetime }}
                                    </td>

                                    <td
                                      class="text-center"
                                      style="font-size: 12px"
                                    >
                                      {{
                                        calculateEndTime(
                                          item.duration,
                                          item.booked_datetime
                                        )
                                      }}
                                    </td>
                                  </tr>
                                </tbody>
                              </v-table>
                            </div>
                          </div>
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
                      @click="closeDialog4()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      class="save-button"
                      variant="text"
                      @click="booktennis()"
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
              src="https://img.freepik.com/free-photo/closeup-billiard-balls-sticks-table_181624-58877.jpg

                  "
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Billiards</v-card-title>
              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Billiards is a cue sport played on a rectangular table with the
                goal of potting balls into pockets using a cue stick.
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog5" persistent width="1050">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="billiardsbtn"
                    variant="elevated"
                    class="mx-auto"
                    :style="{}"
                  >
                    Book Now
                  </v-btn>
                </template>
                <v-card class="custom-card-billiards">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">BILLIARDS</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-select
                                label="Type*"
                                :items="['Table A', 'Table B']"
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
                                @update:modelValue="fetchBilliards()"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-4">
                              <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchBilliards"
                                ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour', '2 Hours']"
                                v-model="form.duration"
                                variant="underlined"
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
                            <h5 class="text-center">Billiards Schedule</h5>

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
                                      class="text-center"
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
                                      class="text-center"
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
                                      class="text-center"
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
                      @click="closeDialog5()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      class="save-button"
                      variant="text"
                      @click="bookbilliards()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
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
              src="https://img.freepik.com/free-photo/ball-hitting-net_23-2149450951.jpg

                  "
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Volleyball</v-card-title>

              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Volleyball, game played by two teams, usually of six players on
                a side, in which the players use their hands to bat a ball back
                and forth over a high net, trying to make the ball touch the
                court within the opponents' playing area before it can be
                returned.
                <br />
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog6" persistent width="950">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="volleyballbtn"
                    variant="elevated"
                    class="mx-auto"
                    :style="{}"
                  >
                    Book Now
                  </v-btn>
                </template>
                <v-card class="custom-card-volleyball">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">VOLLEYBALL</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-text-field
                                label="Date & Time*"
                                type="datetime-local"
                                variant="underlined"
                                v-model="form.booked_datetime"
                                required
                                :min="minDate"
                                @update:modelValue="fetchVolleyball()"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-8">
                              <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchBilliards"
                                ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour', '2 Hours']"
                                v-model="form.duration"
                                variant="underlined"
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
                            <h5 class="text-center">Volleyball Schedule</h5>

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
                                      {{
                                        calculateEndTime(
                                          item.duration,
                                          item.booked_datetime
                                        )
                                      }}
                                    </td>
                                  </tr>
                                </tbody>
                              </v-table>
                            </div>
                          </div>
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
                      @click="closeDialog6()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      class="save-button"
                      variant="text"
                      @click="bookvolleyball()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
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
              src="https://img.freepik.com/free-photo/soccer-into-goal-success-concept_1150-5276.jpg

                  "
            ></v-img>
            <v-divider class="mx-4 mb-0"></v-divider>
            <v-card-item>
              <v-card-title>Futsal</v-card-title>

              <v-card-subtitle> </v-card-subtitle>
            </v-card-item>
            <v-card-text
              :style="{
                'font-family': 'Calibri Light, Calibri, sans-serif',
                'font-size': '15px',
              }"
            >
              <div>
                Futsal is the FIFA-recognised form of small-sided indoor
                football (the word is a contraction of the Spanish 'fútbol
                sala'). It is played between two teams who each have five
                players on the pitch at any one time, with rolling substitutes
                and a smaller ball than soccer that is harder and less bouncy.
                <br />
                <br />
              </div>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
              <v-dialog v-model="dialog7" persistent width="950">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :disabled="futsalbtn"
                    variant="elevated"
                    class="mx-auto"
                    :style="{}"
                  >
                    Book Now
                  </v-btn>
                </template>
                <v-card class="custom-card-futsal">
                  <v-card-title class="custom-card-title">
                    <span class="text-h5">FUTSAL</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-row>
                            <v-col cols="12" md="9" class="mt-5">
                              <v-text-field
                                label="Date & Time*"
                                type="datetime-local"
                                variant="underlined"
                                v-model="form.booked_datetime"
                                required
                                :min="minDate"
                                @update:modelValue="fetchFutsal()"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="mt-8">
                              <!-- <v-btn
                                  icon="mdi mdi-card-search-outline"
                                  size="small"
                                  @click="fetchFutsal"
                                ></v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="9">
                              <v-select
                                label="Duration*"
                                :items="['1 Hour', '2 Hours']"
                                v-model="form.duration"
                                variant="underlined"
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
                                v-model="form.companions"
                                label="Companions*"
                                variant="underlined"
                                required
                              ></v-combobox>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6">
                          <div>
                            <!-- Add a title above the v-table -->
                            <h5 class="text-center">Futsal Schedule</h5>

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
                                      {{
                                        calculateEndTime(
                                          item.duration,
                                          item.booked_datetime
                                        )
                                      }}
                                    </td>
                                  </tr>
                                </tbody>
                              </v-table>
                            </div>
                          </div>
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
                      @click="closeDialog7()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      class="save-button"
                      variant="text"
                      @click="bookfutsal()"
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
    isLoading: false,

    basketbtn: null,
    badmintonbtn: null,
    tbltennisbtn: null,
    tennisbtn: null,
    billiardsbtn: null,
    volleyballbtn: null,
    futsalbtn: null,
    text: null,
    snackbar: false,
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    dialog5: false,
    dialog6: false,
    dialog7: false,
    selection: 1,
    model: null,
  }),
  async mounted() {
    this.fetchallstatus();
    this.fetchBasketball();
    this.fetchBadminton();
    this.fetchTabletennis();
    this.fetchTennis();
    this.fetchBilliards();
    this.fetchVolleyball();
    this.fetchFutsal();
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
    closeDialog1() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog1 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    closeDialog2() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog2 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    closeDialog4() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog4 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    closeDialog5() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog5 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    closeDialog6() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog6 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    closeDialog7() {
      // Reset form data or other variables used in the dialog
      this.form.type = "";
      this.form.booked_datetime = "";
      this.form.duration = "";
      this.form.companions = [];

      // Close the dialog
      this.dialog7 = false;

      // Refresh the data in the v-table (fetch the data again or reset to initial state)
      this.sportsList = ""; // Assuming you have a method to fetch the sports data
    },
    async fetchallstatus() {
      const { data } = await apisportlist.list({
        keyword: "",
        key: "",
        order: "",
        limit: "",
      });
      this.sportslist = data.data;
      this.basketbtn = this.sportslist[0].status == "Deactive" ? true : false;
      this.badmintonbtn =
        this.sportslist[1].status == "Deactive" ? true : false;
      this.tbltennisbtn =
        this.sportslist[2].status == "Deactive" ? true : false;
      this.tennisbtn = this.sportslist[3].status == "Deactive" ? true : false;
      this.billiardsbtn =
        this.sportslist[4].status == "Deactive" ? true : false;
      this.volleyballbtn =
        this.sportslist[5].status == "Deactive" ? true : false;
      this.futsalbtn = this.sportslist[6].status == "Deactive" ? true : false;
    },
    async fetchBasketball() {
      if (!this.form.booked_datetime) {
        // If datetime is null or empty, do nothing
        return;
      }

      this.isLoading = true;

      // Fetch today's date

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
            if (item.sports.code == "basketball") {
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
    async fetchBadminton() {
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
            if (item.sports.code == "badminton") {
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
    async fetchTabletennis() {
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
            if (item.sports.code == "tabletennis") {
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
    async fetchTennis() {
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
            if (item.sports.code == "tennis") {
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
    async fetchBilliards() {
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
            if (item.sports.code == "billiards") {
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
    async fetchVolleyball() {
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
            if (item.sports.code == "volleyball") {
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
    async fetchFutsal() {
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
            if (item.sports.code == "futsal") {
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
    async bookbasket() {
      await sportApi
        .store({
          sport_id: "basketball",
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
          console.log(data);
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
    async bookbadminton() {
      await sportApi
        .store({
          sport_id: "badminton",
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
          console.log(data);
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog1 = false;
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
    async booktabletennis() {
      await sportApi
        .store({
          sport_id: "tabletennis",
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
          console.log(data);
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog2 = false;
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
    async booktennis() {
      await sportApi
        .store({
          sport_id: "tennis",
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
          console.log(data);
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog3 = false;
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
    async bookbilliards() {
      await sportApi
        .store({
          sport_id: "billiards",
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
          console.log(data);
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog4 = false;
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
    async bookvolleyball() {
      await sportApi
        .store({
          sport_id: "volleyball",
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
          console.log(data);
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog5 = false;
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
    async bookfutsal() {
      await sportApi
        .store({
          sport_id: "futsal",
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
          console.log(data);
          this.snackbar = true;
          this.text = "Successfully booked";
          this.dialog7 = false;
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
.table-container {
  max-height: 350px; /* Set a fixed maximum height for the container */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds the height */
}
th {
  font-size: 15px; /* Adjust the font size as needed */
}
td {
  font-size: 14px; /* Adjust the font size as needed */
}
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
