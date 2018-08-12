import { Token } from "./tokenizer";

export class Interpreter {
    tokens: Token[];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    run(): string | undefined {
        if (this.tokens.length <= 1) {
            return this.tokens[0].value;
        }
        let index = 0;
        for (let j = index; j < this.tokens.length; j++) {
            if (this.tokens[j].value == '*' || this.tokens[j].value == '/') {
                index = j;
                break;
            }
        }
        while (index < this.tokens.length) {
            let current = this.tokens[index];
            if (current.type == 'value') { index++; continue; }
            if (current.type == 'operator') {
                let result = parseFloat(this.tokens[index - 1].value);
                let rhs = parseFloat(this.tokens[index + 1].value);
                switch (current.value) {
                    case '+': { result += rhs; break; }
                    case '-': { result -= rhs; break; }
                    case '*': { result *= rhs; break; }
                    case '/': { result /= rhs; break; }
                }
                this.tokens[index - 1] = { type: 'value', value: result.toString() };
                this.tokens.splice(index, 2);
                return this.run();
            }
        }
    }
}