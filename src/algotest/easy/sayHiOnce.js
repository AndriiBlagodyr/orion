// SayHi Only once called
function sayHi() {
  console.log('Say Hi is called');
  for (let index = 0; index < arguments.length; index++) {
    // eslint-disable-next-line prefer-rest-params
    console.log(arguments[index]);
  }
}

function once(fn) {
  let i = 0;
  function wrapper() {
    i++;
    if (i === 1) {
      // eslint-disable-next-line prefer-rest-params
      fn(...arguments);
    }
  }
  return wrapper;
}
const sayHiOnce = once(sayHi);

sayHiOnce('one', 'two', 'three'); // Function should be called only once
sayHiOnce(); // Shouldn't show anything

// Increment the value after each function call
// return the value calling the getValue()

let incrementor = function () {
  let value = 1;

  function wrapper() {
    value += 1;
    return wrapper;
  }
  wrapper.getValue = function () {
    return value;
  };
  return wrapper;
};

console.log(incrementor()()()().getValue());
