// === Helper Functions ===
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// === DOM Elements ===
const hero = $("#hero");
const secondPage = $(".second-page");
const thirdPage = $(".third-page");
const cards = $$(".card");
const menuToggle = $("#menu-toggle");
const navPanel = $("#nav-panel");
const menuIcon = $("#menu-icon");
const menuText = $("#menu-text");
const cursorDisplay = $("#cursorxy");
const scrollLine = $("#scroll-arrow .scroll-line");
const scrollIcon = $("#scroll-arrow .scroll-icon");
const scrollMeter = $("#scroll-meter");
const aboutProgressBar = $("#about-progress-bar");
const progressDot = $("#progress-dot");
const desc = $("#about-desc");
const logo = $(".logo");
const stackSection = $("#stack");

// === Menu Toggle ===
menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  menuText.textContent = isOpen ? "Close" : "Menu";
  menuIcon.innerHTML = isOpen
    ? `<svg width="16" height="16"><line x1="3" y1="3" x2="13" y2="13" stroke="#fff" stroke-width="2"/><line x1="13" y1="3" x2="3" y2="13" stroke="#fff" stroke-width="2"/></svg>`
    : `<svg width="16" height="16"><line x1="3" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="2"/><line x1="3" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="2"/></svg>`;
});

// === Close Sidebar Outside Click ===
document.addEventListener("click", (e) => {
  if (!navPanel.contains(e.target) && !menuToggle.contains(e.target)) {
    navPanel.classList.remove("open");
    menuText.textContent = "Menu";
    menuIcon.innerHTML = `<svg width="16" height="16"><line x1="3" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="2"/><line x1="3" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="2"/></svg>`;
  }
});

// === Cursor Tracking ===
window.addEventListener("mousemove", (e) => {
  cursorDisplay.textContent = `_cursorx(${Math.round(e.clientX)})_cursory(${Math.round(e.clientY)})_`;
});

// === Scroll Line & Arrow ===
window.addEventListener("scroll", () => {
  const heroBottom = hero.getBoundingClientRect().bottom;
  const secondTop = secondPage.getBoundingClientRect().top;
  const clamped = Math.max(0, Math.min(heroBottom, secondTop));
  const progress = clamped / secondTop;

  scrollLine.style.height = `${160 * progress}px`;
  scrollIcon.style.opacity = progress < 0.1 ? "0" : "1";

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = Math.round((scrollTop / docHeight) * 100);
  if (scrollMeter) scrollMeter.textContent = `→ ${percent}%`;
});

// === Section Fade In ===
const fadeObserver1 = new IntersectionObserver((entries) => {
  const firstSent = secondPage.querySelector(".sent.first");
  const secondSent = secondPage.querySelector(".sent.sec");

  entries.forEach((entry) => {
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

const fadeObserver2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    thirdPage.classList.toggle("fade-in", entry.isIntersecting);
    secondPage.classList.toggle("fade-out", entry.isIntersecting);
  });
}, { threshold: 0.2 });

fadeObserver2.observe(thirdPage);

// === Card Reveal ===
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.2 });

cards.forEach((card) => cardObserver.observe(card));

// === About Progress Bar ===
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      aboutProgressBar.style.width = "95%";
      progressDot.style.opacity = "1";
      progressDot.style.left = "95%";
    } else {
      aboutProgressBar.style.width = "1%";
      progressDot.style.opacity = "0";
      progressDot.style.left = "1%";
    }
  });
}, { threshold: 0.3 });

progressObserver.observe(desc);

// === Logo Hide on Stack ===
const stackObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        logo.classList.add("hide");
        menuToggle.classList.add("hide");
      }, 500);
    } else {
      logo.classList.remove("hide");
      menuToggle.classList.remove("hide");
    }
  });
}, { threshold: 0.4 });

stackObserver.observe(stackSection);

// === Video Controls ===
const video = document.getElementById("custom-video");
const videoPlayBtn = document.getElementById("play-btn");
const videoMuteBtn = document.getElementById("mute-btn");
const videoFullscreenBtn = document.getElementById("fullscreen-btn");
const videoProgressBar = document.getElementById("video-progress-bar");
const videoTimeDisplay = document.getElementById("time-display");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

videoPlayBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    videoPlayBtn.textContent = "⏸️";
  } else {
    video.pause();
    videoPlayBtn.textContent = "▶️";
  }
});

videoMuteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  videoMuteBtn.textContent = video.muted ? "🔇" : "🔊";
});

videoFullscreenBtn.addEventListener("click", () => {
  if (video.requestFullscreen) video.requestFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  else if (video.msRequestFullscreen) video.msRequestFullscreen();
});

video.addEventListener("timeupdate", () => {
  videoProgressBar.value = video.currentTime;
  videoProgressBar.max = video.duration;
  videoTimeDisplay.textContent = formatTime(video.currentTime);
});

videoProgressBar.addEventListener("input", () => {
  video.currentTime = videoProgressBar.value;
});

// === Scroll Snap (Fixed) ===
const sections = document.querySelectorAll("section");
let isScrolling = false;
let lastScrollTime = 0;

function getVisibleSectionIndex() {
  let closestIndex = 0;
  let minDistance = window.innerHeight;

  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  });

  return closestIndex;
}

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

window.addEventListener("wheel", (e) => {
  const now = Date.now();
  if (now - lastScrollTime < 800 || isScrolling) return;
  lastScrollTime = now;

  const currentIndex = getVisibleSectionIndex();
  const nextIndex = e.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
  scrollToSection(nextIndex);
});
// === Smooth Scroll for Menu Links ===
document.querySelectorAll('.sidebar-nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // Optional: close sidebar after clicking
      navPanel.classList.remove('open');
      menuText.textContent = "Menu";
      menuIcon.innerHTML = `<svg width="16" height="16"><line x1="3" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="2"/><line x1="3" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="2"/></svg>`;
    }
  });
});
