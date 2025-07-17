// This file contains JavaScript functionality for the Veranstaltungen page

document.addEventListener('DOMContentLoaded', function() {
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
    
    // When leaving the nav area, go back to the active item (Veranstaltungen)
    document.getElementById('mainNav').addEventListener('mouseleave', () => {
        const activeItem = document.querySelector('.nav-item[data-index="3"]');
        if (activeItem) {
            updateIndicator(activeItem);
        }
    });
    
    // Kalender initialisieren
    if (document.getElementById('calendar-container')) {
        // Stil-Anpassungen für den Kalender und die Events um exakt wie auf der Startseite auszusehen
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Kalender Styling */
            .calendar-days {
                display: grid;
                grid-template-columns: repeat(7, minmax(0, 1fr));
                gap: 0.25rem;
            }
            
            /* Neues Layout für größeren Kalender */
            #calendar-container {
                min-height: 650px;
            }
            
            /* Größere Kalendertage für den Vollbreiten-Kalender */
            .calendar-day {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                cursor: pointer;
                transition: all 0.2s;
                border-radius: 0.5rem;
                position: relative;
                font-size: 1.1rem;
                padding: 0.75rem;
            }
            
            /* Größere Event-Dots im Kalender */
            .event-dot {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 9999px;
                margin: 0 0.15rem;
            }
            
            /* Fix calendar day styling */
            #calendar-container-days > div {
                display: grid;
                grid-template-columns: repeat(7, minmax(0, 1fr));
                gap: 0.35rem;
            }
            
            /* Fix events dots in calendar */
            .absolute.-bottom-0.5 {
                bottom: 3px;
            }
            
            /* Event Item Styling für Reihenansicht */
            .events-container .mb-4 {
                margin-bottom: 0; /* Kein Margin-Bottom in Grid-Layout */
            }
            
            /* Anpassung der Events für Grid-Layout */
            .events-container > div {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            
            /* Verbesserte Events-Anzeige für mehr Inhalt */
            .events-container {
                max-height: none; /* Kein maximale Höhe bei Grid-Layout */
                padding-right: 0;
                gap: 0.75rem; /* Kleinerer Abstand zwischen den Karten */
                overflow-y: visible;
            }
            
            /* Scrollbar-Stile entfernen, da nicht mehr benötigt */
            /* 
            .events-container::-webkit-scrollbar {
                width: 6px;
            }
            
            .events-container::-webkit-scrollbar-track {
                background: rgba(241, 245, 249, 0.7);
                border-radius: 10px;
            }
            
            .events-container::-webkit-scrollbar-thumb {
                background-color: rgba(59, 130, 246, 0.5);
                border-radius: 10px;
            }
            */
            
            /* Hervorhebung des aktuellen Events - angepasst für Grid-Layout */
            .event-highlighted {
                box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
                transform: translateY(-2px);
            }
            
            /* Event Item Hover Effect */
            .events-container .group:hover .group-hover\\:text-purple-600,
            .events-container .group:hover .group-hover\\:text-green-500,
            .events-container .group:hover .group-hover\\:text-orange-500 {
                transition: color 0.3s;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Überprüfen ob allEvents bereits in window definiert ist (von calendar.js)
        if (window.allEvents && Array.isArray(window.allEvents)) {
            // Initialisiere den Kalender mit den Demo-Events und dem aktuellen Datum
            const calendar = new DynamicCalendar('calendar-container', {
                events: window.allEvents,
                initialDate: new Date()
            });
            
            // Event-Handler für Klicks auf Tage mit Events
            calendar.setOnDayClickHandler(function(event) {
                console.log('Calendar event clicked:', event);
                // Suchen des entsprechenden Event-Elements
                scrollToEvent(event.id);
            });
            
            // Filtere Events für den Initial-Monat und initialisiere die Eventliste
            calendar.updateEventListForCurrentMonth();
            
            // Stelle sicher, dass der aktuelle Monat angezeigt wird
            calendar.goToToday();
            
            // Event-Handler für Pagination-Buttons
            const prevPageBtn = document.getElementById('prev-page-btn');
            const nextPageBtn = document.getElementById('next-page-btn');
            
            if (prevPageBtn) {
                prevPageBtn.addEventListener('click', function() {
                    if (window.currentEventsPage > 1) {
                        window.currentEventsPage--;
                        updateEventList();
                    }
                });
            }
            
            if (nextPageBtn) {
                nextPageBtn.addEventListener('click', function() {
                    const totalPages = Math.ceil(window.allEvents.length / window.eventsPerPage);
                    if (window.currentEventsPage < totalPages) {
                        window.currentEventsPage++;
                        updateEventList();
                    }
                });
            }
        }
    }
    
    // Set initial indicator to be visible on "Veranstaltungen" menu item
    const activeItem = document.querySelector('.nav-item[data-index="3"]');
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
    
    // Add scroll animation for event cards
    const eventCards = document.querySelectorAll('.event-card');
    
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
    
    // Observe each event card
    eventCards.forEach(card => {
        observer.observe(card);
        
        // Add staggered delay based on index
        const index = Array.from(eventCards).indexOf(card);
        card.style.transitionDelay = `${index * 0.05}s`;
    });
    
    // Event handlers for category buttons
    const categoryButtons = document.querySelectorAll('.category-card button');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                if (category) {
                    // Scroll to calendar section
                    const calendarSection = document.querySelector('.calendar-section');
                    if (calendarSection) {
                        window.scrollTo({
                            top: calendarSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
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
            
            .event-card {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
});

// Global variables for events pagination
let currentPage = 1;
let eventsPerPage = 4;
let filteredEvents = [];
let totalPages = 1;

// Setup events display
function setupEventsDisplay() {
    // Get the current month and year from the calendar
    const calendarMonthYearElem = document.getElementById('main-calendar-month-year');
    if (!calendarMonthYearElem) return;
    
    const monthYearText = calendarMonthYearElem.textContent;
    const [month, year] = monthYearText.split(' ');
    
    // Map month name to month index
    const months = {
        'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
        'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
    };
    
    const monthIndex = months[month];
    
    // Update events for this month
    updateEventsForMonth(monthIndex, parseInt(year));
}

// Update events for a specific month
function updateEventsForMonth(monthIndex, year) {
    // Add transition effect
    const eventsContainer = document.querySelector('.events-container');
    if (eventsContainer) {
        eventsContainer.style.opacity = '0';
        eventsContainer.style.transform = 'translateY(10px)';
        eventsContainer.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    }
    
    // Update the month title
    const monthTitle = document.getElementById('events-month-title');
    if (monthTitle) {
        const monthNames = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        monthTitle.textContent = `im ${monthNames[monthIndex]} ${year}`;
    }
    
    // Check if this month is in the past
    const now = new Date();
    const isInPast = (year < now.getFullYear()) || 
                     (year === now.getFullYear() && monthIndex < now.getMonth());
    
    // Show/hide past indicator
    const pastIndicator = document.getElementById('events-past-indicator');
    if (pastIndicator) {
        pastIndicator.classList.toggle('hidden', !isInPast);
    }
    
    // Filter events for this month
    filteredEvents = filterEventsByMonth(monthIndex, year);
    
    // Calculate total pages
    totalPages = Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage));
    
    // Reset to first page
    currentPage = 1;
    
    // Display events
    displayEvents();
    
    // Restore opacity with a slight delay for animation
    setTimeout(() => {
        if (eventsContainer) {
            eventsContainer.style.opacity = '1';
            eventsContainer.style.transform = 'translateY(0)';
        }
    }, 50);
}

// Filter events by month and year
function filterEventsByMonth(monthIndex, year) {
    // Ensure we have events to filter
    if (!window.calendarEvents) return [];
    
    // Filter events for the specified month and year
    return window.calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === year;
    });
}

// Display events for the current page
function displayEvents() {
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;
    
    // Calculate start and end indices for the current page
    const startIdx = (currentPage - 1) * eventsPerPage;
    const endIdx = Math.min(startIdx + eventsPerPage, filteredEvents.length);
    
    // Get events for the current page
    const currentEvents = filteredEvents.slice(startIdx, endIdx);
    
    if (currentEvents.length > 0) {
        // Create HTML for events
        let eventsHTML = '';
        
        currentEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.getMonth();
            const weekday = eventDate.toLocaleDateString('de-DE', { weekday: 'short' });
            
            // Map category to color
            const categoryColors = {
                'politik': 'purple-600',
                'Politik': 'purple-600',
                'sport': 'green-500',
                'Sport': 'green-500',
                'kultur': 'orange-500',
                'Kultur': 'orange-500'
            };
            
            const color = categoryColors[event.category] || 'blue-500';
            
            eventsHTML += `
                <div class="event-item mb-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-${color} hover:shadow-md transition-all duration-300">
                    <div class="flex items-start">
                        <!-- Date box -->
                        <div class="min-w-[60px] text-center mr-4">
                            <div class="bg-${color} text-white text-xs font-semibold rounded-t-md py-1">
                                ${weekday.toUpperCase()}
                            </div>
                            <div class="bg-gray-50 rounded-b-md py-2 px-2 border border-gray-100 border-t-0">
                                <span class="block text-2xl font-bold leading-none text-gray-700">${day}</span>
                                <span class="text-xs text-gray-500">${getMonthAbbr(month)}</span>
                            </div>
                        </div>
                        
                        <!-- Event details -->
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <span class="inline-block bg-${color} text-white text-xs font-semibold px-2 py-1 rounded-full mb-1">
                                    ${event.category}
                                </span>
                                <span class="text-gray-500 text-sm">
                                    <i class="far fa-clock mr-1"></i>${event.time}
                                </span>
                            </div>
                            <h4 class="font-semibold text-gray-800 mb-1">${event.title}</h4>
                            <p class="text-gray-600 text-sm mb-2">${event.description}</p>
                            <div class="flex items-center text-xs text-gray-500">
                                <i class="fas fa-map-marker-alt text-${color} mr-1.5"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        eventsContainer.innerHTML = eventsHTML;
    } else {
        // No events for this month
        eventsContainer.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-calendar-times text-4xl text-gray-300 mb-3"></i>
                <p>Keine Veranstaltungen in diesem Monat</p>
            </div>
        `;
    }
    
    // Update pagination info
    updatePaginationInfo();
}

// Change page
function changePage(direction) {
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        // Add transition effect
        const eventsContainer = document.querySelector('.events-container');
        if (eventsContainer) {
            eventsContainer.style.opacity = '0';
            eventsContainer.style.transform = direction > 0 ? 'translateX(-10px)' : 'translateX(10px)';
            eventsContainer.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        }
        
        currentPage = newPage;
        
        setTimeout(() => {
            displayEvents();
            
            // Restore opacity with a slight delay for animation
            setTimeout(() => {
                if (eventsContainer) {
                    eventsContainer.style.opacity = '1';
                    eventsContainer.style.transform = 'translateX(0)';
                }
            }, 50);
        }, 200);
    }
}

