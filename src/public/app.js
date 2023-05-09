document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("#ul .nav-link");
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    rootMargin: "-50px 0px 0px 0px",
    threshold: [0, 0.2, 0.5, 0.8, 1],
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.target.id && entry.intersectionRatio >= 0.5) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`#ul a[href="#${entry.target.id}"]`)
          .classList.add("active");
      }
    });
  };

  const sectionObserver = new IntersectionObserver(
    observerCallback,
    observerOptions
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      let target = document.querySelector(link.hash);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
