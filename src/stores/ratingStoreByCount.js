import { defineStore } from "pinia";
import router from "@/router";

export const useRatingByCountStore = defineStore("rating", {
  state: () => ({
    report: [],
    date: "",
  }),
  getters: {
    get_report: (state) => state.report,
    get_date: (state) => state.date,
  },
  actions: {
    async set_report(res) {
      this.$state.report = res;
    },
    async set_reportDate(date) {
      this.$state.date = date;
    },
  },
  persist: true,
});
