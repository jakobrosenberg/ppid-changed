const fs = require('fs')
const { tmpdir } = require('os')
const { sep } = require('path')


/**
 * Compare current process.ppid with the ppid from last time this function was
 * called from this folder. Returns either false or the last ppid.
 *
 * @param {string=} filename
 * @returns false|string
 */
function ppidChanged(filename) {
    filename = filename ||
        `${process.cwd().split(sep).pop()}-${checksum(process.cwd())}.pid`

    const path = tmpdir() + sep + filename
    const lastPpid = fs.existsSync(path) && fs.readFileSync(path, 'utf8')
    fs.writeFileSync(path, process.ppid, 'utf8')
    return lastPpid != process.ppid ? lastPpid : false
}

function checksum(s) {
    var chk = 0x12345678;
    var len = s.length;
    for (var i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }

    return (chk & 0xffffffff).toString(16);
}

module.exports = ppidChanged