document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileClose = document.querySelector('.mobile-menu-close');
    const nav = document.querySelector('nav');
    const navOverlay = document.querySelector('.nav-overlay');
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        nav.classList.add('active');
        navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        nav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    mobileClose.addEventListener('click', closeMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);
    
    // Mobile dropdown functionality
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                content.classList.toggle('show');
            }
        });
    });
    
    // Set active menu item
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '#proje') ||
            (linkPage !== '#' && currentPage.includes(linkPage.replace('.html', '')))) {
            link.classList.add('active');
            
            // Highlight parent dropdown if this is a sub-item
            const dropdownParent = link.closest('.dropdown-content');
            if (dropdownParent) {
                dropdownParent.previousElementSibling.classList.add('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without reload
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        });
    });
});
