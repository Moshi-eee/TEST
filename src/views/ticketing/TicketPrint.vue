<script setup>
import { useTicketStore } from "@/stores/ticketStore.js";
const ticketStore = useTicketStore();
</script>

<template>
  <img
    src="/src/assets/CentralOneLogo.png"
    alt="Logo"
    style="width: 100px; height: 25px; margin: 10px auto; display: block"
  />
  <h1 class="text-center m-0"><b>Ticket Report</b></h1>
  <br />
  <br />
  <br />
  <!-- <p class="text-center m-0">
    Date Between {{ bookStore.dateStart }} and {{ bookStore.dateEnd }}
  </p> -->
  <table>
    <thead>
      <tr>
        <th width="3%" style="font-size: 15px; font-weight: bold">#</th>
        <th width="6%" style="font-size: 15px; font-weight: bold">ID</th>
        <th width="10%" style="font-size: 15px; font-weight: bold">Title</th>

        <th
          width="8%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Type
        </th>
        <th
          width="8%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Tag
        </th>
        <th
          width="10%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Customer
        </th>
        <th
          width="5%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Department
        </th>
        <th
          width="5%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Team
        </th>
        <th
          width="7%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Group
        </th>
        <th width="10%" style="font-size: 15px; font-weight: bold">Agent</th>
        <th width="5%" style="font-size: 15px; font-weight: bold">Priority</th>
        <th
          width="5%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Status
        </th>
        <th
          width="8%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Created
        </th>
        <th
          width="8%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Closed
        </th>
        <th
          width="2%"
          class="text-left"
          style="font-size: 15px; font-weight: bold"
        >
          Ratings
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in ticketStore.get_ticket" :key="item">
        <td style="width: 10px">{{ index + 1 }}</td>
        <td style="width: 10px; font-size: 14px">
          {{ item.ID }}
        </td>
        <td style="width: 10px; font-size: 14px">{{ item.Title }}</td>
        <td style="width: 10px; font-size: 14px">
          {{ item.Type }}
        </td>
        <td style="width: 10px; font-size: 14px">
          {{ item.Tag }}
        </td>
        <td style="width: 10px; font-size: 14px">
          {{ item.Customer }}
        </td>
        <td style="width: 10px; font-size: 14px">
          {{ item.Department }}
        </td>
        <td style="width: 10px; font-size: 14px">
          <p v-for="item in item.Team" :key="item">
            {{ item }}
          </p>
        </td>
        <td style="width: 10px; font-size: 14px">{{ item.Group }}</td>
        <td style="width: 10px; font-size: 14px">
          {{ item.Agent }}
        </td>
        <td style="width: 10px; font-size: 14px; text-align: center">
          {{ item.Priority }}
        </td>
        <td style="width: 10px; font-size: 14px; text-align: center">
          {{ item.Status }}
        </td>
        <td style="width: 10px; font-size: 14px">{{ item.Created }}</td>
        <td style="width: 0px; font-size: 14px; text-align: center">
          {{ item.Closed }}
        </td>
        <td style="width: 0px; font-size: 14px; text-align: center">
          {{ item.Ratings }}
        </td>
      </tr>
    </tbody>
  </table>
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
