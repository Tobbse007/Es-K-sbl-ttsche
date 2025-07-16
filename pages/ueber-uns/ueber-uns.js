// This file contains additional JavaScript functionality for the Über uns page

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Initialize Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Observe each service card
    serviceCards.forEach(card => {
        observer.observe(card);
        
        // Add staggered delay based on index
        const index = Array.from(serviceCards).indexOf(card);
        card.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Add hover effects for service cards
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.classList.add('scale-110');
        });
        
        card.addEventListener('mouseleave', () => {
            icon.classList.remove('scale-110');
        });
    });
    
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Navigation hover effect for desktop
    const navItems = document.querySelectorAll('.nav-item');
    const indicator = document.getElementById('hoverIndicator');
    
    function updateIndicator(item) {
        const rect = item.getBoundingClientRect();
        const navRect = document.getElementById('mainNav').getBoundingClientRect();
        
        indicator.style.width = rect.width + 'px';
        indicator.style.left = (rect.left - navRect.left) + 'px';
        indicator.style.opacity = '1';
    }
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            updateIndicator(item);
        });
    });
    
    // When leaving the nav area, go back to the active item (Über uns)
    document.getElementById('mainNav').addEventListener('mouseleave', () => {
        const activeItem = document.querySelector('.nav-item[data-index="1"]');
        if (activeItem) {
            updateIndicator(activeItem);
        }
    });
    
    // Set initial indicator to be visible on "Über uns & Leistungen" menu item
    const activeItem = document.querySelector('.nav-item[data-index="1"]');
    if (activeItem) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
            updateIndicator(activeItem);
        }, 10);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add CSS animation for fade-in effect
if (!document.querySelector('#fadeInStyle')) {
    const style = document.createElement('style');
    style.id = 'fadeInStyle';
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
        }
        
        .service-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
