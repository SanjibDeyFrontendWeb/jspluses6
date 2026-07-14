export class Toast {
  static show(message, type = "success") {
    // Check if toast container exists
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "fixed bottom-5 right-5 z-[100] flex flex-col gap-3 max-w-sm pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `
      flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border pointer-events-auto
      animate-toast-in transition-all duration-300
      ${
        type === "success"
          ? "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
          : "bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
      }
    `;

    // Icon
    const icon = document.createElement("div");
    if (type === "success") {
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      `;
    } else {
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      `;
    }

    const text = document.createElement("p");
    text.className = "text-sm font-medium font-sans";
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    container.appendChild(toast);

    // Auto dismiss after 2.5 seconds
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }, 2500);
  }
}
