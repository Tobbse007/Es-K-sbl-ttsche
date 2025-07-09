// Mobile-specific JavaScript for Es Käseblättsche website

document.addEventListener('DOMContentLoaded', function() {
    console.log("Mobile.js loaded");
    
    // Force the magazine straightening setup immediately
    setupMagazineScrollAnimation();
    
    // Check if we're on a mobile device
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add mobile class to html element for CSS targeting
    if (isMobile) {
        document.documentElement.classList.add('mobile-device');
    }
    // Improve mobile menu open/close animations
    const mobileMenuBtn = document.querySelector('button[onclick="toggleMobileMenu"]');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Override the default toggle function
        window.toggleMobileMenu = function() {
            const isVisible = mobileMenu.classList.contains('block');
            
            if (isVisible) {
                // Close menu with animation
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    mobileMenu.classList.replace('block', 'hidden');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
                }, 200);
            } else {
                // Open menu with animation
                mobileMenu.classList.replace('hidden', 'block');
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-times text-lg"></i>';
                }, 10);
            }
        };
        
        // Set initial styles for animation
        mobileMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }
    
    // Add touch feedback to navigation links
    const navLinks = document.querySelectorAll('#mobileMenu a');
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        });
        
        link.addEventListener('touchend', function() {
            this.style.backgroundColor = '';
        });
    });
    // Check if we're on a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        setupMobileInteractions();
    }
    
    // Add smooth scrolling for the past issues grid on mobile
    const pastIssuesGrid = document.querySelector('.past-issues-grid');
    if (pastIssuesGrid && window.innerWidth < 768) {
        pastIssuesGrid.style.overflowX = 'auto';
        pastIssuesGrid.style.scrollBehavior = 'smooth';
        pastIssuesGrid.style.webkitOverflowScrolling = 'touch';
        pastIssuesGrid.style.scrollSnapType = 'x mandatory';
        
        // Remove scroll indicator arrows
        // const scrollIndicator = document.createElement('div');
        // scrollIndicator.className = 'scroll-indicator';
        // scrollIndicator.innerHTML = '<span>←</span> <span>→</span>';
        // scrollIndicator.style.textAlign = 'center';
        // scrollIndicator.style.color = '#3b82f6';
        // scrollIndicator.style.marginTop = '0.5rem';
        // scrollIndicator.style.fontSize = '0.875rem';
        // pastIssuesGrid.parentNode.insertBefore(scrollIndicator, pastIssuesGrid.nextSibling);
        
        // Hide indicator after scrolling
        pastIssuesGrid.addEventListener('scroll', function() {
            scrollIndicator.style.opacity = '0.3';
            setTimeout(() => {
                scrollIndicator.style.opacity = '0';
            }, 1500);
        });
    }
});

function setupMobileInteractions() {
    // Set up scroll-triggered rotation for magazine subtitle
    setupMagazineScrollAnimation();
    
    // Add touch-specific UI elements and interactions
    const pastIssueItems = document.querySelectorAll('.past-issue-item');
    
    pastIssueItems.forEach(item => {
        // Create toggle button for expanding description on mobile
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'touch-expand-btn';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleBtn.style.display = 'none'; // Initially hidden, shown via CSS for touch devices
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.bottom = '10px';
        toggleBtn.style.right = '10px';
        toggleBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        toggleBtn.style.border = 'none';
        toggleBtn.style.borderRadius = '50%';
        toggleBtn.style.width = '30px';
        toggleBtn.style.height = '30px';
        toggleBtn.style.zIndex = '10';
        toggleBtn.style.color = 'white';
        
        // Add toggle functionality
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = item.classList.toggle('issue-expanded');
            
            // Change icon based on state
            toggleBtn.innerHTML = isExpanded 
                ? '<i class="fas fa-chevron-up"></i>' 
                : '<i class="fas fa-chevron-down"></i>';
        });
        
        // Add to DOM
        item.appendChild(toggleBtn);
        
        // Make the whole card clickable on mobile
        item.addEventListener('click', function() {
            const link = item.querySelector('a');
            if (link) {
                link.click();
            }
        });
    });
    
    // Adjust magazine rotation for better mobile experience
    const magazineInner = document.getElementById('magazineInner');
    if (magazineInner) {
        // Less rotation on small screens for better visibility
        if (window.innerWidth < 768) {
            magazineInner.style.transform = 'rotate(4deg) scale(1)';
        }
    }
    
    // Improve back to top button on mobile
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        // Make button bigger and more visible on mobile
        backToTopBtn.style.width = '3rem';
        backToTopBtn.style.height = '3rem';
        
        // Change threshold to show earlier on mobile (after 200px scroll)
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Add haptic-like feedback on touch
        backToTopBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        backToTopBtn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add class to body for mobile-specific styling
    document.body.classList.add('mobile-view');
    
    // Fix iOS vh unit bug (100vh is often too tall on iOS)
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Add swipe detection for mobile
    setupSwipeDetection();
    
    // Optimize form interactions
    optimizeFormInteractions();
    
    // Add touch ripple effect to buttons
    addTouchRippleEffect();
}

