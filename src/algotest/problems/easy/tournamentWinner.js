// Check if one array is a subsequence of another
// O(n) time n - main array length | O(1) space - where n is the length of the array

const array = [
    ['HTML', 'C#'],
    ['C#', 'Python'],
    ['Python', 'HTML'],
];
const results = [0, 0, 1];

const getWinner = (arr, result) => {
    let leader = result[0] ? arr[0][0] : arr[0][1];
    const score = {};
    array.forEach((pair, index) => {
        const winner = result[index] ? pair[0] : pair[1];
        const looser = pair[result[index]];
        score[winner] = score[winner] ? score[winner] + 3 : 3;
        score[looser] = score[looser] || 0;
        if (score[winner] > score[leader]) {
            leader = winner;
        }
    });
    return leader;
};

console.log(getWinner(array, results));
