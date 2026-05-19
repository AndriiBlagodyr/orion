var isSubsequence = function (s, t) {
    // Крок 1: Будуємо мапу індексів для рядка t
    const tMap = new Map();

    for (let i = 0; i < t.length; i++) {
        const char = t[i];
        if (!tMap.has(char)) {
            tMap.set(char, []);
        }
        tMap.get(char).push(i); // Індекси гарантовано відсортовані за зростанням
    }

    // Крок 2: Перевіряємо рядок s за допомогою бінарного пошуку
    let currentTIndex = -1; // Наша позиція в рядку t

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // Якщо символу з `s` взагалі немає в `t`
        if (!tMap.has(char)) {
            return false;
        }

        const indices = tMap.get(char);

        // Бінарний пошук: шукаємо найменший індекс, який строго більший за currentTIndex
        let low = 0;
        let high = indices.length - 1;
        let matchIndex = -1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            if (indices[mid] > currentTIndex) {
                matchIndex = indices[mid]; // Знайшли кандидата
                high = mid - 1; // Намагаємося знайти ще ближчий (менший) індекс лівіше
            } else {
                low = mid + 1; // Цей індекс замалий (він лівіше нашої позиції в t)
            }
        }

        // Якщо не знайшли жодного підходящого індексу попереду
        if (matchIndex === -1) {
            return false;
        }

        // Пересуваємо нашу позицію в рядку t на знайдений індекс
        currentTIndex = matchIndex;
    }

    return true;
};



var strStr = function (haystack, needle) {
    if (needle === '') return 0;

    const lps = buildLPS(needle);
    let i = 0; // haystack
    let j = 0; // needle

    while (i < haystack.length) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
            if (j === needle.length) return i - j;
        } else if (j > 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }

    return -1;
};

function buildLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else if (len > 0) {
            len = lps[len - 1];
        } else {
            lps[i] = 0;
            i++;
        }
    }

    return lps;
}
