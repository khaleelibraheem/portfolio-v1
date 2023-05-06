document.addEventListener("DOMContentLoaded", function () {
  // Add active class to the current section on scroll
  const navLinks = document.querySelectorAll("#ul .nav-link");
  const sections = document.querySelectorAll("section");
  const scrollOptions = {
    rootMargin: "-50px",
    threshold: 0.5,
  };
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...sections].indexOf(entry.target);
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  }, scrollOptions);
  sections.forEach((section) => scrollObserver.observe(section));

  // Add active class to the current section on click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Detect when a user has scrolled to a section
  const sectionOptions = {
    rootMargin: "0px",
    threshold: 0.2,
  };

  const sectionObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("activate");
      }
    });
  },
  sectionOptions);

  // Add the observer to each section
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
