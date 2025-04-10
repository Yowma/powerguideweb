document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fade-in animation for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = 0;
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease-in';
            hero.style.opacity = 1;
        }, 500);
    }

    // Fade-in animation for journey image
    const journeyImage = document.getElementById('journeyImage');
    if (journeyImage) {
        journeyImage.style.opacity = 0;
        setTimeout(() => {
            journeyImage.style.transition = 'opacity 1s ease-in';
            journeyImage.style.opacity = 1;
        }, 1000);
    }

    // Remove experienceImage code since it doesn't exist
    // const experienceImage = document.getElementById('experienceImage');
    // if (experienceImage) {
    //     experienceImage.style.opacity = 0;
    //     setTimeout(() => {
    //         experienceImage.style.transition = 'opacity 1s ease-in';
    //         experienceImage.style.opacity = 1;
    //     }, 1500);
    // }

    // Modal
    const teamButtons = document.querySelectorAll('.team-btn');
    const modal = document.getElementById('positionsModal');
    if (teamButtons && modal) {
        teamButtons.forEach(teamBtn => {
            teamBtn.addEventListener('click', () => {
                modal.classList.add('active');
                setTimeout(() => {
                    modal.classList.remove('active');
                }, 3000);
            });
        });
    } else {
        console.error('Team buttons or modal not found');
    }

    // Button hover animations
    const buttons = document.querySelectorAll('.hero-btn, .journey-btn, .team-btn, .experience-btn, .impact-btn, .awards-btn, .cta-btn, .apply-btn, .subscribe-btn');
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

    if (teamSection) observer.observe(teamSection);

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

    // Infinite scrolling for trusted-by logos
    const trustedGrid = document.getElementById('trustedGrid');
    const wrapper = document.querySelector('.trusted-grid-wrapper');
    let scrollPosition = 0;
    let isPaused = false;
    let scrollSpeed = 1;
    const normalSpeed = 1;
    const hoverSpeed = 2;
    let originalWidth = 0;

    function setupLogos() {
        while (trustedGrid.children.length > 8) {
            trustedGrid.removeChild(trustedGrid.lastChild);
        }

        const originalLogos = Array.from(trustedGrid.querySelectorAll('.trusted-logo'));
        originalWidth = originalLogos.reduce((width, logo) => {
            return width + logo.offsetWidth + parseInt(getComputedStyle(logo).marginRight || 0);
        }, 0);

        const wrapperWidth = wrapper.offsetWidth;
        const clonesNeeded = Math.ceil((wrapperWidth * 3) / originalWidth);
        for (let i = 0; i < clonesNeeded; i++) {
            originalLogos.forEach(logo => {
                const clone = logo.cloneNode(true);
                trustedGrid.appendChild(clone);
            });
        }

        const allLogos = trustedGrid.querySelectorAll('.trusted-logo');
        allLogos.forEach(logo => {
            logo.addEventListener('click', () => {
                const url = logo.getAttribute('data-url');
                if (url) window.open(url, '_blank');
            });
        });
    }

    if (trustedGrid && wrapper) {
        setupLogos();
        function scrollLogos() {
            if (isPaused) {
                requestAnimationFrame(scrollLogos);
                return;
            }
            scrollPosition += scrollSpeed;
            trustedGrid.style.transform = `translateX(${scrollPosition}px)`;
            if (scrollPosition >= 0) {
                scrollPosition -= originalWidth;
            }
            requestAnimationFrame(scrollLogos);
        }
        requestAnimationFrame(scrollLogos);

        wrapper.addEventListener('mouseenter', () => {
            isPaused = true;
            scrollSpeed = hoverSpeed;
        });

        wrapper.addEventListener('mouseleave', () => {
            isPaused = false;
            scrollSpeed = normalSpeed;
        });

        window.addEventListener('resize', () => {
            scrollPosition = 0;
            setupLogos();
        });
    }

    // Power quality fade-in
    const powerQuality = document.querySelector('.power-quality');
    if (powerQuality) {
        powerQuality.style.opacity = 0;
        setTimeout(() => {
            powerQuality.style.transition = 'opacity 1s ease-in';
            powerQuality.style.opacity = 1;
        }, 2000);
    }

    // Power quality button bounce
    const powerQualityBtn = document.querySelector('.power-quality-btn');
    if (powerQualityBtn) {
        powerQualityBtn.addEventListener('mouseover', () => {
            powerQualityBtn.style.transform = 'scale(1.05) translateY(-2px)';
            powerQualityBtn.style.transition = 'transform 0.3s ease';
        });
        powerQualityBtn.addEventListener('mouseout', () => {
            powerQualityBtn.style.transform = 'scale(1)';
        });
    }

    // Power quality visual interaction
    const powerVisual = document.querySelector('.power-quality-visual');
    if (powerVisual) {
        const svg = powerVisual.querySelector('.power-wave');
        const wave1 = svg.querySelector('.wave-1');
        const wave2 = svg.querySelector('.wave-2');
        const powerNode = svg.querySelector('.power-node');

        powerVisual.addEventListener('mousemove', (e) => {
            const rect = powerVisual.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * 200;
            const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

            const wave1Y = 20 + (mouseX / 200) * 60;
            wave1.style.animation = 'none';
            wave1.setAttribute('d', `M0,50 Q50,${wave1Y} 100,50 T200,50`);

            const wave2Y = 30 + (mouseX / 200) * 60;
            wave2.style.animation = 'none';
            wave2.setAttribute('d', `M0,60 Q50,${wave2Y} 100,60 T200,60`);

            const nodeY = Math.max(20, Math.min(80, mouseY));
            powerNode.setAttribute('cy', nodeY);
        });

        powerVisual.addEventListener('mouseleave', () => {
            wave1.style.animation = 'wave1 4s infinite ease-in-out';
            wave2.style.animation = 'wave2 5s infinite ease-in-out';
            powerNode.setAttribute('cy', '50');
        });
    }
});