import { getTheme, setTheme } from "../utils/theme.js";
import { searchTopics } from "../utils/search.js";

// Helper to escape HTML and prevent XSS
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper to highlight matching query terms
function highlightText(text, query) {
  if (!query || !query.trim()) return text;
  const escapedQuery = query.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  return text.replace(regex, `<mark class="bg-brand-yellow/30 text-slate-900 dark:text-white rounded px-0.5 font-semibold">$1</mark>`);
}

// Helper to extract a relevant snippet around the matched query
function getMatchSnippet(topic, query) {
  const cleanQuery = query.toLowerCase().trim();
  
  // 1. Search in sections
  for (const section of topic.sections) {
    const idx = section.content.toLowerCase().indexOf(cleanQuery);
    if (idx > -1) {
      const start = Math.max(0, idx - 25);
      const end = Math.min(section.content.length, idx + cleanQuery.length + 35);
      let snippet = section.content.substring(start, end);
      if (start > 0) snippet = "..." + snippet;
      if (end < section.content.length) snippet = snippet + "...";
      return snippet;
    }
  }
  
  // 2. Search in introduction
  const idx = topic.introduction.toLowerCase().indexOf(cleanQuery);
  if (idx > -1) {
    const start = Math.max(0, idx - 25);
    const end = Math.min(topic.introduction.length, idx + cleanQuery.length + 35);
    let snippet = topic.introduction.substring(start, end);
    if (start > 0) snippet = "..." + snippet;
    if (end < topic.introduction.length) snippet = snippet + "...";
    return snippet;
  }
  
  // 3. Fallback: first sentence
  return topic.introduction.split(".")[0] + "...";
}

