"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("./tokenizer");
const code = "12 + 97 - 26";
let tokenizer = new tokenizer_1.Tokenizer(code);
console.log(tokenizer.tokens);
