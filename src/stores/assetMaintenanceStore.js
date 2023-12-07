import { defineStore } from "pinia";
import Resource from "@/api/resource.js";

const asset_category_api = new Resource("asset/maintenance/category");
const asset_location_api = new Resource("asset/maintenance/location");
const asset_brand_api = new Resource("asset/maintenance/brand");
const asset_type_api = new Resource("asset/maintenance/type");
const asset_item_api = new Resource("asset/maintenance/item");

export const useAssetMaintenanceStore = defineStore("assets", {
  state: () => ({
    category_data: [],
    location_data: [],
    brand_data: [],
    type_data: [],
    item_data: [],
  }),
  getters: {
    get_category: (state) => state.category_data,
    get_location: (state) => state.location_data,
    get_brand: (state) => state.brand_data,
    get_type: (state) => state.type_data,
    get_item: (state) => state.item_data,
  },
  actions: {
    async fetch_category() {
      this.$state.category_data = await asset_category_api.list({
        limit: -1,
      });
    },
    async fetch_location() {
      this.$state.location_data = await asset_location_api.list({
        limit: -1,
      });
    },
    async fetch_brand() {
      this.$state.brand_data = await asset_brand_api.list({
        limit: -1,
      });
    },
    async fetch_type() {
      this.$state.type_data = await asset_type_api.list({
        limit: -1,
      });
    },
    async fetch_item() {
      this.$state.item_data = await asset_item_api.list({
        limit: -1,
      });
    },
  },
  persist: true,
});
