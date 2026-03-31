const script = `
(() => {
  const storedTheme = localStorage.getItem("theme");
  const resolvedTheme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.dataset.themePreference = storedTheme ?? "system";
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} id="theme-init" />;
}
