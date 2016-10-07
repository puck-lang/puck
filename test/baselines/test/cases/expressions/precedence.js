#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = 1 + 2 * 3;
a = 1 * 2 + 3;
a = (1 + 2) * 3;
a = 1 * (2 + 3);
a = true && false || true;
a = true || false && true;
a = true && (false || true);
a = (true || false) && true;
a = !true && false;
a = !(true && false);
a = 2 * Math.pow(2, 3);
