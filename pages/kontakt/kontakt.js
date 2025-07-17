// This file contains additional JavaScript functionality for the Kontakt page

document.addEventListener('DOMContentLoaded', function() {
    // Check URL parameters for tab selection
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    // If there's a tab parameter, switch to that tab
    if (tabParam) {
        // Scroll to the form section first
        const formSection = document.querySelector('.bg-white.rounded-2xl');
        if (formSection) {
            setTimeout(() => {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // After scrolling, switch to the requested tab
                setTimeout(() => {
                    window.switchTab(tabParam);
                }, 500);
            }, 300);
        }
    }
    
    // Check for hash in URL for direct tab navigation
    function checkUrlHash() {
        // Check if URL has a hash
        if (window.location.hash) {
            const hash = window.location.hash.substring(1); // Remove the # character
            
            // Map hash values to tab names
            const hashToTab = {
                'ad-form': 'ad',
                'article-form': 'article',
                'contact-form': 'contact'
            };
            
            // If hash corresponds to a known tab, switch to it
            if (hashToTab[hash]) {
                // Scroll to the form section first
                const formSection = document.querySelector('.bg-white.rounded-2xl');
                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // After scrolling, switch to the requested tab
                    setTimeout(() => {
                        window.switchTab(hashToTab[hash]);
                    }, 300);
                }
            }
        }
    }
    
    // Run hash check when page loads
    checkUrlHash();
    
    // Also check when hash changes (without page reload)
    window.addEventListener('hashchange', checkUrlHash);
    
    // Add scroll animation for contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    
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
    
    // Observe each contact card
    contactCards.forEach(card => {
        observer.observe(card);
        
        // Add staggered delay based on index
        const index = Array.from(contactCards).indexOf(card);
        card.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Add hover effects for contact cards
    contactCards.forEach(card => {
        const icon = card.querySelector('.contact-icon');
        
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
    
    // When leaving the nav area, go back to the active item (Kontakt)
    document.getElementById('mainNav').addEventListener('mouseleave', () => {
        const activeItem = document.querySelector('.nav-item[data-index="4"]');
        if (activeItem) {
            updateIndicator(activeItem);
        }
    });
    
    // Set initial indicator to be visible on "Kontakt" menu item
    const activeItem = document.querySelector('.nav-item[data-index="4"]');
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
    
    // Tab functionality for the contact form
    window.switchTab = function(tabId) {
        // Get the currently active tab and the selected tab
        const currentContent = document.querySelector('.tab-content:not(.hidden)');
        const selectedContent = document.getElementById(`content-${tabId}`);
        
        // Don't do anything if the tab is already active
        if (currentContent === selectedContent) return;
        
        // Remove active class from all tabs and add to selected tab
        document.querySelectorAll('[id^="tab-"]').forEach(tab => {
            tab.classList.remove('text-blue-600', 'border-blue-600');
            tab.classList.add('text-gray-500', 'border-transparent');
        });
        
        // Add active class to the selected tab
        const selectedTab = document.getElementById(`tab-${tabId}`);
        selectedTab.classList.remove('text-gray-500', 'border-transparent');
        selectedTab.classList.add('text-blue-600', 'border-blue-600');
        
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            // Disable pointer events during transition to prevent interaction
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.pointerEvents = 'none';
            });
            
            // First, hide the current content with a smooth fade out
            if (currentContent) {
                // Using the Web Animation API for better performance
                const exitAnimation = currentContent.animate([
                    { opacity: 1, transform: 'translateY(0)' },
                    { opacity: 0, transform: 'translateY(10px)' }
                ], {
                    duration: 200,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                exitAnimation.onfinish = () => {
                    // Hide current content and show selected content
                    currentContent.classList.add('hidden');
                    selectedContent.classList.remove('hidden');
                    
                    // Set initial state for entrance animation
                    selectedContent.style.opacity = '0';
                    
                    // Use requestAnimationFrame to ensure smooth rendering
                    requestAnimationFrame(() => {
                        // Entrance animation
                        const enterAnimation = selectedContent.animate([
                            { opacity: 0, transform: 'translateY(-10px)' },
                            { opacity: 1, transform: 'translateY(0)' }
                        ], {
                            duration: 200,
                            easing: 'ease-out',
                            fill: 'forwards'
                        });
                        
                        enterAnimation.onfinish = () => {
                            // Reset styles to ensure everything works properly
                            selectedContent.style.opacity = '1';
                            selectedContent.style.transform = 'translateY(0)';
                            
                            // Re-enable pointer events
                            document.querySelectorAll('.tab-content').forEach(tab => {
                                tab.style.pointerEvents = 'auto';
                            });
                        };
                    });
                };
            }
        });
        
        // Update submit button text based on selected tab
        const submitText = document.getElementById('submit-text');
        if (submitText) {
            const buttonLabels = {
                'contact': 'Nachricht senden',
                'article': 'Beitrag einreichen',
                'ad': 'Anzeige anfragen',
                'event': 'Veranstaltung melden'
            };
            
            submitText.style.opacity = '0';
            
            setTimeout(() => {
                submitText.textContent = buttonLabels[tabId] || 'Absenden';
                submitText.style.opacity = '1';
            }, 150);
        }
    };
    
    // Image preview functionality for article submission
    const articleImagesInput = document.getElementById('article-images');
    const imagePreview = document.getElementById('image-preview');
    
    if (articleImagesInput) {
        articleImagesInput.addEventListener('change', function() {
            imagePreview.innerHTML = ''; // Clear previous previews
            
            if (this.files) {
                Array.from(this.files).forEach(file => {
                    if (file.type.match('image.*')) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            const previewContainer = document.createElement('div');
                            previewContainer.className = 'relative group transform transition-all duration-300 hover:scale-105';
                            
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.className = 'w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-sm';
                            previewContainer.appendChild(img);
                            
                            // Add remove button
                            const removeBtn = document.createElement('button');
                            removeBtn.type = 'button';
                            removeBtn.className = 'absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600';
                            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                            removeBtn.addEventListener('click', function() {
                                previewContainer.classList.add('scale-0', 'opacity-0');
                                setTimeout(() => {
                                    previewContainer.remove();
                                }, 300);
                            });
                            previewContainer.appendChild(removeBtn);
                            
                            // Add filename label
                            const filenameLabel = document.createElement('div');
                            filenameLabel.className = 'text-xs text-center text-gray-600 mt-1 w-28 truncate';
                            filenameLabel.textContent = file.name;
                            previewContainer.appendChild(filenameLabel);
                            
                            imagePreview.appendChild(previewContainer);
                        };
                        
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    }
    
    // Enable drag and drop for file uploads
    const dropZones = document.querySelectorAll('.border-dashed');
    
    dropZones.forEach(zone => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            zone.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            zone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            zone.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            zone.classList.add('bg-blue-50', 'border-blue-300');
        }
        
        function unhighlight() {
            zone.classList.remove('bg-blue-50', 'border-blue-300');
        }
        
        zone.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            const fileInput = zone.querySelector('input[type="file"]');
            
            if (fileInput && files.length > 0) {
                fileInput.files = files;
                
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
            }
        }
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get the active tab
                let activeTabId = 'contact';
                document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                    if (tab.classList.contains('text-blue-600')) {
                        activeTabId = tab.id.replace('tab-', '');
                    }
                });
                
                // Validate based on active tab
                let isValid = true;
                let fieldsToValidate = [];
                
                if (activeTabId === 'contact') {
                    fieldsToValidate = [
                        { id: 'name', label: 'Name' },
                        { id: 'email', label: 'E-Mail', type: 'email' },
                        { id: 'message', label: 'Nachricht' }
                    ];
                } else if (activeTabId === 'article') {
                    fieldsToValidate = [
                        { id: 'author-name', label: 'Name des Autors' },
                        { id: 'author-email', label: 'E-Mail', type: 'email' },
                        { id: 'article-title', label: 'Titel des Beitrags' }
                    ];
                    
                    // Either content or file must be provided
                    const hasContent = document.getElementById('article-content').value.trim() !== '';
                    const hasFile = document.getElementById('article-file').files.length > 0;
                    
                    if (!hasContent && !hasFile) {
                        isValid = false;
                        // Show custom error for article content/file
                        const contentField = document.getElementById('article-content');
                        const fileField = document.getElementById('article-file');
                        
                        contentField.classList.add('border-red-500');
                        fileField.closest('div').classList.add('border-red-500');
                        
                        // Add error message if not already present
                        const contentContainer = contentField.closest('div');
                        if (contentContainer && !contentContainer.querySelector('.error-text')) {
                            const errorText = document.createElement('p');
                            errorText.className = 'error-text text-red-500 text-xs mt-1 animate-fadeIn';
                            errorText.textContent = 'Bitte geben Sie entweder einen Text ein oder laden Sie eine Datei hoch.';
                            contentContainer.appendChild(errorText);
                        }
                    }
                    
                } else if (activeTabId === 'ad') {
                    fieldsToValidate = [
                        { id: 'company-name', label: 'Name des Unternehmens' },
                        { id: 'ad-email', label: 'E-Mail', type: 'email' },
                        { id: 'ad-size', label: 'Anzeigengröße' },
                        { id: 'ad-issues', label: 'Erscheinungen' }
                    ];
                }
                
                // Check privacy consent for all tabs
                fieldsToValidate.push({ id: 'privacy', label: 'Datenschutzerklärung', type: 'checkbox' });
                
                // Reset previous validation styling
                document.querySelectorAll('input, textarea, select').forEach(field => {
                    field.classList.remove('border-red-500');
                });
                
                // Validate each field
                fieldsToValidate.forEach(field => {
                    const element = document.getElementById(field.id);
                    if (element) {
                        let fieldIsValid = true;
                        
                        if (field.type === 'checkbox') {
                            if (!element.checked) {
                                fieldIsValid = false;
                            }
                        } else if (field.type === 'email') {
                            if (element.value.trim() === '' || !isValidEmail(element.value)) {
                                fieldIsValid = false;
                            }
                        } else {
                            if (element.value.trim() === '') {
                                fieldIsValid = false;
                            }
                        }
                        
                        if (!fieldIsValid) {
                            isValid = false;
                            element.classList.add('border-red-500');
                        }
                    }
                });
                
                if (isValid) {
                    // Show loading state in the submit button
                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalButtonContent = submitButton.innerHTML;
                    
                    submitButton.disabled = true;
                    submitButton.innerHTML = `
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wird gesendet...
                    `;
                    
                    // Simulate form submission delay (would be an actual API call in production)
                    setTimeout(() => {
                        // Show custom success message with animation instead of alert
                        const formContainer = form.closest('.bg-white');
                        
                        // Create success message element
                        const successElement = document.createElement('div');
                        successElement.className = 'success-message hidden rounded-lg bg-green-50 p-6 text-center transform transition-all duration-500 ease-out';
                        
                        let successMessage = '';
                        if (activeTabId === 'contact') {
                            successMessage = 'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.';
                        } else if (activeTabId === 'article') {
                            successMessage = 'Vielen Dank für Ihren Beitrag! Unser Redaktionsteam wird ihn prüfen und sich bei Ihnen melden.';
                        } else if (activeTabId === 'ad') {
                            successMessage = 'Vielen Dank für Ihr Interesse an einer Anzeige! Wir werden Ihnen schnellstmöglich ein Angebot zusenden.';
                        }
                        
                        // Add checkmark icon
                        successElement.innerHTML = `
                            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium leading-6 text-green-800 mb-2">Erfolgreich gesendet!</h3>
                            <p class="text-sm text-green-700">${successMessage}</p>
                            <button type="button" class="mt-5 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300" id="back-to-form">
                                Zurück zum Formular
                            </button>
                        `;
                        
                        // Hide the form with animation
                        formContainer.style.opacity = '0';
                        formContainer.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            // Hide form and show success message
                            form.classList.add('hidden');
                            formContainer.appendChild(successElement);
                            successElement.classList.remove('hidden');
                            
                            // Reset form styles
                            formContainer.style.opacity = '1';
                            formContainer.style.transform = 'translateY(0)';
                            
                            // Reset button to original state for next use
                            submitButton.disabled = false;
                            submitButton.innerHTML = originalButtonContent;
                            
                            // Add event listener to the "back to form" button
                            document.getElementById('back-to-form').addEventListener('click', function() {
                                // Hide success message
                                successElement.style.opacity = '0';
                                successElement.style.transform = 'translateY(20px)';
                                
                                setTimeout(() => {
                                    // Remove success message and show form
                                    successElement.remove();
                                    form.classList.remove('hidden');
                                    form.style.opacity = '0';
                                    form.style.transform = 'translateY(-20px)';
                                    
                                    setTimeout(() => {
                                        form.style.opacity = '1';
                                        form.style.transform = 'translateY(0)';
                                    }, 50);
                                    
                                    // Reset form
                                    form.reset();
                                    
                                    // Reset image preview if exists
                                    if (imagePreview) {
                                        imagePreview.innerHTML = '';
                                    }
                                    
                                    // Switch back to contact tab
                                    switchTab('contact');
                                }, 300);
                            });
                        }, 300);
                    }, 1500); // Simulate network delay
                } else {
                    // Show validation error message with shake animation
                    const invalidFields = document.querySelectorAll('.border-red-500');
                    
                    // Shake animation for invalid fields
                    invalidFields.forEach(field => {
                        field.animate([
                            { transform: 'translateX(0)' },
                            { transform: 'translateX(-5px)' },
                            { transform: 'translateX(5px)' },
                            { transform: 'translateX(-5px)' },
                            { transform: 'translateX(5px)' },
                            { transform: 'translateX(-5px)' },
                            { transform: 'translateX(0)' }
                        ], {
                            duration: 500,
                            easing: 'ease-in-out'
                        });
                        
                        // Add helper text below the field
                        const fieldContainer = field.closest('div');
                        if (fieldContainer && !fieldContainer.querySelector('.error-text')) {
                            const errorText = document.createElement('p');
                            errorText.className = 'error-text text-red-500 text-xs mt-1 animate-fadeIn';
                            
                            if (field.type === 'checkbox') {
                                errorText.textContent = 'Bitte bestätigen Sie die Datenschutzerklärung';
                            } else if (field.type === 'email') {
                                errorText.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
                            } else {
                                errorText.textContent = 'Dieses Feld ist erforderlich';
                            }
                            
                            fieldContainer.appendChild(errorText);
                            
                            // Remove error text when field is filled correctly
                            field.addEventListener('input', function() {
                                if ((field.type === 'checkbox' && field.checked) || 
                                    (field.type === 'email' && isValidEmail(field.value)) || 
                                    (field.type !== 'checkbox' && field.type !== 'email' && field.value.trim() !== '')) {
                                    field.classList.remove('border-red-500');
                                    if (fieldContainer.querySelector('.error-text')) {
                                        fieldContainer.querySelector('.error-text').remove();
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
    }
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
            animation: fadeIn 0.8s ease-out forwards;
        }
        
        .contact-card {
            opacity: 0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .contact-card:hover {
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.15);
        }
        
        .animate-spin-slow {
            animation: spin 12s linear infinite;
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        /* Smooth tab transitions */
        .tab-content {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Custom form focus effects */
        input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        
        /* Smoother button hover transitions */
        button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Image preview animations */
        #image-preview > div {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Calculate ad price based on size and issues
function calculateAdPrice() {
    const adSizeSelect = document.getElementById('ad-size');
    const adIssuesSelect = document.getElementById('ad-issues');
    const priceCalculation = document.getElementById('price-calculation');
    
    // Get values from form elements
    let basePrice = 0;
    let issues = 0;
    let discount = 0;
    
    // Get base price if a size is selected
    if (adSizeSelect.value) {
        const selectedSizeOption = adSizeSelect.options[adSizeSelect.selectedIndex];
        basePrice = parseFloat(selectedSizeOption.dataset.price || 0);
    }
    
    // Get issues and discount if selected
    if (adIssuesSelect.value) {
        const selectedIssuesOption = adIssuesSelect.options[adIssuesSelect.selectedIndex];
        issues = parseInt(adIssuesSelect.value);
        
        // Get the discount as a percentage (e.g. 0.9 means 10% off)
        const discountRate = parseFloat(selectedIssuesOption.dataset.discount || 1);
        discount = Math.round((1 - discountRate) * 100); // Convert to percentage for display
    }
    
    // Calculate total price correctly:
    // First multiply base price by number of issues, then apply discount
    let subtotal = basePrice * issues;
    let totalPrice = subtotal;
    
    if (discount > 0 && issues > 0) {
        totalPrice = subtotal * (1 - discount/100);
    }
    
    // Format for display
    const basePriceFormatted = basePrice.toFixed(2).replace('.', ',') + ' €';
    const discountFormatted = discount + '%';
    const totalPriceFormatted = totalPrice.toFixed(2).replace('.', ',') + ' €';
    
    // Update display elements
    document.getElementById('base-price').textContent = basePriceFormatted;
    document.getElementById('issue-count').textContent = issues || '0';
    document.getElementById('discount').textContent = discountFormatted;
    document.getElementById('total-price').textContent = totalPriceFormatted;
    
    // Highlight total price when values change
    if (adSizeSelect.value && adIssuesSelect.value) {
        const totalPriceElement = document.getElementById('total-price');
        
        // Add a subtle pulse animation to the total price
        totalPriceElement.animate([
            { transform: 'scale(1)', color: '#1d4ed8' }, // blue-700
            { transform: 'scale(1.1)', color: '#1e40af' }, // blue-800
            { transform: 'scale(1)', color: '#1d4ed8' }  // blue-700
        ], {
            duration: 600,
            easing: 'ease-in-out'
        });
        
        // Highlight the entire price calculation box
        priceCalculation.animate([
            { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
            { boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)' },
            { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' }
        ], {
            duration: 1200,
            easing: 'ease-out'
        });
    }
}

// Toggle event custom category field
function toggleEventCustomCategoryField() {
    const categorySelect = document.getElementById('event-category');
    const customCategoryContainer = document.getElementById('event-custom-category-container');
    
    if (categorySelect.value === 'sonstiges') {
        customCategoryContainer.classList.remove('hidden');
        customCategoryContainer.animate([
            { opacity: 0, transform: 'translateY(-10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards'
        });
    } else {
        if (!customCategoryContainer.classList.contains('hidden')) {
            const animation = customCategoryContainer.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-10px)' }
            ], {
                duration: 300,
                easing: 'ease-in',
                fill: 'forwards'
            });
            
            animation.onfinish = () => {
                customCategoryContainer.classList.add('hidden');
            };
        }
    }
}

// Toggle custom category field
function toggleCustomCategoryField() {
    const categorySelect = document.getElementById('article-category');
    const customCategoryContainer = document.getElementById('custom-category-container');
    
    if (categorySelect.value === 'sonstiges') {
        customCategoryContainer.classList.remove('hidden');
        customCategoryContainer.animate([
            { opacity: 0, transform: 'translateY(-10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards'
        });
    } else {
        if (!customCategoryContainer.classList.contains('hidden')) {
            const animation = customCategoryContainer.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-10px)' }
            ], {
                duration: 300,
                easing: 'ease-in',
                fill: 'forwards'
            });
            
            animation.onfinish = () => {
                customCategoryContainer.classList.add('hidden');
            };
        }
    }
}

// Add event listeners for new functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for the ad price calculation
    const adSizeSelect = document.getElementById('ad-size');
    const adIssuesSelect = document.getElementById('ad-issues');
    
    if (adSizeSelect && adIssuesSelect) {
        // Recalculate price when selections change
        adSizeSelect.addEventListener('change', function() {
            calculateAdPrice();
            updateSizePreview();
        });
        
        adIssuesSelect.addEventListener('change', function() {
            calculateAdPrice();
            updateIssueVisualization();
        });
        
        // Calculate price immediately on page load (even with no selections)
        calculateAdPrice();
    }
    
    // Add event listener for custom category field
    const categorySelect = document.getElementById('article-category');
    if (categorySelect) {
        categorySelect.addEventListener('change', toggleCustomCategoryField);
    }
    
    // Add event listener for event custom category field
    const eventCategorySelect = document.getElementById('event-category');
    if (eventCategorySelect) {
        eventCategorySelect.addEventListener('change', toggleEventCustomCategoryField);
    }
});

// Show a visual preview of the ad size
function updateSizePreview() {
    const adSizeSelect = document.getElementById('ad-size');
    const sizePreview = document.querySelector('.size-preview');
    
    if (!adSizeSelect || !sizePreview) return;
    
    const selectedValue = adSizeSelect.value;
    
    if (selectedValue) {
        // Map sizes to visual representations
        const sizeMap = {
            '1/8': { width: '25%', height: '25%', label: '1/8 Seite' },
            '1/4': { width: '50%', height: '25%', label: '1/4 Seite' },
            '1/2': { width: '50%', height: '50%', label: '1/2 Seite' },
            '1': { width: '100%', height: '100%', label: 'Ganze Seite' },
            '2': { width: '100%', height: '100%', label: 'Doppelseite' }
        };
        
        const size = sizeMap[selectedValue] || { width: '25%', height: '25%', label: selectedValue };
        
        // Create a visual representation
        sizePreview.innerHTML = '';
        const pageContainer = document.createElement('div');
        pageContainer.className = 'relative w-full h-full border border-gray-300 bg-white';
        
        const adElement = document.createElement('div');
        adElement.className = 'absolute bg-blue-200 flex items-center justify-center text-xs font-medium text-blue-800 rounded-sm';
        adElement.style.width = size.width;
        adElement.style.height = size.height;
        
        // Center the ad element
        if (selectedValue === '2') {
            // For double page, create a spread
            pageContainer.className = 'relative w-full h-full flex';
            
            const leftPage = document.createElement('div');
            leftPage.className = 'flex-1 border-r border-gray-300 bg-white';
            
            const rightPage = document.createElement('div');
            rightPage.className = 'flex-1 bg-white';
            
            pageContainer.appendChild(leftPage);
            pageContainer.appendChild(rightPage);
            
            adElement.className = 'absolute inset-0 bg-blue-200 flex items-center justify-center text-xs font-medium text-blue-800 rounded-sm';
            adElement.textContent = 'Doppelseite';
        } else {
            adElement.style.top = '50%';
            adElement.style.left = '50%';
            adElement.style.transform = 'translate(-50%, -50%)';
            adElement.textContent = size.label;
        }
        
        pageContainer.appendChild(adElement);
        sizePreview.appendChild(pageContainer);
        
        // Show with animation
        sizePreview.style.opacity = '1';
        sizePreview.style.height = '80px';
    } else {
        sizePreview.style.opacity = '0';
        sizePreview.style.height = '48px'; // 12 in tailwind
    }
}

// Create visual dots for number of issues
function updateIssueVisualization() {
    const adIssuesSelect = document.getElementById('ad-issues');
    const issueVisualization = document.querySelector('.issue-visualization');
    
    if (!adIssuesSelect || !issueVisualization) return;
    
    const selectedValue = adIssuesSelect.value;
    
    if (selectedValue) {
        const issues = parseInt(selectedValue);
        issueVisualization.innerHTML = '';
        
        // For many issues, use a more compact representation
        const maxDots = 12;
        const showDots = issues <= maxDots ? issues : maxDots;
        
        for (let i = 0; i < showDots; i++) {
            const dot = document.createElement('div');
            
            // If showing a subset, indicate that there are more
            if (issues > maxDots && i === maxDots - 1) {
                dot.className = 'w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium';
                dot.textContent = '+' + (issues - maxDots + 1);
            } else {
                dot.className = 'w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800';
                dot.textContent = (i + 1).toString();
            }
            
            // Add a delay for a cascade effect
            setTimeout(() => {
                dot.animate([
                    { transform: 'scale(0)', opacity: 0 },
                    { transform: 'scale(1.2)', opacity: 1 },
                    { transform: 'scale(1)', opacity: 1 }
                ], {
                    duration: 300,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
            }, i * 50);
            
            issueVisualization.appendChild(dot);
        }
        
        issueVisualization.style.opacity = '1';
        issueVisualization.style.height = '24px';
    } else {
        issueVisualization.style.opacity = '0';
        issueVisualization.style.height = '0';
    }
}
