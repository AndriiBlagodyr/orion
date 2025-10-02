/**
 * HashTable Implementation with Separate Chaining for Collision Resolution
 *
 * OVERALL COMPLEXITY:
 * - Space Complexity: O(n) where n is the number of key-value pairs stored
 * - Average Time Complexity: O(1) for get, set, delete operations
 * - Worst Case Time Complexity: O(n) for get, set, delete operations (when all keys hash to same index)
 */
class HashTable {
    /**
     * Constructor - Creates a new HashTable
     * @param {number} size - Initial size of the hash table (default: 53, should be prime)
     *
     * Time Complexity: O(1)
     * Space Complexity: O(size)
     */
    constructor(size = 53) {
        this.keyMap = new Array(size);
        this.capacity = size;
        this.count = 0; // Track number of elements for potential resizing
    }

    /**
     * Hash function using polynomial rolling hash
     * @param {string} key - The key to hash
     * @returns {number} - Hash index
     *
     * Time Complexity: O(k) where k is the length of the key (capped at 100)
     * Space Complexity: O(1)
     */
    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31; // Prime number helps distribute keys more evenly
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96; // Convert to 1-26 for lowercase letters
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return Math.abs(total); // Ensure non-negative index
    }

    /**
     * Set a key-value pair in the hash table
     * @param {string} key - The key
     * @param {any} value - The value to store
     *
     * Time Complexity:
     * - Average: O(1)
     * - Worst Case: O(n) when collision chain is long
     * Space Complexity: O(1)
     */
    set(key, value) {
        let index = this._hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        // Check if key already exists and update it
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                this.keyMap[index][i][1] = value;
                return;
            }
        }

        // Key doesn't exist, add new key-value pair
        this.keyMap[index].push([key, value]);
        this.count++;
    }

    /**
     * Get a value by key
     * @param {string} key - The key to search for
     * @returns {any} - The value associated with the key, or undefined if not found
     *
     * Time Complexity:
     * - Average: O(1)
     * - Worst Case: O(n) when collision chain is long
     * Space Complexity: O(1)
     */
    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        return undefined;
    }

    /**
     * Delete a key-value pair from the hash table
     * @param {string} key - The key to delete
     * @returns {boolean} - True if key was found and deleted, false otherwise
     *
     * Time Complexity:
     * - Average: O(1)
     * - Worst Case: O(n) when collision chain is long
     * Space Complexity: O(1)
     */
    delete(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1);
                    this.count--;
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Check if a key exists in the hash table
     * @param {string} key - The key to check
     * @returns {boolean} - True if key exists, false otherwise
     *
     * Time Complexity:
     * - Average: O(1)
     * - Worst Case: O(n) when collision chain is long
     * Space Complexity: O(1)
     */
    has(key) {
        return this.get(key) !== undefined;
    }

    /**
     * Get all keys in the hash table
     * @returns {Array} - Array of all keys
     *
     * Time Complexity: O(n) where n is the number of key-value pairs
     * Space Complexity: O(n) for the returned array
     */
    keys() {
        let keysArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    keysArr.push(this.keyMap[i][j][0]);
                }
            }
        }
        return keysArr;
    }

    /**
     * Get all values in the hash table (may include duplicates)
     * @returns {Array} - Array of all values
     *
     * Time Complexity: O(n) where n is the number of key-value pairs
     * Space Complexity: O(n) for the returned array
     */
    values() {
        let valuesArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    valuesArr.push(this.keyMap[i][j][1]);
                }
            }
        }
        return valuesArr;
    }

    /**
     * Get all unique values in the hash table
     * @returns {Array} - Array of unique values
     *
     * Time Complexity: O(n) where n is the number of key-value pairs
     * Space Complexity: O(n) for the returned array
     */
    uniqueValues() {
        let valuesArr = [];
        let seen = new Set();
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    let value = this.keyMap[i][j][1];
                    if (!seen.has(value)) {
                        seen.add(value);
                        valuesArr.push(value);
                    }
                }
            }
        }
        return valuesArr;
    }

    /**
     * Get the number of key-value pairs in the hash table
     * @returns {number} - Number of elements
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size() {
        return this.count;
    }

    /**
     * Check if the hash table is empty
     * @returns {boolean} - True if empty, false otherwise
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.count === 0;
    }

    /**
     * Clear all key-value pairs from the hash table
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear() {
        this.keyMap = new Array(this.capacity);
        this.count = 0;
    }
}

// Test the HashTable implementation
let ht = new HashTable(17);

console.log('=== HashTable Test ===');

// Test set operations
ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');
ht.set('plum', '#DDA0DD');
ht.set('purple', '#DDA0DD');
ht.set('violet', '#DDA0DD');

console.log('Size:', ht.size());
console.log('Is empty:', ht.isEmpty());

// Test get operations
console.log('\nGet operations:');
console.log('maroon:', ht.get('maroon'));
console.log('nonexistent:', ht.get('nonexistent'));

// Test has operation
console.log('\nHas operations:');
console.log('Has maroon:', ht.has('maroon'));
console.log('Has nonexistent:', ht.has('nonexistent'));

// Test update existing key
ht.set('maroon', '#800001'); // Update existing key
console.log('Updated maroon:', ht.get('maroon'));

// Test keys and values
console.log('\nAll keys:', ht.keys());
console.log('All values:', ht.values());
console.log('Unique values:', ht.uniqueValues());

// Test delete operation
console.log('\nDelete operations:');
console.log('Delete maroon:', ht.delete('maroon'));
console.log('Delete nonexistent:', ht.delete('nonexistent'));
console.log('Size after delete:', ht.size());
console.log('Has maroon after delete:', ht.has('maroon'));

// Test clear operation
console.log('\nClear operation:');
ht.clear();
console.log('Size after clear:', ht.size());
console.log('Is empty after clear:', ht.isEmpty());
