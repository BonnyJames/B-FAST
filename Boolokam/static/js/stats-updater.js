/**
 * Boolokam Stats Updater
 * This script provides a mechanism to update post stats in markdown files
 * 
 * It requires a server-side component to update the actual files
 */

class BoolokamStatsUpdater {
    constructor() {
        this.statsQueue = {};
        this.updateInterval = 30000; // 30 seconds
        this.processingQueue = false;
        this.maxQueueSize = 50;
        this.apiEndpoint = '/api/update-stats';
        
        // Map of statType to frontmatter field
        this.statTypeToField = {
            'view': 'view_count',
            'like': 'like_count',
            'comment': 'comment_count',
            'share': 'share_count'
        };
        
        // Start the queue processing timer
        this.timer = setInterval(() => this.processQueue(), this.updateInterval);
        
        // Process queue when page is about to unload
        window.addEventListener('beforeunload', () => {
            clearInterval(this.timer);
            if (Object.keys(this.statsQueue).length > 0) {
                this.processQueue(true);
            }
        });
    }
    
    /**
     * Queue a stat update for processing
     * @param {string} postId - Post ID or permalink
     * @param {string} statType - Type of stat (view, like, comment, share)
     * @param {number} value - New value for the stat
     */
    queueUpdate(postId, statType, value) {
        if (!postId || !statType || value === undefined) return;
        
        // Normalize postId to remove trailing slash if present
        postId = postId.replace(/\/$/, '');
        
        // Convert statType to frontmatter field name
        const fieldName = this.statTypeToField[statType] || statType;
        
        // Initialize queue entry if not exists
        if (!this.statsQueue[postId]) {
            this.statsQueue[postId] = {};
        }
        
        // Update the stat in the queue
        this.statsQueue[postId][fieldName] = value;
        
        // If queue is getting large, process it immediately
        if (Object.keys(this.statsQueue).length >= this.maxQueueSize) {
            this.processQueue();
        }
    }
    
    /**
     * Process the queue of stat updates
     * @param {boolean} sync - Whether to process synchronously (for page unload)
     */
    processQueue(sync = false) {
        // Skip if queue is empty or already processing
        if (Object.keys(this.statsQueue).length === 0 || this.processingQueue) return;
        
        this.processingQueue = true;
        
        // Get a copy of the current queue and clear it
        const queueToProcess = { ...this.statsQueue };
        this.statsQueue = {};
        
        // Prepare the fetch request
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stats: queueToProcess,
                timestamp: new Date().toISOString()
            })
        };
        
        // Use navigator.sendBeacon for beforeunload events
        if (sync && navigator.sendBeacon) {
            const blob = new Blob([fetchOptions.body], { type: 'application/json' });
            navigator.sendBeacon(this.apiEndpoint, blob);
            this.processingQueue = false;
            return;
        }
        
        // Regular fetch for normal operation
        fetch(this.apiEndpoint, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    // If server error, put stats back in queue
                    Object.keys(queueToProcess).forEach(postId => {
                        if (!this.statsQueue[postId]) {
                            this.statsQueue[postId] = {};
                        }
                        Object.keys(queueToProcess[postId]).forEach(statType => {
                            this.statsQueue[postId][statType] = queueToProcess[postId][statType];
                        });
                    });
                    throw new Error('Server response was not OK');
                }
                return response.json();
            })
            .then(data => {
                if (data.updated) {
                    console.log(`Stats updated for ${data.updated} posts`);
                }
            })
            .catch(error => {
                console.error('Error updating stats:', error);
            })
            .finally(() => {
                this.processingQueue = false;
            });
    }
    
    /**
     * Get the current queue (for debugging)
     * @returns {Object} The current stats queue
     */
    getQueue() {
        return { ...this.statsQueue };
    }
    
    /**
     * Immediately process the queue (can be called manually)
     */
    flush() {
        this.processQueue();
    }
}

// Initialize the stats updater
const statsUpdater = new BoolokamStatsUpdater();

// Make it globally available
window.boolokamStatsUpdater = statsUpdater; 