// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Simulate newsletter signup
                showNotification('Erfolgreich angemeldet! Sie erhalten in Kürze eine Bestätigungsmail.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            }
        });
    });
    
    // Event filter buttons
    const filterButtons = document.querySelectorAll('section button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            const siblingButtons = this.parentElement.querySelectorAll('button');
            siblingButtons.forEach(btn => {
                btn.classList.remove('bg-blue-medium', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-blue-medium', 'text-white');
            
            // Here you would typically filter events based on the button text
            console.log('Filter events by:', this.textContent);
        });
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
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe all article and section elements
    document.querySelectorAll('article, section > div').forEach(el => {
        observer.observe(el);
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set colors based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Partner logo carousel
function initPartnerCarousel() {
    const carousel = document.querySelector('.flex.space-x-8.animate-pulse');
    if (carousel) {
        // Remove animate-pulse and add custom animation
        carousel.classList.remove('animate-pulse');
        carousel.classList.add('animate-scroll');
        
        // Clone elements for infinite scroll effect
        const logos = carousel.children;
        const logosArray = Array.from(logos);
        
        logosArray.forEach(logo => {
            const clone = logo.cloneNode(true);
            carousel.appendChild(clone);
        });
    }
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initPartnerCarousel);

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }
    
    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-scroll {
        animation: scroll 20s linear infinite;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f5f9;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #3b82f6;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #1e3a8a;
    }
    
    /* Smooth hover effects */
    .hover\\:scale-105:hover {
        transform: scale(1.05);
    }
    
    /* Focus styles for accessibility */
    button:focus, input:focus, a:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;

document.head.appendChild(style);