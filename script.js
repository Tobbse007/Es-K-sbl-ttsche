// Mobile Menu Toggle with animation
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = document.querySelector('button[onclick="toggleMobileMenu()"]');
    
    if (mobileMenu.classList.contains('hidden')) {
        // Open menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate-fadeIn');
        menuButton.innerHTML = '<i class="fas fa-times text-xl"></i>';
    } else {
        // Close menu with fade out animation
        mobileMenu.classList.add('animate-fadeOut');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('animate-fadeOut', 'animate-fadeIn');
            menuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        }, 300);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Handle navbar indicator immediately
    initializeNavIndicator();
    
    // Add required animation classes to CSS
    addAnimationStyles();
    
    // Handle all newsletter forms
    initializeNewsletterForms();
    
    // Handle event filter buttons
    initializeFilterButtons();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Animation on scroll
    initializeScrollAnimations();
    
    // Initialize image lazy loading
    initializeLazyLoading();
    
    // Initialize magazine scroll rotation effect
    initializeMagazineScrollEffect();
    
    // Initialize back to top button
    initializeBackToTop();
    
    // Initialize progress bar animations
    initializeProgressBars();
    
    // Initialize smooth navbar hover effect
    initializeSmoothNavHover();
});

// Extremely simple magazine effect - ONLY rotation, no scaling
function initializeMagazineScrollEffect() {
    const magazineInner = document.getElementById('magazineInner');
    
    // Remove old direct initialization as we now have a dedicated function
    
    if (magazineInner) {
        // Ensure initial state is set
        magazineInner.style.transform = 'rotate(6deg) scale(1)';
        magazineInner.style.transition = 'transform 1000ms ease-out';
        
        function handleScroll() {
            // Get position information
            const rect = magazineInner.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Simple calculation: how far down the viewport is the magazine
            // 1 = at top of viewport, 0 = at middle of viewport or lower
            const scrollProgress = Math.max(0, Math.min(1, rect.top / (windowHeight * 0.5)));
            
            // Calculate rotation: 6 degrees when at top, 0 when in middle of viewport
            const rotation = 6 * scrollProgress;
            
            // Apply ONLY rotation with fixed scale
            magazineInner.style.transform = `rotate(${rotation}deg) scale(1)`;
        }
        
        window.addEventListener('scroll', handleScroll);
        // Initial calculation
        handleScroll();
    }
}

// Newsletter Form Handling
function initializeNewsletterForms() {
    const newsletterForms = document.querySelectorAll('form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Button animation on success
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Angemeldet!';
                    submitButton.classList.add('bg-green-500');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        const originalText = submitButton.querySelector('span') ? 
                            submitButton.querySelector('span').innerHTML : 'Anmelden';
                        submitButton.innerHTML = `
                            <span class="relative z-10 flex items-center">
                                <i class="fas fa-check mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                <span>${originalText}</span>
                            </span>`;
                        submitButton.classList.remove('bg-green-500');
                    }, 3000);
                }
                
                // Simulate newsletter signup
                showNotification('Erfolgreich angemeldet! Sie erhalten in Kürze eine Bestätigungsmail.', 'success');
                emailInput.value = '';
            } else {
                // Shake animation for error
                emailInput.classList.add('animate-shake');
                setTimeout(() => {
                    emailInput.classList.remove('animate-shake');
                }, 500);
                
                showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            }
        });
    });
}

