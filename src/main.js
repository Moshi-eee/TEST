// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import VueApexCharts from "vue3-apexcharts";

const pinia = createPinia();
import App from "@/layouts/App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";

import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: 123123,
  cluster: 123123,
  wsHost: "192.168.3.114",
  // wsHost: "127.0.0.1",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#3f51b5",
          secondary: "#2196f3",
          accent: "#ffeb3b",
          error: "#f44336",
          warning: "#ff9800",
          info: "#00bcd4",
          success: "#4caf50",
        },
      },
    },
  },
  components,
  directives,
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
});
pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(VueApexCharts);

app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");
