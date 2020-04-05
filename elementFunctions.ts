namespace dom {
    /**
     * Creates a box element
     */
    //% blockId=uiboxelement block="box||child $child=variables_get styles $styles"
    //% group="Elements"
    //% weight=100
    export function box(child?: Element, styles?: Style[]): BoxElement {
        const box = new BoxElement();
        if (child) {
            box.appendChild(child);
        }
        if (styles) {
            box.applyStyles(styles);
        }
        return box;
    }

    /**
     * Creates a text element
     */
    //% blockId=uitextelement block="text $content||styles $styles"
    //% group="Elements"
    export function text(content: string, styles?: Style[]) {
        const text = new TextElement(content);
        if (styles) {
            text.applyStyles(styles);
        }
        return text;
    }

    /**
     * Creates a long text element
     */
    //% blockId=uilongtextelement block="long text $content||styles $styles"
    //% group="Elements"
    export function longText(content: string, styles?: Style[]) {
        const text = new LongTextElement(content);
        if (styles) {
            text.applyStyles(styles);
        }
        return text;
    }

    /**
     * Create a vertical flow layout element
     */
    //% blockId=uiverticalflow block="vertical flow $children||styles $styles"
    //% group="Elements"
    export function verticalFlow(children: Element[], styles?: Style[]) {
        const container = new Element();
        if (styles) {
            container.applyStyles(styles);
        }

        if (children)
            for (const child of children) {
                container.appendChild(child)
            }

        return container;
    }

    /**
     * Create a vertical flow layout element
     */
    //% blockId=uihorizontalflow block="horizontal flow $children||styles $styles"
    //% group="Elements"
    export function horizontalFlow(children: Element[], styles?: Style[]) {
        const res = verticalFlow(children, styles);
        res.verticalFlow = false;
        return res;
    }

    /**
     * Creates a scrolling label
     */
    /**
     * Create a vertical flow layout element
     */
    //% blockId=uiscrollinglabel block="scrolling label $label max width $maxWidth||styles $styles"
    //% group="Elements"
    export function scrollingLabel(label: string, maxWidth: number, styles?: Style[]) {
        const el = new ScrollingTextElement(label, maxWidth);
        if (styles) {
            el.applyStyles(styles);
        }
        return el;
    }

    /**
     * Creates an image element
     */
    //% blockId=uiboxelement block="image $i=screen_image_picker||styles $styles"
    //% group="Elements"
    //% weight=100
    export function imageElement(i: Image, styles?: Style[]): ImageElement {
        const box = new ImageElement(i);
        if (styles) {
            box.applyStyles(styles);
        }
        return box;
    }    
}