// Event filter buttons
function initializeFilterButtons() {
    // Only target the filter buttons in the events section
    const filterButtons = document.querySelectorAll('.container button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find sibling buttons within same container
            const buttonGroup = this.closest('.flex.flex-wrap.gap-2');
            if (!buttonGroup) return;
            
            const siblingButtons = buttonGroup.querySelectorAll('button');
            
            // Remove active class from all buttons
            siblingButtons.forEach(btn => {
                if (btn.classList.contains('bg-blue-medium')) {
                    btn.classList.remove('bg-blue-medium', 'text-white', 'shadow-md');
                    btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
                }
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');
            this.classList.add('bg-blue-medium', 'text-white', 'shadow-md');
            
            // Filter events based on button text (placeholder for actual filtering)
            const filterValue = this.textContent.trim();
            console.log('Filter events by:', filterValue);
            
            // Add a pulse animation to the button
            this.classList.add('animate-pulse-once');
            setTimeout(() => {
                this.classList.remove('animate-pulse-once');
            }, 1000);
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's actually an anchor link and not just a "#" placeholder
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add URL hash without scrolling
                history.pushState(null, null, href);
                
                // Highlight the section briefly
                target.classList.add('highlight-section');
                setTimeout(() => {
                    target.classList.remove('highlight-section');
                }, 2000);
            }
        });
    });
}

// Animation on scroll
function initializeScrollAnimations() {
    // Configure the intersection observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };
    
    // Create an observer for fade-in animations
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                fadeObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    // Observe article cards, sections, and other elements with staggered delays
    const elementsToAnimate = document.querySelectorAll('article, .grid > div, section > .container > div:not(.grid)');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transitionDelay = `${index * 0.1}s`;
        fadeObserver.observe(el);
    });
    
    // Special animation for partner logos
    const partnerLogos = document.querySelectorAll('.bg-white.rounded-xl');
    partnerLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transitionDelay = `${index * 0.1}s`;
        
        const partnerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    partnerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        partnerObserver.observe(logo);
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTopBtn');
    
    if (!backToTopButton) return;
    
    const scrollThreshold = 400;
    
    // Simple scroll handler
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            backToTopButton.classList.remove('invisible');
            
            // Small delay to ensure the invisible is removed first
            setTimeout(() => {
                backToTopButton.classList.add('opacity-100');
                backToTopButton.classList.remove('opacity-0');
            }, 10);
        } else {
            backToTopButton.classList.remove('opacity-100');
            backToTopButton.classList.add('opacity-0');
            
            // Wait for fade out to complete
            setTimeout(() => {
                if (window.scrollY <= scrollThreshold) {
                    backToTopButton.classList.add('invisible');
                }
            }, 300);
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check in case page is loaded scrolled down
    if (window.scrollY > scrollThreshold) {
        backToTopButton.classList.remove('invisible');
        backToTopButton.classList.add('opacity-100');
        backToTopButton.classList.remove('opacity-0');
    }
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system with improved design
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-500 flex items-start translate-x-full opacity-0`;
    
    // Set colors and icon based on type
    let icon = '';
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
        icon = '<i class="fas fa-check-circle mr-3 text-xl"></i>';
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
        icon = '<i class="fas fa-exclamation-circle mr-3 text-xl"></i>';
    } else {
        notification.classList.add('bg-blue-medium', 'text-white');
        icon = '<i class="fas fa-info-circle mr-3 text-xl"></i>';
    }
    
    // Add content
    notification.innerHTML = `
        <div class="flex items-start w-full">
            ${icon}
            <div class="flex-1">${message}</div>
            <button class="text-white/80 hover:text-white ml-3" onclick="this.parentNode.parentNode.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Trigger entrance animation after a small delay
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 10);
    
    // Auto-remove after delay
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add necessary animation styles that aren't in Tailwind by default
function addAnimationStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }
        
        @keyframes pulseOnce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-fadeOut {
            animation: fadeOut 0.3s ease-out forwards;
        }
        
        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-shake {
            animation: shake 0.4s ease-in-out;
        }
        
        .animate-pulse-once {
            animation: pulseOnce 0.5s ease-in-out;
        }
        
        .animate-fade-in-down {
            animation: fadeInDown 0.8s ease forwards;
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .highlight-section {
            animation: highlightPulse 1.5s ease-in-out;
        }
        
        @keyframes highlightPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            50% { box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.3); }
        }
    `;
    document.head.appendChild(styleEl);
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

// Progress bars animation for sustainability metrics
function initializeProgressBars() {
    // Configure the intersection observer for progress bars with improved animations
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('div.bg-green-500');
                
                if (progressBar) {
                    // Get width from inline style or data attribute
                    const targetWidth = progressBar.style.width || progressBar.getAttribute('data-width') || '0%';
                    const targetPercent = parseInt(targetWidth);
                    
                    // Find the percentage text element (spans showing percentages)
                    const percentText = entry.target.querySelector('.text-xs.text-gray-500');
                    
                    // Reset width to 0 initially for animation
                    progressBar.style.width = '0%';
                    
                    // Add temporary highlight effect during animation
                    progressBar.classList.add('animating');
                    
                    // Counter animation for percentage text if available
                    let startValue = 0;
                    const counterDuration = 1500; // match with the bar transition
                    
                    const countInterval = percentText ? setInterval(() => {
                        startValue += 1;
                        if (startValue > targetPercent) {
                            clearInterval(countInterval);
                        } else {
                            percentText.textContent = `${startValue}% erreicht`;
                        }
                    }, counterDuration / targetPercent) : null;
                    
                    // Animate to target width with improved easing
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
                        progressBar.style.width = targetWidth;
                        
                        // Remove animation class after transition completes
                        setTimeout(() => {
                            progressBar.classList.remove('animating');
                        }, 1600);
                    }, 300);
                    
                    // Only animate once
                    progressObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px' // Show earlier when scrolling
    });
    
    // Observe all progress bar containers
    const progressBars = document.querySelectorAll('.rounded-full > .bg-green-500');
    progressBars.forEach(bar => {
        // Store the target width as a data attribute
        const initialWidth = bar.style.width;
        bar.setAttribute('data-width', initialWidth);
        
        // Observe the parent container to trigger animation
        progressObserver.observe(bar.parentElement.parentElement);
    });
    
    // Add hover effect to sustainability metrics
    const metricCards = document.querySelectorAll('.bg-white.p-5.rounded-lg');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.bg-green-500');
            if (progressBar) {
                progressBar.classList.add('pulse-effect');
            }
            
            // Also highlight the number for better user feedback
            const statNumber = this.querySelector('.text-3xl.font-bold');
            if (statNumber) {
                statNumber.classList.add('text-highlight');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.bg-green-500');
            if (progressBar) {
                progressBar.classList.remove('pulse-effect');
            }
            
            // Remove highlight from number
            const statNumber = this.querySelector('.text-3xl.font-bold');
            if (statNumber) {
                statNumber.classList.remove('text-highlight');
            }
        });
    });
    
    // Add enhanced CSS for effects
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = `
        .pulse-effect {
            animation: pulsate 1.5s ease-in-out;
        }
        
        .animating {
            box-shadow: 0 0 5px rgba(74, 222, 128, 0.5);
        }
        
        .text-highlight {
            color: #3b82f6;
            transition: color 0.3s ease;
        }
        
        @keyframes pulsate {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(enhancedStyle);
}

