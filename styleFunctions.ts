namespace dom {
    export function width(val: number): Style {
        return new Style(StyleName.width, val);
    }

    export function height(val: number): Style {
        return new Style(StyleName.height, val);
    }

    export function paddingLeft(val: number): Style {
        return new Style(StyleName.paddingLeft, val);
    }

    export function paddingTop(val: number): Style {
        return new Style(StyleName.paddingTop, val);
    }

    export function paddingRight(val: number): Style {
        return new Style(StyleName.paddingRight, val);
    }

    export function paddingBottom(val: number): Style {
        return new Style(StyleName.paddingBottom, val);
    }

    export function borderColor(val: number): Style {
        return new Style(StyleName.borderColor, val);
    }

    export function borderLeft(val: number): Style {
        return new Style(StyleName.borderLeft, val);
    }

    export function borderTop(val: number): Style {
        return new Style(StyleName.borderTop, val);
    }

    export function borderRight(val: number): Style {
        return new Style(StyleName.borderRight, val);
    }

    export function borderBottom(val: number): Style {
        return new Style(StyleName.borderBottom, val);
    }

    export function color(val: number): Style {
        return new Style(StyleName.color, val);
    }

    export function padding(val: number): Style {
        return new Style(StyleName.padding, val);
    }

    export function border(val: number): Style {
        return new Style(StyleName.border, val);
    }

    export function alignLeft(): Style {
        return new Style(StyleName.contentAlign, ContentAlign.Left);
    }

    export function alignCenter(): Style {
        return new Style(StyleName.contentAlign, ContentAlign.Center);
    }

    export function alignRight(): Style {
        return new Style(StyleName.contentAlign, ContentAlign.Right);
    }

    export function smallFont(): Style {
        return new Style(StyleName.font, Font.Small);
    }

    export function animate(doAnimate: boolean) {
        return new Style(StyleName.animate, doAnimate ? 1 : 0)
    }

    export function className(name: string): Style {
        const res = new Style(StyleName.className);
        res.stringValue = name;
        return res;
    }
}