class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
        this.size = 0; // Замість count, стандартне ім'я для колекцій в JS
    }

    // Універсальна хеш-функція для будь-яких UTF-8 символів
    _hash(key) {
        let total = 0;
        const PRIME = 31;
        // Обмежуємо довжину ключа до 50 символів для гарантії O(1)
        const len = Math.min(key.length, 50);

        for (let i = 0; i < len; i++) {
            total = (total * PRIME + key.charCodeAt(i)) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this.keyMap[index]) this.keyMap[index] = [];

        // Шукаємо, чи такий ключ вже є в бакеті
        const pair = this.keyMap[index].find(p => p[0] === key);

        if (pair) {
            pair[1] = value; // Оновлюємо значення
        } else {
            this.keyMap[index].push([key, value]); // Додаємо нову пару
            this.size++;
        }
    }

    get(key) {
        const index = this._hash(key);
        const bucket = this.keyMap[index];
        if (!bucket) return undefined;

        const pair = bucket.find(p => p[0] === key);
        return pair ? pair[1] : undefined;
    }

    delete(key) {
        const index = this._hash(key);
        const bucket = this.keyMap[index];
        if (!bucket) return false;

        const pIndex = bucket.findIndex(p => p[0] === key);
        if (pIndex === -1) return false;

        bucket.splice(pIndex, 1);
        this.size--;
        return true;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    clear() {
        this.keyMap = new Array(this.keyMap.length);
        this.size = 0;
    }

    // Повертає плоский масив усіх ключів
    keys() {
        return this.keyMap.filter(Boolean).flatMap(bucket => bucket.map(p => p[0]));
    }

    // Повертає плоский масив усіх значень
    values() {
        return this.keyMap.filter(Boolean).flatMap(bucket => bucket.map(p => p[1]));
    }
}
