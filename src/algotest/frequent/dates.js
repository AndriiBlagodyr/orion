// JavaScript Date — only the bits useful for algorithm problems.
// Run: node ./src/algotest/frequent/dates.js
//
// A Date is internally a single number: milliseconds since 1970-01-01 UTC.
// All "date math" becomes math on that number.


// ---------- TIMESTAMPS / BENCHMARKING ----------
Date.now();                          // ms since epoch (low resolution, fine for most cases)

const t0 = performance.now();        // sub-millisecond, monotonic — best for benchmarking
for (let i = 0; i < 1000; i++) Math.sqrt(i);
const t1 = performance.now();
console.log(`took ${(t1 - t0).toFixed(3)} ms`);


// ---------- BUILD A DATE FROM (Y, M, D) ----------
// Month is 0-indexed: 0 = January, 11 = December.
new Date(2026, 0, 1);                // January 1, 2026
new Date(2026, 11, 31);              // December 31, 2026


// ---------- DAY OF WEEK ----------
// getDay() returns 0..6 where 0 = Sunday, 6 = Saturday.
// Used in problems like "Day of the Week", "Number of Weekend Days".
new Date(2026, 4, 3).getDay();       // Sunday -> 0


// ---------- DAYS IN A MONTH (the trick) ----------
// Day 0 of month (m + 1) is the LAST day of month m.
function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
}

console.log(daysInMonth(2026, 1));   // 28 — Feb 2026
console.log(daysInMonth(2024, 1));   // 29 — Feb 2024 is a leap year


// ---------- LEAP YEAR ----------
// Gregorian rule: divisible by 4, except centuries unless divisible by 400.
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2100)); // false
console.log(isLeapYear(2000)); // true


// ---------- DAYS BETWEEN TWO DATES ----------
// Subtracting Dates gives a difference in milliseconds.
function daysBetween(from, to) {
    const ms = new Date(to) - new Date(from);
    return Math.round(ms / (1000 * 60 * 60 * 24));
}

console.log(daysBetween('2026-01-01', '2026-05-03')); // 122


// ---------- ADD / SUBTRACT DAYS ----------
// setDate handles overflow (day 32 -> next month, day 0 -> previous month).
function addDays(date, days) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
}

console.log(addDays(new Date(2026, 4, 3), 10).toDateString());  // May 13 2026
console.log(addDays(new Date(2026, 4, 3), -7).toDateString());  // Apr 26 2026


// ---------- COMPARE / SORT ----------
const a = new Date(2026, 4, 3);
const b = new Date(2026, 5, 1);

a < b;                            // true (Date is coerced to number)
a.getTime() === b.getTime();      // strict equality (a === b compares object refs!)

const list = [new Date(2026, 11, 1), new Date(2026, 0, 15), new Date(2026, 5, 1)];
list.sort((x, y) => x - y);
console.log(list.map((d) => d.toDateString()));


// ---------- GOTCHAS ----------
// 1. Month is 0-indexed in the constructor and getMonth, but 1-indexed in ISO strings.
// 2. getDay()  -> day of WEEK (0..6).
//    getDate() -> day of MONTH (1..31).
// 3. Date is mutable: setDate / setMonth modify in place. Always copy first.
// 4. Use Date.now() / performance.now() for timing, never new Date() in a tight loop.


// ---------- TOP THINGS TO REMEMBER ----------
// Date.now() / performance.now()           -> timing
// new Date(y, m, d)                        -> month is 0-indexed
// d.getDay()                               -> day of week (0=Sun..6=Sat)
// new Date(y, m + 1, 0).getDate()          -> days in month m
// (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0  -> leap year
// d2 - d1                                  -> ms between dates
// setDate(getDate() + n)                   -> add n days
