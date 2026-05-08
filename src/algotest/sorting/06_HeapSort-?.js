// Heap Sort
// 1. Turn the array into a max heap (parent >= children).
// 2. Swap the root (max) with the last item, shrink the heap, fix the root.
// 3. Repeat until the heap is empty.
//
// Time: O(n log n) on every input.
// Space: O(1) extra (here O(n) because we copy the input).
// Stable: no.
//
// Heap layout in an array: for index i,
//   parent = (i - 1) / 2
//   left   = 2 * i + 1
//   right  = 2 * i + 2

// У повному бінарному дереві, де кожний батько має двох дітей:Діти вузла $i$ знаходяться за індексами $2i + 1$ та $2i + 2$.Якщо ви спробуєте обчислити дітей для вузла з індексом Math.floor(n / 2), ви отримаєте значення, що дорівнюють або перевищують $n$ (тобто вихід за межі масиву).

// Отже, індекс Math.floor(n / 2) - 1 — це найправий і найнижчий батько в ієрархії дерева.

function heapSort(nums) {
    const arr = [...nums];
    const n = arr.length;

    // Build a max heap. Start from the last non-leaf and sift down.
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        siftDown(arr, i, n);
    }

    // Take the max from the root and put it at the end of the unsorted part.
    for (let end = n - 1; end > 0; end--) {
        [arr[0], arr[end]] = [arr[end], arr[0]];
        siftDown(arr, 0, end);
    }

    return arr;
}

// Push the element at `root` down until the max-heap property holds.
function siftDown(arr, root, heapSize) {
    while (true) {
        const left = 2 * root + 1;
        const right = 2 * root + 2;
        let largest = root;

        if (left < heapSize && arr[left] > arr[largest]) largest = left;
        if (right < heapSize && arr[right] > arr[largest]) largest = right;

        if (largest === root) return;

        [arr[root], arr[largest]] = [arr[largest], arr[root]];
        root = largest;
    }
}

console.log(heapSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(heapSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(heapSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
