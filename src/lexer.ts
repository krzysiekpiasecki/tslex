/**
 * Lexer analyzes the input string and emits tokens
 *
 * #### Example
 *
 * ```ts
 * import { EOF, newLexer, Tokenizer, Tokens } from 'lexer'
 *
 * const TokenTypes {
 *    ...Tokens, // ERROR, EOF
 *    DOT: 4,
 *    DIGITS: 8
 * };
 *
 * const dotTokenizer: Tokenizer = l => {
 *  if (l.accept('.') === false) {
 *     l.emit(TokenTypes.ERROR);
 *     return null;
 *  }
 *
 *  l.emit(TokenTypes.DOT);
 *
 *  if (l.peek() === EOF) { // after dot must be another digit
 *      l.emit(TokenTypes.ERROR);
 *      return null;
 *  }
 *
 *  return digitTokenizer;
 * }
 *
 * const digitsTokenizer: Tokenizer = l => {
 *     l.acceptRun("0123456789");
 *
 *     l.emit(TokenTypes.DIGITS);
 *
 *     if (l.peek() === EOF) {
 *         return null;
 *     }
 *
 *     return dotTokenizer;
 * };
 *
 * const tokens = newLexer().lex("12.15.", digitsTokenizer); // 12 -> . -> 15 -> . -> ERROR
 * ```
 *
 * @TODO Implement emitError function
 * @TODO Implement? generator function
 * @TODO Implement? Emiter type
 * @TODO Change method {@link Lexer#lex} to Lexer#run
 * @TODO Implement? peekToken method
 * @TODO Remove class instance and use object literal in {@link newLexer}
 * @TODO Remove position from Token Lexer
 */

/**
 * When there is no characters in the input, const EOF is returned instead of the next character.
 */
const EOF = "";

/**
 * TokenType defines type of the token
 */
export type TokenType = number;

/**
 * Token type enumaration.
 *
 * Currently enumerations can't be extended. Therefore the client should
 * use this object enumeration and extend it to provide custom toke types.
 *
 * Example:
 * ```ts
 * import { Tokens } from 'lexer'
 *
 * const CustomTokens = {
 *     ...Tokens,
 *     DOT: 4,
 *     HYPEN: 8,
 * }
 *
 * dot: TokenType = CustomTokens.DOT; // 4
 * eof: TokenType = CustomTokens.EOF; // 0
 * ```
 */
export const Tokens = {
  EOF: 0,
  ERROR: 1,
};

/**
 * Tokenizer consumes the input and emit the tokens
 *
 * @param lexer Lexer scanner
 * @returns Next Tokenizer or null | undefined when this is the last token
 */
type Tokenizer = (lexer: Lexer) => Tokenizer | void | null;

/**
 * Represent a single token, which consists of the token type and its value
 *
 * Tokens are emitted by {@link Lexer#emit} method from {@link Tokenizer} functions.
 */
interface Token {
  /** @param type Token type */
  type: TokenType;
  /** @param value Token value (lexeme) */
  value: string;
}

interface Lexer {
  /**
   * If next character from the input is one from the accepted characters set defined by the parameter 'chars' return true,
   * otherwise false.
   *
   * This method shift lexer to next character if current accepted.
   *
   * @param chars The accepted character set e.g. "ABC"
   * @returns boolean True if next character accepted, otherwise false
   */
  accept(valid: string): boolean;

  /**
   * Accept all characters until the first one not accepted.
   *
   * This method shift lexer to the first not accepted character.
   *
   * @param chars The accepted character set e.g. "ABC"
   */
  acceptRun(valid: string): void;

  /**
   * Shift lexer to the previous character in the input.
   *
   * If lexer is on the begining nothing changed.
   */
  backup(): void;

  /**
   * Emit a new {@link Token} with the type of {@link type}.
   *
   * Returned token contains it's type and it's value and start position in the input.
   *
   * @param TokenType Token type
   */
  emit(type: TokenType): void;

  /**
   * Emit a token with the type {@link Tokens.ERROR} and stop the lexing.
   * @param message Error message as a token value
   */
  error(message: string): void;

  /**
   * Ignore cuurent scanning, which means that the start position of the next scanning
   * will begin from the current lexer position.
   */
  ignore(): void;

  /**
   * Lex the input.
   *
   * This method start tokenization calling root {@link Tokenizer} passed as argument.
   * It's emits tokens until {@link EOF} is reached or no tokenizer has been returned by the current tokenizer.
   *
   * @param input The input for lexing
   * @param tokenizer Tokenization root
   * @returns The token collection
   */
  lex(input: string, tokenizer: Tokenizer): Token[];

  /**
   * Get next character from the input and return it.
   *
   * If lexer position is at the end of the input returns {@link EOF}. If you don't want to consuming returned character by the lexer
   * itself use {@link peek} method.
   *
   * @returns Next character from the input, otherwise {@link EOF}
   */
  next(): string;

  /**
   * Get next character from the input, return it and {@link backup} the lexer.
   *
   * If lexer position is at the end returns {@link EOF}
   *
   * @returns Next character from the input, otherwise {@link EOF}
   */
  peek(): string;
}

const newLexer = (): Lexer =>
  new (class implements Lexer {
    private input = "";
    private start = 0;
    private position = 0; // token length = position - start
    private tokens: Token[] = [];

    accept(chars: string): boolean {
      return chars.indexOf(this.next()) === -1;
    }

    acceptRun(chars: string): void {
      let n = this.next();
      while (n) {
        if (chars.indexOf(n) === -1) {
          this.backup();
          return;
        }
        n = this.next();
      }
    }

    backup(): void {
      if (this.position === 0) {
        return;
      }
      this.position--;
    }

    emit(type: TokenType) {
      this.tokens.push({
        type,
        value: this.input.substring(this.start, this.position),
      });
      this.ignore();
    }

    ignore() {
      this.start = this.position;
    }

    error(message: string): void {
      this.tokens.push({
        type: Tokens.ERROR,
        value: message,
      });
      this.position = this.input.length;
    }

    lex(input: string, tokenizer: Tokenizer): Token[] {
      this.input = input;
      return this.runBare(tokenizer);
    }

    next(): string {
      if (this.position === this.input.length) {
        return EOF;
      }
      this.position += 1;
      return this.input.substr(this.position - 1, 1);
    }

    peek(): string {
      const r = this.next();
      if (r !== EOF) {
        this.backup();
      }
      return r;
    }

    private runBare(tokenizer: Tokenizer): Token[] {
      let t = tokenizer(this);
      while (t) {
        t = t(this);
      }
      return this.tokens;
    }
  })();

/**
 * Global instance of the {@link Lexer}. Instead of global Lexer you can use {@link newLexer} method to create brand-new instance.
 */
const Lexing: Lexer = newLexer();

export { EOF, Lexing, Lexer, newLexer, Token, Tokenizer };
