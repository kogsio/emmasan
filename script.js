// Optional client-side enhancements only.
// The page content is fully present in index.html so the site still works if JavaScript is disabled.

(function () {
  const navLinks = document.querySelectorAll('.site-nav a');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setActiveLink() {
    const offset = window.scrollY + 140;
    let activeId = '';

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isActive);
    });
  }

  document.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('load', setActiveLink);
})();
