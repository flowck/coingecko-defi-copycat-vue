import App from "./App.vue";
import { store } from "./store";
import { createApp } from "vue";
import { router } from "./router";
import registerGlobalComponents from "@/common/components";

import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_COINGECKO_API;

const app = createApp(App);

registerGlobalComponents(app);

app.use(store).use(router).mount("#app");
