[tslex](../README.md) › [Globals](../globals.md) › ["src/lexer"](_src_lexer_.md)

# Module: "src/lexer"

Lexer analyze the input string and emits tokens

**`todo`** Implement emitError function

**`todo`** Implement generator function

**`todo`** Implements Emiter type

#### Simple Example

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

const tokens = newLexer().lex("12.15.134);
```

## Index

### Interfaces

* [Lexer](../interfaces/_src_lexer_.lexer.md)
* [Token](../interfaces/_src_lexer_.token.md)

### Type aliases

* [Tokenizer](_src_lexer_.md#tokenizer)

### Variables

* [EOF](_src_lexer_.md#const-eof)
* [Lex](_src_lexer_.md#const-lex)

### Functions

* [newLexer](_src_lexer_.md#const-newlexer)

## Type aliases

###  Tokenizer

Ƭ **Tokenizer**: *function*

*Defined in [src/lexer.ts:54](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L54)*

Tokenizer consumes the input and emit the tokens

**`param`** Lexer scanner

**`returns`** Next Tokenizer or null | undefined when this is the last token

#### Type declaration:

▸ (`lexer`: [Lexer](../interfaces/_src_lexer_.lexer.md)): *[Tokenizer](_src_lexer_.md#tokenizer) | void | null*

**Parameters:**

Name | Type |
------ | ------ |
`lexer` | [Lexer](../interfaces/_src_lexer_.lexer.md) |

## Variables

### `Const` EOF

• **EOF**: *""* = ""

*Defined in [src/lexer.ts:46](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L46)*

When there is no characters in the input, const EOF is returned instead of the next character.

___

### `Const` Lex

• **Lex**: *[Lexer](../interfaces/_src_lexer_.lexer.md)* = newLexer()

*Defined in [src/lexer.ts:220](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L220)*

Global instance of the [Lexer](../interfaces/_src_lexer_.lexer.md). Instead of global Lexer you can use [newLexer](_src_lexer_.md#const-newlexer) method to create brand-new instance.

## Functions

### `Const` newLexer

▸ **newLexer**(): *[Lexer](../interfaces/_src_lexer_.lexer.md)*

*Defined in [src/lexer.ts:145](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L145)*

**Returns:** *[Lexer](../interfaces/_src_lexer_.lexer.md)*
