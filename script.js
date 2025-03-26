// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {

    const slider = document.querySelector(".featured-slider");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const cards = document.querySelectorAll(".dish-card");
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    const visibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    function updateSlider() {
        const offset = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update active state for all cards
        cards.forEach((card, index) => {
            const isActive = index >= currentIndex && index < currentIndex + visibleCards;
            card.style.transform = isActive ? "scale(1.05)" : "scale(0.95)";
            card.style.opacity = isActive ? "1" : "0";
        });
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
            currentIndex = Math.min(currentIndex, totalCards - newVisibleCards);
            updateSlider();
        }
    });

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Mobile menu toggle (if not already in your script.js)
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
});
