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
    
    // Set up the tap interactions for past issues
    setupPastIssuesTapInteraction();
    
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

// Add tap-to-show/hide functionality for past issue items on mobile
function setupPastIssuesTapInteraction() {
    if (window.innerWidth <= 768) {
        const pastIssueItems = document.querySelectorAll('.past-issue-item');
        console.log('Found past issue items:', pastIssueItems.length);
        
        // First, remove any existing touch handlers from previous runs
        document.querySelectorAll('.past-issue-item').forEach(item => {
            // Clone and replace to remove all event listeners
            const oldItem = item;
            const newItem = oldItem.cloneNode(true);
            if (oldItem.parentNode) {
                oldItem.parentNode.replaceChild(newItem, oldItem);
            }
        });
        
        // Now set up the touch handlers on the fresh elements
        const freshPastIssueItems = document.querySelectorAll('.past-issue-item');
        freshPastIssueItems.forEach(item => {
            // Get overlay element
            const overlay = item.querySelector('.issue-overlay');
            // Get all anchor tags inside the item
            const allLinks = item.querySelectorAll('a');
            
            // Add preventScroll function to all links
            allLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Always prevent default for all links with href="#"
                    if (link.getAttribute('href') === '#') {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Prevented navigation to #');
                    }
                });
            });
            
            // Define the handler function for the whole past-issue-item
            function handlePastIssueTap(e) {
                // Check if we clicked on a link first
                const clickedLink = e.target.closest('a');
                
                // Special handling for "Jetzt lesen" link
                if (clickedLink && clickedLink.textContent.trim().includes('Jetzt lesen')) {
                    // If it has a real URL (not just "#"), let it navigate naturally
                    if (clickedLink.getAttribute('href') !== '#') {
                        // Let the default action happen
                        return;
                    } else {
                        // Otherwise prevent the default action
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Jetzt lesen clicked but navigation prevented');
                    }
                } 
                // For all other clicks on the past-issue-item
                else {
                    // Always prevent default first to stop scroll to top
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle the overlay
                    if (overlay.classList.contains('show-overlay')) {
                        overlay.classList.remove('show-overlay');
                        item.classList.remove('tapped');
                    } else {
                        // First hide all other overlays and remove tapped class
                        document.querySelectorAll('.past-issue-item').forEach(otherItem => {
                            otherItem.classList.remove('tapped');
                            const itemOverlay = otherItem.querySelector('.issue-overlay');
                            if (itemOverlay) {
                                itemOverlay.classList.remove('show-overlay');
                            }
                        });
                        
                        // Then show this overlay and add tapped class
                        overlay.classList.add('show-overlay');
                        item.classList.add('tapped');
                    }
                }
            }
            
            // Add tap functionality
            item.addEventListener('click', handlePastIssueTap);
        });
    }
}

// Call this function when the DOM is loaded and on window resize
document.addEventListener('DOMContentLoaded', setupPastIssuesTapInteraction);
window.addEventListener('resize', function() {
    clearTimeout(window.resizePastIssuesTimer);
    window.resizePastIssuesTimer = setTimeout(setupPastIssuesTapInteraction, 250);
});

