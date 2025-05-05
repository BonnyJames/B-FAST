/**
 * Boolokam - Main JavaScript
 * Version: 1.3.0
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
    
    // Initialize image placeholders
    initImagePlaceholders();
    
    // Initialize post stats handling
    initPostStats();
});

/**
 * Initialize image placeholders for broken images
 */
function initImagePlaceholders() {
    const placeholderPath = "/images/placeholder.jpg";
    
    // Process all images on the page
    document.querySelectorAll('img').forEach(function(img) {
        // Skip images that are already handled
        if (img.hasAttribute('data-handled')) return;
        
        // Mark as handled to avoid processing twice
        img.setAttribute('data-handled', 'true');
        
        // Add loading="lazy" for better performance
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Store original source
        if (img.src && !img.getAttribute('data-original-src')) {
            img.setAttribute('data-original-src', img.src);
        }
        
        // Handle image loading errors
        img.onerror = function() {
            if (this.classList.contains('img-fallback')) return;
            
            // Replace with placeholder
            this.src = placeholderPath;
            this.classList.add('img-fallback');
            
            // Add class to parent element
            if (this.parentElement) {
                this.parentElement.classList.add('broken-image');
            }
            
            // Prevent further error triggers
            this.onerror = null;
        };
    });
    
    // Check existing images that may have already failed to load
    setTimeout(function() {
        document.querySelectorAll('img').forEach(function(img) {
            if (!img.complete || !img.naturalWidth || img.naturalWidth === 0) {
                if (!img.classList.contains('img-fallback')) {
                    img.src = placeholderPath;
                    img.classList.add('img-fallback');
                    
                    if (img.parentElement) {
                        img.parentElement.classList.add('broken-image');
                    }
                }
            }
        });
    }, 500);
}

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
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const desktopSidebar = document.querySelector('.sidebar');
    
    // Skip if elements don't exist
    if (!mobileMenuToggle || !mobileSidebar || !desktopSidebar) return;
    
    // Initialize mobile sidebar content (only if empty)
    if (mobileSidebar.children.length === 0) {
        // Clone the desktop sidebar content
        const sidebarClone = desktopSidebar.cloneNode(true);
        sidebarClone.removeAttribute('id'); // Remove ID to avoid duplicates
        
        // Extract only the content
        mobileSidebar.innerHTML = sidebarClone.innerHTML;
        
        // Add mobile-specific close button if it doesn't exist
        if (!mobileSidebar.querySelector('.mobile-sidebar-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-sidebar-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close menu');
            mobileSidebar.prepend(closeBtn);
            
            closeBtn.addEventListener('click', function() {
                body.classList.remove('mobile-menu-open');
                mobileMenuToggle.classList.remove('active');
            });
        }
    }
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        body.classList.toggle('mobile-menu-open');
        this.classList.toggle('active');
    });
    
    // Close mobile sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (body.classList.contains('mobile-menu-open') && 
            !event.target.closest('.mobile-sidebar') && 
            !event.target.closest('.mobile-menu-toggle')) {
            body.classList.remove('mobile-menu-open');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

/**
 * Initialize TradingView widget
 */
function initTradingViewWidget() {
    // The TradingView widget is now configured directly in the baseof.html file
    // This function is kept for backward compatibility but doesn't need to do anything
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
    const mainContent = document.getElementById('main-content');
    
    // Get saved sidebar state
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    
    // Calculate heights
    const tradingViewHeight = tradingViewWidget ? tradingViewWidget.offsetHeight : 0;
    
    // Set CSS variables for consistent layout across components
    if (tradingViewHeight > 0) {
        document.documentElement.style.setProperty('--tradingview-height', tradingViewHeight + 'px');
    }
    
    // Calculate header height and apply to CSS variables
    if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
        
        const totalHeight = tradingViewHeight + headerHeight;
        
        // Apply dynamic top position to sidebar based on header height
        if (sidebar) {
            sidebar.style.top = totalHeight + 'px';
            sidebar.style.height = `calc(100vh - ${totalHeight}px)`;
            
            // Apply initial collapsed state if needed
            if (sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                if (mainContent) {
                    mainContent.classList.add('sidebar-collapsed');
                }
            }
        }
    }
    
    // Update main content top margin for mobile
    if (window.innerWidth <= 768 && mainContent) {
        const headerHeight = header ? header.offsetHeight : 0;
        mainContent.querySelector('main').style.marginTop = headerHeight + 'px';
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

/**
 * Format a number for display with K/M/B suffixes
 * @param {number} num - The number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    
    // Convert to number if it's a string
    num = typeof num === 'string' ? parseInt(num, 10) : num;
    
    if (isNaN(num)) return '0';
    
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        const k = num / 1000;
        return num % 1000 === 0 ? Math.floor(k) + 'K' : k.toFixed(1) + 'K';
    } else if (num < 1000000000) {
        const m = num / 1000000;
        return num % 1000000 === 0 ? Math.floor(m) + 'M' : m.toFixed(1) + 'M';
    } else {
        const b = num / 1000000000;
        return num % 1000000000 === 0 ? Math.floor(b) + 'B' : b.toFixed(1) + 'B';
    }
}

/**
 * Initialize post stats
 */
function initPostStats() {
    // Check if we're on a post page by looking for data-post-id
    const postContainer = document.querySelector('[data-post-id]');
    if (!postContainer) return;
    
    const postId = postContainer.getAttribute('data-post-id');
    
    // Set up event listeners for like, comment and share buttons
    const likeButton = document.querySelector('.post-stats [data-type="like"]');
    const commentButton = document.querySelector('.post-stats [data-type="comment"]');
    const shareButton = document.querySelector('.post-stats [data-type="share"]');
    
    // Check if user has already liked this post
    const storedLikes = getStoredStats('like_count');
    if (likeButton && storedLikes[postId]) {
        likeButton.classList.add('active');
    }
    
    // Add click handlers
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            handleLikeClick(this, postId);
        });
    }
    
    if (commentButton) {
        commentButton.addEventListener('click', function() {
            handleCommentClick(this, postId);
        });
    }
    
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            handleShareClick(this, postId);
        });
    }
    
    // Increment view count for this page
    incrementViewCount();
}

