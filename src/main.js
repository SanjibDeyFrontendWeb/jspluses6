import "./styles/index.css";
import Prism from "prismjs";
// Assign Prism globally to ensure compatibility
window.Prism = Prism;

import { topics } from "./data/topics.js";
import { initTheme } from "./utils/theme.js";
import { searchTopics } from "./utils/search.js";
import { createHeader } from "./components/Header.js";
import { createSidebar } from "./components/Sidebar.js";
import { createContentArea } from "./components/ContentArea.js";
import { Toast } from "./components/Toast.js";

// Global App State
let currentTopicId = "introduction";
let bookmarks = JSON.parse(localStorage.getItem("js_docs_bookmarks")) || [];
let searchQuery = "";
let mobileMenuOpen = false;

// Initialize Theme
initTheme();

// Set active topic from URL Hash if present on startup
const parseHash = () => {
  const hash = window.location.hash.slice(1);
  if (hash && topics.some((t) => t.id === hash)) {
    currentTopicId = hash;
  }
};
parseHash();

// Main Mount Root
const app = document.getElementById("app");

// Core Layout Elements
const layout = document.createElement("div");
layout.id = "main-layout";
layout.className = "flex flex-col min-h-screen transition-colors duration-300";

const bodyContainer = document.createElement("div");
bodyContainer.className = "flex-1 flex relative w-full max-w-[90rem] mx-auto";

// Backdrop for Mobile drawer
const backdrop = document.createElement("div");
backdrop.id = "mobile-backdrop";
backdrop.className = "hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-all duration-300 opacity-0";
bodyContainer.appendChild(backdrop);

// Instantiate Components
const header = createHeader({
  topics,
  onMenuToggle: () => {
    mobileMenuOpen = !mobileMenuOpen;
    updateUI();
  },
  onSearch: (query) => {
    searchQuery = query;
    updateUI();
  },
  onSelectTopic: (topicId) => {
    currentTopicId = topicId;
    window.location.hash = `#${topicId}`;
    mobileMenuOpen = false;
    updateUI();
  }
});

const sidebar = createSidebar({
  topics,
  onSelectTopic: (topicId) => {
    currentTopicId = topicId;
    window.location.hash = `#${topicId}`;
    mobileMenuOpen = false;
    updateUI();
  },
});

const contentArea = createContentArea({
  onToggleBookmark: (topicId) => {
    const index = bookmarks.indexOf(topicId);
    if (index > -1) {
      bookmarks.splice(index, 1);
      Toast.show("Bookmark removed.");
    } else {
      bookmarks.push(topicId);
      Toast.show("Topic bookmarked!");
    }
    localStorage.setItem("js_docs_bookmarks", JSON.stringify(bookmarks));
    updateUI();
  },
  onNavigate: (topicId) => {
    currentTopicId = topicId;
    window.location.hash = `#${topicId}`;
    updateUI();
  },
});

// Append components to DOM
bodyContainer.appendChild(sidebar);
bodyContainer.appendChild(contentArea);
layout.appendChild(header);
layout.appendChild(bodyContainer);
app.appendChild(layout);

// Mobile Backdrop click listener
backdrop.addEventListener("click", () => {
  mobileMenuOpen = false;
  updateUI();
});

// State synchronizer
function updateUI() {
  // 1. Find active, prev, and next topics based on full topics list
  const activeIndex = topics.findIndex((t) => t.id === currentTopicId);
  const activeTopic = topics[activeIndex] || topics[0];
  const prevTopic = activeIndex > 0 ? topics[activeIndex - 1] : null;
  const nextTopic = activeIndex < topics.length - 1 ? topics[activeIndex + 1] : null;

  // 2. Check if active topic is bookmarked
  const isBookmarked = bookmarks.includes(activeTopic.id);

  // 3. Update Sidebar (pass filtered search queries or bookmark state)
  sidebar.update(activeTopic.id, bookmarks, searchQuery);

  // 4. Update Content
  contentArea.update(activeTopic, isBookmarked, prevTopic, nextTopic);

  // 5. Update Mobile Drawer states
  const sidebarWrapper = document.getElementById("sidebar-wrapper");
  if (mobileMenuOpen) {
    // Show Drawer
    sidebarWrapper.classList.remove("-translate-x-full");
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.add("opacity-100");
    }, 10);
  } else {
    // Hide Drawer
    sidebarWrapper.classList.add("-translate-x-full");
    backdrop.classList.remove("opacity-100");
    setTimeout(() => {
      if (!mobileMenuOpen) backdrop.classList.add("hidden");
    }, 300);
  }
}

// Global Router / Hash-listener
window.addEventListener("hashchange", () => {
  parseHash();
  updateUI();
});

// First Render
updateUI();