// Ensure past issue items are visible in mobile view with optimized performance
function ensurePastIssuesVisible() {
    console.log("Checking past issues visibility with optimized loading...");
    if (window.innerWidth <= 768) {
        // Make sure past issues grid is visible
        const pastIssuesGrid = document.querySelector('.past-issues-grid');
        if (pastIssuesGrid) {
            console.log("Found past issues grid");
            
            // Force explicit styles to ensure grid visibility with hardware acceleration
            pastIssuesGrid.style.cssText = `
                display: grid !important;
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
                width: 100% !important;
                max-width: 320px !important;
                margin: 0 auto !important;
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 5 !important;
                will-change: transform !important;
                transform: translateZ(0) !important;
                contain: content !important;
            `;
            
            // Define correct filenames map - store it once
            const correctFilenames = {
                3: "./Bilder/2025/ausgabe3.jpg",  // Issue 3 uses "ausgabe"
                4: "./Bilder/2025/asugabe4.jpg",  // Issue 4 uses "asugabe" 
                5: "./Bilder/2025/asugabe5.jpg",  // Issue 5 uses "asugabe"
                6: "./Bilder/2025/ausgabe6.jpg"   // Issue 6 uses "ausgabe"
            };
            
            // Check and fix item visibility
            const pastIssueItems = pastIssuesGrid.querySelectorAll('.past-issue-item');
            console.log('Optimizing visibility of', pastIssueItems.length, 'past issue items');
            
            // Set up an intersection observer for lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const item = entry.target;
                        const img = item.querySelector('img');
                        const index = Array.from(pastIssueItems).indexOf(item);
                        const issueNumber = index + 3; // Issues start at 3
                        
                        if (img) {
                            // Use the correct filename directly from our map
                            const correctSrc = correctFilenames[issueNumber];
                            if (correctSrc) {
                                console.log(`Loading image ${index+1} (issue ${issueNumber}) with correct path: ${correctSrc}`);
                                img.src = correctSrc;
                            }
                            
                            // Add placeholder SVG in case image fails
                            img.onerror = function() {
                                console.error(`Failed to load image ${index+1}, using placeholder`);
                                // Create a placeholder div with background color instead of SVG
                                const placeholder = document.createElement('div');
                                placeholder.style.cssText = `
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    z-index: 1;
                                    background-color: #1e3a8a;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    color: white;
                                    font-family: Arial, sans-serif;
                                    font-size: 24px;
                                `;
                                placeholder.textContent = `Ausgabe ${issueNumber}`;
                                item.appendChild(placeholder);
                            };
                            
                            // Force hardware acceleration and other optimizations
                            img.style.cssText = `
                                display: block !important;
                                width: 100% !important;
                                height: 100% !important;
                                object-fit: cover !important;
                                position: relative !important;
                                visibility: visible !important;
                                opacity: 1 !important;
                                z-index: 1 !important;
                                transform: translateZ(0) !important;
                                backface-visibility: hidden !important;
                                transition: opacity 0.2s ease-in !important;
                            `;
                            
                            // Preload at high priority
                            img.fetchPriority = "high";
                            img.loading = "eager";
                        }
                        
                        // Apply hardware acceleration to the item
                        item.style.cssText = `
                            display: block !important;
                            position: relative !important;
                            height: auto !important;
                            aspect-ratio: 3/4 !important;
                            width: 100% !important;
                            margin: 0 auto !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            overflow: hidden !important;
                            border-radius: 0.75rem !important;
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                            will-change: transform !important;
                            transform: translateZ(0) !important;
                            backface-visibility: hidden !important;
                            background-color: #f0f0f0 !important;
                        `;
                        
                        // Create a placeholder background to prevent blue flash
                        if (!item.querySelector('.image-placeholder')) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'image-placeholder';
                            placeholder.style.cssText = `
                                position: absolute !important;
                                top: 0 !important;
                                left: 0 !important;
                                width: 100% !important;
                                height: 100% !important;
                                background-color: #f0f0f0 !important;
                                z-index: 0 !important;
                            `;
                            item.appendChild(placeholder);
                        }
                        
                        // Ensure overlay is properly styled
                        const overlay = item.querySelector('.issue-overlay');
                        if (overlay) {
                            overlay.style.cssText = `
                                position: absolute !important;
                                inset: 0 !important;
                                background: linear-gradient(to top, rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.7) 70%, transparent) !important;
                                z-index: 2 !important;
                                display: flex !important;
                                flex-direction: column !important;
                                justify-content: flex-end !important;
                                padding: 1rem !important;
                            `;
                        }
                        
                        // Stop observing this element
                        observer.unobserve(item);
                    }
                });
            }, { 
                rootMargin: '100px 0px', // Load images 100px before they come into view
                threshold: 0.01 // Trigger when just 1% of the item is visible
            });
            
            // Observe each item
            pastIssueItems.forEach(item => {
                imageObserver.observe(item);
            });
            
            // Force a layout recalculation
            pastIssuesGrid.offsetHeight;
        } else {
            console.error("Past issues grid not found!");
        }
    }
}

