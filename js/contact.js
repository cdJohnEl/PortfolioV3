// Contact form validation

const form   = document.getElementById("contact-form");
const status = document.getElementById("form-status");

// One rule per field — returns "" if valid, or an error message if not
const rules = {
  name:    v => v ? "" : "Name is required.",
  email:   v => !v ? "Email is required." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter a valid email address.",
  phone:   v => !v ? "Phone number is required." : /^\d+$/.test(v) ? "" : "Phone number must contain digits only.",
  message: v => v ? "" : "Message is required."
};

// Run a field's rule and update its error message + invalid styling
function check(field) {
  const el  = form.elements[field];
  const msg = rules[field](el.value.trim());
  document.getElementById(field + "-err").textContent = msg;
  el.classList.toggle("invalid", Boolean(msg));
  el.setAttribute("aria-invalid", Boolean(msg));
  return !msg;
}

// Validate each field as soon as the user leaves it
Object.keys(rules).forEach(f =>
  form.elements[f].addEventListener("blur", () => check(f))
);

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "";

  // Check all fields; only proceed if every one passes
  const valid = Object.keys(rules).map(check).every(Boolean);
  if (valid) {
    status.textContent = "Thank you! Your message has been sent (simulated).";
    form.reset();
  } else {
    form.querySelector(".invalid").focus(); // jump to the first broken field
  }
});

