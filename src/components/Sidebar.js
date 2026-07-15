export function createSidebar({ topics, onSelectTopic }) {
  const sidebarContainer = document.createElement("div");
  sidebarContainer.id = "sidebar-wrapper";
  // The sidebar container has desktop classes (fixed on left) and mobile state will be added by main.js
  sidebarContainer.className = "fixed inset-y-0 left-0 z-50 lg:z-10 w-72 lg:w-64 transform -translate-x-full lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 flex flex-col";

  // Category Icons (SVGs)
  const icons = {
    Basics: `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
    "Core Concepts": `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>`,
    "Data Structures": `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM9 9h6M9 13h6" /></svg>`,
    "Web APIs": `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>`,
    Asynchronous: `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    Advanced: `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>`,
    Resources: `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`,
    Bookmarks: `<svg xmlns="http://www.w3.org/2000/svg" class="h-[1.1rem] w-[1.1rem] text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>`
  };

  // Group topics by category
  const categories = {};
  topics.forEach((topic) => {
    if (!categories[topic.category]) {
      categories[topic.category] = [];
    }
    categories[topic.category].push(topic);
  });

  const renderSidebarContent = (activeId, bookmarkedIds = [], filterQuery = "") => {
    let html = "";

    // If filterQuery is provided, render search result view
    if (filterQuery) {
      const filtered = topics.filter((t) =>
        t.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
        t.introduction.toLowerCase().includes(filterQuery.toLowerCase())
      );

      html += `
        <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Search Results (${filtered.length})</p>
        </div>
        <div class="flex-1 overflow-y-auto px-2 py-3 space-y-1">
      `;

      if (filtered.length === 0) {
        html += `
          <div class="text-center py-8 px-4 text-slate-400 dark:text-slate-500 text-sm">
            No matching topics found.
          </div>
        `;
      } else {
        filtered.forEach((topic) => {
          const isActive = topic.id === activeId;
          html += `
            <a href="#${topic.id}" data-id="${topic.id}" class="group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            }">
              <div class="flex items-center gap-2.5 truncate">
                <span class="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0">
                  ${icons[topic.category] || ""}
                </span>
                <span class="truncate">${topic.title}</span>
              </div>
            </a>
          `;
        });
      }
      html += `</div>`;
      return html;
    }

    // Normal View
    html += `
      <div class="flex-1 overflow-y-auto px-3 py-4 space-y-6" id="sidebar-scrollable">
    `;

    // Render Bookmarks category first if there are bookmarks
    if (bookmarkedIds.length > 0) {
      html += `
        <div class="space-y-1">
          <div class="px-3 mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
            ${icons["Bookmarks"]}
            <span>Bookmarks</span>
          </div>
      `;
      topics
        .filter((t) => bookmarkedIds.includes(t.id))
        .forEach((topic) => {
          const isActive = topic.id === activeId;
          html += `
            <a href="#${topic.id}" data-id="${topic.id}" class="group flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? "bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-300 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
            }">
              <span class="truncate">${topic.title}</span>
            </a>
          `;
        });
      html += `</div>`;
    }

    // Render each standard category
    const catKeys = ["Basics", "Core Concepts", "Data Structures", "Web APIs", "Asynchronous", "Advanced", "Resources"];
    catKeys.forEach((catName) => {
      const catTopics = categories[catName];
      if (!catTopics || catTopics.length === 0) return;

      html += `
        <div class="space-y-1">
          <div class="px-3 mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
            ${icons[catName] || ""}
            <span>${catName}</span>
          </div>
      `;

      catTopics.forEach((topic) => {
        const isActive = topic.id === activeId;
        html += `
          <a href="#${topic.id}" data-id="${topic.id}" class="group flex items-center justify-start px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
            isActive
              ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
          }">
            <span class="truncate">${topic.title}</span>
          </a>
        `;
      });

      html += `</div>`;
    });

    html += `</div>`;

    return html;
  };

  sidebarContainer.innerHTML = renderSidebarContent("");

  // Handle local click events
  sidebarContainer.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-id]");
    if (link) {
      const topicId = link.getAttribute("data-id");
      if (typeof onSelectTopic === "function") {
        onSelectTopic(topicId);
      }
    }
  });

  // Export methods to update layout dynamically
  sidebarContainer.update = (activeId, bookmarkedIds = [], filterQuery = "") => {
    // Preserve scroll position if we are just switching topics
    const scroller = sidebarContainer.querySelector("#sidebar-scrollable");
    const prevScroll = scroller ? scroller.scrollTop : 0;

    sidebarContainer.innerHTML = renderSidebarContent(activeId, bookmarkedIds, filterQuery);

    const newScroller = sidebarContainer.querySelector("#sidebar-scrollable");
    if (newScroller) newScroller.scrollTop = prevScroll;
  };

  return sidebarContainer;
}