// Debug mode for troubleshooting past issues visibility
const DEBUG_MODE = true;

// Add global debug function accessible from console
window.fixMobileImages = function() {
    console.log("Manual image fixing started");
    ensurePastIssuesVisible();
    
    // Define correct filenames map
    const correctFilenames = {
        3: "./Bilder/2025/ausgabe3.jpg",  // Issue 3 uses "ausgabe"
        4: "./Bilder/2025/asugabe4.jpg",  // Issue 4 uses "asugabe" 
        5: "./Bilder/2025/asugabe5.jpg",  // Issue 5 uses "asugabe"
        6: "./Bilder/2025/ausgabe6.jpg"   // Issue 6 uses "ausgabe"
    };
    
    // Force all images to be loaded immediately
    const pastIssueItems = document.querySelectorAll('.past-issue-item');
    pastIssueItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            const issueNumber = index + 3; // Issues start at 3
            const correctSrc = correctFilenames[issueNumber];
            
            if (correctSrc) {
                console.log(`Fixing image ${index+1} with path: ${correctSrc}`);
                img.src = correctSrc;
                img.style.cssText = `
                    display: block !important;
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    position: relative !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    z-index: 1 !important;
                    transform: translateZ(0) !important;
                `;
            }
        }
    });
    
    console.log("Manual image fixing completed - if issues persist, reload the page");
    return "Image fixing completed";
};

// Debug function for past issues
function debugPastIssues() {
    if (!DEBUG_MODE) return;
    
    console.log("=== PAST ISSUES DEBUG ===");
    
    // Check grid
    const grid = document.querySelector('.past-issues-grid');
    if (!grid) {
        console.error("Grid not found!");
        return;
    }
    
    const gridStyle = window.getComputedStyle(grid);
    console.log("Grid display:", gridStyle.display);
    console.log("Grid visibility:", gridStyle.visibility);
    console.log("Grid opacity:", gridStyle.opacity);
    
    // Check each item
    const items = grid.querySelectorAll('.past-issue-item');
    console.log(`Found ${items.length} items`);
    
    items.forEach((item, i) => {
        const itemStyle = window.getComputedStyle(item);
        console.log(`Item ${i+1} display:`, itemStyle.display);
        console.log(`Item ${i+1} visibility:`, itemStyle.visibility);
        console.log(`Item ${i+1} opacity:`, itemStyle.opacity);
        
        // Check image
        const img = item.querySelector('img');
        if (img) {
            console.log(`Item ${i+1} image src:`, img.src);
            console.log(`Item ${i+1} image loaded:`, img.complete && img.naturalHeight !== 0);
            
            // Force show image
            img.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                z-index: 1 !important;
            `;
        } else {
            console.error(`Item ${i+1} has no image!`);
        }
        
        // Force show item with a background color
        item.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            height: auto !important;
            min-height: 300px !important;
            aspect-ratio: 3/4 !important;
            width: 100% !important;
            background-color: #1e3a8a !important;
            overflow: hidden !important;
            border-radius: 0.75rem !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        `;
    });
}

// Run debug after everything else
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(debugPastIssues, 1500);
});
window.addEventListener('load', () => {
    setTimeout(debugPastIssues, 1000);
    setTimeout(debugPastIssues, 3000);
});

