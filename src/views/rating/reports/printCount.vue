<script setup>
import { useRatingByCountStore } from "@/stores/ratingStoreByCount.js";
const rateCountStore = useRatingByCountStore();
</script>

<template>
  <div>
    <img
      src="/src/assets/CentralOneLogo.png"
      alt="Logo"
      style="width: 100px; height: 25px; margin: 10px auto; display: block"
    />
    <h3 class="text-center m-0"><b>Cafeteria Count Reports</b></h3>
    <!-- <p class="text-center m-0">
    Date Between {{ bookStore.dateStart }} and {{ bookStore.dateEnd }}
  </p> -->
    <table>
      <thead>
        <tr>
          <th width="1%" style="font-size: 15px; font-weight: bold">#</th>
          <th width="10%" style="font-size: 15px; font-weight: bold">Date</th>
          <th width="10%" style="font-size: 15px; font-weight: bold">
            Meal Type
          </th>
          <th width="13%" style="font-size: 15px; font-weight: bold">
            Food Name
          </th>
          <th
            width="13%"
            class="text-left"
            style="font-size: 15px; font-weight: bold"
          >
            Likes
          </th>
          <th
            width="13%"
            class="text-left"
            style="font-size: 15px; font-weight: bold"
          >
            Dislikes
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rateCountStore.get_report" :key="item.name">
          <td style="width: 10px">{{ index + 1 }}</td>
          <td style="width: 10px; font-size: 14px">
            {{ item.food_sched.date }}
          </td>
          <td style="width: 10px; font-size: 14px">
            {{ item.food_sched.sched_type }}
          </td>
          <td style="width: 20px; font-size: 14px">
            {{ item.food_sched.food_menu.name }}
          </td>
          <td style="width: 5px; font-size: 14px">
            {{ item.like_total }}
          </td>
          <td style="width: 5px; font-size: 14px">
            {{ item.dislike_total }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- {{ rateCountStore.report }} -->
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
