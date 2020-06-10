[tslex](../README.md) › [Globals](../globals.md) › ["src/lexer"](../modules/_src_lexer_.md) › [Lexer](_src_lexer_.lexer.md)

# Interface: Lexer

## Hierarchy

* **Lexer**

## Index

### Methods

* [accept](_src_lexer_.lexer.md#accept)
* [acceptRun](_src_lexer_.lexer.md#acceptrun)
* [backup](_src_lexer_.lexer.md#backup)
* [emit](_src_lexer_.lexer.md#emit)
* [ignore](_src_lexer_.lexer.md#ignore)
* [lex](_src_lexer_.lexer.md#lex)
* [next](_src_lexer_.lexer.md#next)
* [peek](_src_lexer_.lexer.md#peek)

## Methods

###  accept

▸ **accept**(`valid`: string): *boolean*

*Defined in [src/lexer.ts:80](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L80)*

If next character from the input is one from the accepted characters set defined by the parameter 'chars' return true,
otherwise false.

This method shift lexer to next character if current accepted.

**Parameters:**

Name | Type |
------ | ------ |
`valid` | string |

**Returns:** *boolean*

boolean True if next character accepted, otherwise false

___

###  acceptRun

▸ **acceptRun**(`valid`: string): *void*

*Defined in [src/lexer.ts:89](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L89)*

Accept all characters until the first one not accepted.

This method shift lexer to the first not accepted character.

**Parameters:**

Name | Type |
------ | ------ |
`valid` | string |

**Returns:** *void*

___

###  backup

▸ **backup**(): *void*

*Defined in [src/lexer.ts:96](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L96)*

Shift lexer to the previous character in the input.

If lexer is on the begining nothing changed.

**Returns:** *void*

___

###  emit

▸ **emit**(`type`: number): *void*

*Defined in [src/lexer.ts:105](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L105)*

Emit a new [Token](_src_lexer_.token.md) with the type of [type](_src_lexer_.token.md#type).

Returned token contains it's type and it's value and start position in the input.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | number | Token type  |

**Returns:** *void*

___

###  ignore

▸ **ignore**(): *void*

*Defined in [src/lexer.ts:111](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L111)*

Ignore cuurent scanning, which means that the start position of the next scanning
will begin from the current lexer position.

**Returns:** *void*

___

###  lex

▸ **lex**(`input`: string, `tokenizer`: [Tokenizer](../modules/_src_lexer_.md#tokenizer)): *[Token](_src_lexer_.token.md)[]*

*Defined in [src/lexer.ts:123](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L123)*

Lex the input.

This method start tokenization calling root [Tokenizer](../modules/_src_lexer_.md#tokenizer) passed as argument.
It's emits tokens until [EOF](../modules/_src_lexer_.md#const-eof) is reached or no tokenizer has been returned by the current tokenizer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`input` | string | The input for lexing |
`tokenizer` | [Tokenizer](../modules/_src_lexer_.md#tokenizer) | Tokenization root |

**Returns:** *[Token](_src_lexer_.token.md)[]*

The token collection

___

###  next

▸ **next**(): *string*

*Defined in [src/lexer.ts:133](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L133)*

Get next character from the input and return it.

If lexer position is at the end of the input returns [EOF](../modules/_src_lexer_.md#const-eof). If you don't want to consuming returned character by the lexer
itself use [peek](_src_lexer_.lexer.md#peek) method.

**Returns:** *string*

Next character from the input, otherwise [EOF](../modules/_src_lexer_.md#const-eof)

___

###  peek

▸ **peek**(): *string*

*Defined in [src/lexer.ts:142](https://github.com/krzysiekpiasecki/tslex/blob/36181c0/src/lexer.ts#L142)*

Get next character from the input, return it and [backup](_src_lexer_.lexer.md#backup) the lexer.

If lexer position is at the end returns [EOF](../modules/_src_lexer_.md#const-eof)

**Returns:** *string*

Next character from the input, otherwise [EOF](../modules/_src_lexer_.md#const-eof)