// Run on page load, after a delay, and on resize
window.addEventListener('DOMContentLoaded', function() {
    // Run immediately
    ensurePastIssuesVisible();
    
    // Run again after a short delay to ensure all resources are loaded
    setTimeout(ensurePastIssuesVisible, 300);
    
    // And again after a longer delay for any lazy-loaded resources
    setTimeout(ensurePastIssuesVisible, 1000);
});

// Run when images are loaded
window.addEventListener('load', ensurePastIssuesVisible);

// Run on resize
window.addEventListener('resize', function() {
    clearTimeout(window.resizeIssuesTimer);
    window.resizeIssuesTimer = setTimeout(ensurePastIssuesVisible, 250);
});

// Add to setupMobileInteractions function as well
function updateSetupMobileInteractions() {
    const originalFunction = setupMobileInteractions;
    setupMobileInteractions = function() {
        originalFunction();
        // Always ensure past issues are visible in mobile view
        ensurePastIssuesVisible();
    };
}

// Execute the update
updateSetupMobileInteractions();

// Function to check and fix image loading in past issues
function fixPastIssuesImages() {
    console.log("Checking past issues images...");
    
    // Get all past issue images
    const pastIssueImages = document.querySelectorAll('.past-issue-item img');
    console.log(`Found ${pastIssueImages.length} past issue images`);
    
    // Try both naming conventions (ausgabe and asugabe)
    pastIssueImages.forEach((img, index) => {
        // Get the current src
        const currentSrc = img.getAttribute('src');
        console.log(`Image ${index+1} current src: ${currentSrc}`);
        
        // Check if image is loaded
        if (img.complete && img.naturalHeight !== 0) {
            console.log(`Image ${index+1} loaded successfully`);
        } else {
            console.warn(`Image ${index+1} loading issue detected`);
            
            // Try alternate naming if needed
            if (currentSrc.includes('ausgabe')) {
                const alternateSrc = currentSrc.replace('ausgabe', 'asugabe');
                console.log(`Trying alternate source: ${alternateSrc}`);
                img.src = alternateSrc;
            } else if (currentSrc.includes('asugabe')) {
                const alternateSrc = currentSrc.replace('asugabe', 'ausgabe');
                console.log(`Trying alternate source: ${alternateSrc}`);
                img.src = alternateSrc;
            }
            
            // Add a placeholder background color just in case
            img.style.backgroundColor = '#1e3a8a';
            
            // Parent container needs to be visible regardless
            const parent = img.closest('.past-issue-item');
            if (parent) {
                parent.style.backgroundColor = '#1e3a8a';
                parent.style.minHeight = '300px';
            }
        }
    });
}

// Call this function after the page has loaded
window.addEventListener('load', fixPastIssuesImages);
// Also call after a delay to catch any late-loading issues
setTimeout(fixPastIssuesImages, 1000);

