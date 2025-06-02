// ShoreSquad App JavaScript
// Modern ES6+ JavaScript with interactive features

class ShoreSquadApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.loadData();
    }

    init() {
        console.log('🌊 ShoreSquad App Initialized!');
        this.mobile = window.innerWidth <= 768;
        this.animateElements();
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navMenu?.classList.remove('active');
                    navToggle?.classList.remove('active');
                }
            });
        });

        // Button event listeners
        document.getElementById('joinCrewBtn')?.addEventListener('click', () => {
            this.showModal('Join a Crew', 'Connect with local environmental enthusiasts and start making a difference together!');
        });

        document.getElementById('findEventBtn')?.addEventListener('click', () => {
            this.showModal('Find Events', 'Discover upcoming beach cleanups near you and rally your squad!');
        });

        document.getElementById('createEventBtn')?.addEventListener('click', () => {
            this.showModal('Create Event', 'Organize your own beach cleanup and invite your crew to join!');
        });

        // Scroll animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.mobile = window.innerWidth <= 768;
        });
    }

    loadData() {
        this.loadWeatherData();
        this.loadEvents();
        this.loadCrewMembers();
        this.loadForecast();
    }

    loadWeatherData() {
        // Simulate weather API call
        setTimeout(() => {
            const weatherCard = document.getElementById('weatherCard');
            if (weatherCard) {
                const weather = this.generateMockWeather();
                this.updateWeatherCard(weather);
            }
        }, 500);
    }

    generateMockWeather() {
        const conditions = [
            { icon: 'fa-sun', temp: 72, condition: 'Sunny', description: 'Perfect beach day!', recommendation: 'Great conditions for cleanup!' },
            { icon: 'fa-cloud-sun', temp: 68, condition: 'Partly Cloudy', description: 'Nice weather', recommendation: 'Good conditions for cleanup!' },
            { icon: 'fa-cloud-rain', temp: 62, condition: 'Light Rain', description: 'Drizzling', recommendation: 'Maybe postpone cleanup' },
            { icon: 'fa-wind', temp: 65, condition: 'Windy', description: 'Breezy conditions', recommendation: 'Be careful with loose items!' }
        ];
        
        return conditions[Math.floor(Math.random() * conditions.length)];
    }

    updateWeatherCard(weather) {
        const weatherCard = document.getElementById('weatherCard');
        weatherCard.innerHTML = `
            <div class="weather-icon">
                <i class="fas ${weather.icon}"></i>
            </div>
            <div class="weather-info">
                <h3>${weather.description}</h3>
                <p class="temperature">${weather.temp}°F</p>
                <p class="conditions">${weather.condition}</p>
                <p class="recommendation">${weather.recommendation}</p>
            </div>
        `;
        weatherCard.classList.add('fade-in-up');
    }

    loadForecast() {
        const forecastGrid = document.getElementById('forecastGrid');
        if (!forecastGrid) return;

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const icons = ['fa-sun', 'fa-cloud-sun', 'fa-cloud', 'fa-sun', 'fa-cloud-sun'];
        const temps = [75, 72, 68, 78, 74];

        const forecastHTML = days.map((day, index) => `
            <div class="forecast-item">
                <div class="day">${day}</div>
                <i class="fas ${icons[index]}"></i>
                <div class="temp">${temps[index]}°</div>
            </div>
        `).join('');

        forecastGrid.innerHTML = forecastHTML;
    }

    loadEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        if (!eventsGrid) return;

        const mockEvents = [
            {
                title: 'Santa Monica Beach Cleanup',
                date: '2025-06-05',
                time: '9:00 AM',
                location: 'Santa Monica Pier',
                description: 'Join us for a fun morning cleaning up one of LA\'s most popular beaches!',
                attendees: 24,
                bags: 15
            },
            {
                title: 'Venice Beach Squad Day',
                date: '2025-06-08',
                time: '10:00 AM',
                location: 'Venice Beach Boardwalk',
                description: 'Bring your crew for an epic cleanup session with music and snacks!',
                attendees: 18,
                bags: 12
            },
            {
                title: 'Malibu Coast Conservation',
                date: '2025-06-12',
                time: '8:00 AM',
                location: 'Malibu State Beach',
                description: 'Early morning cleanup to protect marine wildlife habitats.',
                attendees: 32,
                bags: 20
            }
        ];

        const eventsHTML = mockEvents.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <div class="event-date">${this.formatDate(event.date)} at ${event.time}</div>
                    <div class="event-title">${event.title}</div>
                </div>
                <div class="event-body">
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                    <div class="event-description">${event.description}</div>
                    <div class="event-stats">
                        <div class="event-stat">
                            <i class="fas fa-users"></i>
                            ${event.attendees} going
                        </div>
                        <div class="event-stat">
                            <i class="fas fa-trash"></i>
                            Target: ${event.bags} bags
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="app.joinEvent('${event.title}')">
                        <i class="fas fa-plus"></i> Join Event
                    </button>
                </div>
            </div>
        `).join('');

        eventsGrid.innerHTML = eventsHTML;
    }

    loadCrewMembers() {
        const crewMembers = document.getElementById('crewMembers');
        if (!crewMembers) return;

        const mockCrew = [
            { name: 'Alex Rodriguez', role: 'Crew Leader', initial: 'A' },
            { name: 'Maya Chen', role: 'Environmental Scientist', initial: 'M' },
            { name: 'Jordan Smith', role: 'Social Media Manager', initial: 'J' },
            { name: 'Taylor Johnson', role: 'Volunteer Coordinator', initial: 'T' },
            { name: 'Sam Wilson', role: 'Equipment Manager', initial: 'S' },
            { name: 'Casey Brown', role: 'New Member', initial: 'C' }
        ];

        const crewHTML = mockCrew.map(member => `
            <div class="crew-member">
                <div class="crew-avatar">
                    ${member.initial}
                </div>
                <div class="crew-name">${member.name}</div>
                <div class="crew-role">${member.role}</div>
            </div>
        `).join('');

        crewMembers.innerHTML = crewHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    joinEvent(eventTitle) {
        this.showModal('Event Joined!', `You've successfully joined "${eventTitle}". Check your email for details and don't forget to bring your crew! 🌊`);
        this.animateSuccess();
    }

    showModal(title, message) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('app-modal');
        if (!modal) {
            modal = this.createModal();
            document.body.appendChild(modal);
        }

        // Update modal content
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-message').textContent = message;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add show animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'app-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3 class="modal-title"></h3>
                <p class="modal-message"></p>
                <button class="btn btn-primary modal-ok">Got it!</button>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .modal.show {
                opacity: 1;
            }
            .modal-content {
                background-color: var(--clean-white);
                padding: var(--spacing-xl);
                border-radius: var(--border-radius-xl);
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: var(--shadow-lg);
                transform: scale(0.7);
                transition: transform 0.3s ease;
            }
            .modal.show .modal-content {
                transform: scale(1);
            }
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 30px;
                cursor: pointer;
                color: var(--text-light);
            }
            .modal-title {
                color: var(--primary-blue);
                margin-bottom: var(--spacing-md);
                font-size: var(--font-size-2xl);
            }
            .modal-message {
                margin-bottom: var(--spacing-lg);
                line-height: 1.6;
                color: var(--text-dark);
            }
            .modal-ok {
                margin: 0 auto;
            }
        `;
        document.head.appendChild(style);

        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        modal.querySelector('.modal-ok').addEventListener('click', () => {
            this.closeModal();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        return modal;
    }

    closeModal() {
        const modal = document.getElementById('app-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    animateElements() {
        // Add intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.weather-card, .event-card, .stat-card, .impact-card, .crew-member').forEach(el => {
            observer.observe(el);
        });
    }

    handleScrollAnimations() {
        // Add header background on scroll
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 119, 190, 0.95)';
        } else {
            header.style.backgroundColor = '';
        }
    }

    animateSuccess() {
        // Create success animation
        const successElement = document.createElement('div');
        successElement.innerHTML = '🎉';
        successElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 60px;
            z-index: 3000;
            animation: successPop 1s ease-out forwards;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes successPop {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(successElement);

        setTimeout(() => {
            successElement.remove();
            style.remove();
        }, 1000);
    }

    // Weather API integration (placeholder for real implementation)
    async fetchWeatherData(location = 'Santa Monica, CA') {
        try {
            // In a real app, you would use a weather API like OpenWeatherMap
            // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=imperial`);
            // const data = await response.json();
            
            // For now, return mock data
            return this.generateMockWeather();
        } catch (error) {
            console.error('Weather fetch error:', error);
            return this.generateMockWeather();
        }
    }

    // Geolocation for finding nearby events
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                error => reject(error),
                { timeout: 10000 }
            );
        });
    }

    // Local storage for user preferences
    saveUserPreferences(preferences) {
        localStorage.setItem('shoreSquadPrefs', JSON.stringify(preferences));
    }

    getUserPreferences() {
        const saved = localStorage.getItem('shoreSquadPrefs');
        return saved ? JSON.parse(saved) : {
            notifications: true,
            theme: 'light',
            location: null
        };
    }

    // PWA installation prompt
    setupPWA() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            const installBtn = document.createElement('button');
            installBtn.textContent = '📱 Install App';
            installBtn.className = 'btn btn-secondary install-btn';
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                animation: pulse 2s infinite;
            `;
            
            installBtn.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    console.log(`PWA install ${outcome}`);
                    deferredPrompt = null;
                    installBtn.remove();
                }
            });
            
            document.body.appendChild(installBtn);
        });
    }
}

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Utility functions
const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 3959; // Earth's radius in miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ShoreSquadApp();
    
    // Setup PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        console.log('🌊 Stay salty, beach cleaner! 🏖️');
        document.body.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 2000);
    }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShoreSquadApp, utils };
}
