/**
 * Dynamischer Kalender für "Es Käseblättsche"
 * Zeigt Kalendermonate an und markiert Events und das aktuelle Datum
 */

class DynamicCalendar {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.events = options.events || [];
        this.eventCategories = options.eventCategories || {
            'politik': { color: 'purple-600', bgColor: 'purple-100' },
            'sport': { color: 'green-500', bgColor: 'green-100' },
            'kultur': { color: 'orange-500', bgColor: 'orange-100' }
        };
        
        this.currentDate = options.initialDate ? new Date(options.initialDate) : new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        
        // Datum für Debugzwecke ausgeben
        console.log(`Initialisiere Kalender: ${this.currentMonth + 1}/${this.currentYear}`);
        
        this.weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        this.months = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        
        // Handler für Navigationstasten
        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error(`Container with ID "${this.containerId}" not found.`);
            return;
        }
        
        this.render();
        this.setupEventListeners();
    }
    
    // Handler für den Button "Vorheriger Monat"
    handlePrevMonth() {
        console.log("Gehe zum vorherigen Monat");
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.updateCalendar();
    }
    
    // Handler für den Button "Nächster Monat"
    handleNextMonth() {
        console.log("Gehe zum nächsten Monat");
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.updateCalendar();
    }
    
    render() {
        console.log(`Rendere Kalender für: ${this.months[this.currentMonth]} ${this.currentYear}`);
        
        // Prüfe, ob der gewählte Monat in der Vergangenheit liegt
        const now = new Date();
        const isInPast = (this.currentYear < now.getFullYear()) || 
                         (this.currentYear === now.getFullYear() && this.currentMonth < now.getMonth());
        
        // Erstelle die Kalender-Struktur
        this.container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full">
                <!-- Calendar heading with improved styling -->
                <div class="bg-gradient-to-r from-blue-dark to-blue-medium p-4 text-white">
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col">
                            <h3 class="text-xl font-bold flex items-center">
                                <i class="fas fa-calendar-alt mr-3"></i>
                                <span id="${this.containerId}-month-year">${this.months[this.currentMonth]} ${this.currentYear}</span>
                            </h3>
                            <span id="${this.containerId}-past-indicator" class="text-white/70 text-sm ml-8 ${isInPast ? '' : 'hidden'}">(vergangene Veranstaltungen)</span>
                        </div>
                        <div class="flex space-x-2">
                            <button id="${this.containerId}-prev-month" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button id="${this.containerId}-next-month" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Calendar grid - more compact design -->
                <div class="p-4">
                    <!-- Days of week -->
                    <div id="${this.containerId}-weekdays" class="grid grid-cols-7 text-center gap-1 mb-1">
                        ${this.renderWeekdays()}
                    </div>
                    
                    <!-- Calendar days -->
                    <div id="${this.containerId}-days" class="calendar-days">
                        ${this.renderDays()}
                    </div>
                    
                    <!-- Calendar legend -->
                    <div class="mt-4 pt-3 border-t border-gray-100">
                        <div class="flex flex-wrap items-center justify-center gap-3 md:gap-5">
                            <div class="flex items-center">
                                <div class="w-4 h-4 bg-blue-500 rounded-full mr-2.5"></div>
                                <span class="text-gray-600 text-sm font-medium">Heute</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 bg-purple-600 rounded-full mr-2.5"></div>
                                <span class="text-gray-600 text-sm font-medium">Politik</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 bg-green-500 rounded-full mr-2.5"></div>
                                <span class="text-gray-600 text-sm font-medium">Sport</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 bg-orange-500 rounded-full mr-2.5"></div>
                                <span class="text-gray-600 text-sm font-medium">Kultur</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderWeekdays() {
        return this.weekdays.map(day => 
            `<div class="py-3 font-medium text-gray-500 text-sm">${day}</div>`
        ).join('');
    }
    
    renderDays() {
        // Aktueller Monat, Jahr und Tageszähler
        const date = new Date(this.currentYear, this.currentMonth, 1);
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        
        // Bestimme den Wochentag des ersten Tags im Monat (0-6)
        let firstDayOfMonth = date.getDay();
        // Anpassen, da unsere Woche mit Montag beginnt (Montag = 0)
        firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        // Bestimme die Anzahl der Tage im aktuellen Monat
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        
        // Bestimme die Anzahl der Tage im vorherigen Monat
        const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
        
        let daySquares = [];
        let dayCount = 1;
        let nextMonthDay = 1;
        
        // Generiere die Wochen (normalerweise 5-6 Wochen)
        for (let week = 0; week < 6; week++) {
            let weekRow = [];
            
            // Generiere die Tage jeder Woche
            for (let i = 0; i < 7; i++) {
                // Tage aus dem vorherigen Monat
                if (week === 0 && i < firstDayOfMonth) {
                    const prevMonthDay = daysInPrevMonth - (firstDayOfMonth - i - 1);
                    weekRow.push(`
                        <div class="py-4 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                            ${prevMonthDay}
                        </div>
                    `);
                } 
                // Tage aus dem aktuellen Monat
                else if (dayCount <= daysInMonth) {
                    // Prüfe, ob es sich um den heutigen Tag handelt
                    const isToday = dayCount === todayDate && this.currentMonth === todayMonth && this.currentYear === todayYear;
                    
                    // Prüfe, ob für diesen Tag ein Event existiert
                    const eventForDay = this.findEventForDay(dayCount);
                    let cellClass = '';
                    let dotHtml = '';
                    
                    if (isToday) {
                        cellClass = 'text-white font-semibold bg-blue-500';
                    } else if (eventForDay) {
                        const category = eventForDay.category.toLowerCase();
                        const colorInfo = this.eventCategories[category];
                        if (colorInfo) {
                            cellClass = `text-gray-800 font-semibold bg-${colorInfo.bgColor}`;
                            dotHtml = `<div class="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-${colorInfo.color} rounded-full"></div>`;
                        }
                    } else {
                        cellClass = 'text-gray-800 hover:bg-gray-50';
                    }
                    
                    weekRow.push(`
                        <div class="py-4 ${cellClass} rounded-lg transition-colors cursor-pointer relative" 
                             data-date="${this.currentYear}-${this.currentMonth + 1}-${dayCount}"
                             data-has-event="${eventForDay ? 'true' : 'false'}">
                            ${dayCount}
                            ${eventForDay ? dotHtml : ''}
                        </div>
                    `);
                    
                    dayCount++;
                } 
                // Tage aus dem nächsten Monat
                else {
                    weekRow.push(`
                        <div class="py-4 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                            ${nextMonthDay}
                        </div>
                    `);
                    nextMonthDay++;
                }
            }
            
            // Füge die Wochenzeile hinzu
            const weekDiv = `<div class="grid grid-cols-7 text-center gap-1 mb-1">${weekRow.join('')}</div>`;
            daySquares.push(weekDiv);
            
            // Wenn alle Tage des Monats bereits angezeigt wurden und wir am Ende einer Woche sind,
            // brechen wir die Schleife ab, um keine unnötige 6. Woche anzuzeigen
            if (dayCount > daysInMonth && week >= 4) break;
        }
        
        return daySquares.join('');
    }
    
    findEventForDay(day) {
        // Sucht nach Events für den angegebenen Tag im aktuellen Monat und Jahr
        return this.events.find(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === this.currentMonth && 
                   eventDate.getFullYear() === this.currentYear;
        });
    }
    
    // Initial Event-Listener einrichten
    setupEventListeners() {
        // Füge die Event-Listener für die Navigation hinzu
        const prevMonthBtn = document.getElementById(`${this.containerId}-prev-month`);
        const nextMonthBtn = document.getElementById(`${this.containerId}-next-month`);
        
        if (prevMonthBtn) {
            // Bind this context to the handler
            prevMonthBtn.addEventListener('click', this.handlePrevMonth.bind(this));
        }
        
        if (nextMonthBtn) {
            // Bind this context to the handler
            nextMonthBtn.addEventListener('click', this.handleNextMonth.bind(this));
        }
        
        // Füge Event-Handler für Tage mit Ereignissen hinzu
        this.attachDayClickListeners();
    }
    
    // Week view functionality has been removed
    
    // Event-Listener nur für die Tage im Kalender
    attachDayClickListeners() {
        // Event-Handler für Tage mit Ereignissen
        const dayElements = this.container.querySelectorAll('[data-has-event="true"]');
        dayElements.forEach(day => {
            day.addEventListener('click', (e) => {
                const dateStr = e.currentTarget.getAttribute('data-date');
                const [year, month, day] = dateStr.split('-').map(Number);
                const eventForDay = this.findEventForDay(day);
                
                if (eventForDay && typeof this.onDayClick === 'function') {
                    // Alle vorherigen Hervorhebungen zurücksetzen
                    document.querySelectorAll('.calendar-highlight').forEach(el => {
                        this.removeSmoothHighlight(el);
                    });
                    
                    // Füge dem Element eine Transition für den Ring-Effekt hinzu
                    e.currentTarget.style.transition = 'all 0.3s ease-out';
                    
                    // Visuelle Rückmeldung im Kalender - dünnerer Rahmen mit kurzer Anzeigedauer
                    e.currentTarget.classList.add('ring-2', 'ring-blue-500', 'ring-offset-1', 'calendar-highlight');
                    
                    // Timer für das Entfernen der Hervorhebung mit weichem Übergang
                    const targetElement = e.currentTarget;
                    setTimeout(() => {
                        if (targetElement) {
                            this.removeSmoothHighlight(targetElement);
                        }
                    }, 1000); // 1 Sekunde vor dem Ausblenden
                    
                    console.log(`Calendar day clicked, found event:`, eventForDay);
                    
                    // Event-Handler aufrufen (scrollt zum Event und wechselt wenn nötig die Seite)
                    this.onDayClick(eventForDay);
                }
            });
        });
    }
    
    // Kalender aktualisieren, wenn sich Monat oder Jahr ändern
    updateCalendar() {
        console.log(`Aktualisiere Kalender auf: ${this.months[this.currentMonth]} ${this.currentYear}`);
        
        // Prüfe, ob der gewählte Monat in der Vergangenheit liegt
        const now = new Date();
        const isInPast = (this.currentYear < now.getFullYear()) || 
                         (this.currentYear === now.getFullYear() && this.currentMonth < now.getMonth());
        
        // Aktualisiere die Monats- und Jahresanzeige
        const monthYearElement = document.getElementById(`${this.containerId}-month-year`);
        if (monthYearElement) {
            monthYearElement.textContent = `${this.months[this.currentMonth]} ${this.currentYear}`;
        }
        
        // Zeige oder verstecke den "vergangene Veranstaltungen" Indikator im Kalender
        const pastIndicatorElement = document.getElementById(`${this.containerId}-past-indicator`);
        if (pastIndicatorElement) {
            if (isInPast) {
                pastIndicatorElement.classList.remove('hidden');
            } else {
                pastIndicatorElement.classList.add('hidden');
            }
        }
        
        // Entferne alle Hervorhebungen aus dem DOM bevor wir die Tage aktualisieren
        document.querySelectorAll('.calendar-highlight').forEach(el => {
            // Bei Aktualisierung des Kalenders direkt entfernen ohne Animation
            el.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-1', 'calendar-highlight');
        });
        
        // Aktualisiere die Tage
        const daysContainer = document.getElementById(`${this.containerId}-days`);
        if (daysContainer) {
            daysContainer.innerHTML = this.renderDays();
        }
        
        // Füge Event-Listener für die neuen Tage hinzu
        this.attachDayClickListeners();
        
        // Aktualisiere die Eventliste basierend auf dem aktuellen Monat
        this.updateEventListForCurrentMonth();
    }
    
    // Methode zum Filtern und Aktualisieren der Events für den aktuellen Monat
    updateEventListForCurrentMonth() {
        // Filtere Events für den aktuellen Monat
        const filteredEvents = window.allEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === this.currentMonth && 
                   eventDate.getFullYear() === this.currentYear;
        });
        
        // Setze gefilterte Events als aktive Events und aktualisiere die Seite auf 1
        window.filteredEvents = filteredEvents;
        window.currentEventsPage = 1;
        
        // Prüfe, ob der gewählte Monat in der Vergangenheit liegt
        const now = new Date();
        const isInPast = (this.currentYear < now.getFullYear()) || 
                         (this.currentYear === now.getFullYear() && this.currentMonth < now.getMonth());
        
        // Aktualisiere den Titel der Eventliste mit dem aktuellen Monat
        const monthTitleElement = document.getElementById('events-month-title');
        const pastIndicatorElement = document.getElementById('events-past-indicator');
        
        if (monthTitleElement) {
            // Setze den Monat und Jahr als Text
            monthTitleElement.textContent = `im ${this.months[this.currentMonth]} ${this.currentYear}`;
            
            // Zeige oder verstecke den "vergangene Veranstaltungen" Indikator
            if (pastIndicatorElement) {
                if (isInPast) {
                    pastIndicatorElement.classList.remove('hidden');
                } else {
                    pastIndicatorElement.classList.add('hidden');
                }
            }
        }
        
        // Aktualisiere die Eventliste
        updateEventList();
        
        // Log für Debugging
        console.log(`Gefilterte Events für ${this.months[this.currentMonth]} ${this.currentYear}:`, filteredEvents.length);
    }
    
    // Methode zum Hinzufügen eines Event-Handlers für Klicks auf Tage
    setOnDayClickHandler(handler) {
        this.onDayClick = handler;
    }
    
    // Methode zum Aktualisieren der Events-Liste
    updateEvents(newEvents) {
        this.events = newEvents;
        this.updateCalendar();
    }
    
    // Methode zum sanften Entfernen des Hervorhebungseffekts
    removeSmoothHighlight(element) {
        if (!element) return;
        
        // Erst die Opacity auf 0 setzen für einen sanften Übergang
        element.style.transition = 'all 0.4s ease-out';
        element.style.opacity = '0.5';
        
        // Nach dem Übergang die Klassen entfernen
        setTimeout(() => {
            element.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-1', 'calendar-highlight');
            // Opacity wiederherstellen nach dem Entfernen der Klassen
            setTimeout(() => {
                element.style.opacity = '1';
            }, 50);
        }, 300);
    }
    
    // Springe zu einem bestimmten Monat und Jahr
    goToDate(year, month) {
        this.currentYear = year;
        this.currentMonth = month;
        this.updateCalendar();
    }
    
    // Springe zum heutigen Tag
    goToToday() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.updateCalendar();
    }
    
    // Wechsel zur Monatsansicht - Week view wurde entfernt
    toggleWeekView(isWeekView) {
        this.showMonthView();
    }
    
    // Week view functionality has been removed
    
    // Zeige die Monatsansicht des Kalenders (nur diese Ansicht wird unterstützt)
    showMonthView() {
        this.updateCalendar();
    }
}