// Function to fix image paths and ensure images are properly displayed
function fixPastIssueImages() {
    if (window.innerWidth <= 768) {
        console.log("Fixing past issue images for mobile view");
        
        // Get all past issue items
        const pastIssueItems = document.querySelectorAll('.past-issue-item');
        
        // For each item, check and fix the image
        pastIssueItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (!img) {
                console.error(`No image found in past issue ${index+1}`);
                return;
            }
            
            // Debug log
            console.log(`Processing image in issue ${index+1}: ${img.src}`);
            
            // Fix common image path errors
            let currentSrc = img.getAttribute('src');
            
            // Check if image has the right format (correct the "ausgabe" vs "asugabe" issue)
            if (currentSrc && currentSrc.includes('ausgabe')) {
                const correctedSrc = currentSrc.replace('ausgabe', 'asugabe');
                console.log(`Correcting image path from ${currentSrc} to ${correctedSrc}`);
                img.setAttribute('src', correctedSrc);
            }
            
            // Set explicit styles to ensure image visibility
            img.style.cssText = `
                display: block;
                visibility: visible;
                opacity: 1;
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 1; // Ensure image is above background but below overlay
                object-fit: cover;
            `;
            
            // Add error handler just in case
            img.onerror = function() {
                console.error(`Failed to load image: ${this.src}`);
                
                // Try alternative path format
                if (this.src.includes('asugabe')) {
                    const altPath = this.src.replace('asugabe', 'ausgabe');
                    console.log(`Trying alternative path: ${altPath}`);
                    this.src = altPath;
                } 
                // If that also fails, use a placeholder
                else {
                    this.onerror = null; // Prevent infinite error handling
                    console.log('Using placeholder image');
                    this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%231e3a8a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20font-family%3D%22Arial%22%3EMagazin%3C%2Ftext%3E%3C%2Fsvg%3E';
                }
            };
            
            // Force a reload of the image
            const currentSrc2 = img.getAttribute('src');
            img.setAttribute('src', currentSrc2);
            
            // Make sure the parent container isn't hiding the image
            item.style.overflow = 'visible';
            item.style.display = 'block';
            item.style.backgroundColor = 'transparent';
            
            // Make sure the overlay isn't permanently covering the image in mobile view
            const overlay = item.querySelector('.issue-overlay');
            if (overlay && !overlay.classList.contains('show-overlay')) {
                overlay.style.opacity = '0';
                overlay.style.background = 'linear-gradient(to top, rgba(30, 58, 138, 0.85), rgba(30, 58, 138, 0.6) 70%, transparent)';
            }
            
            console.log(`Image processing complete for issue ${index+1}`);
        });
    }
}

// Call the function when the page loads and on resize
document.addEventListener('DOMContentLoaded', fixPastIssueImages);
window.addEventListener('resize', function() {
    clearTimeout(window.resizeImageFixTimer);
    window.resizeImageFixTimer = setTimeout(fixPastIssueImages, 250);
});

// Function to monitor image loading and fix any issues
function monitorPastIssueImageLoading() {
    console.log("Monitoring past issue image loading...");
    
    // Get all past issue images
    const images = document.querySelectorAll('.past-issue-item img');
    
    // Process each image
    images.forEach((img, index) => {
        // Log original source
        const originalSrc = img.src;
        console.log(`Monitoring image ${index+1}: ${originalSrc}`);
        
        // Function to check if image is actually visible (not just loaded)
        const checkImageVisibility = () => {
            const isLoaded = img.complete && img.naturalHeight !== 0;
            const styles = window.getComputedStyle(img);
            const isVisible = styles.display !== 'none' && 
                             styles.visibility !== 'hidden' &&
                             parseFloat(styles.opacity) > 0;
            
            console.log(`Image ${index+1} - Loaded: ${isLoaded}, Visible: ${isVisible}`);
            
            // If image is loaded but not visible, fix it
            if (isLoaded && !isVisible) {
                console.log(`Fixing visibility for image ${index+1}`);
                img.style.cssText = `
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    position: relative !important;
                    z-index: 1 !important;
                `;
            }
            
            // If issue with ausgabe vs asugabe, try the alternative
            if (!isLoaded) {
                if (originalSrc.includes('ausgabe')) {
                    const altSrc = originalSrc.replace('ausgabe', 'asugabe');
                    console.log(`Trying alternative path for image ${index+1}: ${altSrc}`);
                    img.src = altSrc;
                } else if (originalSrc.includes('asugabe')) {
                    const altSrc = originalSrc.replace('asugabe', 'ausgabe');
                    console.log(`Trying alternative path for image ${index+1}: ${altSrc}`);
                    img.src = altSrc;
                }
            }
            
            // If still not visible after fixes, set a placeholder
            setTimeout(() => {
                const isNowLoaded = img.complete && img.naturalHeight !== 0;
                if (!isNowLoaded) {
                    console.log(`Setting placeholder for image ${index+1}`);
                    img.style.display = 'none';
                }
            }, 500);
        };
        
        // Check visibility after a short delay to allow for loading
        setTimeout(checkImageVisibility, 300);
        
        // Also check when the image loads or errors
        img.onload = () => {
            console.log(`Image ${index+1} loaded successfully`);
            checkImageVisibility();
        };
        
        img.onerror = () => {
            console.error(`Error loading image ${index+1}: ${img.src}`);
            
            // Try alternative path
            if (img.src.includes('ausgabe')) {
                img.src = img.src.replace('ausgabe', 'asugabe');
                console.log(`Trying alternative path: ${img.src}`);
            } else if (img.src.includes('asugabe')) {
                img.src = img.src.replace('asugabe', 'ausgabe');
                console.log(`Trying alternative path: ${img.src}`);
            }
        };
    });
}

