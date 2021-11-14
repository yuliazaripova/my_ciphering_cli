const { cipher, operation } = require('./constants')

const cipherMessage = (phrase, _cipher, flag, shift ) => {
    return phrase.split(" ").map(word => cipherWord(word, _cipher, flag, shift)).join(" ");}

const cipherWord = (word, _cipher, flag, shift)  => word.replace(/[a-zA-Z]/g, letter => cipherLetter(letter, _cipher, flag, shift ));

const cipherLetter = (letter, _cipher, flag, shift ) => {
    let {firstCode, lastCode} = getFirstCode(letter)
    if (_cipher === cipher.atbash) {
        return String.fromCharCode(lastCode - (letter.charCodeAt(0)-firstCode))
    } else {
        return flag === operation.encode ? 
        String.fromCharCode((letter.charCodeAt(0) - firstCode + shift) % 26 + firstCode) : 
        String.fromCharCode((letter.charCodeAt(0) - firstCode - shift + 26) % 26 + firstCode) 

    }
};

const getFirstCode = (letter) => {
    const ascii = letter.charCodeAt(0) 
    if (( ascii>= 65 && ascii <= 90)) {
       return { firstCode: 65, lastCode: 90 }
    } else if (ascii >= 97 && ascii <= 122) {
       return {firstCode: 97, lastCode: 122}
    }
}

module.exports = {
    cipherMessage
} 