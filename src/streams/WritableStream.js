const { Writable } = require('stream');
const fs = require('fs');

class WritableStream extends Writable {
    constructor(filename) {
        super();
        this.filename = filename;
    }

    _construct(callback) {
        fs.open(this.filename, "a", (err, fd) => {
            if(err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        })
    }

    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }

}

module.exports = {
    WritableStream
}