// Call when DOM is ready and on resize
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(monitorPastIssueImageLoading, 500); // Delay to ensure DOM is fully ready
});
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        clearTimeout(window.resizeImageMonitorTimer);
        window.resizeImageMonitorTimer = setTimeout(monitorPastIssueImageLoading, 500);
    }
});

// Master function to coordinate all image fixes
function fixMobileIssuesDisplay() {
    console.log("Running master image fix function");
    
    // First make sure the container and items are visible
    ensurePastIssuesVisible();
    
    // Short delay before fixing paths
    setTimeout(() => {
        // Fix paths with exact filenames
        fixImagePathsWithExactNames();
        
        // Fix any remaining path issues
        fixPastIssueImages();
        
        // Short delay before monitoring loading
        setTimeout(() => {
            // Monitor image loading and fix any remaining issues
            monitorPastIssueImageLoading();
            
            // Final check after everything else has run
            setTimeout(debugPastIssues, 1000);
        }, 300);
    }, 200);
}

// Call the master function on load and resize
document.addEventListener('DOMContentLoaded', function() {
    // Allow time for page to fully render before fixing
    setTimeout(fixMobileIssuesDisplay, 300);
});

window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        clearTimeout(window.masterFixTimer);
        window.masterFixTimer = setTimeout(fixMobileIssuesDisplay, 300);
    }
});

