import { defineConfig } from "vitepress";
import { baseSidebar, nav } from "./config/base";
import { businessSidebar, businessNav } from "./config/business";

export default defineConfig({
  title: "Yo Component Library",
  description: "Vue 3 Component Library based on Element Plus",
  base: "/my-component/",
  themeConfig: {
    sidebar: [...baseSidebar, ...businessSidebar],
    nav: [...nav, ...businessNav],
  },
});
