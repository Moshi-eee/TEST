import { defineStore } from "pinia";
import Resource from "@/api/resource.js";

const asset_inventory_api = new Resource("asset/inventory");

export const useInventoryStore = defineStore("InventoryStore", {
  state: () => ({
    inventory: [],
    user_inventory: [],
    user_id: "",
    is_clicked: false,
  }),
  getters: {
    get_inventory: (state) => state.inventory,

    get_needToResupply: (state) =>
      state.inventory.filter(
        (inventory) => inventory.qty < inventory.item.minimum_qty
      ),
    get_lowStock: (state) =>
      state.inventory.filter(
        (inventory) =>
          inventory.qty < inventory.item.minimum_qty && inventory.qty > 0
      ),
    get_outOfStock: (state) =>
      state.inventory.filter((inventory) => inventory.qty < 1),

    get_highStock() {
      return this.inventory.filter(
        (inventory) => inventory.qty >= inventory.item.minimum_qty
      );
    },

    get_is_clicked: (state) => state.is_clicked,

    get_user_inventory: (state) => state.user_inventory,
  },
  actions: {
    async fetch_inventory(year = null) {
      const { data } = await asset_inventory_api.list({
        limit: -1,
      });
      this.$state.inventory = data.data;
    },
    restock_clicked(isCliked) {
      this.$state.is_clicked = isCliked;
    },
    set_user_transaction(res) {
      this.$state.user_inventory = res;
    },
  },
  persist: true,
});
