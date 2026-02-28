import { useStorage } from "@vueuse/core";

export function useTheme() {
  const theme = useStorage("theme", "light");

  const toggleTheme = (newTheme: string) => {
    theme.value = newTheme;
    applyTheme();
  };

  const applyTheme = () => {
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.documentElement.classList.remove(className);
      }
    });
    if (!theme.value) {
      theme.value = "light";
    }
    document.documentElement.classList.add(`theme-${theme.value}`);
  };

  applyTheme();

  return {
    theme,
    toggleTheme,
    applyTheme,
  };
}
