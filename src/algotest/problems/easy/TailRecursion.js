function fib(n) {
  return fibImpl(0, 1, n);
}
// recursive case
function fibImpl(a, b, n) {
  if (n === 0) {
    return a;
  }
  console.log('data', a, b, n);
  return fibImpl(b, a + b, n - 1);
}

console.log(fib(10));

// Get factorial number;
function factorial(n) {
  function fact(n, acc) {
    if (n < 2) {
      return acc;
    } else {
      return fact(n - 1, n * acc);
    }
  }

  return fact(n, 1);
}

console.log('factorial', factorial(5));
