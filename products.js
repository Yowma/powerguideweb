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

    // Button Hover Animations
    const buttons = document.querySelectorAll('.cta-button, .newsletter-btn, .discover-btn, .subscribe-btn, .apply-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Discover & Protection Section Hover Animation
    const benefits = document.querySelectorAll('.discover-benefits li, .protection-benefits li');
    benefits.forEach(benefit => {
        benefit.addEventListener('mouseenter', () => {
            benefit.style.transform = 'scale(1.05)';
            benefit.querySelector('i').style.color = '#065401';
        });
        benefit.addEventListener('mouseleave', () => {
            benefit.style.transform = 'scale(1)';
            benefit.querySelector('i').style.color = '#21871E';
        });
    });

    // Image Upload for Discover, Protection, and Connect Sections
    const imageContainers = document.querySelectorAll('.discover-image, .protection-image, .connect-image');
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        const uploadInput = document.createElement('input');
        uploadInput.type = 'file';
        uploadInput.accept = 'image/*';
        uploadInput.style.display = 'none';
        container.appendChild(uploadInput);

        container.addEventListener('dblclick', () => {
            uploadInput.click();
        });

        uploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });
});