// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for hero and expert images
    const heroImage = document.getElementById('heroImage');
    const expertImage = document.getElementById('expertImage');

    heroImage.style.opacity = 0;
    expertImage.style.opacity = 0;

    setTimeout(() => {
        heroImage.style.transition = 'opacity 1s ease-in';
        heroImage.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        expertImage.style.transition = 'opacity 1s ease-in';
        expertImage.style.opacity = 1;
    }, 1000);

    // Button hover animations
    const buttons = document.querySelectorAll('.hero-btn, .solution-btn, .discover-btn, .expert-btn, .newsletter-btn, .apply-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
// FAQ toggle with smooth animation and thunder effect
const faqItems = document.querySelectorAll('.faq-item h3');

faqItems.forEach(item => {
    const p = item.nextElementSibling; // The paragraph (answer) following the h3

    // Initialize the paragraph with hidden state
    p.style.maxHeight = '0';
    p.style.overflow = 'hidden';
    p.style.transition = 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out';

    item.addEventListener('click', () => {
        // Add thunder effect
        item.classList.add('thunder-effect');
        setTimeout(() => {
            item.classList.remove('thunder-effect'); // Remove after animation
        }, 300); // Match the duration of the thunder animation

        if (p.style.maxHeight === '0px' || p.style.maxHeight === '') {
            // Expand the FAQ answer
            p.style.maxHeight = p.scrollHeight + 'px';
            p.style.opacity = '1';
        } else {
            // Collapse the FAQ answer
            p.style.maxHeight = '0';
            p.style.opacity = '0';
        }
    });
});
});