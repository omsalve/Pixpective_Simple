// scripts.js

// Add scroll-based transition effect to each section
const sections = document.querySelectorAll("section");

const options = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});