// Function to fix image paths with exact filename matching
function fixImagePathsWithExactNames() {
    console.log("Fixing image paths with exact filenames...");
    
    // Get all past issue images
    const pastIssueItems = document.querySelectorAll('.past-issue-item');
    
    // Exact mapping of correct filenames
    const correctFilenames = {
        3: "ausgabe3.jpg",  // Issue 3 uses "ausgabe"
        4: "asugabe4.jpg",   // Issue 4 uses "asugabe" 
        5: "asugabe5.jpg",   // Issue 5 uses "asugabe"
        6: "ausgabe6.jpg"    // Issue 6 uses "ausgabe"
    };
    
    pastIssueItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // Get issue number (3, 4, or 5) based on index
        const issueNumber = index + 3; // Issues start at 3
        
        // Set the correct path directly
        const correctPath = `./Bilder/2025/${correctFilenames[issueNumber]}`;
        console.log(`Setting exact path for issue ${issueNumber}: ${correctPath}`);
        
        // Force the correct image path
        img.setAttribute('src', correctPath);
        
        // Set explicit styles to ensure image is visible
        img.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            z-index: 1 !important;
            position: relative !important;
        `;
        
        // Create a new image element to force reload
        const newImg = new Image();
        newImg.onload = function() {
            console.log(`Issue ${issueNumber} image loaded successfully`);
            // Replace with the successfully loaded image
            img.src = this.src;
        };
        newImg.onerror = function() {
            console.error(`Failed to load image for issue ${issueNumber}: ${this.src}`);
            // Set a placeholder with the issue number
            img.src = `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%234f46e5%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2220%22%3EAusgabe%20${issueNumber}%3C%2Ftext%3E%3C%2Fsvg%3E`;
        };
        // Load the image
        newImg.src = correctPath;
    });
}

// Function to preload past issue images
function preloadPastIssueImages() {
    console.log("Preloading past issue images...");
    
    // Create array of image paths to preload
    const imagePaths = [
        './Bilder/2025/ausgabe3.jpg',
        './Bilder/2025/asugabe4.jpg',
        './Bilder/2025/asugabe5.jpg',
        './Bilder/2025/ausgabe6.jpg'
    ];
    
    // Create a temporary container for preloaded images
    const preloadContainer = document.createElement('div');
    preloadContainer.style.position = 'absolute';
    preloadContainer.style.width = '0';
    preloadContainer.style.height = '0';
    preloadContainer.style.overflow = 'hidden';
    preloadContainer.style.opacity = '0';
    document.body.appendChild(preloadContainer);
    
    // Preload all images
    const preloadedImages = [];
    imagePaths.forEach((path, index) => {
        const img = new Image();
        img.onload = function() {
            console.log(`Preloaded image ${index+1}: ${path}`);
            preloadedImages.push({path: path, loaded: true});
            
            // Once all images are preloaded, update the actual images
            if (preloadedImages.length === imagePaths.length) {
                setTimeout(() => {
                    console.log("All images preloaded, updating actual images");
                    updatePastIssueImagesWithPreloaded(preloadedImages);
                }, 100);
            }
        };
        img.onerror = function() {
            console.error(`Failed to preload image ${index+1}: ${path}`);
            preloadedImages.push({path: path, loaded: false});
            
            // Try with alternative naming
            const altPath = path.includes('ausgabe') 
                ? path.replace('ausgabe', 'asugabe') 
                : path.replace('asugabe', 'ausgabe');
                
            const altImg = new Image();
            altImg.onload = function() {
                console.log(`Preloaded alternative image ${index+1}: ${altPath}`);
                preloadedImages.push({path: altPath, loaded: true});
            };
            altImg.src = altPath;
            preloadContainer.appendChild(altImg);
        };
        img.src = path;
        preloadContainer.appendChild(img);
    });
    
    // Timeout fallback in case some images fail to load
    setTimeout(() => {
        console.log("Preload timeout reached, updating images anyway");
        updatePastIssueImagesWithPreloaded(preloadedImages);
    }, 2000);
}

// Function to update actual images with preloaded ones
function updatePastIssueImagesWithPreloaded(preloadedImages) {
    const pastIssueItems = document.querySelectorAll('.past-issue-item');
    
    // Use successfully preloaded images to update actual images
    pastIssueItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // Find the corresponding preloaded image
        const preloadedImage = preloadedImages.find(pi => {
            const issueNum = index + 3;
            return pi.loaded && pi.path.includes(`${issueNum}.jpg`);
        }) || preloadedImages.find(pi => pi.loaded);
        
        if (preloadedImage) {
            console.log(`Updating image ${index+3} with preloaded path: ${preloadedImage.path}`);
            img.src = preloadedImage.path;
            
            // Force visibility
            img.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                z-index: 1 !important;
                position: relative !important;
            `;
        } else {
            // Use placeholder if preload failed
            console.log(`Using placeholder for image ${index+3}`);
            img.src = `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%234f46e5%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22white%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2220%22%3EAusgabe%20${index+3}%3C%2Ftext%3E%3C%2Fsvg%3E`;
        }
    });
}

