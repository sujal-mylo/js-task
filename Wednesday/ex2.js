
// 1. once(fn)


const once = (fn) => {
  let called = false;
  let result;

  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
};



// 2. memoize(fn)


const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key =
      JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(
        key,
        fn(...args)
      );
    }
    return cache.get(key);
  };
};



// 3. debounce(fn, wait)


const debounce = (fn, wait) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};



// 4. throttle(fn, limit)


const throttle = (fn, limit) => {

  let waiting = false;

  return (...args) => {

    if (!waiting) {

      fn(...args);

      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);

    }

  };

};



// 5. pipe(...fns)


const pipe = (...fns) => {

  return (value) =>

    fns.reduce(
      (acc, fn) => fn(acc),
      value
    );

};



// 6. curry(fn)


const curry = (fn) => {

  return function curried(...args) {

    // enough arguments supplied

    if (args.length >= fn.length) {
      return fn(...args);
    }

    // otherwise return function

    return (...nextArgs) =>
      curried(...args, ...nextArgs);

  };

};



// TESTS




// once


console.log("----- once -----");

const init = once(() =>
  console.log("running once")
);

init();
init();
init();



// memoize


console.log("\n----- memoize -----");

const slowSquare = (n) => {
  console.log("computing", n);
  return n * n;
};

const fastSquare =
  memoize(slowSquare);

console.log(fastSquare(5));
console.log(fastSquare(5));



// pipe

console.log("\n----- pipe -----");

const addOne = (x) => x + 1;

const double = (x) => x * 2;

const addOneThenDouble =
  pipe(addOne, double);

console.log(
  addOneThenDouble(3)
);


console.log("\n----- curry -----");

const add = curry(
  (a, b, c) => a + b + c
);

console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));