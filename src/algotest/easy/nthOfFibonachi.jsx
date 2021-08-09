// O(2^n) time | O(n) space
const getFibNth1 = n => {
  if (n === 2) {
    return 1;
  } else if (n === 1) {
    return 0;
  } else {
    return getFibNth1(n - 1) + getFibNth1(n - 2);
  }
};

// O(n) time | O(n) space
const getFibNth2 = (n, memoize = {1: 0, 2: 1}) => {
  if (n in memoize) {
    return memoize[n];
  } else {
    memoize[n] = getFibNth2(n - 1, memoize) + getFibNth2(n - 2, memoize);
    return memoize[n];
  }
};

// O(n) time | O(1) space
const getFibNth3 = n => {
  if (n === 1) {
    return 0;
  } else if (n === 2) {
    return 1;
  }
  let k = n - 2;
  const base = [0, 1];
  while (k > 0) {
    const tempValue = base[0] + base[1];
    base[0] = base[1];
    base[1] = tempValue;
    k -= 1;
  }
  return base[1];
};
