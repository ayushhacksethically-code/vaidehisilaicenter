/* ==========================================================================
   GLOBAL INTERACTION SCRIPTS (Vaidehi Silai Center)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  // Sticky Header scroll styling transitions
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately in case page loads scrolled down
  }

  // Hamburger Menu toggle logic for mobile screens
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("open")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      }
    });

    // Close menu when a navigation item is clicked
    navLinkItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
      });
    });
  }
});
