// Client-side enhancements only. The full page remains readable without JavaScript.

(function () {
  const header = document.querySelector('[data-site-header]');
  const nav = document.querySelector('[data-site-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  function setActiveLink() {
    const offset = window.scrollY + 150;
    let activeId = sections[0] ? sections[0].id : '';

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  const revealNodes = Array.from(document.querySelectorAll('.section-observe'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    revealNodes.forEach((node) => {
      node.classList.add('is-pending');
      observer.observe(node);
    });
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  document.addEventListener('scroll', () => {
    setHeaderState();
    setActiveLink();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeNav();
  });

  window.addEventListener('load', () => {
    setHeaderState();
    setActiveLink();
  });
})();
