import App from "./App.vue";
import { store } from "./store";
import { createApp } from "vue";
import { router } from "./router";

createApp(App).use(store).use(router).mount("#app");
