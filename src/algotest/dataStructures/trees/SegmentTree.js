// =============================================================================
// УНІВЕРСАЛЬНЕ ДЕРЕВО ВІДРІЗКІВ З LAZY PROPAGATION
// =============================================================================
class SegmentTree {
    /**
     * @param {Array} arr - Початковий масив даних
     * @param {function} combineFn - Функція об'єднання двох вузлів (напр. (a, b) => a + b)
     * @param {*} defaultValue - Нейтральний елемент операції (0 для суми, Infinity для min, тощо)
     */
    constructor(arr, combineFn, defaultValue) {
        this.n = arr.length;
        this.combine = combineFn;
        this.defaultValue = defaultValue;

        // Обчислюємо розмір дерева (найближчий степінь 2)
        this.treeSize = 1;
        while (this.treeSize < this.n) {
            this.treeSize *= 2;
        }

        // Масив дерева та масив для відкладених оновлень (Lazy values)
        this.tree = new Array(2 * this.treeSize).fill(this.defaultValue);
        this.lazy = new Array(2 * this.treeSize).fill(null); // null означає відсутність оновлень

        if (this.n > 0) this._build(arr);
    }

    _build(arr) {
        // Заповнюємо листи
        for (let i = 0; i < this.n; i++) {
            this.tree[this.treeSize + i] = arr[i];
        }
        // Будуємо внутрішні вузли знизу-вгору
        for (let i = this.treeSize - 1; i > 0; i--) {
            this.tree[i] = this.combine(this.tree[2 * i], this.tree[2 * i + 1]);
        }
    }

    // Проштовхування (відкладеного) значення до дітей вузла
    _push(nodeIndex, nodeLeft, nodeRight) {
        if (this.lazy[nodeIndex] === null) return;

        const lazyValue = this.lazy[nodeIndex];
        const mid = Math.floor((nodeLeft + nodeRight) / 2);

        // Передаємо оновлення лівому сину
        this._applyLazy(2 * nodeIndex, nodeLeft, mid, lazyValue);
        // Передаємо оновлення правому сину
        this._applyLazy(2 * nodeIndex + 1, mid + 1, nodeRight, lazyValue);

        // Скидаємо прапорець оновлення на поточному вузлі
        this.lazy[nodeIndex] = null;
    }

    // Допоміжний метод для застосування lazy-значення до конкретного вузла
    _applyLazy(nodeIndex, nodeLeft, nodeRight, val) {
        if (nodeIndex >= this.tree.length) return;

        // УВАГА: Тут логіка оновлення залежить від операції.
        // Для спрощення ми робимо повну ЗАМІНУ (assignment) на відрізку.
        // Якщо це сума, то нове значення вузла = val * (кількість елементів піддерева)
        // Якщо це min/max, то нове значення вузла = val

        // Припускаємо найпопулярніший сценарій: Overwrite (Заміна значень)
        this.tree[nodeIndex] = val; // Для Min/Max. Для Sum тут має бути: val * (nodeRight - nodeLeft + 1)
        this.lazy[nodeIndex] = val;
    }

    // Точкове оновлення (Update одного елемента)
    update(index, value) {
        if (index < 0 || index >= this.n) throw new Error('Index out of bounds');
        this.rangeUpdate(index, index, value);
    }

    // Інтервальний запит (Range Query)
    query(left, right) {
        if (left < 0 || right >= this.n || left > right) throw new Error('Invalid range');
        return this._queryHelper(left, right, 0, this.treeSize - 1, 1);
    }

    _queryHelper(queryLeft, queryRight, nodeLeft, nodeRight, nodeIndex) {
        // Повне перекриття
        if (queryLeft <= nodeLeft && nodeRight <= queryRight) {
            return this.tree[nodeIndex];
        }
        // Немає перекриття
        if (queryRight < nodeLeft || queryLeft > nodeRight) {
            return this.defaultValue;
        }

        // Часткове перекриття: проштовхуємо оновлення вниз перед зануренням вглиб
        this._push(nodeIndex, nodeLeft, nodeRight);

        const mid = Math.floor((nodeLeft + nodeRight) / 2);
        const leftResult = this._queryHelper(queryLeft, queryRight, nodeLeft, mid, 2 * nodeIndex);
        const rightResult = this._queryHelper(queryLeft, queryRight, mid + 1, nodeRight, 2 * nodeIndex + 1);

        return this.combine(leftResult, rightResult);
    }

    // Інтервальне оновлення (Чесний Lazy Range Update)
    rangeUpdate(left, right, value) {
        if (left < 0 || right >= this.n || left > right) throw new Error('Invalid range');
        this._rangeUpdateHelper(left, right, value, 0, this.treeSize - 1, 1);
    }

    _rangeUpdateHelper(queryLeft, queryRight, value, nodeLeft, nodeRight, nodeIndex) {
        // Повне перекриття
        if (queryLeft <= nodeLeft && nodeRight <= queryRight) {
            this._applyLazy(nodeIndex, nodeLeft, nodeRight, value);
            return;
        }
        // Немає перекриття
        if (queryRight < nodeLeft || queryLeft > nodeRight) {
            return;
        }

        // Часткове перекриття: проштовхуємо старі зміни вниз перед тим, як записати нові
        this._push(nodeIndex, nodeLeft, nodeRight);

        const mid = Math.floor((nodeLeft + nodeRight) / 2);
        this._rangeUpdateHelper(queryLeft, queryRight, value, nodeLeft, mid, 2 * nodeIndex);
        this._rangeUpdateHelper(queryLeft, queryRight, value, mid + 1, nodeRight, 2 * nodeIndex + 1);

        // Оновлюємо поточний вузол на основі порахованих дітей
        this.tree[nodeIndex] = this.combine(this.tree[2 * nodeIndex], this.tree[2 * nodeIndex + 1]);
    }

    getArray() {
        const result = [];
        for (let i = 0; i < this.n; i++) {
            result.push(this.tree[this.treeSize + i]);
        }
        return result;
    }
}

// =============================================================================
// СПЕЦІАЛІЗОВАНІ КЛАСИ (ЧИСТІ ТА ЛАКОНІЧНІ)
// =============================================================================

class MinSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, (a, b) => Math.min(a, b), Infinity);
    }
}

class MaxSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, (a, b) => Math.max(a, b), -Infinity);
    }
}

class XorSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, (a, b) => a ^ b, 0);
    }
}
