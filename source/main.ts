import { Tokenizer } from "./tokenizer";
import { Interpreter } from "./interpreter";

const code = "12 + 97 - 26";

let tokenizer = new Tokenizer(code);
let interpreter = new Interpreter(tokenizer.tokens);
console.log(`Result: ${interpreter.run()}`);