export async function copyToClipboard(text, callback) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      if (typeof callback === "function") callback(true);
    } else {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        if (typeof callback === "function") callback(true);
      } catch (err) {
        console.error("Fallback copy failed", err);
        if (typeof callback === "function") callback(false);
      }
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.error("Failed to copy text", err);
    if (typeof callback === "function") callback(false);
  }
}
