namespace dom {
    export class BoundingBox {
        left: number;
        top: number;
        width: number;
        height: number;
    }

    export class BoxValues {
        protected data: Buffer;

        constructor() {
            this.data = control.createBuffer(4);
        }

        get left() {
            return this.data[0];
        }

        set left(val: number) {
            this.data[0] = val & 0xff;
        }

        get top() {
            return this.data[1];
        }

        set top(val: number) {
            this.data[1] = val & 0xff;
        }

        get right() {
            return this.data[2];
        }

        set right(val: number) {
            this.data[2] = val & 0xff;
        }

        get bottom() {
            return this.data[3];
        }

        set bottom(val: number) {
            this.data[3] = val & 0xff;
        }
    }

    export class ContentBox {
        padding: BoxValues;
        border: BoxValues;
        align: ContentAlign;
        borderColor: number;

        constructor() {
            this.padding = new BoxValues();
            this.border = new BoxValues();
            this.borderColor = 0;
            this.align = ContentAlign.Center;
        }

        getElementBounds(left: number, top: number, outerWidth: number, outerHeight: number) {
            const r = new BoundingBox();
            r.left = left + this.border.left;
            r.top = top + this.border.top;
            r.width = outerWidth - this.border.left - this.border.right;
            r.height = outerHeight - this.border.top - this.border.bottom;
            return r;
        }

        getContentBounds(element: BoundingBox, contentWidth: number, contentHeight: number) {
            const r = new BoundingBox();
            r.top = element.top + this.padding.top;
            r.width = contentWidth;
            r.height = contentHeight;

            switch (this.align) {
                case ContentAlign.Left:
                    r.left = element.left + this.padding.left;
                    break;
                case ContentAlign.Center:
                    r.left = element.left + (element.width >> 1) - (contentWidth >> 1);
                    break;
                case ContentAlign.Right:
                    r.left = (element.left + element.width - this.padding.right - contentWidth);
                    break;
            }

            return r;
        }
    }

    /**
     * A DOM element
     */
    //%
    export class Element {
        parent: Element;
        children: Element[];
        contentBox: ContentBox;

        verticalFlow: boolean;

        width: number;
        height: number;

        _cachedWidth: number;
        _cachedHeight: number;
        _renderedBounds: BoundingBox;

        protected sheet: StyleSheet;
        protected classes: string[];

        constructor() {
            this.verticalFlow = true;
            this.width = WRAP;
            this.height = WRAP;
            this.contentBox = new ContentBox();
        }

        appendChild(child: Element) {
            if (!this.children) this.children = [];

            if (child.parent) {
                child.parent.removeChild(child);
            }

            child.parent = this;
            this.children.push(child);
        }

        removeChild(child: Element) {
            if (this.children) this.children.removeElement(child);
        }

        defineStyleClass(className: string, styles?: Style | Style[]) {
            if (!this.sheet) this.sheet = new StyleSheet();
            if (styles instanceof Style)
                styles = [styles as Style];
            const rule = new StyleRule(className, styles as Style[]);
            this.sheet.addRule(rule);
            return rule;
        }

        draw() {
            if (!this._renderedBounds) {
                this.render();
            }

            this.drawSelf(this._renderedBounds);
            this.drawBorder();

            if (this.children) {
                for (const child of this.children) {
                    child.draw();
                }
            }
        }

        render(bounds?: BoundingBox) {
            if (this._renderedBounds) return;
            this.applyClassStyles();

            if (bounds) {
                this._renderedBounds = this.contentBox.getElementBounds(bounds.left, bounds.top, bounds.width, bounds.height)
            }
            else {
                this._renderedBounds = this.contentBox.getElementBounds(0, 0, calculateWidth(this), calculateHeight(this));
            }

            this.onDidReceiveBounds(this._renderedBounds);

            if (this.children) {
                if (this.verticalFlow) this.renderVerticalFlow();
                else this.renderHorizontalFlow();
            }
        }

        markDirty() {
            this._cachedWidth = undefined;
            this._cachedHeight = undefined;
            this._renderedBounds = undefined;

            if (this.children) this.children.forEach(c => c.markDirty());
        }

