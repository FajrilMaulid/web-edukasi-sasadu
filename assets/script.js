// ========================================
// MODERN INTERACTIVE FEATURES - SASADU
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // --- NAVBAR SCROLL EFFECT ---
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add 'scrolled' class for glassmorphism effect
    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // --- MOBILE NAVIGATION ---
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });

    // Close menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-active");
        burger.classList.remove("toggle");
      });
    });
  }

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // --- ACCORDION (MITOS VS FAKTA) ---
  const accHeaders = document.querySelectorAll(".accordion-header");

  accHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector("span");
      const isOpen = body.style.maxHeight;

      if (isOpen) {
        // Close this accordion
        body.style.maxHeight = null;
        icon.innerText = "+";
        icon.style.transform = "rotate(0deg)";
      } else {
        // Close all other accordions
        document.querySelectorAll(".accordion-body").forEach((b) => {
          b.style.maxHeight = null;
        });
        document.querySelectorAll(".accordion-header span").forEach((s) => {
          s.innerText = "+";
          s.style.transform = "rotate(0deg)";
        });

        // Open this accordion
        body.style.maxHeight = body.scrollHeight + "px";
        icon.innerText = "−";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });

  // --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    ".card, .about-content, .tab-content, .accordion-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // --- PARALLAX EFFECT ON HERO (DISABLED to keep background position fixed) ---
  // const hero = document.querySelector(".hero");
  // if (hero) {
  //   window.addEventListener("scroll", () => {
  //     const scrolled = window.pageYOffset;
  //     const parallax = scrolled * 0.5;
  //     hero.style.backgroundPositionY = parallax + "px";
  //   });
  // }

  // --- ADD HOVER SOUND FEEDBACK (Optional - subtle) ---
  const buttons = document.querySelectorAll(".btn, .tab-btn, .card");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  });

  // --- DYNAMIC GRADIENT ANIMATION ON CARDS ---
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// ========================================
// TABS LOGIC - ENHANCED
// ========================================
function openTab(evt, tabName) {
  // Hide all tab contents
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
    tabContents[i].classList.remove("active");
  }

  // Remove active class from all buttons
  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Show the current tab and add active class
  const currentTab = document.getElementById(tabName);
  currentTab.style.display = "block";

  // Trigger reflow for animation
  setTimeout(() => {
    currentTab.classList.add("active");
  }, 10);

  evt.currentTarget.classList.add("active");
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
