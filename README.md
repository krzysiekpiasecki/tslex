# tslex

Simple lexer for analyzing the input and emitting the tokens.

## Example of usage

```ts
import {EOF, newLexer, Tokenizer} from 'lexer'

const enum TokenTypes {
 ERROR,
 DIGIT,
 DOT
};

const dotTokenizer: Tokenizer = l => {
    if (l.accept('.') === false) {

    l.emit(TokenTypes.ERROR);
    return null;
    }

    l.emit(TokenTypes.DIGIT);

    if (l.peek() === EOF) {
        l.emit(TokenTypes.ERROR) {
            return null;
        }
    }
    return digitTokenizer;
}

const digitTokenizer: Tokenizer = l => {
    l.acceptRun("0123456789");
    l.emit(DIGIT);
    return dotTokenizer;
};


const tokens = newLexer().lex("12.15.134, digitTokenizer);
```

## Links

[Lexical Scanning in Go](https://talks.golang.org/2011/lex.slide#1)
