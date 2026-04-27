// JavaScript iteration cheatsheet.
// Run: node ./src/algotest/frequent/iterations.js

// ---------- ARRAYS ----------
const arr = ['a', 'b', 'c'];

// classic for — full control: index, break, continue, reverse
for (let idx = 0; idx < arr.length; idx++) console.log(idx, arr[idx]);

// for...of — values only, supports break/continue, works on any iterable
for (const item of arr) console.log(item);

// for...of + entries() — index AND value
for (const [idx, item] of arr.entries()) console.log(idx, item);

// for...in — enumerable string keys (incl. inherited). Avoid on arrays.
for (const idx in arr) console.log(idx, arr[idx]);

// forEach — no break, no await
arr.forEach((item, idx) => console.log(idx, item));

// transformations
arr.map((item, idx) => `${idx}:${item}`);
arr.filter((item) => item !== 'b');
arr.reduce((acc, item) => acc + item, '');

// queries
arr.some((item) => item === 'b');
arr.every((item) => typeof item === 'string');
arr.find((item) => item > 'a');
arr.findIndex((item) => item === 'c');
arr.findLast((item) => item <= 'c');
arr.includes('a');

// flatten
[1, [2, [3]]].flat(2); // [1,2,3]
[1, 2].flatMap((n) => [n, n * 10]); // [1,10,2,20]

// iterable -> array
[...arr];
Array.from(arr, (item, idx) => `${idx}:${item}`);


// ---------- STRINGS ----------
// for...of iterates Unicode code points (handles emoji).
// classic for / split('') iterate UTF-16 code units (splits surrogate pairs).
const str = 'café';

for (let idx = 0; idx < str.length; idx++) console.log(str[idx]); // code units
for (const ch of str) console.log(ch);                            // code points
[...str];                                                          // code points -> array
[...'a1 b22'.matchAll(/[a-z](\d+)/g)].map((m) => m[0]);            // ['a1','b22']


// ---------- OBJECTS ----------
const user = { name: 'Ann', age: 30, role: 'admin' };

// for...in walks the prototype chain — guard with hasOwn.
for (const key in user) {
    if (Object.hasOwn(user, key)) console.log(key, user[key]);
}

Object.keys(user);    // own enumerable string keys
Object.values(user);
Object.entries(user); // [['name','Ann'], ...]

for (const [key, value] of Object.entries(user)) console.log(key, value);

// transform an object
Object.fromEntries(Object.entries(user).map(([key, value]) => [key.toUpperCase(), value]));

// every own key, including non-enumerable and symbols
Reflect.ownKeys(user);


// ---------- MAP / SET ----------
const m = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of m) console.log(key, value);
m.forEach((value, key) => console.log(key, value));

const s = new Set([1, 2, 3]);
for (const item of s) console.log(item);


// ---------- GENERATORS / CUSTOM ITERABLES ----------
function* range(start, end, step = 1) {
    for (let n = start; n < end; n += step) yield n;
}
for (const n of range(0, 5)) console.log(n);

const myIterable = {
    *[Symbol.iterator]() { yield 'x'; yield 'y'; },
};
[...myIterable]; // ['x','y']


// ---------- ASYNC ----------
async function* asyncRange(n) {
    for (let idx = 0; idx < n; idx++) {
        await new Promise((r) => setTimeout(r, 0));
        yield idx;
    }
}

(async () => {
    // for await...of works with async iterables and arrays of promises
    for await (const item of asyncRange(3)) console.log(item);

    const promises = [Promise.resolve('p1'), Promise.resolve('p2')];

    // sequential — await respected inside for...of
    for (const p of promises) console.log(await p);

    // parallel — Promise.all + map
    await Promise.all(promises.map(async (p) => (await p) + '!'));

    // gotcha: forEach IGNORES async — does not await
    [1, 2, 3].forEach(async (n) => { /* not awaited */ });
})();


// ---------- WHEN TO USE WHAT ----------
// index + value, break/continue   -> for...of arr.entries()
// just values, any iterable       -> for...of
// transformation, chainable       -> map / filter / reduce
// object own keys                 -> Object.keys/entries + for...of
// inherited keys too              -> for...in + Object.hasOwn
// every own key incl. symbols     -> Reflect.ownKeys
// async sequential                -> for...of with await
// async parallel                  -> Promise.all(arr.map(async ...))
// avoid                           -> forEach with async, for...in on arrays,
//                                    split('') for unicode strings
