import { newLexer, EOF, Tokens } from "../src/lexer";

const TestTokens = {
  ...Tokens,
  DOT: 4,
};

describe("Lexer", () => {
  test("accept should accept a single character", () => {
    newLexer().lex("AB", (l) => {
      l.accept("A");
      expect(l.next()).toBe("B");
    });
  });

  test("acceptRun should accept all characters until not valid", () => {
    newLexer().lex("A", (l) => {
      l.acceptRun("A");
      expect(l.next()).toBe(EOF);
    });

    newLexer().lex("ABC", (l) => {
      l.acceptRun("AB");
      expect(l.next()).toBe("C");
    });
  });

  test("backup should backup the lexer", () => {
    newLexer().lex("A", (l) => {
      l.next();
      l.backup();
      expect(l.next()).toBe("A");
    });

    newLexer().lex("A", (l) => {
      l.backup;
      expect(l.next()).toBe("A");
    });
  });

  test("emit should emit a token", () => {
    const tokens = newLexer().lex(".", (l) => {
      l.next();
      l.emit(TestTokens.DOT);
    });
    expect(tokens[0]).toEqual({ type: TestTokens.DOT, value: "." });
  });

  test("error should emit error token and stop emitting", () => {
    const tokens = newLexer().lex("AB", (l) => {
      l.next();
      l.error("Error message");
    });
    expect(tokens[0]).toEqual({
      type: TestTokens.ERROR,
      value: "Error message",
    });
  });

  test("ignore should omit a value", () => {
    const tokens = newLexer().lex("cd", (l) => {
      l.next();
      l.ignore();
      l.next();
      l.emit(1);
    });
    expect(tokens[0].value === "d");
  });

  test("lex should tokenize an input", () => {
    const tokens = newLexer().lex("AB     123456789", (l) => {
      l.acceptRun("AB");
      l.emit(1);
      return (l) => {
        l.acceptRun(" ");
        l.emit(2);
        return (l) => {
          l.acceptRun("123456789");
          l.emit(3);
        };
      };
    });
    expect(tokens[0]).toEqual({ type: 1, value: "AB" });
    expect(tokens[1]).toEqual({ type: 2, value: "     " });
    expect(tokens[2]).toEqual({ type: 3, value: "123456789" });
  });

  test("next should consume and return a single character", () => {
    newLexer().lex("AB", (l) => {
      expect(l.next()).toBe("A");
      expect(l.next()).toBe("B");
    });
  });

  test("next should return EOT", () => {
    newLexer().lex("", (l) => {
      expect(l.next()).toBe(EOF);
    });

    newLexer().lex("A", (l) => {
      l.next();
      expect(l.next()).toBe(EOF);
    });
  });

  test("peek should return a next character, but not consume it", () => {
    newLexer().lex("", (l) => {
      expect(l.peek()).toBe(EOF);
    });

    newLexer().lex("z", (l) => {
      expect(l.peek()).toBe("z");
    });

    newLexer().lex("z", (l) => {
      l.next();
      expect(l.peek()).toBe(EOF);
      expect(l.peek()).toBe(EOF);
    });
  });
});
