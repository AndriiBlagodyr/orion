// O(nd) time | O(n) space (n - number of amounts, d - number of denominations)
// 10$ [1,5,10,25] - answer is 4 ways to get 10$. (10*1, 5*2, 1*10, 5*1+1*5)
function numberOfWaysToMakeChange(n, denoms) {
    const ways = new Array(n + 1).fill(0);
    ways[0] = 1;
    for (let denom of denoms) {
        for (let amount = 1; amount < n + 1; amount++) {
            if (denom <= amount) {
                ways[amount] += ways[amount - denom];
            }
        }
    }
    return ways[n];
}
