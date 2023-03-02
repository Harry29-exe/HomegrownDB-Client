export const WindowConsts = {
    FULL: -1,
    NOT_VISIBLE: -2
}

export class WindowConfig {
    constructor(
        public width: number,
        public height: number,
    ) {
    }

    get widthStyle(): string {
        return "width: " + (
            this.width == WindowConsts.FULL? "100%" :
            this.width == WindowConsts.NOT_VISIBLE? "0" :
                `${this.width}px`
        ) + ";";
    }

    get heightStyle(): string {
        return "height: " + (
            this.height == WindowConsts.FULL? "100%" :
            this.height == WindowConsts.NOT_VISIBLE? "0" :
                `${this.height}px`
        ) + ";";
    }

}