import { createApp } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import App from "./App.vue";
import Admin from "./components/Admin.vue";
import HelloWorld from "./components/HelloWorld.vue";
import HelloPage from "./components/HelloPage.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/admin", component: Admin },
  { path: "/backup", component: HelloPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
