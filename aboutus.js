// aboutus.js
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fade-in animation for hero section
    const hero = document.querySelector('.hero');
    hero.style.opacity = 0;
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease-in';
        hero.style.opacity = 1;
    }, 500);

    // Fade-in animation for journey and experience images
    const journeyImage = document.getElementById('journeyImage');
    const experienceImage = document.getElementById('experienceImage');

    journeyImage.style.opacity = 0;
    experienceImage.style.opacity = 0;

    setTimeout(() => {
        journeyImage.style.transition = 'opacity 1s ease-in';
        journeyImage.style.opacity = 1;
    }, 1000);

    setTimeout(() => {
        experienceImage.style.transition = 'opacity 1s ease-in';
        experienceImage.style.opacity = 1;
    }, 1500);

    // Button hover animations
    const buttons = document.querySelectorAll('.hero-btn, .journey-btn, .team-btn, .experience-btn, .impact-btn, .awards-btn, .cta-btn, .newsletter-btn, .apply-btn, .subscribe-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Team cards sequential reveal animation
    const teamSection = document.querySelector('.team');
    const teamCards = document.querySelectorAll('.team-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                teamCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal');
                        const socialIcons = card.querySelectorAll('.social-links i');
                        setTimeout(() => {
                            socialIcons.forEach((icon, iconIndex) => {
                                setTimeout(() => {
                                    icon.classList.add('pulse');
                                }, iconIndex * 150);
                            });
                        }, 300);
                    }, index * 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(teamSection);

    setTimeout(() => {
        teamCards.forEach(card => {
            if (!card.classList.contains('reveal')) {
                card.classList.add('reveal');
            }
        });
    }, 5000);

    if (!('IntersectionObserver' in window)) {
        teamCards.forEach(card => {
            card.classList.add('reveal');
        });
    }

    // Infinite scrolling for trusted-by logos using JavaScript
    const trustedGrid = document.getElementById('trustedGrid');
    const wrapper = document.querySelector('.trusted-grid-wrapper');
    let scrollPosition = 0;
    let isPaused = false;
    let scrollSpeed = 1; // Normal speed: Pixels per frame
    const normalSpeed = 1; // Normal speed
    const hoverSpeed = 2; // Faster speed on hover
    let originalWidth = 0;

    // Function to calculate the total width of the original logos and clone them
    function setupLogos() {
        // Clear any existing clones
        while (trustedGrid.children.length > 8) { // 8 is the number of original logos
            trustedGrid.removeChild(trustedGrid.lastChild);
        }

        // Get the original logos
        const originalLogos = Array.from(trustedGrid.querySelectorAll('.trusted-logo'));
        
        // Calculate the total width of one set of logos (including margins)
        originalWidth = originalLogos.reduce((width, logo) => {
            return width + logo.offsetWidth + parseInt(getComputedStyle(logo).marginRight || 0);
        }, 0);

        // Clone logos to fill at least three times the viewport width
        const wrapperWidth = wrapper.offsetWidth;
        const clonesNeeded = Math.ceil((wrapperWidth * 3) / originalWidth); // Ensure enough logos to cover 3x viewport
        for (let i = 0; i < clonesNeeded; i++) {
            originalLogos.forEach(logo => {
                const clone = logo.cloneNode(true);
                trustedGrid.appendChild(clone);
            });
        }

        // Add click event listeners to all logos (original and cloned)
        const allLogos = trustedGrid.querySelectorAll('.trusted-logo');
        allLogos.forEach(logo => {
            logo.addEventListener('click', () => {
                const url = logo.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank'); // Open the URL in a new tab
                }
            });
        });
    }

    // Initial setup
    setupLogos();

    // Infinite scrolling function (left-to-right)
    function scrollLogos() {
        if (isPaused) {
            requestAnimationFrame(scrollLogos);
            return;
        }

        scrollPosition += scrollSpeed; // Move right by scrollSpeed pixels per frame
        trustedGrid.style.transform = `translateX(${scrollPosition}px)`;

        // Reset scroll position when the original set of logos is fully out of view on the left
        if (scrollPosition >= 0) {
            scrollPosition -= originalWidth; // Adjust position to create seamless loop
        }

        requestAnimationFrame(scrollLogos); // Continue the animation
    }

    // Start the scrolling animation
    requestAnimationFrame(scrollLogos);

    // Pause scrolling and increase speed on hover
    wrapper.addEventListener('mouseenter', () => {
        isPaused = true;
        scrollSpeed = hoverSpeed; // Increase speed on hover
    });

    // Resume scrolling and reset speed when hover ends
    wrapper.addEventListener('mouseleave', () => {
        isPaused = false;
        scrollSpeed = normalSpeed; // Return to normal speed
    });

    // Recalculate clones on window resize
    window.addEventListener('resize', () => {
        scrollPosition = 0; // Reset position to avoid jumps
        setupLogos(); // Recalculate and re-clone logos
    });
});