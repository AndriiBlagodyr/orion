/**
 * Binary Search Algorithms
 *
 * Binary search is a fundamental algorithm for finding elements in sorted arrays.
 * It's one of the most commonly asked algorithms in tech interviews.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 *
 * Common Interview Questions:
 * - Find target in sorted array
 * - Find first/last occurrence of target
 * - Find insertion position
 * - Search in rotated sorted array
 * - Find peak element
 */

// Basic Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Not found
}

// Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Find First Occurrence
function findFirstOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Find Last Occurrence
function findLastOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Find Insertion Position
function findInsertionPosition(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}

// Search in Rotated Sorted Array
function searchRotatedArray(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        }

        // Check which half is sorted
        if (arr[left] <= arr[mid]) {
            // Left half is sorted
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

// Find Peak Element
function findPeakElement(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

// Find Minimum in Rotated Sorted Array
function findMinInRotatedArray(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] > arr[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return arr[left];
}

// Binary Search with Custom Comparator
function binarySearchWithComparator(arr, target, comparator) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = comparator(arr[mid], target);

        if (comparison === 0) {
            return mid;
        } else if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

// Count Occurrences
function countOccurrences(arr, target) {
    const first = findFirstOccurrence(arr, target);
    if (first === -1) return 0;

    const last = findLastOccurrence(arr, target);
    return last - first + 1;
}

// Test Functions
function runBinarySearchTests() {
    console.log('🔍 Binary Search Tests\n');

    const testArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const rotatedArray = [4, 5, 6, 7, 0, 1, 2];
    const peakArray = [1, 3, 20, 4, 1, 0];
    const duplicateArray = [1, 2, 2, 2, 3, 4, 5];

    // Test 1: Basic Binary Search
    console.log('Test 1: Basic Binary Search');
    console.log('Array:', testArray);
    console.log('Search 7:', binarySearch(testArray, 7)); // 3
    console.log('Search 6:', binarySearch(testArray, 6)); // -1
    console.log('Search 1:', binarySearch(testArray, 1)); // 0
    console.log('Search 19:', binarySearch(testArray, 19)); // 9
    console.log();

    // Test 2: Recursive Binary Search
    console.log('Test 2: Recursive Binary Search');
    console.log('Search 9:', binarySearchRecursive(testArray, 9)); // 4
    console.log('Search 20:', binarySearchRecursive(testArray, 20)); // -1
    console.log();

    // Test 3: First Occurrence
    console.log('Test 3: First Occurrence');
    console.log('Array:', duplicateArray);
    console.log('First occurrence of 2:', findFirstOccurrence(duplicateArray, 2)); // 1
    console.log('First occurrence of 5:', findFirstOccurrence(duplicateArray, 5)); // 6
    console.log();

    // Test 4: Last Occurrence
    console.log('Test 4: Last Occurrence');
    console.log('Last occurrence of 2:', findLastOccurrence(duplicateArray, 2)); // 3
    console.log('Last occurrence of 1:', findLastOccurrence(duplicateArray, 1)); // 0
    console.log();

    // Test 5: Insertion Position
    console.log('Test 5: Insertion Position');
    console.log('Array:', testArray);
    console.log('Insert 6 at position:', findInsertionPosition(testArray, 6)); // 3
    console.log('Insert 0 at position:', findInsertionPosition(testArray, 0)); // 0
    console.log('Insert 20 at position:', findInsertionPosition(testArray, 20)); // 10
    console.log();

    // Test 6: Search in Rotated Array
    console.log('Test 6: Search in Rotated Array');
    console.log('Rotated array:', rotatedArray);
    console.log('Search 0:', searchRotatedArray(rotatedArray, 0)); // 4
    console.log('Search 3:', searchRotatedArray(rotatedArray, 3)); // -1
    console.log('Search 7:', searchRotatedArray(rotatedArray, 7)); // 3
    console.log();

    // Test 7: Find Peak Element
    console.log('Test 7: Find Peak Element');
    console.log('Array:', peakArray);
    console.log('Peak element index:', findPeakElement(peakArray)); // 2
    console.log();

    // Test 8: Find Minimum in Rotated Array
    console.log('Test 8: Find Minimum in Rotated Array');
    console.log('Minimum element:', findMinInRotatedArray(rotatedArray)); // 0
    console.log();

    // Test 9: Count Occurrences
    console.log('Test 9: Count Occurrences');
    console.log('Array:', duplicateArray);
    console.log('Count of 2:', countOccurrences(duplicateArray, 2)); // 3
    console.log('Count of 1:', countOccurrences(duplicateArray, 1)); // 1
    console.log('Count of 6:', countOccurrences(duplicateArray, 6)); // 0
    console.log();

    // Test 10: Custom Comparator
    console.log('Test 10: Custom Comparator');
    const objects = [
        { id: 1, name: 'Alice' },
        { id: 3, name: 'Bob' },
        { id: 5, name: 'Charlie' },
        { id: 7, name: 'David' }
    ];
    const target = { id: 5 };
    const comparator = (a, b) => a.id - b.id;
    console.log('Search object with id 5:', binarySearchWithComparator(objects, target, comparator)); // 2
    console.log();
}

// Export functions
module.exports = {
    binarySearch,
    binarySearchRecursive,
    findFirstOccurrence,
    findLastOccurrence,
    findInsertionPosition,
    searchRotatedArray,
    findPeakElement,
    findMinInRotatedArray,
    binarySearchWithComparator,
    countOccurrences,
    runBinarySearchTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runBinarySearchTests();
}
