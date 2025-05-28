document.addEventListener('DOMContentLoaded', () => {
    // Initialize hamburger menu
    const setupHamburgerMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('active');
        });
    };

    // Initialize cards and animations
    const setupPizzaCards = () => {
        const cards = document.querySelectorAll('.pizza-card');
        
        // Set up initial states and animation orders
        cards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
            const content = card.querySelector('.ingredients-content');
            const contentP = content.querySelector('p');
            
            content.style.maxHeight = '0px';
            contentP.style.opacity = '0';
            contentP.style.transform = 'translateY(-10px)';
        });

        // Handle ingredients toggle
        document.querySelectorAll('.ingredients-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.pizza-card');
                const content = card.querySelector('.ingredients-content');
                const contentP = content.querySelector('p');
                
                // Close other open cards with smooth animation
                document.querySelectorAll('.pizza-card').forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('active')) {
                        const otherButton = otherCard.querySelector('.ingredients-toggle');
                        const otherContent = otherCard.querySelector('.ingredients-content');
                        const otherContentP = otherContent.querySelector('p');
                        
                        // Animate out
                        otherContentP.style.opacity = '0';
                        otherContentP.style.transform = 'translateY(-10px)';
                        
                        // After content fades out, collapse the container
                        setTimeout(() => {
                            otherButton.classList.remove('active');
                            otherCard.classList.remove('active');
                            otherContent.style.maxHeight = '0px';
                        }, 200);
                    }
                });

                // Toggle current card with enhanced animation
                button.classList.toggle('active');
                card.classList.toggle('active');
                
                if (button.classList.contains('active')) {
                    // Expand smoothly
                    content.style.maxHeight = `${content.scrollHeight}px`;
                    contentP.style.transform = 'translateY(0)';
                    
                    // Fade in content with slight delay
                    setTimeout(() => {
                        contentP.style.opacity = '1';
                    }, 200);
                    
                    // Scroll card into view if it's not fully visible
                    const cardRect = card.getBoundingClientRect();
                    if (cardRect.bottom > window.innerHeight) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    // Fade out content first
                    contentP.style.opacity = '0';
                    contentP.style.transform = 'translateY(-10px)';
                    
                    // Then collapse the container
                    setTimeout(() => {
                        content.style.maxHeight = '0px';
                    }, 200);
                }
            });
        });

        // Setup intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    };

    // Initialize everything
    setupHamburgerMenu();
    setupPizzaCards();
});
