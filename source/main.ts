import { Tokenizer } from "./tokenizer";
import { Interpreter } from "./interpreter";

const code = "1 + 9 * 2";

let tokenizer = new Tokenizer(code);
let interpreter = new Interpreter(tokenizer.tokens);
console.log(`Result: ${interpreter.run()}`);