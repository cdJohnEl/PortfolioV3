// Shared behaviour: theme toggle, mobile nav, footer year
(function () {

  const root = document.documentElement;

  // Apply saved theme immediately to avoid a flash on load
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;

  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const isDark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  // Mobile nav — toggle visibility and keep aria-expanded in sync
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // Fill in the current year instead of hardcoding it
  document.getElementById("year").textContent = new Date().getFullYear();

})();
