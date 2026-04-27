// O(nd) time | O(n) space
    // 6, [1,2,4] ==> 2        (2+4)
function minNumberOfCoinsForChange(n, denoms) {
    const numOfCoins = new Array(n + 1).fill(Infinity);
    numOfCoins[0] = 0;
    for (const denom of denoms) {
        for (let amount = 0; amount < numOfCoins.length; amount++) {
            if (amount >= denom) {
                numOfCoins[amount] = Math.min(numOfCoins[amount], 1 + numOfCoins[amount - denom]);
            }
        }
    }
    return numOfCoins[n] !== Infinity ? numOfCoins[n] : -1;
}

console.log(minNumberOfCoinsForChange(6, [1,2,4]))