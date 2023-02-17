import {Component, ComponentProps, createSignal} from "solid-js";
import {Token} from "./syntax/token/Token";
import {SyntaxService} from "./syntax/SyntaxService";
import {TokensView} from "./TokensView";

export interface EditorProps {
    initialContent: string
}

export const Editor: Component<EditorProps> = (props: EditorProps) => {
    const syntaxService = new SyntaxService();
    const initialTokens = syntaxService.tokenize(props.initialContent);
    console.log(initialTokens)

    const [tokens, setTokens] = createSignal<Token[]>(initialTokens)

    const update = (content: string) => {
        const tokens = syntaxService.tokenize(content);
        setTokens(tokens);
        console.log(tokens);
    }

    return <div class="w-full h-[300px] relative">
        <div class="absolute top-0 left-0 w-full h-full">
            <TokensView tokens={tokens()}/>
        </div>
        <textarea class="absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-black"
                  oninput={event => update(event.currentTarget.value)}>
            {props.initialContent}
        </textarea>
    </div>
}

