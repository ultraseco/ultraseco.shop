// Inject mobile menu styles with higher specificity
const style = document.createElement('style');
style.textContent = `
    /* Mobile Menu Common Styles - Injected */
    @media (max-width: 968px) {
        .nav-links {
            display: flex !important;
            flex-direction: column !important;
            position: fixed !important;
            top: 0 !important;
            right: -100% !important;
            width: 80% !important;
            height: 100vh !important;
            background: rgba(15, 23, 42, 0.98) !important;
            padding: 5rem 2rem 2rem !important;
            gap: 1.5rem !important;
            z-index: 10000 !important;
            transition: right 0.3s ease-in-out !important;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5) !important;
            overflow-y: auto !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
        }

        .nav-links.active {
            right: 0 !important;
        }

        .mobile-menu-toggle {
            display: block !important;
            position: relative !important;
            z-index: 10001 !important;
            background: transparent !important;
            border: none !important;
            color: white !important;
            font-size: 1.5rem !important;
            cursor: pointer !important;
        }

        .nav-links li {
            width: 100% !important;
            list-style: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
            padding-bottom: 0.5rem !important;
        }

        .nav-links a, .nav-links button {
            color: white !important;
            text-decoration: none !important;
            font-size: 1.2rem !important;
            font-weight: 600 !important;
            display: block !important;
            width: 100% !important;
            padding: 0.5rem 0 !important;
        }
    }

    @media (min-width: 969px) {
        .mobile-menu-toggle {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.querySelector('.mobile-menu-toggle i');
    if (!navLinks) return;

    const isOpen = navLinks.classList.toggle('active');

    if (toggleBtn) {
        if (isOpen) {
            toggleBtn.classList.remove('fa-bars');
            toggleBtn.classList.add('fa-xmark');
        } else {
            toggleBtn.classList.remove('fa-xmark');
            toggleBtn.classList.add('fa-bars');
        }
    }
}

// Close menu when clicking a link
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.querySelector('.mobile-menu-toggle i');
    const toggleBtnFull = document.querySelector('.mobile-menu-toggle');

    if (!navLinks || !navLinks.classList.contains('active')) return;

    // If click is on a link inside nav-links OR outside the menu (excluding the toggle button)
    if (e.target.closest('.nav-links a') || e.target.closest('.nav-links button') ||
        (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-toggle'))) {
        navLinks.classList.remove('active');
        if (toggleBtn) {
            toggleBtn.classList.remove('fa-xmark');
            toggleBtn.classList.add('fa-bars');
        }
    }
});
