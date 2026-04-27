/**
 * LRU (Least Recently Used) Cache Implementation
 *
 * OVERALL COMPLEXITY:
 * - Space Complexity: O(capacity) where capacity is the maximum number of items
 * - Time Complexity: O(1) for both get and put operations
 *
 * DESIGN:
 * - Uses a HashMap for O(1) key lookups
 * - Uses a Doubly Linked List for O(1) insertion and deletion
 * - Most recently used items are at the head
 * - Least recently used items are at the tail
 */

class LRUNode {
    /**
     * Node for doubly linked list
     * @param {any} key - The cache key
     * @param {any} value - The cache value
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * Constructor - Creates a new LRU Cache
     * @param {number} capacity - Maximum number of items the cache can hold
     *
     * Time Complexity: O(1)
     * Space Complexity: O(capacity)
     */
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error('Capacity must be greater than 0');
        }

        this.capacity = capacity;
        this.cache = new Map(); // HashMap: key -> LRUNode

        // Dummy head and tail nodes for easier list manipulation
        this.head = new LRUNode(null, null);
        this.tail = new LRUNode(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Add a node right after the head (most recently used position)
     * @param {LRUNode} node - The node to add
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    _addNode(node) {
        // Insert node between head and head.next
        node.prev = this.head;
        node.next = this.head.next;

        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Remove a node from the doubly linked list
     * @param {LRUNode} node - The node to remove
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Move a node to the head (mark as most recently used)
     * @param {LRUNode} node - The node to move
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    _moveToHead(node) {
        this._removeNode(node);
        this._addNode(node);
    }

    /**
     * Remove the tail node (least recently used)
     * @returns {LRUNode} - The removed node
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    _popTail() {
        const lastNode = this.tail.prev;
        this._removeNode(lastNode);
        return lastNode;
    }

    /**
     * Get the value of the key if it exists, otherwise return -1
     * @param {any} key - The key to look up
     * @returns {any} - The value associated with the key, or -1 if not found
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    get(key) {
        const node = this.cache.get(key);

        // Key doesn't exist
        if (!node) {
            return -1;
        }

        // Move the accessed node to the head (most recently used)
        this._moveToHead(node);

        return node.value;
    }

    /**
     * Insert or update a key-value pair
     * @param {any} key - The key
     * @param {any} value - The value to store
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    put(key, value) {
        const node = this.cache.get(key);

        if (!node) {
            // Key doesn't exist - create new node
            const newNode = new LRUNode(key, value);

            // Check if cache is at capacity
            if (this.cache.size >= this.capacity) {
                // Remove the least recently used item (tail)
                const tail = this._popTail();
                this.cache.delete(tail.key);
            }

            // Add new node to head and cache
            this._addNode(newNode);
            this.cache.set(key, newNode);
        } else {
            // Key exists - update value and move to head
            node.value = value;
            this._moveToHead(node);
        }
    }

    /**
     * Remove a key-value pair from the cache
     * @param {any} key - The key to remove
     * @returns {boolean} - True if key was removed, false if it didn't exist
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    delete(key) {
        const node = this.cache.get(key);

        if (!node) {
            return false;
        }

        this._removeNode(node);
        this.cache.delete(key);
        return true;
    }

    /**
     * Clear all items from the cache
     *
     * Time Complexity: O(n) where n is the number of items
     * Space Complexity: O(1)
     */
    clear() {
        this.cache.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Get the current size of the cache
     * @returns {number} - Number of items in the cache
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size() {
        return this.cache.size;
    }

    /**
     * Check if the cache is at full capacity
     * @returns {boolean} - True if cache is full
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull() {
        return this.cache.size >= this.capacity;
    }

    /**
     * Check if the cache is empty
     * @returns {boolean} - True if cache is empty
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.cache.size === 0;
    }

    /**
     * Get all keys in order from most recently used to least recently used
     * @returns {Array} - Array of keys
     *
     * Time Complexity: O(n) where n is the number of items
     * Space Complexity: O(n)
     */
    getKeys() {
        const keys = [];
        let current = this.head.next;

        while (current !== this.tail) {
            keys.push(current.key);
            current = current.next;
        }

        return keys;
    }

    /**
     * Get all values in order from most recently used to least recently used
     * @returns {Array} - Array of values
     *
     * Time Complexity: O(n) where n is the number of items
     * Space Complexity: O(n)
     */
    getValues() {
        const values = [];
        let current = this.head.next;

        while (current !== this.tail) {
            values.push(current.value);
            current = current.next;
        }

        return values;
    }

    /**
     * Get all key-value pairs in order from most recently used to least recently used
     * @returns {Array} - Array of [key, value] pairs
     *
     * Time Complexity: O(n) where n is the number of items
     * Space Complexity: O(n)
     */
    getEntries() {
        const entries = [];
        let current = this.head.next;

        while (current !== this.tail) {
            entries.push([current.key, current.value]);
            current = current.next;
        }

        return entries;
    }

    /**
     * Print the cache state (for debugging)
     *
     * Time Complexity: O(n) where n is the number of items
     * Space Complexity: O(1)
     */
    print() {
        const entries = this.getEntries();
        console.log('LRU Cache (MRU -> LRU):', entries);
        console.log(`Size: ${this.size()}/${this.capacity}`);
    }
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

function testLRUCache() {
    console.log('=== LRU CACHE TESTS ===\n');

    // Test 1: Basic operations
    console.log('Test 1: Basic Operations');
    const cache1 = new LRUCache(2);

    cache1.put(1, 1);
    cache1.put(2, 2);
    console.log('After put(1,1), put(2,2):');
    cache1.print();

    console.log('get(1):', cache1.get(1)); // returns 1
    console.log('After get(1):');
    cache1.print();

    cache1.put(3, 3); // evicts key 2
    console.log('After put(3,3) - should evict key 2:');
    cache1.print();

    console.log('get(2):', cache1.get(2)); // returns -1 (not found)
    console.log('get(3):', cache1.get(3)); // returns 3

    cache1.put(4, 4); // evicts key 1
    console.log('After put(4,4) - should evict key 1:');
    cache1.print();

    console.log('get(1):', cache1.get(1)); // returns -1 (not found)
    console.log('get(3):', cache1.get(3)); // returns 3
    console.log('get(4):', cache1.get(4)); // returns 4

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Update existing key
    console.log('Test 2: Update Existing Key');
    const cache2 = new LRUCache(2);

    cache2.put(1, 1);
    cache2.put(2, 2);
    cache2.put(1, 10); // Update existing key
    console.log('After put(1,1), put(2,2), put(1,10):');
    cache2.print();
    console.log('get(1):', cache2.get(1)); // returns 10

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Delete operation
    console.log('Test 3: Delete Operation');
    const cache3 = new LRUCache(3);

    cache3.put(1, 1);
    cache3.put(2, 2);
    cache3.put(3, 3);
    console.log('After put(1,1), put(2,2), put(3,3):');
    cache3.print();

    cache3.delete(2);
    console.log('After delete(2):');
    cache3.print();
    console.log('get(2):', cache3.get(2)); // returns -1

    cache3.put(4, 4);
    console.log('After put(4,4):');
    cache3.print();

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Utility methods
    console.log('Test 4: Utility Methods');
    const cache4 = new LRUCache(3);

    cache4.put('a', 1);
    cache4.put('b', 2);
    cache4.put('c', 3);

    console.log('Keys (MRU -> LRU):', cache4.getKeys());
    console.log('Values (MRU -> LRU):', cache4.getValues());
    console.log('Entries (MRU -> LRU):', cache4.getEntries());
    console.log('Size:', cache4.size());
    console.log('Is Full:', cache4.isFull());
    console.log('Is Empty:', cache4.isEmpty());

    cache4.get('a'); // Access 'a' to make it MRU
    console.log('\nAfter get("a"):');
    console.log('Keys (MRU -> LRU):', cache4.getKeys());

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 5: Clear operation
    console.log('Test 5: Clear Operation');
    const cache5 = new LRUCache(3);

    cache5.put(1, 1);
    cache5.put(2, 2);
    console.log('Before clear:');
    cache5.print();

    cache5.clear();
    console.log('After clear:');
    cache5.print();
    console.log('Is Empty:', cache5.isEmpty());
}

// Run tests
testLRUCache();

export { LRUCache, LRUNode };