// Magazin-Cover-Rotationseffekt beim Scrollen
function initializeMagazineScrollEffect() {
    const magazineInner = document.getElementById('magazineInner');
    if (!magazineInner) return;
    
    const magazineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Gerade stellen
                magazineInner.style.transform = 'rotate(0deg)';
                
                // Bild vergrößern
                const coverImage = magazineInner.querySelector('img');
                if (coverImage) {
                    coverImage.classList.add('scale-105');
                }
            } else {
                // Zurück zur schiefen Position
                magazineInner.style.transform = 'rotate(6deg)';
                
                // Bild zurücksetzen
                const coverImage = magazineInner.querySelector('img');
                if (coverImage) {
                    coverImage.classList.remove('scale-105');
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-10% 0px'
    });
    
    const magazineCover = document.getElementById('magazineCover');
    if (magazineCover) {
        magazineObserver.observe(magazineCover);
    }
}

// Special function to reliably initialize the navbar indicator
function initializeNavIndicator() {
    const hoverIndicator = document.getElementById('hoverIndicator');
    const mainNav = document.getElementById('mainNav');
    const activeNavItem = document.querySelector('.nav-item[data-index="0"]'); // Startseite
    
    if (!hoverIndicator || !mainNav || !activeNavItem) return;
    
    // Wait to ensure layout is fully calculated
    setTimeout(() => {
        // Calculate dimensions and position for Startseite menu item
        const rect = activeNavItem.getBoundingClientRect();
        const navRect = mainNav.getBoundingClientRect();
        
        // Apply precise width and position
        hoverIndicator.style.width = `${rect.width}px`;
        hoverIndicator.style.left = `${rect.left - navRect.left}px`;
        hoverIndicator.style.opacity = '1';
        
        // For extra reliability on window resize
        window.addEventListener('resize', () => {
            const newRect = activeNavItem.getBoundingClientRect();
            const newNavRect = mainNav.getBoundingClientRect();
            
            hoverIndicator.style.width = `${newRect.width}px`;
            hoverIndicator.style.left = `${newRect.left - newNavRect.left}px`;
        });
    }, 50);
}

