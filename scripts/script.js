document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector(".featured-slider");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const cards = document.querySelectorAll(".dish-card");
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    
    // Count total number of cards
    const totalCards = cards.length;
    
    // Set how many cards to show based on screen size
    let visibleCards = 3;
    if (window.innerWidth < 992) visibleCards = 2;
    if (window.innerWidth < 768) visibleCards = 1;
    
    let currentIndex = 0;
    
    function updateSlider() {
        const offset = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update active state for all cards
        cards.forEach((card, index) => {
            // Determine if the card is in the middle
            const middleIndex = Math.floor(visibleCards / 2);
            const isMiddleCard = index === currentIndex + middleIndex;
            
            // Apply different scaling based on card position
            if (isMiddleCard) {
                // Grow the middle card more
                card.style.transform = "scale(1.05)";
                card.style.zIndex = "10";
                card.style.opacity = "1";
            } else {
                // Other cards slightly smaller
                card.style.transform = "scale(0.95)";
                card.style.zIndex = "1";
                card.style.opacity = index >= currentIndex && index < currentIndex + visibleCards ? "1" : "0";
            }
        });
        
        // Disable buttons when at boundaries
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - visibleCards;
    }
    
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Initialize slider
    slider.style.transition = "transform 0.5s ease";
    updateSlider();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newVisibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        if (newVisibleCards !== visibleCards) {
            visibleCards = newVisibleCards;
            // Adjust currentIndex if it would go out of bounds
            currentIndex = Math.min(currentIndex, totalCards - visibleCards);
            updateSlider();
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
});