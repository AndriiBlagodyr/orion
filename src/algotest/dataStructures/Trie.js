class TrieNode {
    constructor() {
        this.children = {};
        this.word = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let curr = this.root;
        for (let c of word) {
            if (!(c in curr.children)) {
                curr.children[c] = new TrieNode();
            }
            curr = curr.children[c];
        }
        curr.word = true;
    }

    search(word) {
        let curr = this.root;
        for (let c of word) {
            if (!(c in curr.children)) {
                return false;
            }
            curr = curr.children[c];
        }
        return curr.word;
    }

    startsWith(prefix) {
        let curr = this.root;
        for (let c of prefix) {
            if (!(c in curr.children)) {
                return false;
            }
            curr = curr.children[c];
        }
        return true;
    }
}

// Example usage:
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));     // true

/*
TIME & SPACE COMPLEXITY:
- insert(word): O(m) time, O(m) space (m = word length)
- search(word): O(m) time, O(1) space
- startsWith(prefix): O(p) time, O(1) space (p = prefix length)

COMMON USE CASES:
1. Autocomplete/Auto-suggestion systems
2. Spell checkers and word validation
3. IP routing (longest prefix matching)
4. Word games (Scrabble, Boggle)
5. Phone number routing
6. Data compression algorithms
7. String matching and pattern searching

TRIE STRUCTURE EXAMPLE:
After inserting ["cat", "car", "card", "care", "careful"]:

        root
         |
         c
         |
         a
        / \
       t   r
       |   |
      [T]  d
           |
          [T]
           |
           e
           |
          [T]
           |
           f
           |
           u
           |
           l
           |
          [T]

Legend: [T] = word end marker (word = true)
- "cat" path: root -> c -> a -> t [T]
- "car" path: root -> c -> a -> r [T]  
- "card" path: root -> c -> a -> r -> d [T]
- "care" path: root -> c -> a -> r -> e [T]
- "careful" path: root -> c -> a -> r -> e -> f -> u -> l [T]

The Trie efficiently stores common prefixes and allows:
- Fast prefix searching
- Memory efficient storage of similar words
- Easy autocomplete suggestions
*/

module.exports = { TrieNode, Trie };
