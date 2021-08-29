import App from "./App.vue";
import { store } from "./store";
import { createApp } from "vue";
import { router } from "./router";

import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_COINGECKO_API;

createApp(App).use(store).use(router).mount("#app");
