// =========================================
// FOOTER YEAR
// =========================================
document.getElementById("yr").textContent = new Date().getFullYear();

// =========================================
// CUSTOM CURSOR
// =========================================
(function () {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;
  let isActive = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isActive) {
      document.body.classList.add("cursor-active");
      ringX = mouseX;
      ringY = mouseY;
      isActive = true;
    }

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function animate() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();

  const hoverTargets =
    "a, button, .btn, .card, .chip, input, textarea, [role='button']";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove("cursor-hover");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-click");
  });

  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-active");
    isActive = false;
  });

  document.addEventListener("mouseenter", () => {
    if (!isActive) {
      document.body.classList.add("cursor-active");
      isActive = true;
    }
  });
})();

// =========================================
// TYPING QUOTE ANIMATION
// =========================================
(function () {
  const quote = "A TENACIOUS nerd with a coffee...🍵";
  const target = document.getElementById("typing-text");
  if (!target) return;

  let index = 0;
  let isDeleting = false;

  const typeSpeed = 60;
  const deleteSpeed = 40;
  const pauseEnd = 2500;
  const pauseStart = 600;

  function typeWriter() {
    if (!isDeleting && index <= quote.length) {
      target.textContent = quote.substring(0, index);
      index++;

      if (index > quote.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseEnd);
        return;
      }
    } else if (isDeleting && index >= 0) {
      target.textContent = quote.substring(0, index);
      index--;

      if (index < 0) {
        isDeleting = false;
        index = 0;
        setTimeout(typeWriter, pauseStart);
        return;
      }
    }

    setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
  }

  window.addEventListener("load", () => {
    setTimeout(typeWriter, 800);
  });
})();

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Generic reveal targets
  document
    .querySelectorAll(".info-panel, .mrow, .contact-card, .quote-container")
    .forEach((el) => el.classList.add("reveal"));

  // Section headers slide in
  document
    .querySelectorAll(".eyebrow, .section-title, .section-sub")
    .forEach((el) => el.classList.add("reveal-left"));

  if (!isMobile) {
    document
      .querySelectorAll("#work .grid, #projects .grid, .matrix, .duo")
      .forEach((el) => el.classList.add("reveal-stagger"));
  } else {
    document
      .querySelectorAll("#work .grid > .card, #projects .grid > .card")
      .forEach((card) => card.classList.add("reveal-card"));
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.1,
    },
  );

  const selectors = isMobile
    ? ".reveal, .reveal-left, .reveal-card"
    : ".reveal, .reveal-stagger, .reveal-left";

  document.querySelectorAll(selectors).forEach((el) => observer.observe(el));
})();
