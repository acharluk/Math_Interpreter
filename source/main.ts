import { Tokenizer } from "./tokenizer";

const code = "12 + 97 - 26";

let tokenizer = new Tokenizer(code);
console.log(tokenizer.tokens);