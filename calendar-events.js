/**
 * Enhanced Calendar Events for "Es Käseblättsche"
 * Contains the calendar functionality and sample events data
 */

// Sample events data
window.calendarEvents = [
    {
        id: 1,
        title: "Bürgerdialog zur Stadtentwicklung",
        date: "2025-08-15",
        time: "18:00 - 20:00",
        location: "Rathaus Quierschied, Großer Saal",
        category: "Politik",
        description: "Diskussionsrunde zu aktuellen Entwicklungen in Quierschied mit dem Bürgermeister und Gemeindevertretern."
    },
    {
        id: 2,
        title: "Sommerliches Straßenfest",
        date: "2025-09-12",
        time: "14:00 - 22:00",
        location: "Marktplatz Quierschied",
        category: "Kultur",
        description: "Traditionelles Fest mit kulinarischen Spezialitäten, Livemusik und Unterhaltung für die ganze Familie."
    },
    {
        id: 3,
        title: "Gemeinde-Sportfest 2025",
        date: "2025-08-28",
        time: "10:00 - 18:00",
        location: "Sportplatz Göttelborn",
        category: "Sport",
        description: "Sportliche Wettkämpfe für alle Altersklassen mit Preisverleihung und gemütlichem Ausklang am Abend."
    },
    {
        id: 4,
        title: "Seniorennachmittag",
        date: "2025-07-25",
        time: "15:00 - 17:30",
        location: "Gemeindehaus Fischbach",
        category: "Kultur",
        description: "Gemütlicher Nachmittag für Senioren mit Kaffee und Kuchen, Musik und Gesellschaftsspielen."
    },
    {
        id: 5,
        title: "Gemeinderat: Öffentliche Sitzung",
        date: "2025-07-30",
        time: "19:00 - 21:00",
        location: "Rathaus Quierschied",
        category: "Politik",
        description: "Öffentliche Sitzung des Gemeinderats mit Diskussion zu aktuellen Themen und Projekten."
    },
    {
        id: 6,
        title: "Fußballturnier der Jugend",
        date: "2025-08-02",
        time: "09:00 - 17:00",
        location: "Sportplatz Quierschied",
        category: "Sport",
        description: "Jugendturnier der lokalen Fußballvereine mit Teams aus dem gesamten Landkreis."
    },
    {
        id: 7,
        title: "Sommerkino im Park",
        date: "2025-08-10",
        time: "21:00 - 23:30",
        location: "Stadtpark Quierschied",
        category: "Kultur",
        description: "Open-Air-Kino mit dem Film 'Sommer in Quierschied'. Getränke und Snacks werden angeboten."
    },
    {
        id: 8,
        title: "Bürgersprechstunde",
        date: "2025-08-05",
        time: "16:00 - 18:00",
        location: "Bürgerhaus Göttelborn",
        category: "Politik",
        description: "Offene Sprechstunde für alle Bürgerinnen und Bürger mit dem Bürgermeister."
    },
    {
        id: 9,
        title: "Konzert: Lokale Bands",
        date: "2025-08-22",
        time: "19:30 - 23:00",
        location: "Kulturhalle Fischbach",
        category: "Kultur",
        description: "Konzertabend mit Auftritten lokaler Bands verschiedener Musikrichtungen. Eintritt frei."
    },
    {
        id: 10,
        title: "Volleyball-Turnier",
        date: "2025-08-16",
        time: "10:00 - 16:00",
        location: "Sporthalle Quierschied",
        category: "Sport",
        description: "Offenes Volleyball-Turnier für Hobby- und Vereinsmannschaften. Anmeldung erforderlich."
    },
    {
        id: 11,
        title: "Informationsabend: Neue Baugebiete",
        date: "2025-08-19",
        time: "19:00 - 20:30",
        location: "Rathaus Quierschied",
        category: "Politik",
        description: "Informationsveranstaltung zu den geplanten neuen Baugebieten in der Gemeinde."
    },
    {
        id: 12,
        title: "Sommerkonzert Musikverein",
        date: "2025-08-25",
        time: "17:00 - 19:00",
        location: "Marktplatz Quierschied",
        category: "Kultur",
        description: "Traditionelles Sommerkonzert des Musikvereins Quierschied unter freiem Himmel."
    }
];

// Extend the DynamicCalendar class with additional functionality
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
                    }
                    
                    // Wenn mehrere Events für den Tag existieren, füge ein +N Indikator hinzu
                    const multipleEvents = this.findMultipleEventsForDay(dayCount);
                    let multipleEventsHtml = '';
                    
                    if (multipleEvents.length > 1) {
                        multipleEventsHtml = `
                            <div class="absolute -bottom-1 right-2 text-xs font-semibold text-gray-500">
                                +${multipleEvents.length}
                            </div>
                        `;
                    }
                    
                    weekRow.push(`
                        <div class="py-2.5 relative ${cellClass} hover:bg-gray-100 rounded-lg transition-colors cursor-pointer day-cell" data-date="${this.currentYear}-${this.currentMonth + 1}-${dayCount}">
                            ${dayCount}
                            ${dotHtml}
                            ${multipleEventsHtml}
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
            
            daySquares.push(`<div class="grid grid-cols-7 gap-1">${weekRow.join('')}</div>`);
            
            // Breche ab, wenn alle Tage des aktuellen Monats angezeigt wurden
            if (dayCount > daysInMonth && week >= 4) break;
        }
        
        return daySquares.join('');
    }
    
    findEventForDay(day) {
        const currentMonthPadded = (this.currentMonth + 1).toString().padStart(2, '0');
        const dayPadded = day.toString().padStart(2, '0');
        const dateString = `${this.currentYear}-${currentMonthPadded}-${dayPadded}`;
        
        return this.events.find(event => {
            const eventDate = new Date(event.date);
            const eventDateString = `${eventDate.getFullYear()}-${(eventDate.getMonth() + 1).toString().padStart(2, '0')}-${eventDate.getDate().toString().padStart(2, '0')}`;
            return eventDateString === dateString;
        });
    }
    
    findMultipleEventsForDay(day) {
        const currentMonthPadded = (this.currentMonth + 1).toString().padStart(2, '0');
        const dayPadded = day.toString().padStart(2, '0');
        const dateString = `${this.currentYear}-${currentMonthPadded}-${dayPadded}`;
        
        return this.events.filter(event => {
            const eventDate = new Date(event.date);
            const eventDateString = `${eventDate.getFullYear()}-${(eventDate.getMonth() + 1).toString().padStart(2, '0')}-${eventDate.getDate().toString().padStart(2, '0')}`;
            return eventDateString === dateString;
        });
    }
    
    setupEventListeners() {
        // Navigationsbuttons
        const prevMonthBtn = document.getElementById(`${this.containerId}-prev-month`);
        const nextMonthBtn = document.getElementById(`${this.containerId}-next-month`);
        
        if (prevMonthBtn) prevMonthBtn.addEventListener('click', this.handlePrevMonth);
        if (nextMonthBtn) nextMonthBtn.addEventListener('click', this.handleNextMonth);
    }
    
    updateCalendar() {
        this.render();
        this.setupEventListeners();
        
        // Löse ein benutzerdefiniertes Event aus, um andere Komponenten zu informieren
        const event = new CustomEvent('calendarUpdated', {
            detail: {
                year: this.currentYear,
                month: this.currentMonth
            }
        });
        document.dispatchEvent(event);
    }
}