// Funktion zur Aktualisierung der angezeigten Events mit Pagination
function updateEventList() {
    // Verwende gefilterte Events, wenn vorhanden, sonst alle Events
    const eventsToShow = window.filteredEvents || window.allEvents;
    
    // Events nach Datum sortieren
    const sortedEvents = eventsToShow.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Berechne den Start- und End-Index für die aktuelle Seite
    const startIndex = (window.currentEventsPage - 1) * window.eventsPerPage;
    const endIndex = startIndex + window.eventsPerPage;
    
    // Die anzuzeigenden Events für die aktuelle Seite
    const currentPageEvents = sortedEvents.slice(startIndex, endIndex);
    
    // Finde den Events-Container
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;
    
    // Container leeren
    eventsContainer.innerHTML = '';
    
    // Wenn keine Events für diesen Monat vorhanden sind, zeige eine Nachricht an
    if (currentPageEvents.length === 0) {
        // Finde heraus, welchen Monat und Jahr wir aktuell anzeigen
        const calendar = document.querySelector('#calendar-container');
        if (calendar) {
            const monthYearElement = calendar.querySelector('#calendar-container-month-year');
            if (monthYearElement) {
                const monthYearText = monthYearElement.textContent;
                
                // Prüfe, ob der Monat in der Vergangenheit liegt
                const [monthName, yearText] = monthYearText.split(' ');
                const monthIndex = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                                     'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'].indexOf(monthName);
                const year = parseInt(yearText);
                const now = new Date();
                const isInPast = (year < now.getFullYear()) || 
                                 (year === now.getFullYear() && monthIndex < now.getMonth());
                
                // Spezialfall für den aktuellen Monat
                let messageText;
                if (year === now.getFullYear() && monthIndex === now.getMonth()) {
                    messageText = `Für den Rest von ${monthYearText} sind keine Veranstaltungen geplant.`;
                } else if (isInPast) {
                    messageText = `Im ${monthYearText} wurden keine Veranstaltungen abgehalten.`;
                } else {
                    messageText = `Für ${monthYearText} sind keine Veranstaltungen geplant.`;
                }
                
                eventsContainer.innerHTML = `
                    <div class="p-8 text-center bg-gray-50 rounded-lg">
                        <div class="text-4xl text-gray-300 mb-2">
                            <i class="far fa-calendar-times"></i>
                        </div>
                        <h4 class="text-lg font-medium text-gray-500 mb-1">Keine Veranstaltungen</h4>
                        <p class="text-gray-400 text-sm">${messageText}</p>
                    </div>
                `;
            }
        }
        return;
    }
    
    // Füge Events hinzu
    currentPageEvents.forEach(event => {
        // Formatiere das Datum
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString('de-DE', { month: 'short' }).toUpperCase();
        const time = eventDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        
        // Bestimme die Kategorie-Farbe
        let categoryColor, bgColor, textColor;
        switch(event.category) {
            case 'politik':
                categoryColor = 'purple-600';
                bgColor = 'purple-50';
                textColor = 'purple-600';
                break;
            case 'sport':
                categoryColor = 'green-500';
                bgColor = 'green-50';
                textColor = 'green-600';
                break;
            case 'kultur':
                categoryColor = 'orange-500';
                bgColor = 'orange-50';
                textColor = 'orange-600';
                break;
            default:
                categoryColor = 'blue-500';
                bgColor = 'blue-50';
                textColor = 'blue-600';
        }
        
        // HTML für das Event erstellen
        const eventHtml = `
            <div class="mb-4 group hover:bg-gray-50 rounded-lg transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md overflow-hidden relative" 
                 id="event-${event.id}" 
                 data-event-id="${event.id}" 
                 data-event-date="${event.date}" 
                 data-event-category="${event.category}">
                <!-- Left color accent -->
                <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-${categoryColor}"></div>
                
                <div class="flex py-2.5 px-4 pl-5">
                    <div class="mr-3 flex-shrink-0">
                        <!-- Color-coded date card -->
                        <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 text-center w-14">
                            <div class="py-1.5 px-2 font-bold text-xl text-gray-800">${day}</div>
                            <div class="py-0.5 font-medium text-xs text-${textColor} bg-${bgColor}">${month}</div>
                        </div>
                    </div>
                    
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-0.5">
                            <span class="flex items-center text-${textColor} text-sm font-medium uppercase tracking-wide">
                                <span class="w-3 h-3 bg-${categoryColor} rounded-full mr-2 inline-block"></span>
                                ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </span>
                            <a href="#" class="text-gray-400 hover:text-${categoryColor} transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-${bgColor}">
                                <i class="fas fa-arrow-right text-sm"></i>
                            </a>
                        </div>
                        <h4 class="font-bold text-lg text-gray-800 mb-0.5 group-hover:text-${categoryColor} transition-colors">${event.title}</h4>
                        <p class="text-gray-600 text-sm mb-1">${event.description}</p>
                        
                        <div class="flex items-center text-gray-500 text-sm">
                            <div class="flex items-center mr-4">
                                <i class="far fa-clock mr-1.5 text-${categoryColor}"></i>
                                <span>${time} Uhr</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt mr-1.5 text-${categoryColor}"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Füge das Event zum Container hinzu
        eventsContainer.innerHTML += eventHtml;
    });
    
    // Update der Pagination
    updatePagination();
}

// Funktion zum Aktualisieren der Pagination-Steuerung
function updatePagination() {
    const paginationContainer = document.getElementById('events-pagination');
    if (!paginationContainer) return;
    
    // Verwende gefilterte Events, wenn vorhanden, sonst alle Events
    const eventsToShow = window.filteredEvents || window.allEvents;
    const totalEvents = eventsToShow.length;
    const totalPages = Math.ceil(totalEvents / window.eventsPerPage);
    
    // Text für den Pagination-Button aktualisieren
    const paginationText = totalEvents > 0 
        ? `Seite ${window.currentEventsPage} von ${totalPages} (${totalEvents} Termine)`
        : `Keine Termine in diesem Monat`;
    paginationContainer.querySelector('.pagination-info').textContent = paginationText;
    
    // Vorwärts/Rückwärts-Buttons aktualisieren
    const prevBtn = paginationContainer.querySelector('.prev-page');
    const nextBtn = paginationContainer.querySelector('.next-page');
    
    // Zurück-Button deaktivieren, wenn auf Seite 1
    prevBtn.disabled = window.currentEventsPage === 1;
    prevBtn.classList.toggle('opacity-50', window.currentEventsPage === 1);
    prevBtn.classList.toggle('cursor-not-allowed', window.currentEventsPage === 1);
    
    // Vorwärts-Button deaktivieren, wenn auf letzter Seite
    nextBtn.disabled = window.currentEventsPage >= totalPages;
    nextBtn.classList.toggle('opacity-50', window.currentEventsPage >= totalPages);
    nextBtn.classList.toggle('cursor-not-allowed', window.currentEventsPage >= totalPages);
}

// Funktion zum Navigieren zu einem bestimmten Event und Hervorheben
function scrollToEvent(eventId) {
    console.log(`Scrolling to event with ID: ${eventId}`);
    
    // Verwende gefilterte Events, wenn vorhanden, sonst alle Events
    const eventsToUse = window.filteredEvents || window.allEvents;
    
    // Ermitteln, auf welcher Seite das Event sein sollte
    const eventIndex = eventsToUse.findIndex(event => event.id === eventId);
    
    if (eventIndex >= 0) {
        const targetPage = Math.floor(eventIndex / window.eventsPerPage) + 1;
        console.log(`Event is on page ${targetPage}, current page is ${window.currentEventsPage}`);
        
        // Wenn das Event auf einer anderen Seite ist, wechsle zur richtigen Seite
        if (targetPage !== window.currentEventsPage) {
            window.currentEventsPage = targetPage;
            console.log(`Switching to page ${targetPage}`);
            updateEventList();
            
            // Warte kurz, bis die neue Liste gerendert ist, bevor wir das Element suchen und highlighten
            setTimeout(() => highlightEventElement(eventId), 300);
        } else {
            // Wenn wir bereits auf der richtigen Seite sind, highlight direkt
            highlightEventElement(eventId);
        }
    } else {
        console.error(`Event with ID ${eventId} not found in the current events list`);
    }
}

// Hilfsfunktion zum Hervorheben des Event-Elements
function highlightEventElement(eventId) {
    const eventElement = document.getElementById(`event-${eventId}`);
    
    if (eventElement) {
        console.log(`Found event element, highlighting it`);
        
        // Kein Scrollen mehr - entfernt, damit die Seite nicht springt
        // Nur visuelles Hervorheben des Elements ohne Position zu ändern
        
        // Stärkeres visuelles Feedback mit Pulsieren
        eventElement.classList.add('bg-blue-200');
        eventElement.classList.add('shadow-lg');
        eventElement.classList.add('border-blue-500');
        eventElement.classList.add('border-2');
        eventElement.style.transform = 'scale(1.02)';
        eventElement.style.transition = 'all 0.3s ease-in-out';
        
        // Highlight-Effekt wieder entfernen, aber zeitversetzt
        setTimeout(() => {
            eventElement.classList.remove('bg-blue-200');
            eventElement.classList.add('bg-blue-100');
            
            setTimeout(() => {
                eventElement.classList.remove('bg-blue-100');
                eventElement.classList.remove('shadow-lg');
                eventElement.classList.remove('border-blue-500');
                eventElement.classList.remove('border-2');
                eventElement.style.transform = '';
            }, 1000);
        }, 1500);
    } else {
        console.error(`Could not find element with ID event-${eventId} after page change`);
    }
}

// Initialisiere den Kalender, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Beispiel-Events - diese sollten später dynamisch geladen werden
    const demoEvents = [
        // Juli 2025 Events
        {
            id: 1,
            title: "Gemeinderatssitzung",
            description: "Öffentliche Sitzung mit Bürgerfragestunde",
            date: "2025-07-12T19:00:00",
            location: "Rathaus",
            category: "politik"
        },
        {
            id: 2,
            title: "Fußballturnier",
            description: "Jugendturnier der örtlichen Vereine",
            date: "2025-07-15T14:00:00",
            location: "Sportplatz",
            category: "sport"
        },
        {
            id: 3,
            title: "Konzert im Park",
            description: "Open-Air Konzert mit regionalen Künstlern",
            date: "2025-07-20T20:00:00",
            location: "Stadtpark",
            category: "kultur"
        },
        {
            id: 4,
            title: "Straßenfest",
            description: "Jährliches Nachbarschaftsfest in der Hauptstraße",
            date: "2025-07-25T15:00:00",
            location: "Hauptstraße",
            category: "kultur"
        },
        {
            id: 5,
            title: "Schwimmwettkampf",
            description: "Regionaler Jugend-Schwimmwettbewerb",
            date: "2025-07-18T10:00:00",
            location: "Gemeindebad",
            category: "sport"
        },
        {
            id: 6,
            title: "Bürgerversammlung",
            description: "Informationsveranstaltung zur neuen Umgehungsstraße",
            date: "2025-07-28T18:30:00",
            location: "Rathaus",
            category: "politik"
        },
        {
            id: 7,
            title: "Seniorennachmittag",
            description: "Kaffee und Kuchen mit musikalischer Begleitung",
            date: "2025-07-22T14:30:00",
            location: "Gemeindesaal",
            category: "kultur"
        },
        {
            id: 8,
            title: "Fahrradtour",
            description: "Gemeinsame Radtour durch die Gemeinde",
            date: "2025-07-30T09:00:00",
            location: "Marktplatz",
            category: "sport"
        },
        
        // August 2025 Events
        {
            id: 9,
            title: "Sommerfest",
            description: "Großes Sommerfest mit Livemusik und Ständen",
            date: "2025-08-05T16:00:00",
            location: "Festplatz",
            category: "kultur"
        },
        {
            id: 10,
            title: "Weinwanderung",
            description: "Geführte Wanderung durch die Weinberge mit Verkostung",
            date: "2025-08-12T10:00:00",
            location: "Weinberg",
            category: "kultur"
        },
        {
            id: 11,
            title: "Stadtratssitzung",
            description: "Öffentliche Sitzung zur Haushaltsplanung",
            date: "2025-08-18T18:00:00",
            location: "Rathaus",
            category: "politik"
        },
        {
            id: 12,
            title: "Beachvolleyball-Turnier",
            description: "Jährliches Beachvolleyball-Turnier am See",
            date: "2025-08-25T14:00:00",
            location: "Strandbad",
            category: "sport"
        },
        
        // Juni 2025 Events
        {
            id: 13,
            title: "Kinderfest",
            description: "Spiel und Spaß für die ganze Familie",
            date: "2025-06-01T13:00:00",
            location: "Stadtpark",
            category: "kultur"
        },
        {
            id: 14,
            title: "Umweltausschuss",
            description: "Sitzung zum Thema nachhaltige Stadtentwicklung",
            date: "2025-06-10T17:30:00",
            location: "Rathaus",
            category: "politik"
        },
        {
            id: 15,
            title: "Stadtlauf",
            description: "10km Lauf durch die Innenstadt",
            date: "2025-06-20T09:00:00",
            location: "Marktplatz",
            category: "sport"
        },
        {
            id: 16,
            title: "Schulkonzert",
            description: "Jahreskonzert der Musikschule",
            date: "2025-06-28T19:00:00",
            location: "Stadthalle",
            category: "kultur"
        }
    ];

    // Globale Variable für die Paginierung der Events
    window.allEvents = demoEvents;
    window.currentEventsPage = 1;
    window.eventsPerPage = 3;

    // Initialisiere den Kalender mit den Demo-Events und dem aktuellen Datum
    const calendar = new DynamicCalendar('calendar-container', {
        events: demoEvents,
        initialDate: new Date()  // Immer das aktuelle Datum verwenden
    });
    
    // Event-Handler für Klicks auf Tage mit Events
    calendar.setOnDayClickHandler(function(event) {
        console.log('Calendar event clicked:', event);
        
        // Visuelle Bestätigung im Konsolen-Log
        console.log(`Navigating to event ID ${event.id}: ${event.title} (${event.date})`);
        
        // Suchen des entsprechenden Event-Elements und Seitenumschaltung wenn nötig
        scrollToEvent(event.id);
    });
    
    // Filtere Events für den Initial-Monat und initialisiere die Eventliste
    calendar.updateEventListForCurrentMonth();
    
    // Stelle sicher, dass der aktuelle Monat angezeigt wird
    calendar.goToToday();
    
    // Event-Handler für Pagination-Buttons
    document.getElementById('prev-page-btn').addEventListener('click', function() {
        if (window.currentEventsPage > 1) {
            window.currentEventsPage--;
            updateEventList();
        }
    });
    
    document.getElementById('next-page-btn').addEventListener('click', function() {
        const totalPages = Math.ceil(window.allEvents.length / window.eventsPerPage);
        if (window.currentEventsPage < totalPages) {
            window.currentEventsPage++;
            updateEventList();
        }
    });
});
