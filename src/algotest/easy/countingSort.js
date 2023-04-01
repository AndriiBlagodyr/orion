function countingSort(arr) {
    return arr
        .reduce((acc, v) => ((acc[v] = (acc[v] || 0) + 1), acc), []) // [1, undefined, 2, undefined, 1, 2, undefined, 1, undefined, 1]
        .reduce((acc, n, i) => {
            console.log(n, i);
            return acc.concat(Array(n).fill(i)); // [ 0, 2, 2, 4, 5, 5, 7, 9]
        }, []);
}

console.log(countingSort([5, 7, 9, 2, 4, 2, 5, 0]));
