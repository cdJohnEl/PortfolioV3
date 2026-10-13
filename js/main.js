// Shared behaviour: theme toggle, mobile nav, footer year
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const isDark = root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
