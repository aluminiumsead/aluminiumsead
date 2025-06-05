/**
 * Mini Web App JavaScript for Aluminum Iran Telegram Bot
 * Handles Telegram Web App integration and dynamic content loading
 */

// Initialize Telegram Web App
let tg = window.Telegram?.WebApp;

// Product data with SVG placeholders
const products = [
    { id: 1, name: "محصول آلومینیومی ۱", image: "assets/product1.svg" },
    { id: 2, name: "محصول آلومینیومی ۲", image: "assets/product2.svg" },
    { id: 3, name: "محصول آلومینیومی ۳", image: "assets/product3.svg" },
    { id: 4, name: "محصول آلومینیومی ۴", image: "assets/product4.svg" },
    { id: 5, name: "محصول آلومینیومی ۵", image: "assets/product5.svg" },
    { id: 6, name: "محصول آلومینیومی ۶", image: "assets/product6.svg" },
    { id: 7, name: "محصول آلومینیومی ۷", image: "assets/product7.svg" },
    { id: 8, name: "محصول آلومینیومی ۸", image: "assets/product8.svg" }
];

/**
 * Initialize the application
 */
function initApp() {
    console.log('Initializing Aluminum Iran Mini Web App...');
    
    // Configure Telegram Web App if available
    if (tg) {
        configureTelegramWebApp();
    }
    
    // Load products
    loadProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('App initialized successfully');
}

/**
 * Configure Telegram Web App settings
 */
function configureTelegramWebApp() {
    try {
        // Expand the web app to full height
        tg.expand();
        
        // Enable closing confirmation
        tg.enableClosingConfirmation();
        
        // Set header color
        tg.setHeaderColor('#0080FF');
        
        // Apply theme
        applyTelegramTheme();
        
        console.log('Telegram Web App configured');
    } catch (error) {
        console.error('Error configuring Telegram Web App:', error);
    }
}

/**
 * Apply Telegram theme colors
 */
function applyTelegramTheme() {
    if (!tg?.themeParams) return;
    
    const root = document.documentElement;
    const theme = tg.themeParams;
    
    // Apply theme colors if available
    if (theme.bg_color) {
        root.style.setProperty('--background', theme.bg_color);
    }
    
    if (theme.text_color) {
        root.style.setProperty('--text-primary', theme.text_color);
    }
    
    if (theme.hint_color) {
        root.style.setProperty('--text-secondary', theme.hint_color);
    }
    
    if (theme.button_color) {
        root.style.setProperty('--primary-color', theme.button_color);
    }
}

/**
 * Load and display products
 */
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Product grid element not found');
        return;
    }
    
    // Clear existing content
    productGrid.innerHTML = '';
    
    // Add loading indicator
    productGrid.innerHTML = '<div class="loading"></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        productGrid.innerHTML = '';
        
        products.forEach(product => {
            const productElement = createProductElement(product);
            productGrid.appendChild(productElement);
        });
        
        console.log(`Loaded ${products.length} products`);
    }, 500);
}

/**
 * Create product element
 */
function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.setAttribute('data-product-id', product.id);
    
    productDiv.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
        </div>
    `;
    
    // Add click event for product interaction
    productDiv.addEventListener('click', () => {
        handleProductClick(product);
    });
    
    return productDiv;
}

/**
 * Handle product click
 */
function handleProductClick(product) {
    console.log(`Product clicked: ${product.name}`);
    
    // Send haptic feedback if available
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    // Show product details or send data to bot
    if (tg) {
        const productData = {
            type: 'product_view',
            product_id: product.id,
            product_name: product.name
        };
        
        tg.sendData(JSON.stringify(productData));
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Contact button interactions
    setupContactButtons();
    
    // Video section interaction
    setupVideoSection();
    
    // Service card interactions
    setupServiceCards();
    
    // Handle back button
    if (tg) {
        tg.onEvent('backButtonClicked', () => {
            tg.close();
        });
    }
}

/**
 * Setup contact button interactions
 */
function setupContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-button');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Send haptic feedback
            if (tg?.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('medium');
            }
            
            // Track contact interaction
            const contactType = button.classList.contains('phone') ? 'phone' :
                              button.classList.contains('whatsapp') ? 'whatsapp' : 'telegram';
            
            console.log(`Contact button clicked: ${contactType}`);
            
            // Send data to bot if needed
            if (tg) {
                const contactData = {
                    type: 'contact_click',
                    contact_type: contactType,
                    timestamp: new Date().toISOString()
                };
                
                tg.sendData(JSON.stringify(contactData));
            }
        });
    });
}

/**
 * Setup video section interaction
 */
function setupVideoSection() {
    const videoSection = document.querySelector('.video-placeholder');
    
    if (videoSection) {
        videoSection.addEventListener('click', () => {
            // Send haptic feedback
            if (tg?.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
            
            console.log('Video section clicked');
            
            // Send data to bot
            if (tg) {
                const videoData = {
                    type: 'video_request',
                    timestamp: new Date().toISOString()
                };
                
                tg.sendData(JSON.stringify(videoData));
            }
        });
    }
}

/**
 * Setup service card interactions
 */
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Send haptic feedback
            if (tg?.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
            
            const serviceName = card.querySelector('h3')?.textContent || `Service ${index + 1}`;
            console.log(`Service card clicked: ${serviceName}`);
            
            // Send data to bot
            if (tg) {
                const serviceData = {
                    type: 'service_inquiry',
                    service_name: serviceName,
                    timestamp: new Date().toISOString()
                };
                
                tg.sendData(JSON.stringify(serviceData));
            }
        });
    });
}

/**
 * Handle errors gracefully
 */
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    
    // Show user-friendly error message
    if (tg) {
        tg.showAlert('خطایی رخ داده است. لطفاً دوباره تلاش کنید.');
    }
}

/**
 * Utility function to check if running in Telegram
 */
function isInTelegram() {
    return window.Telegram && window.Telegram.WebApp;
}

/**
 * Initialize app when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        initApp();
    } catch (error) {
        handleError(error, 'App Initialization');
    }
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('App became visible');
        // Refresh data if needed
    } else {
        console.log('App became hidden');
    }
});

/**
 * Export functions for testing (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        loadProducts,
        handleProductClick,
        isInTelegram
    };
}
