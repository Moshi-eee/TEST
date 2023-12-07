import { defineStore } from "pinia";
import router from "@/router";

export const useRatingStore = defineStore("rating", {
  state: () => ({
    report: [],
    created_at: "",
  }),
  getters: {
    get_report: (state) => state.report,
    get_created_at: (state) => state.created_at,
  },
  actions: {
    async set_report(res) {
      this.$state.report = res;
    },
    async set_reportDate(created_at) {
      this.$state.created_at = created_at;
    },
  },
  persist: true,
});
