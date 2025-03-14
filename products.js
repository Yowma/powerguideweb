// script.js

document.addEventListener('DOMContentLoaded', () => {
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

    // Products carousel functionality
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        const productsGridWrapper = document.querySelector('.products-grid-wrapper');
        const productsGrid = document.querySelector('.products-grid');
        const productCards = document.querySelectorAll('.product-card');
        const paginationDots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const viewAllBtn = document.querySelector('.view-all-btn');
        const pagination = document.querySelector('.pagination');

        // Initialize state
        let currentPage = 0;
        let viewingAll = false;
        let isTransitioning = false;
        const cardsPerPage = 4; // Fixed number of cards per page

        // Calculate total pages
        function getTotalPages() {
            return Math.ceil(productCards.length / cardsPerPage);
        }

        // Smoothly transition to grid layout
        function transitionToGrid() {
            isTransitioning = true;

            // Fade out cards
            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                card.style.transition = 'all 0.4s ease';
            });

            // After a brief delay, apply the grid layout
            setTimeout(() => {
                productsGrid.style.display = 'grid';
                productsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                productsGrid.style.gap = '20px';
                productsGrid.style.width = '100%';
                productsGrid.style.transform = 'none'; // Reset transform

                // Make all cards visible with animation
                productCards.forEach((card, index) => {
                    card.style.minWidth = 'auto';

                    // Stagger the card animations
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50 * index);
                });

                // Hide pagination
                pagination.style.opacity = '0';
                pagination.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    pagination.style.display = 'none';
                }, 300);

                // Update button text
                viewAllBtn.textContent = 'View Less';

                // Add overflow to wrapper
                productsGridWrapper.style.overflowX = 'visible';
                productsGridWrapper.style.overflowY = 'visible';

                // Transition complete
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }, 300);
        }

        // Smoothly transition to carousel
        function transitionToCarousel() {
            isTransitioning = true;

            // Fade out cards
            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                card.style.transition = 'all 0.4s ease';
            });

            // After a brief delay, apply the carousel layout
            setTimeout(() => {
                productsGrid.style.display = 'flex';
                productsGrid.style.gap = '20px';
                productsGrid.style.width = 'max-content';
                productsGrid.style.transform = 'none'; // Reset transform initially

                // Reset cards
                productCards.forEach((card, index) => {
                    // Calculate card width based on wrapper's width
                    const wrapperWidth = productsGridWrapper.clientWidth;
                    const cardWidth = (wrapperWidth - (cardsPerPage - 1) * 20) / cardsPerPage;
                    card.style.minWidth = `${cardWidth}px`;

                    // Stagger the card animations
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50 * index);
                });

                // Show pagination
                pagination.style.display = 'flex';
                setTimeout(() => {
                    pagination.style.opacity = '1';
                }, 50);

                // Update button text
                viewAllBtn.textContent = 'View All';

                // Move to current page
                goToPage(currentPage);

                // Update pagination dots
                updatePaginationDots();

                // Update navigation buttons
                updateNavigationButtons();

                // Add overflow to wrapper
                productsGridWrapper.style.overflowX = 'hidden';
                productsGridWrapper.style.overflowY = 'hidden';

                // Transition complete
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }, 300);
        }

        // Update pagination dots
        function updatePaginationDots() {
            const totalPages = getTotalPages();

            // Create required number of dots if they don't exist
            const dotsContainer = document.querySelector('.dots');
            if (dotsContainer) {
                // Clear existing dots
                dotsContainer.innerHTML = '';

                // Create new dots based on total pages
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('span');
                    dot.className = 'dot' + (i === currentPage ? ' active' : '');
                    dot.addEventListener('click', () => goToPage(i));
                    dotsContainer.appendChild(dot);
                }
            }
        }

        // Update navigation buttons
        function updateNavigationButtons() {
            const totalPages = getTotalPages();
            if (prevBtn) prevBtn.disabled = currentPage === 0;
            if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
        }

        // Update carousel display
        function updateCarousel() {
            if (isTransitioning) return;

            if (viewingAll) {
                transitionToGrid();
            } else {
                transitionToCarousel();
            }
        }

        // Handle page navigation
        function goToPage(pageNum) {
            if (isTransitioning || viewingAll) return;

            const totalPages = getTotalPages();

            if (pageNum >= 0 && pageNum < totalPages) {
                currentPage = pageNum;

                // Calculate scroll amount
                const wrapperWidth = productsGridWrapper.clientWidth;
                const scrollAmount = currentPage * wrapperWidth;

                // Move to current page with smooth transition
                productsGrid.style.transform = `translateX(-${scrollAmount}px)`;

                // Update pagination dots
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentPage);
                });

                // Update navigation buttons
                updateNavigationButtons();
            }
        }

        // Set initial styles
        pagination.style.transition = 'opacity 0.3s ease';
        productsGrid.style.transition = 'transform 0.5s ease';
        productsGridWrapper.style.overflowX = 'hidden';
        productsGridWrapper.style.overflowY = 'hidden';

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToPage(currentPage + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToPage(currentPage - 1);
            });
        }

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                if (isTransitioning) return;
                viewingAll = !viewingAll;
                updateCarousel();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (isTransitioning) return;

            if (!viewingAll) {
                const totalPages = getTotalPages();

                // Make sure current page is valid after resize
                if (currentPage >= totalPages) {
                    currentPage = totalPages - 1;
                }

                // Recalculate card widths
                productCards.forEach(card => {
                    const wrapperWidth = productsGridWrapper.clientWidth;
                    const cardWidth = (wrapperWidth - (cardsPerPage - 1) * 20) / cardsPerPage;
                    card.style.minWidth = `${cardWidth}px`;
                });

                // Update carousel position
                goToPage(currentPage);

                // Update pagination dots
                updatePaginationDots();

                // Update navigation buttons
                updateNavigationButtons();
            }
        });

        // Initialize on load
        updateCarousel();
    }

    // Discover Section Hover Animation
    const discoverBenefits = document.querySelectorAll('.discover-benefits li');
    if (discoverBenefits) {
        discoverBenefits.forEach(benefit => {
            benefit.addEventListener('mouseenter', () => {
                benefit.style.transform = 'scale(1.05)';
                benefit.querySelector('i').style.color = '#065401';
            });
            benefit.addEventListener('mouseleave', () => {
                benefit.style.transform = 'scale(1)';
                benefit.querySelector('i').style.color = '#21871E';
            });
        });
    }

    // Protection Section Hover Animation
    const protectionBenefits = document.querySelectorAll('.protection-benefits li');
    if (protectionBenefits) {
        protectionBenefits.forEach(benefit => {
            benefit.addEventListener('mouseenter', () => {
                benefit.style.transform = 'scale(1.05)';
                benefit.querySelector('i').style.color = '#065401';
            });
            benefit.addEventListener('mouseleave', () => {
                benefit.style.transform = 'scale(1)';
                benefit.querySelector('i').style.color = '#21871E';
            });
        });
    }
});