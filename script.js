const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progress = document.getElementById("scrollProgress");
const year = document.getElementById("year");
const copyProfile = document.getElementById("copyProfile");
const toast = document.getElementById("toast");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

copyProfile.addEventListener("click", async () => {
  const title = "Electronics & Embedded Systems Technician — Electronics Diagnostics, Embedded Hardware, Power Electronics & System Development";
  try {
    await navigator.clipboard.writeText(title);
    toast.textContent = "Profile title copied.";
  } catch {
    toast.textContent = title;
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
