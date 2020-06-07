/**
 * Lexer analyze the input string and emits tokens
 *
 * @TODO Implement emitError function
 * @TODO Implement generator function
 * @TODO Implements Emiter type
 *
 * #### Simple Example
 *
 * ```ts
 * import {EOF, newLexer, Tokenizer} from 'lexer'
 *
 * const enum TokenTypes {
 *  ERROR,
 *  DIGIT,
 *  DOT
 * };
 *
 * const dotTokenizer: Tokenizer = l => {
 *  if (l.accept('.') === false) {
 *     l.emit(TokenTypes.ERROR);
 *     return null;
 *  }
 *  l.emit(TokenTypes.DIGIT);
 *  if (l.peek() === EOF) {
 *      l.emit(TokenTypes.ERROR) {
 *          return null;
 *      }
 *  }
 *  return digitTokenizer;
 * }
 *
 * const digitTokenizer: Tokenizer = l => {
 *  l.acceptRun("0123456789");
 *  l.emit(DIGIT);
 *  return dotTokenizer;
 * };
 *
 * const tokens = newLexer().lex("12.15.134);
 * ```
 */

/**
 * When there is no characters in the input, const EOF is returned instead of the next character.
 */
const EOF = "";

/**
 * Tokenizer consumes the input and emit the tokens
 *
 * @param lexer Lexer scanner
 * @returns Next Tokenizer or null | undefined when this is the last token
 */
type Tokenizer = (lexer: Lexer) => Tokenizer | void | null;

/**
 * Represent a single token, which consists of the token type, value and start position.
 *
 * Tokens are emitted by {@link Lexer#emit} method from {@link Tokenizer} functions.
 */
interface Token {
  /** @param type Token type */
  type: number;
  /** @param value Token value (lexeme) */
  value: string;
  /** @param start Zero-based start position index in the input */
  start: number;
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
   * @param type Token type
   */
  emit(type: number): void;

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

    emit(type: number) {
      this.tokens.push({
        type,
        value: this.input.substring(this.start, this.position),
        start: this.start,
      });
      this.ignore();
    }

    ignore() {
      this.start = this.position;
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
const Lex: Lexer = newLexer();

export { EOF, Lex, Lexer, newLexer, Token, Tokenizer };
