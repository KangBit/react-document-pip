/**
 * Copy styles from the main window to the PIP window
 * @param targetWindow - The window to copy styles to
 */
const copyStyles = (targetWindow: Window) => {
  [...document.styleSheets].forEach((styleSheet) => {
    try {
      const cssRules = [...styleSheet.cssRules]
        .map((rule) => rule.cssText)
        .join("");
      const style = document.createElement("style");
      style.textContent = cssRules;
      targetWindow.document.head.appendChild(style);
    } catch (error) {
      console.warn("Error copying styles: ", error);

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = styleSheet.type;
      link.media = styleSheet.media.toString();
      link.href = styleSheet.href ?? "";
      targetWindow.document.head.appendChild(link);
    }
  });
};

export default copyStyles;
