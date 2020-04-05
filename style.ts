/**
 * A Document Object Model for the screen
 */
//% weight=80 icon="\uf2d0" color="#4245f5"
//% blockGap=8
//% groups='["Elements", "Styles"]'
namespace dom {
    export const WRAP = -1;
    export const FILL = -2;

    export enum StyleName {
        width,
        height,
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        padding,
        borderColor,
        borderLeft,
        borderTop,
        borderRight,
        borderBottom,
        border,
        color,
        contentAlign,
        font,
        className,
        animate
    }

    export enum ContentAlign {
        Left,
        Center,
        Right
    }

    export enum Font {
        Normal,
        Small
    }

    export class Style {
        readonly name: StyleName;
        value: number;
        stringValue: string;

        constructor(name: StyleName, value?: number) {
            this.name = name;
            this.value = value;
        }
    }

    export class StyleRule {
        readonly className: string;
        protected styles: Style[];

        constructor(className: string, styles: Style[]) {
            this.className = className;
            this.styles = styles || [];
        }

        getStyles() {
            return this.styles;
        }

        add(s: Style) {
            if (s) {
                for (const style of this.styles) {
                    if (style.name === s.name) {
                        style.value = s.value;
                        return;
                    }
                }
                this.styles.push(s);
            }
        }
    }

    export class StyleSheet {
        protected rules: StyleRule[];

        constructor() {
            this.rules = [];
        }

        createClass(name: string, styles: Style[]) {
            this.addRule(new StyleRule(name, styles));
        }

        addRule(r: StyleRule) {
            for (const rule of this.rules) {
                if (rule.className === r.className) {
                    for (const s of r.getStyles()) {
                        rule.add(s);
                    }
                    return;
                }
            }
            this.rules.push(r);
        }

        getStylesForClass(className: string): Style[] {
            for (const rule of this.rules) {
                if (rule.className === className) {
                    return rule.getStyles();
                }
            }
            return [];
        }
    }
}
