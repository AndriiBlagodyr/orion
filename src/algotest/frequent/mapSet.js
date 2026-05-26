// Map and Set cheatsheet for JavaScript interviews and algorithms.
// Run: node ./src/algotest/frequent/mapSet.js

// =============================================================================
// 1. MAP (Key-Value pairs where keys can be ANY type)
// =============================================================================

// ---------- CREATION & BASIC CRUD ----------
const map = new Map();

// Set (returns the map itself, allowing chaining)
map.set('name', 'Andrii');
map.set(42, 'The answer');
const objKey = { id: 1 };
map.set(objKey, 'Object as key');

// Get
console.log(map.get('name')); // 'Andrii'
console.log(map.get(42));     // 'The answer'
console.log(map.get(objKey)); // 'Object as key'
console.log(map.get({ id: 1 })); // undefined (different object reference!)

// Has & Size & Delete
console.log(map.has('name')); // true
console.log(map.size);        // 3
map.delete(42);               // removes the key 42
console.log(map.size);        // 2


// ---------- ITERATING MAPS ----------
const users = new Map([
    ['id1', 'Alice'],
    ['id2', 'Bob'],
    ['id3', 'Charlie']
]);

// a) Iterating entries (default)
for (const [key, value] of users) {
    console.log(`Key: ${key}, Value: ${value}`);
}

// b) Iterating keys only
for (const key of users.keys()) {
    console.log(`Key: ${key}`);
}

// c) Iterating values only
for (const value of users.values()) {
    console.log(`Value: ${value}`);
}

// d) Iterating with forEach (note the parameter order: value, key!)
users.forEach((value, key) => {
    console.log(`forEach - ${key}: ${value}`);
});


// ---------- TRANSFORMATIONS (Vice Versa) ----------

// 1. Map to Array
const arrayFromMap = Array.from(users); // [['id1', 'Alice'], ['id2', 'Bob'], ...]
const spreadMap = [...users];           // [['id1', 'Alice'], ['id2', 'Bob'], ...]
const keysArray = [...users.keys()];     // ['id1', 'id2', 'id3']
const valuesArray = [...users.values()]; // ['Alice', 'Bob', 'Charlie']

// 2. Array to Map
const newMap = new Map([['x', 1], ['y', 2]]);

// 3. Map to Object
const objFromMap = Object.fromEntries(users); // { id1: 'Alice', id2: 'Bob', id3: 'Charlie' }

// 4. Object to Map
const obj = { x: 100, y: 200 };
const mapFromObj = new Map(Object.entries(obj));


// =============================================================================
// 2. SET (Collection of UNIQUE values)
// =============================================================================

// ---------- CREATION & BASIC CRUD ----------
const set = new Set([1, 2, 2, 3, 3, 3]); // Automatically removes duplicates

console.log(set.size); // 3 (only contains 1, 2, 3)

// Add & Has & Delete
set.add(4);
set.add(1); // Ignored, already exists
console.log(set.has(3)); // true
set.delete(2);
console.log([...set]); // [1, 3, 4]


// ---------- TRANSFORMATIONS (Vice Versa) ----------

// 1. Set to Array
const arrFromSet1 = Array.from(set);
const arrFromSet2 = [...set];

// 2. Array to Set (Ultimate LeetCode Deduplication Trick)
const originalArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(originalArray)]; // [1, 2, 3, 4, 5]


// ---------- ITERATING SETS ----------
// a) for...of
for (const val of set) {
    console.log('Set Value:', val);
}

// b) forEach (value and key parameters are the same for Sets!)
set.forEach((value, valueAgain) => {
    console.log(`Set forEach: ${value} === ${valueAgain}`);
});


// =============================================================================
// 3. SET OPERATIONS (Union, Intersection, Difference)
// =============================================================================

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union (A ∪ B): All elements from both sets
const union = new Set([...setA, ...setB]); // Set {1, 2, 3, 4, 5, 6}

// Intersection (A ∩ B): Only elements present in both sets
const intersection = new Set([...setA].filter(x => setB.has(x))); // Set {3, 4}

// Difference (A \ B): Elements in A but not in B
const difference = new Set([...setA].filter(x => !setB.has(x))); // Set {1, 2}


// =============================================================================
// 4. PRACTICAL INTERVIEW ALGORITHMS
// =============================================================================

// a) Two Sum using a Set - O(n) Time, O(n) Space
function hasPairWithSum(arr, target) {
    const seen = new Set();
    for (const num of arr) {
        const complement = target - num;
        if (seen.has(complement)) return true;
        seen.add(num);
    }
    return false;
}

console.log('hasPairWithSum:', hasPairWithSum([1, 4, 45, 6, 10, 8], 16)); // true (6 + 10)


// b) Frequency Map using Map - O(n) Time, O(k) Space
function getFrequencyMap(str) {
    const freq = new Map();
    for (const char of str) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    return freq;
}

const fMap = getFrequencyMap("leetcode");
console.log('e frequency:', fMap.get('e')); // 3