/**
 * Handle like button click
 * @param {HTMLElement} element - The clicked element
 * @param {string} postId - The post ID
 */
function handleLikeClick(element, postId) {
    // Get stored likes from localStorage
    const storedLikes = getStoredStats('like_count');
    
    // Toggle like state
    const wasLiked = storedLikes[postId];
    const counter = element.querySelector('[data-count]');
    
    if (!counter) return;
    
    // Get current like count
    const currentLikes = parseInt(counter.getAttribute('data-count'), 10) || 0;
    
    if (wasLiked) {
        // User already liked, remove the like
        delete storedLikes[postId];
        const newLikes = Math.max(0, currentLikes - 1);
        
        counter.setAttribute('data-count', newLikes);
        counter.textContent = formatNumber(newLikes);
        element.classList.remove('active');
    } else {
        // User hasn't liked yet, add the like
        storedLikes[postId] = true;
        const newLikes = currentLikes + 1;
        
        counter.setAttribute('data-count', newLikes);
        counter.textContent = formatNumber(newLikes);
        element.classList.add('active');
    }
    
    // Store the updated likes
    setStoredStats('like_count', storedLikes);
    
    // Send the like to server
    sendStatToServer(postId, 'like', wasLiked ? currentLikes - 1 : currentLikes + 1);
}

/**
 * Handle comment button click
 * @param {HTMLElement} element - The clicked element
 * @param {string} postId - The post ID
 */
function handleCommentClick(element, postId) {
    // For comments, we typically navigate to the comments section
    // or open a comment form modal
    
    const commentSection = document.querySelector('#comments');
    if (commentSection) {
        // Scroll to comments section if it exists
        commentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Otherwise, could open a comment modal
        // For now, increment comment count temporarily to demonstrate functionality
        const counter = element.querySelector('[data-count]');
        if (counter) {
            const currentComments = parseInt(counter.getAttribute('data-count'), 10) || 0;
            const newComments = currentComments + 1;
            
            counter.setAttribute('data-count', newComments);
            counter.textContent = formatNumber(newComments);
            
            // Send the comment count to server
            sendStatToServer(postId, 'comment', newComments);
        }
    }
}

/**
 * Handle share button click
 * @param {HTMLElement} element - The clicked element
 * @param {string} postId - The post ID
 */
function handleShareClick(element, postId) {
    const url = window.location.href;
    const title = document.title;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            incrementShareCount(element, postId);
        }).catch(err => {
            console.error('Share failed:', err);
            // Still increment the count even if sharing failed
            // since the user tried to share
            incrementShareCount(element, postId);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        // Create a temporary input to copy the URL
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = url;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Show a tooltip or message
        alert('URL copied to clipboard!');
        
        // Increment share count
        incrementShareCount(element, postId);
    }
}

/**
 * Increment share count
 * @param {HTMLElement} element - The share button element
 * @param {string} postId - The post ID
 */
function incrementShareCount(element, postId) {
    const counter = element.querySelector('[data-count]');
    if (!counter) return;
    
    // Get stored shares from localStorage
    const storedShares = getStoredStats('share_count');
    
    // Get current share count
    const currentShares = parseInt(counter.getAttribute('data-count'), 10) || 0;
    const newShares = currentShares + 1;
    
    // Update share count
    counter.setAttribute('data-count', newShares);
    counter.textContent = formatNumber(newShares);
    
    // Store that user has shared this post
    if (!storedShares[postId]) {
        storedShares[postId] = 0;
    }
    storedShares[postId]++;
    
    // Store the updated shares
    setStoredStats('share_count', storedShares);
    
    // Send the share to server
    sendStatToServer(postId, 'share', newShares);
}

/**
 * Get stored stats from localStorage
 * @param {string} statType - The type of stat (view_count, like_count, etc.)
 * @returns {Object} - Stored stats object
 */
function getStoredStats(statType) {
    const stored = localStorage.getItem(`boolokam_${statType}`);
    return stored ? JSON.parse(stored) : {};
}

/**
 * Set stored stats in localStorage
 * @param {string} statType - The type of stat (views, likes, etc.)
 * @param {Object} data - The stats data to store
 */
function setStoredStats(statType, data) {
    localStorage.setItem(`boolokam_${statType}`, JSON.stringify(data));
}

/**
 * Send statistics to server (placeholder function)
 * @param {string} postId - The post ID
 * @param {string} statType - The type of statistic ('view', 'like', 'comment', 'share')
 * @param {number} value - The current value
 */
function sendStatToServer(postId, statType, value) {
    // Send the stat to the stat updater if available
    if (window.boolokamStatsUpdater) {
        window.boolokamStatsUpdater.queueUpdate(postId, statType, value);
    } else {
        console.log(`Stats updater not available: Post ${postId}, ${statType} = ${value}`);
    }
} 