        applyStyles(stylesOrClassName: StylesOrClassName) {
            if (typeof stylesOrClassName === "string")
                stylesOrClassName = [dom.className(stylesOrClassName as string)];
            else if (stylesOrClassName instanceof Style)
                stylesOrClassName = [stylesOrClassName as Style];
            const styles = stylesOrClassName as StyleOrClassName[];
            if (styles) {
                for (const style of styles) {
                    if (style) 
                        this.applyStyle(style);
                }
            }
        }

        protected applyClassStyles() {
            if (this._renderedBounds) return;
            if (this.classes) this.classes.forEach(c => this.applyStylesForClass(c));
            if (this.children) this.children.forEach(c => c.applyClassStyles());
        }

        protected onDidReceiveBounds(bounds: BoundingBox) {
            // subclass
        }

        protected applyStylesForClass(className: string) {
            let classStyles: Style[];
            let current: Element = this;

            while (current) {
                if (current.sheet) {
                    classStyles = current.sheet.getStylesForClass(className);
                    if (classStyles) {
                        break;
                    }
                }

                current = current.parent;
            }

            if (classStyles && classStyles.length) {
                for (const style of classStyles) {
                    if (style) this.applyStyle(style);
                }
            }
        }

        protected renderVerticalFlow() {
            let y = this._renderedBounds.top + this.contentBox.padding.top + this.contentBox.border.top;

            let current: BoundingBox;

            for (const child of this.children) {
                current = this.contentBox.getContentBounds(this._renderedBounds, calculateWidth(child), calculateHeight(child));
                current.top = y;
                child.render(current);
                y += current.height;
            }
        }

        protected renderHorizontalFlow() {
            let x = this._renderedBounds.left + this.contentBox.padding.left + this.contentBox.border.left;
            let current: BoundingBox;

            for (const child of this.children) {
                current = this.contentBox.getContentBounds(this._renderedBounds, calculateWidth(child), calculateHeight(child));
                current.left = x;
                child.render(current);

                x += current.width;
            }
        }

        protected drawSelf(bounds: BoundingBox) {
            // subclass
        }

        protected applyStyle(styleOrClassName: StyleOrClassName) {
            if (typeof styleOrClassName === "string") {
                styleOrClassName = dom.className(styleOrClassName as string);
            }
            const style = styleOrClassName as Style;
            switch (style.name) {
                case StyleName.Width: this.width = style.value; return;
                case StyleName.Height: this.height = style.value; return;
                case StyleName.BorderColor: this.contentBox.borderColor = style.value; return;
                case StyleName.BorderLeft: this.contentBox.border.left = style.value; return;
                case StyleName.BorderRight: this.contentBox.border.right = style.value; return;
                case StyleName.BorderTop: this.contentBox.border.top = style.value; return;
                case StyleName.BorderBottom: this.contentBox.border.bottom = style.value; return;
                case StyleName.ContentAlign: this.contentBox.align = style.value; break;
                case StyleName.PaddingLeft: this.contentBox.padding.left = style.value; return;
                case StyleName.PaddingRight: this.contentBox.padding.right = style.value; return;
                case StyleName.PaddingTop: this.contentBox.padding.top = style.value; return;
                case StyleName.PaddingBottom: this.contentBox.padding.bottom = style.value; return;
                case StyleName.Padding:
                    this.contentBox.padding.left = style.value;
                    this.contentBox.padding.right = style.value;
                    this.contentBox.padding.top = style.value;
                    this.contentBox.padding.bottom = style.value;
                    break;
                case StyleName.Border:
                    this.contentBox.border.left = style.value;
                    this.contentBox.border.right = style.value;
                    this.contentBox.border.top = style.value;
                    this.contentBox.border.bottom = style.value;
                    break;
                case StyleName.ClassName:
                    if (!this.classes) this.classes = [];
                    this.classes.push(style.stringValue);
                    break;
            }
        }

