// === DOM Targets ===
const hero = document.getElementById("hero");
const secondPage = document.querySelector(".second-page");
const thirdPage = document.querySelector(".third-page");
const cards = document.querySelectorAll(".card");
const menuToggle = document.getElementById("menu-toggle");
const navPanel = document.getElementById("nav-panel");
const menuIcon = document.getElementById("menu-icon");
const menuText = document.getElementById("menu-text");
const heroSection = document.querySelector(".hero");
const cursorDisplay = document.getElementById("cursorxy")

// === Sidebar Toggle ===
menuToggle.addEventListener("click", () => {
  navPanel.classList.toggle("open");

  const isOpen = navPanel.classList.contains("open");
  menuText.textContent = isOpen ? "Close" : "Menu";
  menuIcon.innerHTML = isOpen
    ? `<svg width="16" height="16"><line x1="3" y1="3" x2="13" y2="13" stroke="#fff" stroke-width="2"/><line x1="13" y1="3" x2="3" y2="13" stroke="#fff" stroke-width="2"/></svg>`
    : `<svg width="16" height="16"><line x1="3" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="2"/><line x1="3" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="2"/></svg>`;
});

// Close nav if clicked outside
document.addEventListener("click", (e) => {
  if (!navPanel.contains(e.target) && !menuToggle.contains(e.target)) {
    navPanel.classList.remove("open");
    menuText.textContent = "Menu";
    menuIcon.innerHTML = `<svg width="16" height="16"><line x1="3" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="2"/><line x1="3" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="2"/></svg>`;
  }
});

// === Hero → Second Page Fade + Sentence Reveal ===
const fadeObserver1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const firstSent = secondPage.querySelector(".sent.first");
    const secondSent = secondPage.querySelector(".sent.sec");

    if (entry.isIntersecting) {
      hero.classList.add("fade-out");
      secondPage.classList.add("fade-in");

      firstSent.classList.add("show");
      setTimeout(() => secondSent.classList.add("show"), 300);
    } else {
      hero.classList.remove("fade-out");
      secondPage.classList.remove("fade-in");
      firstSent.classList.remove("show");
      secondSent.classList.remove("show");
    }
  });
}, { threshold: 0.2 });

fadeObserver1.observe(secondPage);

// === Second → Third Page Fade ===
const fadeObserver2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      secondPage.classList.add("fade-out");
      thirdPage.classList.add("fade-in");
    } else {
      secondPage.classList.remove("fade-out");
      thirdPage.classList.remove("fade-in");
    }
  });
}, { threshold: 0.2 });

fadeObserver2.observe(thirdPage);

// === Card Reveal on Scroll ===
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.2 });

cards.forEach(card => cardObserver.observe(card));



window.addEventListener("mousemove", (e) => {
  const x = Math.round(e.clientX);
  const y = Math.round(e.clientY);
  cursorDisplay.textContent = `_cursorx(${x})_cursory(${y})_`;
});

const secondSection = document.querySelector(".second-page");
const scrollLine = document.querySelector("#scroll-arrow .scroll-line");
const scrollIcon = document.querySelector("#scroll-arrow .scroll-icon");

window.addEventListener("scroll", () => {
  const heroBottom = hero.getBoundingClientRect().bottom;
  const secondTop = secondSection.getBoundingClientRect().top;

  // Total distance we want the scroll line to react across
  const totalDistance = secondTop;
  const clampedDistance = Math.max(0, Math.min(heroBottom, totalDistance));

  const percent = clampedDistance / totalDistance; // value from 1 to 0
  const maxHeight = 160;
  const newHeight = maxHeight * percent;

  scrollLine.style.height = `${newHeight}px`;
  scrollIcon.style.opacity = newHeight <= 10 ? "0" : "1";
});
