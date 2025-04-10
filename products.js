// products.js
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger?.addEventListener('click', () => navLinks.classList.toggle('active'));

    // Newsletter form
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value.trim();
            alert(email ? `Thank you for subscribing with ${email}!` : 'Please enter a valid email.');
            form.reset();
        });
    });

    // Products carousel
    const productsGridWrapper = document.querySelector('.products-grid-wrapper');
    const productsGrid = document.querySelector('.products-grid');
    const productCards = document.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const dotsContainer = document.querySelector('.dots');

    let currentPage = 0;
    const cardsPerPage = getCardsPerPage(); // Dynamic cards per page
    let viewingAll = false;
    const totalPages = Math.ceil(productCards.length / cardsPerPage);

    // Dynamically calculate cards per page based on screen width
    function getCardsPerPage() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 576) return 1;
        if (screenWidth < 768) return 2;
        if (screenWidth < 1024) return 3;
        return 4;
    }

    // Responsive event listener
    window.addEventListener('resize', () => {
        // Recalculate cards per page and reset view
        const newCardsPerPage = getCardsPerPage();
        if (newCardsPerPage !== cardsPerPage && !viewingAll) {
            currentPage = 0;
            goToPage(0);
        }
    });

    // Assign animation delay index to each card
    productCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index % cardsPerPage);
    });

    // Dynamic pagination dots
    function createPaginationDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = `dot${i === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }
    createPaginationDots();

    function updateNavigation() {
        prevBtn.disabled = currentPage === 0 || viewingAll;
        nextBtn.disabled = currentPage === totalPages - 1 || viewingAll;
        document.querySelectorAll('.dot').forEach((dot, i) =>
            dot.classList.toggle('active', i === currentPage));
        if (viewingAll) {
            dotsContainer.style.opacity = '0';
            prevBtn.style.opacity = '0';
            nextBtn.style.opacity = '0';
        } else {
            dotsContainer.style.opacity = '1';
            prevBtn.style.opacity = '1';
            nextBtn.style.opacity = '1';
        }
    }

    function goToPage(page) {
        if (viewingAll || page < 0 || page >= totalPages) return;
        currentPage = page;
        const wrapperWidth = productsGridWrapper.clientWidth;
        const scrollAmount = page * wrapperWidth;
        productsGrid.style.transform = `translateX(-${scrollAmount}px)`;
        // Trigger card entrance animation on visible cards
        const startIndex = page * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, productCards.length);
        for (let i = startIndex; i < endIndex; i++) {
            productCards[i].style.animation = 'none';
            productCards[i].offsetHeight; // Trigger reflow
            productCards[i].style.animation = 'cardEntrance 0.5s ease forwards';
            productCards[i].style.animationDelay = `${(i - startIndex) * 0.1}s`;
        }
        updateNavigation();
    }

    function toggleViewAll() {
        viewingAll = !viewingAll;
        if (viewingAll) {
            // View All: Show all products in a responsive grid
            productsGrid.classList.add('view-all');
            productsGrid.style.transform = 'none';
            productsGridWrapper.style.overflowX = 'visible';
            viewAllBtn.textContent = 'View Less';
            // Animate all cards
            productCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'cardEntrance 0.5s ease forwards';
                card.style.animationDelay = `${index * 0.05}s`;
            });
        } else {
            // View Less: Restore original carousel behavior
            productsGrid.classList.remove('view-all');
            productsGrid.style.display = 'flex';
            productsGrid.style.transform = `translateX(0)`;
            productsGridWrapper.style.overflowX = 'hidden';
            viewAllBtn.textContent = 'View All';
            currentPage = 0;
            goToPage(0);
        }
        updateNavigation();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    viewAllBtn.addEventListener('click', toggleViewAll);

    // Hover animations for benefits
    document.querySelectorAll('.discover-benefits li, .protection-benefits li').forEach(benefit => {
        benefit.addEventListener('mouseenter', () => {
            benefit.style.transform = 'scale(1.05)';
            benefit.querySelector('i').style.color = '#065401';
        });
        benefit.addEventListener('mouseleave', () => {
            benefit.style.transform = 'scale(1)';
            benefit.querySelector('i').style.color = '#21871E';
        });
    });

    // Initial setup
    goToPage(0); // Trigger initial animation
});