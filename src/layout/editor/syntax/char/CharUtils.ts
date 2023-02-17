export namespace CharUtils {
    export function isWhiteSpace(char: string): boolean {
        return char === '\n' || char === ' ' || char === '\t';
    }

    const specialChars = new Set(['\'', '{', '}', '(', ')', ',', '.', '=', '!'])

    export function isSpecialChar(char: string): boolean
    {
        return specialChars.has(char);
    }

}