// Smooth hover effect for navbar
function initializeSmoothNavHover() {
    const navItems = document.querySelectorAll('.nav-item');
    const hoverIndicator = document.getElementById('hoverIndicator');
    const mainNav = document.getElementById('mainNav');
    
    if (!navItems.length || !hoverIndicator || !mainNav) return;
    
    // Initial setup
    let activeIndex = 0; // Default to first item (Startseite)
    let isHovering = false;
    
    // Function to update the indicator position and width
    function updateIndicator(item) {
        const rect = item.getBoundingClientRect();
        const navRect = mainNav.getBoundingClientRect();
        
        // Calculate position relative to the nav
        const leftPos = rect.left - navRect.left;
        
        // Set the indicator position and width
        hoverIndicator.style.width = `${rect.width}px`;
        hoverIndicator.style.left = `${leftPos}px`;
        hoverIndicator.style.opacity = '1';
    }
    
    // Add event listeners to each nav item
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            isHovering = true;
            updateIndicator(item);
        });
        
        item.addEventListener('mouseleave', () => {
            isHovering = false;
            
            // If not actively hovering any item, hide the indicator
            if (activeIndex === null) {
                hoverIndicator.style.opacity = '0';
            } else {
                // Return to the active item
                updateIndicator(navItems[activeIndex]);
            }
        });
        
        item.addEventListener('click', () => {
            // Update the active item
            activeIndex = parseInt(item.dataset.index);
            
            // Just update the indicator position without changing text color
            updateIndicator(item);
        });
    });
    
    // Add event listener to the nav container to handle mouse leaving
    mainNav.addEventListener('mouseleave', () => {
        if (activeIndex === null) {
            hoverIndicator.style.opacity = '0';
        }
    });
    
    // Set initial state - if there's an active page
    const currentPath = window.location.pathname;
    let initialActiveItem = navItems[0]; // Default to first item
    
    // This would need to be adjusted based on your actual URL structure
    if (currentPath.includes('magazin')) {
        initialActiveItem = navItems[1];
        activeIndex = 1;
    } else if (currentPath.includes('gemeinde')) {
        initialActiveItem = navItems[2];
        activeIndex = 2;
    } else if (currentPath.includes('veranstaltungen')) {
        initialActiveItem = navItems[3];
        activeIndex = 3;
    } else if (currentPath.includes('geschichte')) {
        initialActiveItem = navItems[4];
        activeIndex = 4;
    } else if (currentPath.includes('kontakt')) {
        initialActiveItem = navItems[5];
        activeIndex = 5;
    } else {
        initialActiveItem = navItems[0]; // Home page
        activeIndex = 0;
    }
    
    // Set initial active item - just position the indicator without changing text color
    if (initialActiveItem) {
        // Set the indicator on the active item on page load with a slight delay
        setTimeout(() => {
            updateIndicator(initialActiveItem);
        }, 100);
    }
}

