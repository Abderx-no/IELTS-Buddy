/* ============================================
   IELTS BUDDY - MAIN JAVASCRIPT
   ============================================ */

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Toggle icon between ☰ and ✕
            menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });

        // Close menu when a link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.textContent = '☰';
            });
        });
    }

    // ========================================
    // 2. SCROLL TO TOP BUTTON
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 3. ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const highlightActiveNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    // ========================================
    // 4. FADE-IN ANIMATION ON SCROLL
    // ========================================
    const animatedElements = document.querySelectorAll(
        '.overview-card, .qtype-card, .speak-part, .task-box, .compare-box'
    );

    // Add initial hidden class
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ========================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 6. CONSOLE WELCOME MESSAGE
    // ========================================
    console.log('%c🎓 IELTS Buddy', 'font-size: 24px; font-weight: bold; color: #0056b3;');
    console.log('%cYour complete partner for IELTS success!', 'font-size: 14px; color: #ff9800;');

});
