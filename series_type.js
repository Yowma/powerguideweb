document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Button Hover Animations
    const buttons = document.querySelectorAll('.add-to-cart, .buy-now, .learn-more, .apply-btn, .subscribe-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Tab Switching for Additional Info
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.info-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(content => content.style.display = 'none');
            document.getElementById(tab.dataset.tab).style.display = 'block';
        });
    });

    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });

    // Quote Form Submission
    const quoteForm = document.querySelector('.quote-form form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = quoteForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email) {
                alert(`Quote request submitted for ${email}! We'll get back to you soon.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Modal Functionality for Add to Cart and Buy Now
    const modal = document.getElementById('feature-modal');
    const cartButtons = document.querySelectorAll('.add-to-cart, .buy-now');

    if (modal && cartButtons) {
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default button behavior
                modal.style.display = 'flex'; // Show the modal
                setTimeout(() => {
                    modal.style.display = 'none'; // Auto-close after 3 seconds
                }, 3000); // Matches the loading bar animation duration
            });
        });

        // Optional: Close modal when clicking outside of it
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});