import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueI18n from "vue-i18n";
import axios from "axios";
import VueAxios from "vue-axios";

import "font-awesome/css/font-awesome.min.css";

createApp(App).use(router, VueI18n, VueAxios, axios).mount("#app");
