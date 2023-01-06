// arr=[5,7,1,1,2,3,22]; output 20
// Time O(nlog(n)) Space O(1)
const arr = [5, 7, 1, 1, 2, 3, 22];
const nonConstuctibleChange = coins => {
  coins.sort((a, b) => a - b);
  let currentChangeCreated = 0;
  for (const coin of coins) {
    if (coin > currentChangeCreated + 1) {
      return currentChangeCreated + 1;
    }
    currentChangeCreated += coin;
  }

  return currentChangeCreated + 1;
};

console.log(nonConstuctibleChange(arr));