import axios from "axios";
import App from "./App.vue";
import { createApp } from "vue";
import { store, isLoading } from "./store";
import { router } from "./router";
import registerGlobalComponents from "@/common/components";

const app = createApp(App);

/**
 * Global components
 */
registerGlobalComponents(app);

/**
 * Global properties
 */
app.config.globalProperties.$isLoading = isLoading;
axios.defaults.baseURL = process.env.VUE_APP_COINGECKO_API;

/**
 * Mount application
 */
app.use(store).use(router).mount("#app");
