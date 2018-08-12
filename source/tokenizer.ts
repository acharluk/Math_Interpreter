export interface Token {
    type: string;
    value: string;
}

export class Tokenizer {
    tokens: Token[];
    current: number;

    constructor(input: string) {
        this.tokens = [];
        this.current = 0;
        this.tokenize(input);
    }

    tokenize(input: string) {
        let counter = 0;
        while (counter < input.length) {
            if (input[counter] == ' ') { counter++; continue; }
            if (input[counter] == '+' || input[counter] == '-' || input[counter] == '*' || input[counter] == '/') {
                this.tokens.push({ type: 'operator', value: input[counter] });
                counter++;
                continue;
            }
            if (/[0-9]/.test(input[counter])) {
                let value = input[counter];
                counter++;
                while (/[0-9]/.test(input[counter])) {
                    value += input[counter];
                    counter++;
                }
                this.tokens.push({ type: 'value', value: value });
                continue;
            }
            if (input[counter] == '=') {
                let value = '';
                counter++;
                while (/[a-zA-Z0-9]/.test(input[counter])) {
                    value += input[counter];
                    counter++;

                }
                this.tokens.push({ type: 'variable_write', value: value });
                continue;
            }
            if (input[counter] == '@') {
                let value = '';
                counter++;
                while (/[a-zA-Z0-9]/.test(input[counter])) {
                    value += input[counter];
                    counter++;

                }
                this.tokens.push({ type: 'variable_read', value: value });
                continue;
            }
            if (input[counter] == ';') {
                this.tokens.push({ type: 'end_of_statement', value: ';' });
                counter++;
                continue;
            }

            console.error(`Unrecognized token: ${input[counter]}`);
            return true;
        }
    }

    next() {
        return this.tokens[this.current++];
    }

    peek() {
        return this.tokens[this.current];
    }
}