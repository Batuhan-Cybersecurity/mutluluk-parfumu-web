// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Highlight active navigation item based on scroll position
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('nav ul li a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 300)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (current && item.getAttribute('href').includes(`#${current}`)) {
      item.classList.add('active');
    } else if (!current && item.getAttribute('href') === 'index.html') {
      item.classList.add('active');
    }
  });
});

// Dropdown menüyü mobilde düzgün çalışması için
document.querySelectorAll('.dropdown-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('show');
    }
  });
});

// Sayfa yüklendiğinde aktif menü öğesini ayarla
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('nav ul li a');

  navItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.classList.add('active');
    }
  });
});
