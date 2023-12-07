import { defineStore } from "pinia";
import router from "@/router";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    report: [],
    dateStart: "",
    dateEnd: "",
  }),
  getters: {
    get_report: (state) => state.report,
    get_dateStart: (state) => state.dateStart,
    get_dateEnd: (state) => state.dateEnd,
  },
  actions: {
    async set_report(res) {
      this.$state.report = res;
    },
    async set_reportDate(dateStart, dateEnd) {
      this.$state.dateStart = dateStart;
      this.$state.dateEnd = dateEnd;
    },
  },
  persist: true,
});