// Create global debug functions that can be called from browser console
window.debugMobileIssues = {
    // Manually fix images (can be called from console)
    fixImages: function() {
        console.log("Manual image fix triggered from console");
        
        // Get all images in past issues
        const images = document.querySelectorAll('.past-issue-item img');
        images.forEach((img, index) => {
            const issueNum = index + 3;
            console.log(`Fixing image ${issueNum} manually: ${img.src}`);
            
            // Force correct image based on issue number
            if (issueNum === 3) {
                img.src = './Bilder/2025/ausgabe3.jpg';
            } else if (issueNum === 4) {
                img.src = './Bilder/2025/asugabe4.jpg';
            } else if (issueNum === 5) {
                img.src = './Bilder/2025/asugabe5.jpg';
            }
            
            // Force visibility
            img.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                z-index: 100 !important;
                position: relative !important;
            `;
            
            // Force parent visibility
            const parent = img.closest('.past-issue-item');
            if (parent) {
                parent.style.backgroundColor = 'transparent';
                parent.style.overflow = 'visible';
            }
        });
        
        return "Manual fix applied - check if images are visible now";
    },
    
    // Show image details
    showInfo: function() {
        const images = document.querySelectorAll('.past-issue-item img');
        const info = [];
        
        images.forEach((img, index) => {
            const rect = img.getBoundingClientRect();
            info.push({
                index: index + 3,
                src: img.src,
                loaded: img.complete && img.naturalHeight !== 0,
                visible: rect.width > 0 && rect.height > 0,
                width: rect.width,
                height: rect.height,
                display: window.getComputedStyle(img).display,
                visibility: window.getComputedStyle(img).visibility,
                opacity: window.getComputedStyle(img).opacity,
                zIndex: window.getComputedStyle(img).zIndex
            });
        });
        
        console.table(info);
        return "Image info logged to console";
    },
    
    // Replace all images with placeholders
    usePlaceholders: function() {
        const images = document.querySelectorAll('.past-issue-item img');
        images.forEach((img, index) => {
            const issueNum = index + 3; 
                    img.style.display = 'none';
            img.style.display = 'block';
        });
        return "Placeholders applied";
    }
};

// Print instructions to the console for manual debugging
console.log("Mobile debugging tools available. You can use: window.debugMobileIssues.fixImages(), window.debugMobileIssues.showInfo(), or window.debugMobileIssues.usePlaceholders() from the browser console if needed.");

// Scroll performance optimizations
(function() {
    // Variables to track scrolling state
    let isScrolling = false;
    let scrollTimeout = null;
    
    // Add scroll detection
    window.addEventListener('scroll', function() {
        // Add scrolling class to body during scroll
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
        }
        
        // Clear the timeout on new scroll event
        clearTimeout(scrollTimeout);
        
        // Set a timeout to remove the class after scrolling stops
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            document.body.classList.remove('is-scrolling');
        }, 100); // Adjust based on performance testing
    }, { passive: true }); // Use passive event for better performance
    
    // Optimize image rendering during scroll
    function optimizeImagesForScroll() {
        // Only in mobile view
        if (window.innerWidth > 768) return;
        
        const pastIssueItems = document.querySelectorAll('.past-issue-item');
        if (!pastIssueItems.length) return;
        
        // Process each image
        pastIssueItems.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;
            
            // Create intersection observer for each image
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // If image is visible or about to be visible
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        // Force hardware acceleration and improve rendering
                        img.style.transform = 'translateZ(0)';
                        img.style.willChange = 'transform';
                        img.style.backfaceVisibility = 'hidden';
                        
                        // Ensure image is visible
                        img.style.opacity = '1';
                        img.style.display = 'block';
                    } else {
                        // Optimize rendering for off-screen images
                        img.style.willChange = 'auto';
                    }
                });
            }, { 
                rootMargin: '100px 0px', // Start optimizing before the image is visible
                threshold: [0, 0.1, 0.5, 1] // Multiple thresholds for better detection
            });
            
            // Start observing
            observer.observe(item);
        });
    }
    
    // Run optimization on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Use requestIdleCallback for non-critical optimizations
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                optimizeImagesForScroll();
            });
        } else {
            setTimeout(optimizeImagesForScroll, 1000);
        }
    });
    
    // Also run when window is resized
    window.addEventListener('resize', function() {
        clearTimeout(window.resizePerformanceTimer);
        window.resizePerformanceTimer = setTimeout(optimizeImagesForScroll, 250);
    }, { passive: true });
})();
