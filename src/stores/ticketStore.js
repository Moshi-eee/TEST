import { defineStore } from "pinia";
import router from "@/router";

export const useTicketStore = defineStore("ticket", {
  state: () => ({
    ticket: [],
    agent: [],
    group: "",
  }),
  getters: {
    get_ticket: (state) => state.ticket,
    get_agent: (state) => state.agent,
    get_group: (state) => state.group,
  },
  actions: {
    async set_ticket(res, print = false) {
      this.$state.ticket = res;
      if (!print) router.push("ticket/messages");
      else window.open(print, "_blank");
    },
    async set_agent(res) {
      this.$state.agent = res;
    },
    async set_group(res) {
      this.$state.group = res;
    },
  },
  persist: true,
});
