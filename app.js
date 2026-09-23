document.getElementById("yr").textContent = new Date().getFullYear();

(function () {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  // Skip on touch devices
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let mouseX = 0,
    mouseY = 0; // actual mouse position
  let ringX = 0,
    ringY = 0; // lagging ring position
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

  // Smooth ring follow (lerp)
  function animate() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Hover detection on interactive elements
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

  // Click pulse
  document.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-click");
  });
  document.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-click");
  });

  // Hide when leaving the window
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

(function () {
  const quote = "A TENACIOUS nerd with a coffee... ☕";

  const target = document.getElementById("typing-text");
  if (!target) return;

  let index = 0;
  let isDeleting = false;

  const typeSpeed = 70;
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
