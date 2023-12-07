<script setup>
import { useBookingStore } from "@/stores/bookingStore.js";
const bookStore = useBookingStore();

// Function to calculate consumed hours and minutes
function getConsumedTime(started, ended) {
  const startTime = new Date(started);
  const endTime = new Date(ended);
  const timeDiff = endTime.getTime() - startTime.getTime();

  // Calculate hours
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));

  // Calculate remaining milliseconds after subtracting hours
  const remainingMilliseconds = timeDiff - hours * 1000 * 60 * 60;

  // Calculate minutes
  const minutes = Math.floor(remainingMilliseconds / (1000 * 60));

  return { hours, minutes };
}
</script>

<template>
  <div>
    <img
      src="/src/assets/CentralOneLogo.png"
      alt="Logo"
      style="width: 100px; height: 25px; margin: 10px auto; display: block"
    />

    <h3 class="text-center m-0"><b>Booking Requests Report</b></h3>
    <p class="text-center m-0">
      Date Between {{ bookStore.dateStart }} and {{ bookStore.dateEnd }}
    </p>
    <table>
      <thead>
        <tr>
          <th width="1%" style="font-size: 15px; font-weight: bold">#</th>
          <th width="10%" style="font-size: 15px; font-weight: bold">
            Transaction Date
          </th>
          <th width="10%" style="font-size: 15px; font-weight: bold">
            Booking Date
          </th>
          <th width="13%" style="font-size: 15px; font-weight: bold">Client</th>
          <th class="text-left" style="font-size: 15px; font-weight: bold">
            Gender
          </th>
          <th class="text-center" style="font-size: 15px; font-weight: bold">
            Employee #
          </th>
          <th class="text-center" style="font-size: 15px; font-weight: bold">
            Business Unit
          </th>
          <th class="text-left" style="font-size: 15px; font-weight: bold">
            Time In
          </th>
          <th class="text-left" style="font-size: 15px; font-weight: bold">
            Time Out
          </th>
          <th style="font-size: 12px; font-weight: bold">Consumed Hours</th>
          <th class="text-left" style="font-size: 15px; font-weight: bold">
            Facility
          </th>
          <th width="50%" style="font-size: 15px; font-weight: bold">
            Companions
          </th>
          <th width="5%" style="font-size: 15px; font-weight: bold">
            Companions #
          </th>
          <th class="text-left" style="font-size: 15px; font-weight: bold">
            Status
          </th>
          <th style="font-size: 12px; font-weight: bold">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in bookStore.get_report" :key="item.name">
          <td style="width: 5px">{{ index + 1 }}</td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.created_date }}
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.booked_datetime }}
          </td>
          <td style="width: 10px; font-size: 14px">
            {{ item.userprofile.first_name }} {{ item.userprofile.last_name }}
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.userprofile.gender }}
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.userprofile.emp_code }}
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.userprofile.business_unit.name }}
          </td>
          <td style="width: 10px; font-size: 14px">
            {{ item.started }}
          </td>
          <td style="width: 10px; font-size: 14px">
            {{ item.ended }}
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ getConsumedTime(item.started, item.ended).hours }} hours
            {{ getConsumedTime(item.started, item.ended).minutes }} minutes
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.sports.code }}
          </td>
          <td style="width: 10px; font-size: 10px; text-align: center">
            <template v-for="item in item.companions" :key="item"
              >{{ item }},
            </template>
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ item.companions.length }}
          </td>
          <td style="width: 10px; font-size: 14px">
            {{ item.booking_status }}
          </td>
          <td style="width: 10px; font-size: 14px; text-align: center">
            {{ Math.floor(item.duration / 60) }} hours
            {{ item.duration % 60 }} minutes
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- {{ bookStore.report }} -->
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #000; /* Add a border to the whole table */
}

td {
  border: 1px solid #000; /* Add borders to table cells */
  padding: 8px; /* Add some padding for spacing */
}
th {
  border: 1px solid #000; /* Add borders to table cells */
  padding: 8px; /* Add some padding for spacing */
}
</style>
