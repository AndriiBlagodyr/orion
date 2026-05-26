class LRUNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        if (capacity <= 0) throw new Error('Capacity must be greater than 0');

        this.capacity = capacity;
        this.cache = new Map();

        // Сентинелі (фіктивні вузли) для уникнення перевірок на null
        this.head = new LRUNode(null, null);
        this.tail = new LRUNode(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // Вставка вузла на самий початок (відразу після head)
    _addNode(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    // Видалення зв'язків вузла зі списку
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Актуалізація позиції вузла (переміщення в початок)
    _moveToHead(node) {
        this._removeNode(node);
        this._addNode(node);
    }

    /**
     * @param {any} key
     * @returns {any}
     */
    get(key) {
        const node = this.cache.get(key);
        if (!node) return -1;

        this._moveToHead(node);
        return node.value;
    }

    /**
     * @param {any} key
     * @param {any} value
     */
    put(key, value) {
        const node = this.cache.get(key);

        if (node) {
            // Ключ існує: оновлюємо значення та переміщуємо в початок
            node.value = value;
            this._moveToHead(node);
        } else {
            // Новий ключ: створюємо новий вузол
            const newNode = new LRUNode(key, value);
            this.cache.set(key, newNode);
            this._addNode(newNode);

            // Якщо перевищено ліміт — видаляємо найстаріший елемент з кінця (перед tail)
            if (this.cache.size > this.capacity) {
                const lruNode = this.tail.prev;
                this._removeNode(lruNode);
                this.cache.delete(lruNode.key);
            }
        }
    }
}
