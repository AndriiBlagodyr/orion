class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false; // Зрозуміліша назва для булевого прапорця
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Вставка слова в дерево
     * @param {string} word
     */
    insert(word) {
        let curr = this.root;
        for (const char of word) {
            // Якщо вузла для символу немає — створюємо його
            if (!curr.children[char]) {
                curr.children[char] = new TrieNode();
            }
            curr = curr.children[char];
        }
        curr.isWord = true;
    }

    /**
     * Допоміжний приватний метод для пошуку вузла за префіксом
     * @param {string} prefix
     * @returns {TrieNode|null}
     */
    _findNode(prefix) {
        let curr = this.root;
        for (const char of prefix) {
            if (!curr.children[char]) return null;
            curr = curr.children[char];
        }
        return curr;
    }

    /**
     * Пошук точного збігу слова
     * @param {string} word
     * @returns {boolean}
     */
    search(word) {
        const node = this._findNode(word);
        return node !== null && node.isWord;
    }

    /**
     * Перевірка, чи починається якесь слово з цього префіксу
     * @param {string} prefix
     * @returns {boolean}
     */
    startsWith(prefix) {
        return this._findNode(prefix) !== null;
    }
}