// Update pagination info
function updatePaginationInfo() {
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Seite ${currentPage} von ${totalPages} (${filteredEvents.length} Termine)`;
    }
    
    // Update button states
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.classList.toggle('opacity-50', currentPage === 1);
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.classList.toggle('opacity-50', currentPage === totalPages);
    }
}

// Display all events
function displayAllEvents() {
    // Add transition effect
    const eventsContainer = document.querySelector('.events-container');
    if (eventsContainer) {
        eventsContainer.style.opacity = '0';
        eventsContainer.style.transform = 'translateY(10px)';
        eventsContainer.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    }
    
    // Reset filtered events to include all future events
    const now = new Date();
    filteredEvents = window.calendarEvents ? window.calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
    }) : [];
    
    // Sort by date
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Update month title
    const monthTitle = document.getElementById('events-month-title');
    if (monthTitle) {
        monthTitle.textContent = 'im Überblick';
    }
    
    // Hide past indicator
    const pastIndicator = document.getElementById('events-past-indicator');
    if (pastIndicator) {
        pastIndicator.classList.add('hidden');
    }
    
    // Calculate total pages and reset to first page
    totalPages = Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage));
    currentPage = 1;
    
    // Display events
    displayEvents();
    
    // Restore opacity with a slight delay for animation
    setTimeout(() => {
        if (eventsContainer) {
            eventsContainer.style.opacity = '1';
            eventsContainer.style.transform = 'translateY(0)';
        }
    }, 50);
}

// Display events by category
function displayEventsByCategory(category) {
    // Add transition effect
    const eventsContainer = document.querySelector('.events-container');
    if (eventsContainer) {
        eventsContainer.style.opacity = '0';
        eventsContainer.style.transform = 'translateY(10px)';
        eventsContainer.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    }
    
    // Filter events by the specified category
    const now = new Date();
    filteredEvents = window.calendarEvents ? window.calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && event.category.toLowerCase() === category.toLowerCase();
    }) : [];
    
    // Sort by date
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Map category to display name
    const categoryDisplayNames = {
        'politik': 'Politik & Gemeinde',
        'Politik': 'Politik & Gemeinde',
        'kultur': 'Kultur & Unterhaltung',
        'Kultur': 'Kultur & Unterhaltung',
        'sport': 'Sport & Freizeit',
        'Sport': 'Sport & Freizeit'
    };
    
    // Update month title
    const monthTitle = document.getElementById('events-month-title');
    if (monthTitle) {
        monthTitle.textContent = `- ${categoryDisplayNames[category.toLowerCase()]}`;
    }
    
    // Hide past indicator
    const pastIndicator = document.getElementById('events-past-indicator');
    if (pastIndicator) {
        pastIndicator.classList.add('hidden');
    }
    
    // Calculate total pages and reset to first page
    totalPages = Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage));
    currentPage = 1;
    
    // Display events
    displayEvents();
    
    // Restore opacity with a slight delay for animation
    setTimeout(() => {
        if (eventsContainer) {
            eventsContainer.style.opacity = '1';
            eventsContainer.style.transform = 'translateY(0)';
        }
    }, 50);
}

// Hilfsfunktion zur Aktualisierung der Eventliste
function updateEventList() {
    // Paginierung
    const start = (window.currentEventsPage - 1) * window.eventsPerPage;
    const end = start + window.eventsPerPage;
    const eventsToShow = window.allEvents.slice(start, end);
    
    // Container für Events
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;
    
    // Container leeren
    eventsContainer.innerHTML = '';
    
    // Events hinzufügen
    eventsToShow.forEach(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const isPastEvent = eventDate < now;
        
        // Kategorie-Info
        let categoryColor = 'gray-500';
        let categoryBgColor = 'gray-100';
        const category = event.category.toLowerCase();
        
        if (category === 'politik') {
            categoryColor = 'purple-600';
            categoryBgColor = 'purple-100';
        } else if (category === 'sport') {
            categoryColor = 'green-500';
            categoryBgColor = 'green-100';
        } else if (category === 'kultur') {
            categoryColor = 'orange-500';
            categoryBgColor = 'orange-100';
        }
        
        // Event-HTML erstellen
        const eventHTML = `
            <div id="event-${event.id}" class="event-item mb-5 pb-5 border-b border-gray-100 ${isPastEvent ? 'opacity-60' : ''}">
                <div class="flex">
                    <!-- Event date circle -->
                    <div class="flex-shrink-0 w-16 h-16 rounded-full bg-${categoryBgColor} flex flex-col items-center justify-center mr-4 border border-${categoryColor}/30">
                        <span class="text-xs font-medium text-${categoryColor}">${eventDate.getDate().toString().padStart(2, '0')}</span>
                        <span class="text-xs font-bold text-${categoryColor}">${getMonthAbbr(eventDate.getMonth())}</span>
                    </div>
                    
                    <!-- Event content -->
                    <div class="flex-grow">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-lg font-medium text-gray-800">${event.title}</h4>
                            <span class="text-xs font-medium px-2 py-1 rounded-full bg-${categoryBgColor} text-${categoryColor} capitalize">${event.category}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">${event.description}</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-map-marker-alt mr-1.5 text-${categoryColor}"></i>
                            <span>${event.location}</span>
                            <i class="fas fa-clock ml-3 mr-1.5 text-${categoryColor}"></i>
                            <span>${eventDate.getHours().toString().padStart(2, '0')}:${eventDate.getMinutes().toString().padStart(2, '0')} Uhr</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        eventsContainer.insertAdjacentHTML('beforeend', eventHTML);
    });
    
    // Pagination-Info aktualisieren
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        const totalPages = Math.ceil(window.allEvents.length / window.eventsPerPage);
        paginationInfo.textContent = `Seite ${window.currentEventsPage} von ${totalPages} (${window.allEvents.length} Termine)`;
    }
}

// Funktion zum Scrollen zu einem Event
function scrollToEvent(eventId) {
    const eventElement = document.getElementById(`event-${eventId}`);
    if (eventElement) {
        // Finde die Seite, auf der das Event ist
        const allEvents = window.allEvents;
        const eventIndex = allEvents.findIndex(event => event.id === eventId);
        if (eventIndex !== -1) {
            window.currentEventsPage = Math.floor(eventIndex / window.eventsPerPage) + 1;
            updateEventList();
            
            // Warte kurz bis das DOM aktualisiert ist
            setTimeout(() => {
                const updatedEventElement = document.getElementById(`event-${eventId}`);
                if (updatedEventElement) {
                    updatedEventElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    updatedEventElement.classList.add('highlight-event');
                    setTimeout(() => {
                        updatedEventElement.classList.remove('highlight-event');
                    }, 2000);
                }
            }, 100);
        }
    }
}

// Helper function to get month abbreviation
function getMonthAbbr(monthIndex) {
    const monthAbbrs = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    return monthAbbrs[monthIndex];
}

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
        
        .event-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
