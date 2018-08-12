import { Tokenizer } from "./tokenizer";
import { Interpreter } from "./interpreter";

import { readFileSync } from "fs";

const fileData = readFileSync('test.op');
const code = fileData.toString().replace(/\r\n/g, '\n');

let tokenizer = new Tokenizer(code);
let interpreter = new Interpreter(tokenizer.tokens);
console.log(`Result: ${interpreter.run()}`);