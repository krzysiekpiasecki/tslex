[tslex](../README.md) › [Globals](../globals.md) › ["src/lexer"](../modules/_src_lexer_.md) › [Token](_src_lexer_.token.md)

# Interface: Token

Represent a single token, which consists of the token type, value and start position.

Tokens are emitted by {@link Lexer#emit} method from [Tokenizer](../modules/_src_lexer_.md#tokenizer) functions.

## Hierarchy

* **Token**

## Index

### Properties

* [start](_src_lexer_.token.md#start)
* [type](_src_lexer_.token.md#type)
* [value](_src_lexer_.token.md#value)

## Properties

###  start

• **start**: *number*

*Defined in [src/lexer.ts:67](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L67)*

**`param`** Zero-based start position index in the input

___

###  type

• **type**: *number*

*Defined in [src/lexer.ts:63](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L63)*

**`param`** Token type

___

###  value

• **value**: *string*

*Defined in [src/lexer.ts:65](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L65)*

**`param`** Token value (lexeme)
