// === Combined script.js ===
document.addEventListener('DOMContentLoaded', () => {
    // Custom pixel cursor
    const cursor = document.querySelector('.pixel-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Parallax effect for background
    const parallax = document.querySelector('.parallax-background');
    if (parallax) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });
    }

    // Animate hero elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroElements = heroContent.children;
        Array.from(heroElements).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot-container');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', () => {
            const overlay = screenshot.querySelector('.screenshot-overlay');
            if (overlay) overlay.style.transform = 'translateY(0)';
        });
        screenshot.addEventListener('mouseleave', () => {
            const overlay = screenshot.querySelector('.screenshot-overlay');
            if (overlay) overlay.style.transform = 'translateY(100%)';
        });
    });

    // Character card animations
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.character-image img');
            if (image) image.style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.character-image img');
            if (image) image.style.transform = 'scale(1)';
        });
    });

    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const image = member.querySelector('.member-image img');
            if (image) image.style.transform = 'scale(1.1)';
        });
        member.addEventListener('mouseleave', () => {
            const image = member.querySelector('.member-image img');
            if (image) image.style.transform = 'scale(1)';
        });
    });

    // Instruction card animations
    const instructionCards = document.querySelectorAll('.instruction-card');
    instructionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.instruction-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.instruction-icon');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    });

    // Scroll-based animations
    const sections = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Pixel art effect on images
    const pixelArtImages = document.querySelectorAll('img');
    pixelArtImages.forEach(img => {
        img.style.imageRendering = 'pixelated';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }
    });

    // AOS library init
    if (typeof AOS !== 'undefined') AOS.init();

    // Modal logic
    const trailerBtn = document.getElementById('watch-trailer');
    const modal = document.getElementById('trailer-modal');
    if (trailerBtn && modal) {
        const closeModal = modal.querySelector('.close-btn');
        trailerBtn.addEventListener('click', () => modal.classList.remove('hidden'));
        if (closeModal) closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    }

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
    }

    // Click sound on buttons and links
    const clickables = document.querySelectorAll('button, a');
    clickables.forEach(button => {
        button.addEventListener('click', () => {
            const clickSound = new Audio('assets/click.mp3');
            clickSound.volume = 0.3;
            clickSound.play();
        });
    });
});