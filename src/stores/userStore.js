import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: [],
    userall: [],
  }),
  getters: {
    get_user: (state) => state.user,
    get_userall: (state) => state.userall,
  },
  actions: {
    async set_user(res) {
      this.$state.user = res;
      router.push("/user/edit");
    },
    async set_user2(res) {
      this.$state.user = res;
    },
    async set_alluser(res) {
      this.$state.userall = res;
    },
  },
  persist: true,
});
