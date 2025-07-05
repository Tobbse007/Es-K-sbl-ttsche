// JavaScript for Es Käseblättsche Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
    });
    
    // Newsletter Form Handling
    const newsletterForms = document.querySelectorAll('#newsletter-form, form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup(this);
        });
    });
    
    function handleNewsletterSignup(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const email = emailInput.value;
        
        // Validate email
        if (!isValidEmail(email)) {
            showMessage(form, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
            
            // Show success message
            showMessage(form, '✅ Erfolgreich angemeldet! Bestätigungsmail wurde versendet.', 'success');
            emailInput.value = '';
        }, 2000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(form, message, type) {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        form.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Accordion Functionality
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.accordion-toggle').forEach(btn => {
                btn.textContent = 'Mehr lesen ↓';
            });
            
            // Toggle current accordion
            if (!isActive) {
                content.classList.add('active');
                this.textContent = 'Weniger anzeigen ↑';
            }
        });
    });
    
    // Event Filter Functionality
    const filterButtons = document.querySelectorAll('.event-filter');
    const eventItems = document.querySelectorAll('.event-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            eventItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Add scroll animation class to elements
    const animateElements = document.querySelectorAll('section, article, .event-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Partner Logo Click Handling
    const partnerLogos = document.querySelectorAll('.partner-carousel .flex-shrink-0');
    partnerLogos.forEach(logo => {
        logo.addEventListener('click', function() {
            const partnerName = this.querySelector('div').textContent;
            alert(`Mehr Informationen über ${partnerName} finden Sie bald hier!`);
        });
        
        // Add hover effect
        logo.classList.add('hover-lift');
        logo.style.cursor = 'pointer';
    });
    
    // Auto-hide mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
    
    // Initialize animations on load
    setTimeout(() => {
        const heroSection = document.querySelector('section');
        if (heroSection) {
            heroSection.classList.add('in-view');
        }
    }, 100);
    
    // Add loading states to all buttons
    const buttons = document.querySelectorAll('button:not(.accordion-toggle):not(.event-filter):not(#mobile-menu-btn)');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('type') !== 'submit') {
                // Add loading state for demo
                this.classList.add('btn-loading');
                this.disabled = true;
                
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                    this.disabled = false;
                }, 1500);
            }
        });
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length &&
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            
            // Easter egg activation
            document.body.style.filter = 'hue-rotate(180deg)';
            alert('🎉 Sie haben das Käseblättsche Easter Egg gefunden! 🧀');
            
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
            
            konamiCode = [];
        }
    });
    
    // Console message for developers
    console.log(`
    🧀 Es Käseblättsche Website
    Entwickelt für die lokale Gemeinschaft
    Version: 1.0.0
    
    Interessiert an der Entwicklung? 
    Kontaktieren Sie uns über die Website!
    `);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Handle scroll-based animations here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);
