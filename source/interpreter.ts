import { Token } from "./tokenizer";

export interface Variable {
    name: string;
    value: string;
}

export class Interpreter {
    tokens: Token[];
    variables: Variable[];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.variables = [];
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
            if (current.type == 'variable_write') {
                console.log("Variable write", current);
                this.tokens.splice(index, 1);
                index++;
                continue;
            }
            if (current.type == 'variable_read') {
                let a: Variable | undefined;
                this.variables.forEach(v => {
                    if (v.name == current.value) a = v;
                });
                if (!a) { console.error(`Variable not found: ${current.value}`); return; }
                this.tokens[index] = { type: 'value', value: a.value };
                index++;
                continue;
            }
        }
    }
}