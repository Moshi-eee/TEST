<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { userouterStore } from "@/stores/routerStore.js";

import { useDisplay } from "vuetify";

const { width } = useDisplay();

const authStore = useAuthStore();
const routeStore = userouterStore();

import router from "@/router";
const sidenav = routeStore.get_routerpath;

const drawer = ref(null);
const navs = ref([]);

onMounted(async () => {
  navs.value = routeStore.get_routelink;
  if (authStore.get_user.password_change == null) {
    router.push("/changepassword");
  }
  if (!navs.value) {
    selectnav("Account");
  }
});

const selectnav = (e) => {
  if (width.value <= 1200) {
    drawer.value == true ? true : (drawer.value = !drawer.value);
  }

  navs.value = sidenav.filter((s) => s.title === e)[0].sub;
  routeStore.set_route(sidenav.filter((s) => s.title === e)[0].sub);
};

const logout = () => {
  authStore.clear();
  localStorage.removeItem("auth");
  localStorage.removeItem("route");
  // routeStore.clear_route();
};
</script>

<template>
  <v-app id="inspire" class="bg-light-1">
    <v-navigation-drawer permanent rail color="blue-darken-3">
      <v-list density="compact" nav>
        <div v-for="i in sidenav" :key="i.icon">
          <v-list-item
            :prepend-icon="i.icon"
            :title="i.title"
            :value="i.title"
            v-if="authStore.check(i.per)"
            @click="selectnav(i.title)"
          >
            <v-tooltip
              activator="parent"
              location="start"
              v-if="width >= 500"
              >{{ i.title }}</v-tooltip
            >
          </v-list-item>
        </div>
      </v-list>
      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item
            title="globe"
            value="globe"
            @click="router.push('/social/media')"
          >
            <template v-slot:prepend>
              <v-avatar image="/globe.png"> </v-avatar>
            </template>
            <v-tooltip activator="parent" location="start"
              >Social Media</v-tooltip
            >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi mdi-message-reply-text"
            title="Chats"
            value="Chats"
            @click="router.push('/comming/soon')"
            ><v-tooltip activator="parent" location="start">Chats</v-tooltip>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi mdi-account-circle"
            :title="authStore.get_user.name"
            :subtitle="authStore.get_user.email"
            @click="selectnav('Account')"
          >
            <v-tooltip activator="parent" location="start">{{
              authStore.get_user.name
            }}</v-tooltip>
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="LogOut"
            value="LogOut"
            @click="logout"
            ><v-tooltip activator="parent" location="start">Logout</v-tooltip>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer" theme="light" class="bg-light-2">
      <v-list>
        <template v-for="a in navs" :key="a.icon">
          <v-list-item
            :prepend-icon="a.icon"
            :title="a.title"
            :value="a.title"
            :to="a.to"
            v-if="a.sub.length == 0 && authStore.check(a.per)"
          ></v-list-item>
          <v-list-group
            v-if="a.sub.length > 0 && authStore.check(a.per)"
            :value="a.title"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="a.icon"
                :title="a.title"
              ></v-list-item>
            </template>
            <div v-for="s in a.sub" :key="s.title">
              <v-list-item
                :title="s.title"
                :value="s.title"
                :to="s.to"
                v-if="authStore.check(s.per)"
              ></v-list-item>
            </div>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!--  -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="bg-light-1">
        <v-img
          class="mx-2"
          :src="'/CentralOneLogo.png'"
          height="60"
          max-width="170"
          contain
        ></v-img
      ></v-app-bar-title>
    </v-app-bar>

    <v-app-bar
      class="bg-light-1"
      color="grey-lighten-4"
      flat
      height="48"
      location="bottom"
      permanent
    >
    </v-app-bar>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<style>
body {
  font-size: 13px;
}
.bg-light-1 {
  background-image: repeating-linear-gradient(
      135deg,
      rgba(202, 202, 202, 0.09) 0px,
      rgba(202, 202, 202, 0.09) 1px,
      transparent 1px,
      transparent 11px
    ),
    repeating-linear-gradient(
      45deg,
      rgba(202, 202, 202, 0.09) 0px,
      rgba(202, 202, 202, 0.09) 1px,
      transparent 1px,
      transparent 11px
    ),
    linear-gradient(90deg, rgb(251, 251, 251), rgb(251, 251, 251));
}
.bg-light-2 {
  background-image: repeating-linear-gradient(
      45deg,
      rgb(255, 255, 255) 0px,
      rgb(255, 255, 255) 10px,
      transparent 10px,
      transparent 11px
    ),
    repeating-linear-gradient(
      135deg,
      rgb(255, 255, 255) 0px,
      rgb(255, 255, 255) 10px,
      transparent 10px,
      transparent 11px
    ),
    linear-gradient(90deg, hsl(256, 7%, 84%), hsl(256, 7%, 84%));
}
</style>
