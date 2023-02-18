import {Component, For} from "solid-js";
import {Token} from "./syntax/token/Token";
import {TokenType} from "./syntax/token/TokenType";

export interface TokenViewProps {
    tokens: Token[];
}

export const TokensView: Component<TokenViewProps> = props => {
    return <For each={props.tokens}>{(token) =>
        <TokenView token={token}/>
    }
    </For>
}

const TokenView: Component<{token: Token}> = props => {
    switch (props.token.type) {
        case TokenType.SpaceBreak:
            return <SpaceBreakTokenView token={props.token}/>
        case TokenType.KeyWord:
            return <span class="text-green-500">{props.token.value}</span>
        default:
            return <span class="text-white">{props.token.value}</span>
    }
}

const SpaceBreakTokenView: Component<{token: Token}> = props => {
    switch (props.token.value)
    {
        case ' ':
            return <span> </span>
        case '\t':
            return <span>   </span>
        case '\n':
            return <br/>
    }
}