// Function to set up swipe detection
function setupSwipeDetection() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 100; // Minimum distance for a swipe
        
        // Right swipe (can be used for previous item)
        if (touchEndX - touchStartX > threshold) {
            // Handle right swipe functionality if needed
        }
        
        // Left swipe (can be used for next item)
        if (touchStartX - touchEndX > threshold) {
            // Handle left swipe functionality if needed
        }
    }
}

// Function to optimize form interactions on mobile
function optimizeFormInteractions() {
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Add extra padding when keyboard appears
            document.body.style.paddingBottom = '30vh';
            
            // Scroll to the input
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
        
        input.addEventListener('blur', function() {
            // Remove extra padding
            document.body.style.paddingBottom = '';
        });
    });
}

// Function to add ripple effect to buttons on touch
// Function to handle magazine rotation animation on scroll
function setupMagazineScrollAnimation() {
    console.log("Setting up magazine straightening effect on scroll");
    const magazineSection = document.querySelector('.magazine-section');
    const magazineInner = document.getElementById('magazineInner');
    
    if (!magazineInner || !magazineSection) {
        console.log("Magazine elements not found");
        return;
    }
    
    // Set initial state to be tilted
    magazineInner.style.transform = 'rotate(4deg) scale(1)';
    
    // Apply initial check if section is already in viewport
    setTimeout(() => {
        const sectionRect = magazineSection.getBoundingClientRect();
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
            console.log("Magazine section is initially in view");
            magazineInner.classList.add('straighten');
        }
    }, 100);
    
    // Scroll event handler to straighten magazine
    const checkScrollPosition = () => {
        const sectionRect = magazineSection.getBoundingClientRect();
        const isInView = sectionRect.top < window.innerHeight * 0.7 && sectionRect.bottom > 0;
        
        if (isInView) {
            console.log("Magazine section is in view on scroll - straightening");
            magazineInner.classList.add('straighten');
        } else {
            console.log("Magazine section out of view - returning to tilted position");
            magazineInner.classList.remove('straighten');
        }
    };
    
    // Use both approaches for maximum compatibility
    
    // 1. Simple scroll event listener for all browsers
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // 2. IntersectionObserver for modern browsers
    if ('IntersectionObserver' in window) {
        console.log("Using IntersectionObserver");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When magazine section is in view
                if (entry.isIntersecting) {
                    console.log("Magazine section intersecting via observer - straightening");
                    magazineInner.classList.add('straighten');
                } else {
                    console.log("Magazine section not intersecting - returning to tilted position");
                    magazineInner.classList.remove('straighten');
                }
            });
        }, { threshold: [0, 0.3, 0.6] }); // Multiple thresholds for better detection
        
        // Observe the magazine section
        observer.observe(magazineSection);
    }
    
    // Also handle scroll events for smooth animation
    document.addEventListener('touchmove', checkScrollPosition, { passive: true });
    document.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Check on resize as well
    window.addEventListener('resize', checkScrollPosition, { passive: true });
    
    // Force check periodically for reliability
    setInterval(checkScrollPosition, 1000);
}

