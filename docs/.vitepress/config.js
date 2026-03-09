import { defineConfig } from "vitepress";
import { baseSidebar, nav } from "./config/base";
import { businessSidebar, businessNav } from "./config/business";

export default defineConfig({
  title: "Yo Component Library",
  description: "Vue 3 Component Library based on Element Plus",
  base: "/my-component/",
  themeConfig: {
    sidebar: {
      "/components/base/": baseSidebar,
      "/components/business/": businessSidebar,
    },
    nav: [...nav, ...businessNav],
  },
});
