import { copyToClipboard } from "../utils/clipboard.js";
import { Toast } from "./Toast.js";

export function createContentArea({ onToggleBookmark, onNavigate }) {
  const contentWrapper = document.createElement("main");
  contentWrapper.id = "content-wrapper";
  contentWrapper.className = "flex-1 min-w-0 relative flex flex-col";

  let activeTopic = null;
  let isBookmarked = false;
  let prevTopic = null;
  let nextTopic = null;

  // Add scroll handler for back-to-top button visibility
  window.addEventListener("scroll", () => {
    const backToTopBtn = contentWrapper.querySelector("#back-to-top");
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
      } else {
        backToTopBtn.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
      }
    }
  });

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50";
      case "Intermediate":
        return "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400 border-sky-100 dark:border-sky-900/50";
      case "Advanced":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900/50";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400 border-slate-100";
    }
  };

  const renderContent = () => {
    if (!activeTopic) {
      return `
        <div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div class="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">No Topic Selected</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">Select a topic from the sidebar menu to start learning JavaScript.</p>
        </div>
      `;
    }

    const bookmarkStarSvg = isBookmarked
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.52 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.178 0l-3.97 2.883c-.783.57-1.838-.197-1.539-1.118l1.52-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.906a1 1 0 00.951-.69l1.519-4.674z" /></svg>`;

    // Build section content HTML
    let sectionsHtml = "";
    activeTopic.sections.forEach((section, idx) => {
      let codeBlockHtml = "";
      if (section.code) {
        codeBlockHtml = `
          <div class="mt-2 rounded-lg border border-slate-200 dark:border-slate-800/80 overflow-hidden bg-slate-100/50 dark:bg-slate-900 shadow-sm relative group/code">
            <!-- Code Header -->
            <div class="flex items-center justify-between px-3 py-1.5 border-b border-slate-200 dark:border-slate-850 bg-slate-200/50 dark:bg-slate-950">
              <span class="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">JavaScript</span>
              <button class="copy-code-btn flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-850 focus:outline-none transition-all" data-code="${encodeURIComponent(section.code.trim())}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <!-- Code Body -->
            <div class="p-3 overflow-x-auto">
              <pre class="language-javascript"><code class="language-javascript">${escapeHtml(section.code.trim())}</code></pre>
            </div>
          </div>
        `;
      }

      sectionsHtml += `
        <section class="space-y-3">
          <h3 class="text-xl font-bold font-display text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span class="text-brand-accent dark:text-brand-yellow font-mono text-sm">#</span>
            ${section.title}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-base">${section.content}</p>
          ${codeBlockHtml}
        </section>
      `;
    });

    // Build interview Q&A HTML
    let qaHtml = "";
    if (activeTopic.interviewQAs && activeTopic.interviewQAs.length > 0) {
      qaHtml += `
        <div class="border-t border-slate-200 dark:border-slate-800 pt-6 mt-10 space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Interview Q&A</h4>
          <div class="space-y-3.5">
      `;
      activeTopic.interviewQAs.forEach((qa) => {
        qaHtml += `
          <details class="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
            <summary class="flex items-center justify-between cursor-pointer focus:outline-none list-none select-none">
              <h5 class="text-base font-bold text-slate-800 dark:text-slate-200 pr-4">
                <span class="text-brand-blue dark:text-brand-yellow font-extrabold mr-2">Q:</span>${qa.question}
              </h5>
              <span class="text-slate-450 dark:text-slate-500 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div class="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 space-y-3 animate-fade-in">
              <p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong class="text-slate-700 dark:text-slate-300">A:</strong> 
                ${qa.answer}
              </p>
              ${qa.example ? `
                <div class="mt-3 rounded-lg border border-slate-200 dark:border-slate-800/80 overflow-hidden bg-slate-100/50 dark:bg-slate-900 shadow-sm relative group/code-qa">
                  <div class="flex items-center justify-between px-3 py-1.5 border-b border-slate-200 dark:border-slate-850 bg-slate-200/50 dark:bg-slate-950">
                    <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">Q&A Code Example</span>
                    <button class="copy-code-btn flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/65 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-850 focus:outline-none transition-all" data-code="${encodeURIComponent(qa.example.trim())}">
                      <span>Copy</span>
                    </button>
                  </div>
                  <div class="p-3 overflow-x-auto">
                    <pre class="language-javascript"><code class="language-javascript">${escapeHtml(qa.example.trim())}</code></pre>
                  </div>
                </div>
              ` : ""}
            </div>
          </details>
        `;
      });
      qaHtml += `</div></div>`;
    }

    // Build previous/next navigation HTML
    let navHtml = `
      <div class="border-t border-slate-200 dark:border-slate-800 pt-6 mt-10 flex flex-row items-center justify-between gap-4 w-full">
    `;
    if (prevTopic) {
      navHtml += `
        <a href="#${prevTopic.id}" data-navigate="${prevTopic.id}" class="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="truncate max-w-[120px] sm:max-w-none">${prevTopic.title}</span>
        </a>
      `;
    } else {
      navHtml += `<div></div>`;
    }

    if (nextTopic) {
      navHtml += `
        <a href="#${nextTopic.id}" data-navigate="${nextTopic.id}" class="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-auto">
          <span class="truncate max-w-[120px] sm:max-w-none">${nextTopic.title}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      `;
    } else {
      navHtml += `<div></div>`;
    }
    navHtml += `</div>`;

    return `
      <!-- Main Container -->
      <div class="flex-1 max-w-5xl mx-auto px-6 py-8 md:py-10 space-y-8 w-full animate-fade-in">
        
        <!-- Breadcrumbs & Meta -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <nav class="flex items-center gap-1.5 font-medium">
            <span>JavaScript</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span class="capitalize">${activeTopic.category}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span class="text-slate-700 dark:text-slate-400 truncate">${activeTopic.title}</span>
          </nav>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full border text-[10px] font-semibold tracking-wide ${getDifficultyColor(activeTopic.difficulty)}">
              ${activeTopic.difficulty}
            </span>
            <span>&bull;</span>
            <span>${activeTopic.readingTime} read</span>
          </div>
        </div>

        <!-- Topic Title Area -->
        <div class="border-b border-slate-200 dark:border-slate-800 pb-6 flex items-start justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-none">${activeTopic.title}</h1>
            <p class="text-base text-slate-500 dark:text-slate-400 mt-3.5 leading-relaxed font-medium">${activeTopic.introduction}</p>
          </div>
          <button id="bookmark-btn" class="group flex items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none transition-all flex-shrink-0" aria-label="Bookmark Topic">
            ${bookmarkStarSvg}
          </button>
        </div>

        <!-- Topic Sections -->
        <div class="space-y-10">
          ${sectionsHtml}
        </div>

        <!-- Interview Q&A -->
        ${qaHtml}

        <!-- Next / Previous Nav -->
        ${navHtml}

      </div>

      <!-- Footer (Sticky-Bottom spacing) -->
      <footer class="mt-auto py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
        <div class="max-w-5xl mx-auto px-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
          &copy; ${new Date().getFullYear()} JavaScript Documentation Platform. All rights reserved.
        </div>
      </footer>

      <!-- Back to Top Button -->
      <button id="back-to-top" class="opacity-0 translate-y-4 pointer-events-none fixed bottom-6 right-6 z-50 flex items-center justify-center h-10 w-10 rounded-full border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 shadow-md hover:shadow-lg focus:outline-none transition-all duration-300 hover:-translate-y-0.5" aria-label="Back to Top">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    `;
  };

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Bind event listeners for actions inside the rendered html
  contentWrapper.addEventListener("click", (e) => {
    // 1. Copy Code Block Click
    const copyBtn = e.target.closest(".copy-code-btn");
    if (copyBtn) {
      const encodedCode = copyBtn.getAttribute("data-code");
      const code = decodeURIComponent(encodedCode);

      copyToClipboard(code, (success) => {
        if (success) {
          Toast.show("Code copied to clipboard!");
          const label = copyBtn.querySelector("span");
          const icon = copyBtn.querySelector("svg");
          if (label) label.textContent = "Copied!";
          if (icon) {
            icon.innerHTML = `
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            `;
          }
          setTimeout(() => {
            if (label) label.textContent = "Copy";
            if (icon) {
              icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              `;
            }
          }, 2000);
        } else {
          Toast.show("Failed to copy code", "warning");
        }
      });
      return;
    }

    // 2. Navigation click (Related items, Breadcrumbs, Prev/Next buttons)
    const navLink = e.target.closest("a[data-navigate]");
    if (navLink) {
      e.preventDefault();
      const targetId = navLink.getAttribute("data-navigate");
      if (typeof onNavigate === "function") {
        onNavigate(targetId);
      }
      return;
    }

    // 3. Bookmark click
    const bookmarkBtn = e.target.closest("#bookmark-btn");
    if (bookmarkBtn) {
      if (typeof onToggleBookmark === "function" && activeTopic) {
        onToggleBookmark(activeTopic.id);
      }
      return;
    }

    // 4. Back to top click
    const backToTopBtn = e.target.closest("#back-to-top");
    if (backToTopBtn) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Export methods to update layout dynamically
  contentWrapper.update = (topic, bookmarked, prev, next) => {
    activeTopic = topic;
    isBookmarked = bookmarked;
    prevTopic = prev;
    nextTopic = next;

    // Apply fade animation
    contentWrapper.innerHTML = `
      <div class="flex-grow flex items-center justify-center py-20 opacity-0 transition-opacity duration-250" id="content-fade-container">
        <!-- Rendered shortly -->
      </div>
    `;

    setTimeout(() => {
      contentWrapper.innerHTML = renderContent();
      window.scrollTo(0, 0);

      // Force Prism syntax highlighting
      if (window.Prism && activeTopic) {
        window.Prism.highlightAllUnder(contentWrapper);
      }
    }, 150);
  };

  return contentWrapper;
}
