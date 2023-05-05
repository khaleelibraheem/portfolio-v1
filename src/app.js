document.addEventListener("DOMContentLoaded", function () {
  // Add active class to the current section on scroll
  const navLinks = document.querySelectorAll("#ul .nav-link");
  const sections = document.querySelectorAll("section");
  const options = {
    rootMargin: "-50px",
    threshold: 0.5,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...sections].indexOf(entry.target);
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  }, options);
  sections.forEach((section) => observer.observe(section));

  // Add active class to the current section on click
  const header = document.getElementById("ul");
  const navLink = header.getElementsByClassName("nav-link");
  for (let i = 0; i < navLinks.length; i++) {
    navLink[i].addEventListener("click", function () {
      const current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
});