// Reorganize magazine section for mobile
function reorganizeMagazineSectionForMobile() {
    if (window.innerWidth <= 768) {
        const magazineSection = document.querySelector('.magazine-section');
        if (!magazineSection) return;
        
        const container = magazineSection.querySelector('.container');
        const flexContainer = container.querySelector('.flex-col.lg\\:flex-row');
        if (!flexContainer) return;
        
        const magazineCover = document.getElementById('magazineCover');
        const highlightsContainer = flexContainer.querySelector('.w-full.max-w-2xl');
        if (!magazineCover || !highlightsContainer) return;
        
        // Get title elements
        const titleSection = highlightsContainer.querySelector('.mb-5');
        if (!titleSection) return;
        
        // Move title to the top
        flexContainer.prepend(titleSection);
        
        // Make sure magazine cover is in the middle
        titleSection.after(magazineCover);
        
        // Ensure highlights are at the bottom
        const highlightsBox = highlightsContainer.querySelector('.magazine-highlights');
        if (highlightsBox) {
            magazineCover.after(highlightsBox);
        }
        
        // Apply mobile-specific styling
        titleSection.style.textAlign = 'center';
        titleSection.style.marginBottom = '0.25rem'; // Further reduced spacing to 0.25rem
        titleSection.style.width = '100%';
        
        // Center title elements
        const titleBadge = titleSection.querySelector('span');
        if (titleBadge) {
            titleBadge.style.margin = '0 auto';
            titleBadge.style.display = 'inline-block';
        }
        
        const titleHeading = titleSection.querySelector('h2');
        if (titleHeading) {
            titleHeading.style.textAlign = 'center';
        }
        
        const subtitleFlex = titleSection.querySelector('.flex.items-center');
        if (subtitleFlex) {
            subtitleFlex.style.justifyContent = 'center';
        }
        
        // Style magazine cover
        magazineCover.style.width = '85%';
        magazineCover.style.margin = '0 auto 0 auto'; // Completely removed bottom margin
        
        // Style highlights box
        if (highlightsBox) {
            highlightsBox.style.width = '100%';
            highlightsBox.style.marginTop = '-0.5rem'; // Added negative margin to pull it up
        }
    }
}

// Run on page load and window resize
window.addEventListener('DOMContentLoaded', reorganizeMagazineSectionForMobile);
window.addEventListener('resize', reorganizeMagazineSectionForMobile);

function addTouchRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn, a.bg-blue-medium, a.bg-blue-dark');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'touch-ripple';
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            ripple.style.zIndex = '10';
            
            // Check if position is not static
            const position = window.getComputedStyle(this).getPropertyValue('position');
            if (position === 'static') {
                this.style.position = 'relative';
            }
            
            this.appendChild(ripple);
            
            // Animate ripple
            requestAnimationFrame(() => {
                ripple.style.width = Math.max(rect.width, rect.height) * 2.5 + 'px';
                ripple.style.height = Math.max(rect.width, rect.height) * 2.5 + 'px';
                ripple.style.opacity = '0';
                ripple.style.transition = 'all 0.6s ease-out';
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });
}

// Responsive adjustments on resize
window.addEventListener('resize', function() {
    // Adjust magazine size and rotation on window resize
    const magazineCover = document.getElementById('magazineCover');
    const magazineInner = document.getElementById('magazineInner');
    
    if (magazineCover && magazineInner) {
        if (window.innerWidth < 768) {
            magazineInner.style.transform = 'rotate(4deg) scale(1)';
            magazineCover.style.width = '85%';
            magazineCover.style.margin = '0 auto 2rem';
        } else {
            magazineInner.style.transform = 'rotate(6deg) scale(1)';
            magazineCover.style.width = '';
            magazineCover.style.margin = '';
        }
    }
    
    // Update vh custom property on resize
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
