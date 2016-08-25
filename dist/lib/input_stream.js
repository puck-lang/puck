#!/usr/bin/env node
'use strict';
function InputStream(input) {
    var pos = 0;
    var line = 1;
    var col = 1;
    function next() {
        var ch = input.charAt(pos);
        pos = pos + 1;
        if (ch == "\n") {
            line = line + 1;
            col = 1;
        }
        else {
            col = col + 1;
        }
        ;
        return ch;
    }
    ;
    function peek(distance) {
        if (distance === void 0) { distance = 0; }
        return input.charAt(pos + distance);
    }
    ;
    function eof() {
        return peek() == "";
    }
    ;
    function croak(msg) {
        throw Error(msg + " (" + line + ":" + col + ")");
    }
    ;
    return {
        next: next,
        peek: peek,
        eof: eof,
        croak: croak,
        getLine: function () {
            return line;
        },
        getCol: function () {
            return col;
        },
    };
}
;
module.exports.InputStream = InputStream;
