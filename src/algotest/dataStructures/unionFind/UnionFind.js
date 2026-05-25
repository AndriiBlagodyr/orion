class UnionFind {
    constructor(n) {
        // Кожен елемент спочатку є батьком самого себе
        this.parent = Array.from({length: n}, (_, i) => i);
        // Масив для збереження розміру кожного розрізненого пакунку (замість рангу)
        this.size = new Array(n).fill(1);
        // Кількість ізольованих компонентів зв'язності
        this.count = n;
    }

    // Пошук представника (кореня) з автоматичним стисненням шляху
    find(x) {
        if (this.parent[x] === x) return x;
        return (this.parent[x] = this.find(this.parent[x]));
    }

    // Об'єднання двох множин за розміром (Union by Size)
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false; // Вже в одній множині

        // Менше дерево підвішуємо до більшого
        if (this.size[rootX] < this.size[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        }

        this.count--;
        return true;
    }

    // Повертає розмір множини, до якої належить елемент x за О(1)
    getSetSize(x) {
        return this.size[this.find(x)];
    }
}
