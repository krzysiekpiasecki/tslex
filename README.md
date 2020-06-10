# tslex

Simple lexer for analyzing the input and emitting the tokens.

## Example of usage

The full API is available [here](https://krzysiekpiasecki.github.io/tslex/index.html)

```ts
import { EOF, newLexer, Tokenizer, Tokens } from 'lexer'

const TokenTypes {
   ...Tokens, // ERROR, EOF
   DOT: 4,
   DIGITS: 8
};

const dotTokenizer: Tokenizer = l => {
    if (l.accept('.') === false) {
        l.emit(TokenTypes.ERROR);

        return null;
    }

    l.emit(TokenTypes.DOT);

    if (l.peek() === EOF) { // after dot must be another digit
        l.emit(TokenTypes.ERROR);

        return null;
    }

    return digitTokenizer;
}

const digitsTokenizer: Tokenizer = l => {
    l.acceptRun("0123456789");

    l.emit(TokenTypes.DIGITS);

    if (l.peek() === EOF) {
        return null;
    }

    return dotTokenizer;
};

const tokens = newLexer().lex("12.15.", digitsTokenizer); // 12 -> . -> 15 -> . -> ERROR
```

## Links

[Lexical Scanning in Go](https://talks.golang.org/2011/lex.slide#1)
