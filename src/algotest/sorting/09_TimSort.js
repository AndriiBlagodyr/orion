// Tim Sort
// Hybrid stable sort used by Python and Java: merge sort + insertion sort.
//
// 1. Split the array into "runs" (already sorted or reverse-sorted chunks).
// 2. Reverse descending runs; extend short runs to minRun with insertion sort.
// 3. Merge runs using a stack and collapse rules (like merge sort, but adaptive).
//
// Time:
// - Best: O(n) when the input is already sorted (one natural run).
// - Average / worst: O(n log n).
// Space: O(n) for merge buffers.
// Stable: yes.
//
// MIN_MERGE = 32 is the standard chunk size from Tim Peters' original algorithm.

const MIN_MERGE = 32;

function timSort(nums) {
    const arr = [...nums];
    const n = arr.length;
    if (n < 2) return arr;

    const minRun = minRunLength(n);
    const runBase = [];
    const runLen = [];

    let i = 0;
    while (i < n) {
        const runStart = i;
        i = extendRun(arr, i, n);

        let runEnd = i;
        if (runEnd - runStart < minRun) {
            runEnd = Math.min(runStart + minRun, n);
            insertionSortRange(arr, runStart, runEnd);
        }

        pushRun(runBase, runLen, runStart, runEnd - runStart);
        mergeCollapse(arr, runBase, runLen);
        i = runEnd;
    }

    mergeForceCollapse(arr, runBase, runLen);
    return arr;
}

// Smallest run length so that n/minRun is close to a power of 2.
function minRunLength(n) {
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= n & 1;
        n >>= 1;
    }
    return n + r;
}

// Find the end of the next natural run; reverse descending runs in place.
function extendRun(arr, start, n) {
    if (start + 1 === n) return start + 1;

    let end = start + 2;
    if (arr[end - 1] < arr[end - 2]) {
        while (end < n && arr[end] < arr[end - 1]) end++;
        reverseRange(arr, start, end);
    } else {
        while (end < n && arr[end] >= arr[end - 1]) end++;
    }

    return end;
}

function insertionSortRange(arr, lo, hi) {
    for (let i = lo + 1; i < hi; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= lo && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function reverseRange(arr, lo, hi) {
    hi--;
    while (lo < hi) {
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
        lo++;
        hi--;
    }
}

function pushRun(runBase, runLen, base, len) {
    runBase.push(base);
    runLen.push(len);
}

function mergeCollapse(arr, runBase, runLen) {
    while (runLen.length > 1) {
        let n = runLen.length - 2;
        if (n > 0 && runLen[n - 1] <= runLen[n] + runLen[n + 1]) {
            if (runLen[n - 1] < runLen[n + 1]) n--;
            mergeAt(arr, runBase, runLen, n);
        } else if (runLen[n] <= runLen[n + 1]) {
            mergeAt(arr, runBase, runLen, n);
        } else {
            break;
        }
    }
}

function mergeForceCollapse(arr, runBase, runLen) {
    while (runLen.length > 1) {
        let n = runLen.length - 2;
        if (n > 0 && runLen[n - 1] < runLen[n + 1]) n--;
        mergeAt(arr, runBase, runLen, n);
    }
}

function mergeAt(arr, runBase, runLen, i) {
    const start = runBase[i];
    const mid = runBase[i + 1];
    const end = mid + runLen[i + 1];

    mergeRanges(arr, start, mid, end);

    runLen[i] = runLen[i] + runLen[i + 1];
    runBase.splice(i + 1, 1);
    runLen.splice(i + 1, 1);
}

function mergeRanges(arr, lo, mid, hi) {
    const left = arr.slice(lo, mid);
    let i = 0;
    let j = mid;
    let k = lo;

    while (i < left.length && j < hi) {
        if (left[i] <= arr[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = arr[j++];
        }
    }

    while (i < left.length) arr[k++] = left[i++];
}

console.log(timSort([5, 3, 8, 4, 2]));        // [2, 3, 4, 5, 8]
console.log(timSort([1, 2, 3, 4]));           // [1, 2, 3, 4] — already sorted
console.log(timSort([3, -1, 0, -1, 2]));      // [-1, -1, 0, 2, 3]
console.log(timSort([4, 3, 2, 1]));           // [1, 2, 3, 4] — reverse run
console.log(timSort([1, 1, 1, 1]));           // [1, 1, 1, 1]
