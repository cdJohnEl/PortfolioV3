// Contact form validation
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const rules = {
  name: v => v ? "" : "Name is required.",
  email: v => !v ? "Email is required." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email address.",
  phone: v => !v ? "Phone number is required." : /^\d+$/.test(v) ? "" : "Phone number must contain digits only.",
  message: v => v ? "" : "Message is required."
};

function check(field) {
  const el = form.elements[field];
  const msg = rules[field](el.value.trim());
  document.getElementById(field + "-err").textContent = msg;
  el.classList.toggle("invalid", Boolean(msg));
  el.setAttribute("aria-invalid", Boolean(msg));
  return !msg;
}

Object.keys(rules).forEach(f => form.elements[f].addEventListener("blur", () => check(f)));

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "";
  const valid = Object.keys(rules).map(check).every(Boolean);
  if (valid) {
    status.textContent = "Thank you! Your message has been sent (simulated).";
    form.reset();
  } else {
    form.querySelector(".invalid").focus();
  }
});