        protected drawBorder() {
            if (this.contentBox.borderColor === 0) return;

            if (this.contentBox.border.left) {
                screen.fillRect(
                    this._renderedBounds.left - this.contentBox.border.left,
                    this._renderedBounds.top - this.contentBox.border.top,
                    this.contentBox.border.left,
                    this._renderedBounds.height + this.contentBox.border.top + this.contentBox.border.bottom,
                    this.contentBox.borderColor
                );
            }

            if (this.contentBox.border.right) {
                screen.fillRect(
                    this._renderedBounds.left + this._renderedBounds.width,
                    this._renderedBounds.top - this.contentBox.border.top,
                    this.contentBox.border.right,
                    this._renderedBounds.height + this.contentBox.border.top + this.contentBox.border.bottom,
                    this.contentBox.borderColor
                );
            }

            if (this.contentBox.border.top) {
                screen.fillRect(
                    this._renderedBounds.left - this.contentBox.border.left,
                    this._renderedBounds.top - this.contentBox.border.top,
                    this._renderedBounds.width + this.contentBox.border.left + this.contentBox.border.right,
                    this.contentBox.border.top,
                    this.contentBox.borderColor
                );
            }

            if (this.contentBox.border.bottom) {
                screen.fillRect(
                    this._renderedBounds.left - this.contentBox.border.left,
                    this._renderedBounds.top + this._renderedBounds.height,
                    this._renderedBounds.width + this.contentBox.border.left + this.contentBox.border.right,
                    this.contentBox.border.bottom,
                    this.contentBox.borderColor
                );
            }
        }
    }

    function calculateWidth(element: Element): number {
        if (!element) return screen.width;
        else if (element._cachedWidth != undefined) return element._cachedWidth;
        else if (element.width === WRAP) return getWRAPWidth(element);
        else if (element.width === FILL) return element._cachedWidth = contentWidth(element.parent);
        else return element._cachedWidth = element.width;
    }

    function calculateHeight(element: Element): number {
        if (!element) return screen.height;
        else if (element._cachedHeight != undefined) return element._cachedHeight;
        else if (element.height === WRAP) return getWRAPHeight(element);
        else if (element.height === FILL) return element._cachedHeight = contentHeight(element.parent);
        else return element._cachedHeight = element.height;
    }

    function getWRAPWidth(element: Element) {
        if (element._cachedWidth != undefined) return element._cachedWidth;

        let childWidth = 0;

        if (element.width !== WRAP && element.width !== FILL) {
            return element._cachedWidth = element.width;
        }
        else if (element.children) {
            if (element.verticalFlow) {
                let maxWidth = 0;
                for (const child of element.children) {
                    maxWidth = Math.max(getWRAPWidth(child), maxWidth)
                }
                childWidth = maxWidth;
            }
            else {
                let totalWidth = 0;
                for (const child of element.children) {
                    totalWidth += getWRAPWidth(child);
                }
                childWidth = totalWidth;
            }
        }

        childWidth += element.contentBox.padding.left +
            element.contentBox.padding.right +
            element.contentBox.border.left +
            element.contentBox.border.right;

        if (element.width === WRAP) {
            element._cachedWidth = childWidth;
        }

        return childWidth;
    }

    function getWRAPHeight(element: Element) {
        if (element._cachedHeight != undefined) return element._cachedHeight;

        let childHeight = 0;

        if (element.height !== WRAP && element.height !== FILL) {
            return element._cachedHeight = element.height;
        }
        else if (element.children) {
            if (element.verticalFlow) {
                let totalHeight = 0;
                for (const child of element.children) {
                    totalHeight += getWRAPHeight(child);
                }
                childHeight = totalHeight;
            }
            else {
                let maxHeight = 0;
                for (const child of element.children) {
                    maxHeight = Math.max(getWRAPHeight(child), maxHeight)
                }
                childHeight = maxHeight;
            }
        }

        childHeight += element.contentBox.padding.top +
            element.contentBox.padding.bottom +
            element.contentBox.border.top +
            element.contentBox.border.bottom;

        if (element.height === WRAP) {
            element._cachedHeight = childHeight;
        }

        return childHeight;
    }

    function contentWidth(element: Element) {
        if (!element) return screen.width;
        else {
            return calculateWidth(element) -
                element.contentBox.padding.left -
                element.contentBox.padding.right -
                element.contentBox.border.left -
                element.contentBox.border.right;
        }
    }

    function contentHeight(element: Element) {
        if (!element) return screen.height;
        else {
            return calculateHeight(element) -
                element.contentBox.padding.top -
                element.contentBox.padding.bottom -
                element.contentBox.border.top -
                element.contentBox.border.bottom;
        }
    }
}
