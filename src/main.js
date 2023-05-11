import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import Admin from "./components/Admin.vue";
import HelloWorld from "./components/HelloWorld.vue";
import HelloPage from "./components/HelloPage.vue";
import Ppt from "./components/Ppt";
import Admin_ppt from "./components/Admin_ppt";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/admin", component: Admin },
  { path: "/backup", component: HelloPage },
  { path: "/ppt", component: Ppt },
  { path: "/admin_ppt", component: Admin_ppt },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
