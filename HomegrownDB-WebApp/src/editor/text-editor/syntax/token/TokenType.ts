export enum TokenType {
    KeyWord,
    Identifier,
    SpaceBreak,
}

export namespace TokenUtils {

    const keywords: Set<string> = new Set(['SELECT', 'FROM', 'INSERT'])

    export function isKeyword(token: string): boolean {
        return keywords.has(token.toUpperCase());
    }

}