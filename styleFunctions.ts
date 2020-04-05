namespace dom {
    /**
     * Specifies a width rule
     */
    //% blockId=uistylewidth block="width $val"
    //% group="Styles"
    //% val.defl=64 val.min=0 val.max=160
    export function width(val: number): Style {
        return new Style(StyleName.width, val);
    }

    /**
     * Specifies a height rule
     */
    //% blockId=uistyleheight block="height $val"
    //% group="Styles"
    //% val.defl=64 val.min=0 val.max=120
    export function height(val: number): Style {
        return new Style(StyleName.height, val);
    }

    /**
     * Specifies a padding left rule
     */
    //% blockId=uistylepaddingleft block="padding left $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=160
    export function paddingLeft(val: number): Style {
        return new Style(StyleName.paddingLeft, val);
    }

    /**
     * Specifies a padding top rule
     */
    //% blockId=uistylepaddingtop block="padding top $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=120
    export function paddingTop(val: number): Style {
        return new Style(StyleName.paddingTop, val);
    }

    /**
     * Specifies a padding right rule
     */
    //% blockId=uistylepaddinright block="padding right $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=160
    export function paddingRight(val: number): Style {
        return new Style(StyleName.paddingRight, val);
    }

    /**
     * Specifies a padding bottom rule
     */
    //% blockId=uistylepaddingbottom block="padding bottom $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=120
    export function paddingBottom(val: number): Style {
        return new Style(StyleName.paddingBottom, val);
    }

    /**
     * Specifies a border color rule
     */
    //% blockId=uistylecolor block="border color $val=colorindexpicker"
    //% group="Styles"
    export function borderColor(val: number): Style {
        return new Style(StyleName.borderColor, val);
    }

    /**
     * Specifies a border left rule
     */
    //% blockId=uistyleleft block="border left $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=120
    export function borderLeft(val: number): Style {
        return new Style(StyleName.borderLeft, val);
    }

    /**
     * Specifies a border top rule
     */
    //% blockId=uistyletop block="border top $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=160
    export function borderTop(val: number): Style {
        return new Style(StyleName.borderTop, val);
    }

    /**
     * Specifies a border right rule
     */
    //% blockId=uistyleright block="border right $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=120
    export function borderRight(val: number): Style {
        return new Style(StyleName.borderRight, val);
    }

    /**
     * Specifies a border bottom rule
     */
    //% blockId=uistylebottom block="border bottom $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=160
    export function borderBottom(val: number): Style {
        return new Style(StyleName.borderBottom, val);
    }

    /**
     * Specifies a color rule
     */
    //% blockId=uistylecolor block="color $val=colorindexpicker"
    //% group="Styles"
    export function color(val: number): Style {
        return new Style(StyleName.color, val);
    }

    /**
     * Specifies a padding rule
     */
    //% blockId=uistylepadding block="padding $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=160
    export function padding(val: number): Style {
        return new Style(StyleName.padding, val);
    }

    /**
     * Specifies a border rule
     */
    //% blockId=uistyleborder block="border $val"
    //% group="Styles"
    //% val.defl=1 val.min=0 val.max=160
    export function border(val: number): Style {
        return new Style(StyleName.border, val);
    }

    /**
     * Specifies a align left rule
     */
    //% blockId=uistylealignleft block="align left"
    //% group="Styles"
    export function alignLeft(): Style {
        return new Style(StyleName.contentAlign, ContentAlign.Left);
    }

    /**
     * Specifies a align center rule
     */
    //% blockId=uistylealigncenter block="align center"
    //% group="Styles"
    export function alignCenter(): Style {
        return new Style(StyleName.contentAlign, ContentAlign.Center);
    }

    /**
     * Specifies a align right rule
     */
    //% blockId=uistylealignright block="align right"
    //% group="Styles"
    export function alignRight(): Style {
        return new Style(StyleName.contentAlign, ContentAlign.Right);
    }

    /**
     * Specifies a small font rule
     */
    //% blockId=uistylealignsmallfont block="small font"
    //% group="Styles"
    export function smallFont(): Style {
        return new Style(StyleName.font, Font.Small);
    }

    /**
     * Specifies a animate rule
     */
    //% blockId=uistylealignanimate block="animate $doAnimate=toggleOnOff"
    //% group="Styles"
    export function animate(doAnimate: boolean) {
        return new Style(StyleName.animate, doAnimate ? 1 : 0)
    }

    /**
     * Specifies a class name right
     */
    //% blockId=uistyleclass block="class $name"
    //% group="Styles"
    export function className(name: string): Style {
        const res = new Style(StyleName.className);
        res.stringValue = name;
        return res;
    }
}