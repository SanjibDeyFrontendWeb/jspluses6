const THEME_KEY = "js_docs_theme";

// Helper to determine system dark status
const isSystemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

export function initTheme() {
  const currentTheme = getTheme();
  applyTheme(currentTheme);

  // Listen to system changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getTheme() === "system") {
      applyTheme("system");
    }
  });
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "system";
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
  
  // Dispatch custom event for elements listening to theme changes
  window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
}

function applyTheme(theme) {
  const doc = document.documentElement;
  if (theme === "dark" || (theme === "system" && isSystemDark())) {
    doc.classList.add("dark");
  } else {
    doc.classList.remove("dark");
  }
}
