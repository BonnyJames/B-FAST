/**
 * Boolokam - Main JavaScript
 */

// Layout initialization
document.addEventListener('DOMContentLoaded', function() {
    // TradingView Widget configuration
    initTradingViewWidget();
    
    // Initialize sticky header and sidebar
    initStickyLayout();
    
    // Handle window resize events
    window.addEventListener('resize', initStickyLayout);
    
    // Mobile menu toggle functionality
    initMobileMenuToggle();
    
    // Add active class to current navigation item
    highlightCurrentPage();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Find and show corresponding content
                const tabId = button.getAttribute('data-tab');
                const tabContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (tabButtons[0] && tabContents[0]) {
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }
    
    // Grid/List view toggle
    const gridBtn = document.querySelector('.grid-view-btn');
    const listBtn = document.querySelector('.list-view-btn');
    const articlesGrid = document.querySelector('.articles-grid');
    
    if (gridBtn && listBtn && articlesGrid) {
        gridBtn.addEventListener('click', () => {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            articlesGrid.classList.remove('list-layout');
        });
        
        listBtn.addEventListener('click', () => {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            articlesGrid.classList.add('list-layout');
        });
    }

    // Handle sidebar navigation clicks
    initSidebarNavigation();
    
    // Handle content type navigation in header
    initHeaderNavigation();
});

/**
 * Initialize sidebar section navigation
 */
function initSidebarNavigation() {
    const sectionButtons = document.querySelectorAll('.sidebar-navigation .nav-btn');
    
    sectionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't prevent default - we want to navigate to the page
            // But also update local storage to remember the current section
            const section = this.getAttribute('href').replace(/\//g, '');
            localStorage.setItem('currentSection', section || 'news');
        });
    });
}

/**
 * Initialize header navigation
 */
function initHeaderNavigation() {
    const contentTypeLinks = document.querySelectorAll('.content-type-nav a');
    
    contentTypeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - we want to navigate to the page
            // But also update local storage to remember the current section
            const href = this.getAttribute('href');
            const section = href === '/' ? 'news' : href.replace(/\//g, '');
            localStorage.setItem('currentSection', section);
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenuToggle() {
    // Add mobile menu toggle button to header if it doesn't exist
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (header && !mobileMenuToggle) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Mobile Menu');
        toggleBtn.innerHTML = `<span></span><span></span><span></span>`;
        
        header.querySelector('.header-content').appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
            this.classList.toggle('active');
            
            // Create a mobile sidebar if it doesn't exist
            let mobileSidebar = document.querySelector('.mobile-sidebar');
            const originalSidebar = document.querySelector('.sidebar');
            
            if (!mobileSidebar && originalSidebar) {
                mobileSidebar = document.createElement('div');
                mobileSidebar.className = 'mobile-sidebar';
                mobileSidebar.innerHTML = originalSidebar.innerHTML;
                document.body.appendChild(mobileSidebar);
                
                // Add close button to mobile sidebar
                const closeBtn = document.createElement('button');
                closeBtn.className = 'mobile-sidebar-close';
                closeBtn.innerHTML = '×';
                mobileSidebar.prepend(closeBtn);
                
                closeBtn.addEventListener('click', function() {
                    document.body.classList.remove('mobile-menu-open');
                    toggleBtn.classList.remove('active');
                });

                // Add event listeners to the mobile sidebar nav buttons
                const mobileNavButtons = mobileSidebar.querySelectorAll('.sidebar-navigation .nav-btn');
                mobileNavButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Close the mobile menu when navigating
                        document.body.classList.remove('mobile-menu-open');
                        toggleBtn.classList.remove('active');
                        
                        // Set the current section in localStorage
                        const section = this.getAttribute('href').replace(/\//g, '');
                        localStorage.setItem('currentSection', section || 'news');
                    });
                });
            }
        });
    }
}

/**
 * Initialize TradingView widget
 */
function initTradingViewWidget() {
    // The TradingView widget is now configured directly in the baseof.html file
    // This function is kept for backward compatibility but doesn't need to do anything
    
    // Previously this was causing an error by trying to inject a script element with JSON
    console.log("TradingView widget is configured via HTML");
}

/**
 * Initialize sticky header and sidebar layout
 */
function initStickyLayout() {
    // Get TradingView widget, header and sidebar elements
    const tradingViewWidget = document.querySelector('.tradingview-widget-container');
    const header = document.querySelector('.site-header');
    const sidebar = document.querySelector('.sidebar');
    
    // Calculate heights
    const tradingViewHeight = tradingViewWidget ? tradingViewWidget.offsetHeight : 0;
    
    // Calculate header height and apply to body padding
    if (header) {
        const headerHeight = header.offsetHeight;
        const totalHeight = tradingViewHeight + headerHeight;
        
        // Body padding already includes TradingView height via CSS
        // We don't need to adjust it dynamically
        
        // Adjust sidebar if it exists
        if (sidebar) {
            sidebar.style.top = totalHeight + 'px';
            sidebar.style.height = `calc(100vh - ${totalHeight}px)`;
        }
    }
}

// Function to highlight the current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove trailing slashes for comparison
        const cleanCurrentPath = currentPath.replace(/\/$/, '');
        const cleanLinkPath = linkPath.replace(/\/$/, '');
        
        // Check if the current path starts with the link path (for sub-pages)
        if (cleanCurrentPath === cleanLinkPath || 
            (cleanLinkPath !== '/' && cleanCurrentPath.startsWith(cleanLinkPath))) {
            link.classList.add('active');
            link.style.color = 'var(--accent-color)';
        }
    });
}

// Function to set up smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy loading images (a simple implementation)
window.addEventListener('load', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        let imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers without intersection observer
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                let scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
}); 