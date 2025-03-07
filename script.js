// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for hero and expert images
    const heroImage = document.getElementById('heroImage');
    const expertImage = document.getElementById('expertImage');

    if (heroImage) {
        heroImage.style.opacity = 0;
        setTimeout(() => {
            heroImage.style.transition = 'opacity 1s ease-in';
            heroImage.style.opacity = 1;
        }, 500);
    }

    if (expertImage) {
        expertImage.style.opacity = 0;
        setTimeout(() => {
            expertImage.style.transition = 'opacity 1s ease-in';
            expertImage.style.opacity = 1;
        }, 1000);
    }

    // Button hover animations (updated to match HTML classes)
    const buttons = document.querySelectorAll(
        '.cta-button, .expert-btn, .newsletter-btn, .apply-btn, .subscribe-btn'
    );
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
     if (hamburger && navLinks) {
         hamburger.addEventListener('click', () => {
             navLinks.classList.toggle('active');
         });
     }

    // FAQ toggle with smooth animation and thunder effect
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        const p = item.nextElementSibling; // The paragraph (answer) following the h3

        // Initialize the paragraph with hidden state
        p.style.maxHeight = '0';
        p.style.overflow = 'hidden';
        p.style.opacity = '0';
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

    // Newsletter form submission (basic handling)
    const newsletterForms = document.querySelectorAll('.newsletter-form'); // Handle both forms
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                alert(`Thank you for subscribing with ${email}!`); // Demo alert
                emailInput.value = ''; // Clear the input
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });

    // Project Showcase JavaScript
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const img = card.querySelector('.project-img');

        // Image load handling
        img.onload = () => {
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const aspectRatio = naturalWidth / naturalHeight;

            // Warn if aspect ratio deviates significantly from 1:1
            if (Math.abs(aspectRatio - 1) > 0.1) {
                console.warn(`Image in project card ${card.dataset.index} has aspect ratio ${aspectRatio.toFixed(2)} (expected ~1:1)`);
            }
        };

        img.onerror = () => {
            card.style.backgroundColor = '#D3D3D3'; // Darker grey for error
            console.error(`Failed to load image in project card ${card.dataset.index}`);
        };

        // Hover effect
        card.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });
});