// JavaScript function constructor, prototype, and class inheritance examples.
// Run: node ./src/algotest/frequent/classFuncPrototyping.js

// ---------- FUNCTION CONSTRUCTOR + PROTOTYPE ----------
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    return `${this.name} makes a sound`;
};

Animal.prototype.sleep = function () {
    return `${this.name} sleeps`;
};

// Dog "extends" Animal.
function Dog(name, breed) {
    Animal.call(this, name); // call parent constructor with Dog's this
    this.breed = breed;
}

// Link Dog.prototype -> Animal.prototype.
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override parent method.
Dog.prototype.speak = function () {
    return `${this.name} barks`;
};

// Add child-only method.
Dog.prototype.fetch = function () {
    return `${this.name} fetches the ball`;
};

const rex = new Dog('Rex', 'Labrador');

console.log(rex.speak());                  // Rex barks
console.log(rex.sleep());                  // Rex sleeps
console.log(rex.fetch());                  // Rex fetches the ball
console.log(rex instanceof Dog);           // true
console.log(rex instanceof Animal);        // true


// ---------- CLASS + EXTENDS ----------
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }

    start() {
        return `${this.brand} starts`;
    }

    stop() {
        return `${this.brand} stops`;
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand); // call parent class constructor
        this.model = model;
    }

    // Override parent method.
    start() {
        return `${this.brand} ${this.model} starts with a key`;
    }

    // Add child-only method.
    drive() {
        return `${this.brand} ${this.model} drives`;
    }
}

const tesla = new Car('Tesla', 'Model 3');

console.log(tesla.start());                // Tesla Model 3 starts with a key
console.log(tesla.stop());                 // Tesla stops
console.log(tesla.drive());                // Tesla Model 3 drives
console.log(tesla instanceof Car);         // true
console.log(tesla instanceof Vehicle);     // true


// ---------- EXTEND AN EXISTING CLASS ----------
class ElectricCar extends Car {
    constructor(brand, model, batteryPercent) {
        super(brand, model);
        this.batteryPercent = batteryPercent;
    }

    charge() {
        this.batteryPercent = 100;
        return `${this.brand} ${this.model} is fully charged`;
    }
}

const leaf = new ElectricCar('Nissan', 'Leaf', 40);

console.log(leaf.start());                 // Nissan Leaf starts with a key
console.log(leaf.charge());                // Nissan Leaf is fully charged
console.log(leaf.batteryPercent);          // 100


// ---------- EXTEND ARRAY WITH PERSONAL FUNCTION ----------
// Usually avoid changing built-in prototypes in production code,
// but it is useful to understand how prototypes work.
Array.prototype.myLast = function () {
    return this[this.length - 1];
};

Array.prototype.myUnique = function () {
    return [...new Set(this)];
};

const numbers = [1, 2, 2, 3];

console.log(numbers.myLast());             // 3
console.log(numbers.myUnique());           // [1, 2, 3]


// ---------- QUICK RULES ----------
// Function constructor inheritance:
// 1. Parent.call(this, ...args) copies parent instance properties.
// 2. Child.prototype = Object.create(Parent.prototype) links prototype methods.
// 3. Child.prototype.constructor = Child restores the constructor reference.
//
// Class inheritance:
// 1. class Child extends Parent links prototypes automatically.
// 2. super(...args) calls the parent constructor.
// 3. Define a method with the same name to override a parent method.
// Built-in prototype extension:
// 1. Array.prototype.myMethod = function () {} adds a method to all arrays.
// 2. Use function syntax when you need this to be the current array.
