var runLineencoding = function (str) {
    let count = 1,
        output = [];
    for (let i = 1; i < str.length; i++) {
        let current = str[i];
        let prev = str[i - 1];
        if (current !== prev || count === 9) {
            output.push(`${count}`);
            output.push(prev);
            count = 0;
        }
        ++count;
    }
    output.push(`${count}`);
    output.push(str[str.length - 1]);
    return output.join('');
};

var runLength = function (str) {
    if (str.length === 1) return `1${str}`;
    let current = str[0],
        count = 1,
        output = [];
    for (let i = 1; i < str.length; i++) {
        if (current === str[i]) {
            ++count;
            if (count === 9) {
                output.push(`9${current}`);
                count = 0;
            }
        } else {
            if (count !== 0) output.push(`${count}${current}`);
            current = str[i];
            count = 1;
        }
    }
    if (count > 0) output.push(`${count}${current}`);
    return output.join('');
};

console.log(runLength('SDFAAAAAAAAAAAAABBBBBBBBBBCCCCCCCCCDDDDEE'));
console.log(runLineencoding('SDFAAAAAAAAAAAAABBBBBBBBBBCCCCCCCCCDDDDEE'));
