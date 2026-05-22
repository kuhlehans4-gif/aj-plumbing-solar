document.documentElement.classList.add("js-ready");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const forms = document.querySelectorAll("[data-contact-form]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

function setFormStatus(form, message, state) {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

function prefillContactForm(form) {
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  const message = params.get("message");

  if (service) {
    const serviceRadios = Array.from(form.querySelectorAll("input[name='service']"));
    const serviceSelect = form.querySelector("select[name='service']");
    const normalizedService = service.trim().toLowerCase();
    const matchedRadio = serviceRadios.find((input) => input.value.trim().toLowerCase() === normalizedService);

    if (matchedRadio) {
      matchedRadio.checked = true;
    } else if (serviceSelect) {
      const matchedOption = Array.from(serviceSelect.options).find((option) => option.value.trim().toLowerCase() === normalizedService);
      if (matchedOption) serviceSelect.value = matchedOption.value;
    }
  }

  if (message) {
    const messageField = form.querySelector("textarea[name='message']");
    if (messageField && !messageField.value.trim()) {
      messageField.value = message;
    }
  }
}

forms.forEach((form) => {
  prefillContactForm(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";
    }

    setFormStatus(form, "Sending your message...", "pending");

    try {
      const response = await fetch(form.action || "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        const message = result.errors?.[0]?.message || "Something went wrong. Please call or email us directly.";
        throw new Error(message);
      }

      form.reset();
      setFormStatus(form, "Thank you. Your message has been sent.", "success");
    } catch (error) {
      setFormStatus(form, error.message, "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || "Send enquiry";
      }
    }
  });
});
