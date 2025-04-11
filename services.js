// services.js (assuming this is your full file)
document.addEventListener('DOMContentLoaded', () => {
    // Button hover animations
    const buttons = document.querySelectorAll('.cta-button, .newsletter-btn, .apply-btn, .subscribe-btn');
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

    // Newsletter form submission
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

   // Industries We Serve Modal Functionality
    const industryCards = document.querySelectorAll('.industry-card');
    const modalsContainer = document.querySelector('.modals');
    const modalsBackdrop = document.querySelector('.modals-backdrop');
    const modalsContentWrapper = document.querySelector('.modals-content-wrapper');

    // Open modal when clicking an industry card
    industryCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-id');
            const modalContent = document.getElementById(`${modalId}-content`);
            if (modalContent) {
                modalsContainer.classList.add('active');
                modalsContentWrapper.innerHTML = ''; // Clear previous content
                const clonedContent = modalContent.cloneNode(true);
                clonedContent.style.display = 'block'; // Ensure cloned content is visible
                modalsContentWrapper.appendChild(clonedContent);
                const closeButton = modalsContentWrapper.querySelector('.close-button');
                if (closeButton) {
                    closeButton.addEventListener('click', closeModal);
                }
            }
        });
    });

    // Close modal when clicking the backdrop
    if (modalsBackdrop) {
        modalsBackdrop.addEventListener('click', closeModal);
    }

    // Function to close the modal
    function closeModal() {
        if (modalsContainer) {
            modalsContainer.classList.remove('active');
            modalsContentWrapper.innerHTML = ''; // Clear content to prevent duplicates
        }
    }
});