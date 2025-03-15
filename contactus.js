// contactus.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Interactive Map in Locations Section
    const viewMapLinks = document.querySelectorAll(".view-map");
    const mapIframe = document.querySelector(".map-container iframe");

    // Map URLs for each location
    const mapUrls = {
        "Sydney": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.907293978347!2d151.2099003152095!3d-33.86881998065777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632c0c0!2sSydney%20NSW%202000%2C%20Australia!5e0!3m2!1sen!2sph!4v1742055295276!5m2!1sen!2sph",
        "New York": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241263483919!2d-74.00597268459397!3d40.71277527933177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sNew%20York%2C%20NY%2010000%2C%20USA!5e0!3m2!1sen!2sph!4v1742055295276!5m2!1sen!2sph",
        "London": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.677421974853!2d-0.127647084229994!3d51.50732177963628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2e7e7f2b1f%3A0x5e8b6b1e6b1e6b1e!2sLondon%20W1C%201DE%2C%20UK!5e0!3m2!1sen!2sph!4v1742055295276!5m2!1sen!2sph",
        "default": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.478583477209!2d121.03733100000001!3d14.571784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c84d8ee9c8cd%3A0xaac26c806d37053!2s932%20Busilak%2C%20Mandaluyong%2C%201550%20Kalakhang%20Maynila!5e0!3m2!1sen!2sph!4v1742055295276!5m2!1sen!2sph"
    };

    viewMapLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const location = link.parentElement.querySelector(".location-title").textContent;
            mapIframe.src = mapUrls[location] || mapUrls["default"];
            // Highlight the active link
            viewMapLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // 2. Animated Testimonial Slider with Smooth Scrolling
    const testimonialsContent = document.querySelector(".testimonials-content");
    const testimonialsGrid = document.querySelector(".testimonials-grid");
    const testimonialItems = document.querySelectorAll(".testimonial-item");

    // Only proceed if we have testimonials
    if (testimonialsContent && testimonialsGrid && testimonialItems.length > 0) {
        // Create dots container
        let dotsContainer = document.querySelector(".dots-container");
        if (!dotsContainer) {
            dotsContainer = document.createElement("div");
            dotsContainer.classList.add("dots-container");
            testimonialsContent.appendChild(dotsContainer);
        }

        let currentIndex = 0;
        let autoSlideInterval;

        // Clear existing dots and recreate them
        dotsContainer.innerHTML = '';

        // Make sure testimonials are properly styled for sliding
        testimonialsGrid.style.display = 'flex';
        testimonialsGrid.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';

        testimonialItems.forEach((item, index) => {
            item.style.flex = '0 0 100%';
            item.style.minWidth = '100%';

            // Create navigation dots
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                // Add a small visual feedback for the click
                dot.style.transform = "scale(1.2)";
                setTimeout(() => {
                    dot.style.transform = "scale(1)";
                    currentIndex = index;
                    updateSlider();
                    resetAutoSlide();
                }, 100);
            });

            dotsContainer.appendChild(dot);
        });

        function updateSlider() {
            // Apply smooth transition
            testimonialItems.forEach(item => {
                item.classList.add('fade-out');
            });

            setTimeout(() => {
                testimonialsGrid.style.transform = `translateX(-${currentIndex * 100}%)`;

                document.querySelectorAll(".dot").forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentIndex);
                });

                // Fade back in
                setTimeout(() => {
                    testimonialItems.forEach(item => {
                        item.classList.remove('fade-out');
                    });
                }, 200);
            }, 50);
        }

        function startAutoSlide() {
            clearInterval(autoSlideInterval); // Clear any existing interval
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                updateSlider();
            }, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Initialize slider state
        updateSlider();

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoSlideInterval);
        });

        testimonialsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % testimonialItems.length;
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            }
            updateSlider();
        }

        // Pause on hover
        testimonialsGrid.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
        testimonialsGrid.addEventListener("mouseleave", startAutoSlide);

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
                updateSlider();
                resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % testimonialItems.length;
                updateSlider();
                resetAutoSlide();
            }
        });

        // Start the slider
        startAutoSlide();
    }

    // 3. Form Submission Feedback
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        let successMessage = document.querySelector(".success-message");

        if (!successMessage) {
            successMessage = document.createElement("div");
            successMessage.classList.add("success-message");
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent successfully.</p>
            `;
            document.querySelector(".form-column").appendChild(successMessage);
        }

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Add animation for button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
            }

            // Simulate form submission
            setTimeout(() => {
                contactForm.reset();

                if (submitButton) {
                    submitButton.innerHTML = 'Send';
                    submitButton.disabled = false;
                }

                successMessage.style.display = "flex";
                successMessage.style.opacity = "1";

                setTimeout(() => {
                    successMessage.style.opacity = "0";
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 500);
                }, 3000);
            }, 1000);
        });
    }

    // 4. Mobile Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// Add these styles to your CSS or append them dynamically
const styleElement = document.createElement('style');
styleElement.textContent = `
    .testimonials-content {
        overflow: hidden;
        width: 100%;
        position: relative;
        -webkit-overflow-scrolling: touch;
    }

    .testimonial-item {
        transition: opacity 0.4s ease;
    }

    .testimonial-item.fade-out {
        opacity: 0.7;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .success-message {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(styleElement);