export function createHeader({ topics, onMenuToggle, onSearch, onSelectTopic }) {
  const header = document.createElement("header");
  header.className = "sticky top-0 z-30 w-full glass shadow-sm transition-colors duration-300";

  // SVG Icons
  const logoSvg = `
    <svg class="h-8 w-8 text-brand-yellow drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
      <rect width="100" height="100" rx="15" fill="#F7DF1E"/>
      <path d="M72 70C72 75.8 67.8 80 61 80C54.8 80 50.8 76.2 50.8 70.8H56.8C56.8 73.2 58.6 74.8 61 74.8C63.2 74.8 64.8 73.8 64.8 71.4C64.8 69.2 63.6 68.2 60.2 66.8L57.2 65.6C52.4 63.6 50 61.2 50 56.4C50 51.6 54.2 48 60.2 48C65.8 48 69.6 51 69.6 56.2H63.6C63.6 54 62.2 52.8 60.2 52.8C58.4 52.8 57.2 53.6 57.2 55C57.2 56.4 58.2 57.2 61 58.4L64 59.6C69.4 61.8 72 64.4 72 70ZM41.8 80C35.8 80 32 76.2 32 70.8H38C38 73.2 39.2 74.8 41.8 74.8C44.2 74.8 45.4 73.6 45.4 69.2V48.8H51.4V69C51.4 76.4 47.8 80 41.8 80Z" fill="#1E1E24"/>
    </svg>
  `;

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  `;

  const systemIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `;

  header.innerHTML = `
    <div class="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Brand & Mobile Toggle -->
      <div class="flex items-center gap-3">
        <button id="mobile-menu-btn" aria-label="Toggle Navigation Menu" class="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="#" class="flex items-center gap-2.5 hover:opacity-90 transition-opacity flex-shrink-0">
          ${logoSvg}
          <span class="hidden sm:inline font-display font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">JavaScript</span>
        </a>
      </div>

      <!-- Search Area (Centered & Responsive) -->
      <div class="flex-1 max-w-full sm:max-w-md md:max-w-lg relative group" id="search-container">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-accent transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search documentation (Press '/' to focus)..." 
          autocomplete="off"
          class="w-full pl-9 pr-9 py-1.5 text-sm rounded-lg bg-slate-100/80 hover:bg-slate-200 focus:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:focus:bg-slate-900 border border-transparent focus:border-slate-200 dark:focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200/50 dark:focus:ring-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
        />
        <div id="search-clear-btn" class="hidden absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- Suggestions Dropdown -->
        <div id="search-suggestions" class="hidden absolute left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto"></div>
      </div>

      <!-- Theme Switcher -->
      <div class="relative">
        <button id="theme-menu-btn" aria-label="Toggle Theme Menu" class="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors flex items-center justify-center">
          <span id="active-theme-icon"></span>
        </button>

        <!-- Dropdown Menu -->
        <div id="theme-dropdown" class="hidden absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-fade-in">
          <button data-theme="light" class="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
            ${sunIcon}
            Light
          </button>
          <button data-theme="dark" class="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
            ${moonIcon}
            Dark
          </button>
          <button data-theme="system" class="w-full px-4 py-2 text-left text-sm flex items-center gap-2.5 text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors">
            ${systemIcon}
            System
          </button>
        </div>
      </div>

    </div>
  `;

  // Bind internal elements
  const mobileMenuBtn = header.querySelector("#mobile-menu-btn");
  const searchInput = header.querySelector("#search-input");
  const searchClearBtn = header.querySelector("#search-clear-btn");
  const suggestionsDropdown = header.querySelector("#search-suggestions");
  const themeMenuBtn = header.querySelector("#theme-menu-btn");
  const themeDropdown = header.querySelector("#theme-dropdown");
  const activeThemeIcon = header.querySelector("#active-theme-icon");

  let debounceTimer = null;
  let activeIndex = -1;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    if (typeof onMenuToggle === "function") onMenuToggle();
  });

  // Display suggestions based on query
  function renderSuggestions(query) {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      suggestionsDropdown.classList.add("hidden");
      suggestionsDropdown.innerHTML = "";
      activeIndex = -1;
      return;
    }

    const matches = searchTopics(topics, cleanQuery);
    const limitMatches = matches.slice(0, 5); // Display top 5

    if (limitMatches.length === 0) {
      suggestionsDropdown.innerHTML = `
        <div class="p-4 text-center text-sm text-slate-400 dark:text-slate-500">
          No suggestions found for "<span class="font-semibold text-slate-700 dark:text-slate-300">${escapeHtml(cleanQuery)}</span>"
        </div>
      `;
    } else {
      let itemsHtml = "";
      limitMatches.forEach((topic) => {
        const snippet = getMatchSnippet(topic, cleanQuery);
        const escapedTitle = escapeHtml(topic.title);
        const escapedSnippet = escapeHtml(snippet);

        itemsHtml += `
          <button class="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex flex-col gap-0.5 transition-colors outline-none focus:bg-slate-50 dark:focus:bg-slate-800/40 suggestion-item" data-id="${topic.id}">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">${highlightText(escapedTitle, cleanQuery)}</span>
              <span class="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500">${topic.category}</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-normal font-normal">${highlightText(escapedSnippet, cleanQuery)}</p>
          </button>
        `;
      });
      suggestionsDropdown.innerHTML = itemsHtml;
    }
    suggestionsDropdown.classList.remove("hidden");
    activeIndex = -1; // Reset active suggestion index
  }

  // Search input typing handler
  searchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    if (val.trim().length > 0) {
      searchClearBtn.classList.remove("hidden");
    } else {
      searchClearBtn.classList.add("hidden");
    }

    // Debounce: Wait 250ms after typing ends
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderSuggestions(val);
      if (typeof onSearch === "function") onSearch(val);
    }, 250);
  });

  // Close search suggestions on click selection
  suggestionsDropdown.addEventListener("click", (e) => {
    const item = e.target.closest(".suggestion-item");
    if (item) {
      const id = item.getAttribute("data-id");
      if (typeof onSelectTopic === "function") {
        onSelectTopic(id);
        
        // Reset input, clear list
        searchInput.value = "";
        searchClearBtn.classList.add("hidden");
        suggestionsDropdown.classList.add("hidden");
        
        // Reset search query filter in sidebar
        if (typeof onSearch === "function") onSearch("");
      }
    }
  });

  // Handle keyboard navigation inside search suggestions dropdown
  searchInput.addEventListener("keydown", (e) => {
    const items = suggestionsDropdown.querySelectorAll(".suggestion-item");
    
    // Ignore if suggestions are not visible or empty
    if (suggestionsDropdown.classList.contains("hidden") || items.length === 0) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveSuggestion(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveSuggestion(items);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        items[activeIndex].click();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      suggestionsDropdown.classList.add("hidden");
      searchInput.blur();
    }
  });

  function updateActiveSuggestion(items) {
    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add("bg-slate-100", "dark:bg-slate-800/60");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("bg-slate-100", "dark:bg-slate-800/60");
      }
    });
  }

  // Clear search input button
  searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchClearBtn.classList.add("hidden");
    suggestionsDropdown.classList.add("hidden");
    if (typeof onSearch === "function") onSearch("");
    searchInput.focus();
  });

  // Keyboard shortcut '/' to focus search
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Close suggestions or dropdowns when clicking outside
  window.addEventListener("click", (e) => {
    if (!e.target.closest("#search-container")) {
      suggestionsDropdown.classList.add("hidden");
    }
    themeDropdown.classList.add("hidden");
  });

  // Theme selector functionality
  const updateThemeIcon = (theme) => {
    if (theme === "light") {
      activeThemeIcon.innerHTML = sunIcon;
    } else if (theme === "dark") {
      activeThemeIcon.innerHTML = moonIcon;
    } else {
      activeThemeIcon.innerHTML = systemIcon;
    }
  };

  updateThemeIcon(getTheme());

  themeMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle("hidden");
  });

  themeDropdown.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-theme]");
    if (btn) {
      const selected = btn.getAttribute("data-theme");
      setTheme(selected);
      updateThemeIcon(selected);
      themeDropdown.classList.add("hidden");
    }
  });

  // Keep theme icon in sync if updated elsewhere
  window.addEventListener("theme-change", (e) => {
    updateThemeIcon(e.detail.theme);
  });

  return header;
}
