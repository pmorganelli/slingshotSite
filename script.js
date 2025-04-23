document.addEventListener('DOMContentLoaded', () => {
    // Custom pixel cursor
    const cursor = document.querySelector('.pixel-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for background
    const parallax = document.querySelector('.parallax-background');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Animate hero elements
    const heroContent = document.querySelector('.hero-content');
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

    // Screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot-container');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', () => {
            const overlay = screenshot.querySelector('.screenshot-overlay');
            overlay.style.transform = 'translateY(0)';
        });
        
        screenshot.addEventListener('mouseleave', () => {
            const overlay = screenshot.querySelector('.screenshot-overlay');
            overlay.style.transform = 'translateY(100%)';
        });
    });

    // Character card animations
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.character-image img');
            image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.character-image img');
            image.style.transform = 'scale(1)';
        });
    });

    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const image = member.querySelector('.member-image img');
            image.style.transform = 'scale(1.1)';
        });
        
        member.addEventListener('mouseleave', () => {
            const image = member.querySelector('.member-image img');
            image.style.transform = 'scale(1)';
        });
    });

    // Instruction card animations
    const instructionCards = document.querySelectorAll('.instruction-card');
    instructionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.instruction-icon');
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.instruction-icon');
            icon.style.transform = 'rotate(0deg)';
        });
    });

    // Add scroll-based animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

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

    // Add pixel art effect to images
    const pixelArtImages = document.querySelectorAll('img');
    pixelArtImages.forEach(img => {
        img.style.imageRendering = 'pixelated';
    });

    // Add sound effects
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Play click sound
            const clickSound = new Audio('assets/click.mp3');
            clickSound.volume = 0.3;
            clickSound.play();
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        }
    });
}); 