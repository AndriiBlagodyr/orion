// =============================================================
// Variant 1: explicit terminator — call with no args to finish
//   func(1)(2)(3)()      -> 6
//   func(1)(2)(3)(4)()   -> 10
// =============================================================
function func(x) {
    let sum = x;

    function inner(y) {
        if (arguments.length === 0) {
            return sum;
        }
        sum += y;
        return inner;
    }

    return inner;
}

const r1 = func(1)(2)(3)();
const r2 = func(1)(2)(3)(4)();

console.log(`r1 = ${r1}`); // r1 = 6
console.log(`r2 = ${r2}`); // r2 = 10

// =============================================================
// Variant 2: no terminator — primitive coercion via valueOf
//   add(1)(2)(3)         -> 6   (when coerced to a primitive)
//   add(1)(2)(3)(4)      -> 10
//
// The returned function is still a function, but it carries a
// `valueOf` so JS converts it to a number on coercion (template
// literals, +, ==, console.log via `${}`, etc.).
// =============================================================
// valueOf  -> called for "number" hint:  +f, f - 0, f * 1, f == 6, Number(f)
// toString -> called for "string" hint:  `${f}`, f + "", String(f), alert(f)
// "default" hint (e.g. f + 1, console.log(f)) tries valueOf first, then toString.
// We define both so the function works in any coercion context.
function add(x) {
    function inner(y) {
        return add(x + y);
    }
    inner.valueOf = () => x;
    inner.toString = () => String(x);
    return inner;
}

const a1 = add(1)(2)(3);
const a2 = add(1)(2)(3)(4);

console.log(`a1 = ${a1}`); // a1 = 6
console.log(`a2 = ${a2}`); // a2 = 10
console.log(`a1 + a2 = ${+a1 + +a2}`); // a1 + a2 = 16

//second variant
function add2(x) {
    let sum = x;

    function inner(y) {
        // Викликаємо add2, щоб підтримувати ланцюжок
        return add2(sum + y);
    }

    inner.sum = sum; // Додаємо явний доступ до значення
    inner.valueOf = () => sum;
    inner.toString = () => String(sum);

    return inner;
}
