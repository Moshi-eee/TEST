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
  if (drawer.value == false) {
    drawer.value == true;
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
  <v-app id="inspire">
    <v-navigation-drawer permanent rail color="grey-lighten-4">
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
            @click="router.push('/comming/soon')"
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
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <template v-for="a in navs" :key="a.icon">
          <v-list-item
            :prepend-icon="a.icon"
            :title="a.title"
            :value="a.title"
            :to="a.to"
            v-if="a.sub.length == 0"
          ></v-list-item>
          <v-list-group v-if="a.sub.length > 0" :value="a.title">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="a.icon"
                :title="a.title"
              ></v-list-item>
            </template>
            <v-list-item
              v-for="s in a.sub"
              :key="s.title"
              :title="s.title"
              :value="s.title"
              :to="s.to"
            ></v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!--  -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        class="mx-2"
        :src="'/CentralOneLogo.png'"
        height="60"
        max-width="170"
        contain
      ></v-img>
      <v-app-bar-title> </v-app-bar-title>
    </v-app-bar>

    <v-app-bar
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
