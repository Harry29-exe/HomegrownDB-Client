import {Token} from "./token/Token";
import {CharUtils} from "./char/CharUtils";
import {TokenType, TokenUtils} from "./token/TokenType";

enum CharType {
    LETTER,
    DIGIT,

}

interface ParseResult {
    token: Token;
    next: string;
}

export class SyntaxService {

    tokenize(content: string): Token[] {
        let next = content;
        let tokens: Token[] = [];
        while (next !== null && next !== "")
        {
            const char = next[0];
            if (CharUtils.isWhiteSpace(char)) {
                let result = this.parseWhiteSpaceToken(next);
                tokens.push(result.token)
                next = result.next;
            } else {
                let result = this.parseText(next);
                tokens.push(result.token);
                next = result.next;
            }
        }

        return tokens;
    }

    parseText(content: string): ParseResult
    {
        for (let i = 0; i < content.length; i++) {
            if (CharUtils.isWhiteSpace(content.charAt(i)))
            {
                return {
                    token: this.createTextToken(content.substring(0, i)),
                    next: content.substring(i)
                }
            }
        }
        return {
            token: this.createTextToken(content),
            next: ""
        }
    }

    private createTextToken(token: string): Token
    {
        if (TokenUtils.isKeyword(token))
        {
            return new Token(TokenType.KeyWord, token);
        }
        return new Token(TokenType.Identifier, token);
    }

    // parseSpecialChar(content: string): ParseResult
    // {
    //     return {
    //         token: new Token(
    //
    //         )
    //     }
    // }

    parseWhiteSpaceToken(content: string): ParseResult
    {
        return {
            token: new Token(TokenType.SpaceBreak, content.charAt(0)),
            next: content.substring(1)
        }
    }



}