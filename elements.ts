namespace dom {
    export class ShapeElement extends Element {

        constructor() {
            super();
        }

        protected drawSelf(bounds: BoundingBox) {
            if (this.contentBox.color) this.drawShape(bounds);
        }

        protected drawShape(bounds: BoundingBox) {   
            screen.drawRect(bounds.left, bounds.top, bounds.width, bounds.height, this.contentBox.color);
        }
    }

    export class BoxElement extends ShapeElement {
        protected drawShape(bounds: BoundingBox) {
            screen.fillRect(bounds.left, bounds.top, bounds.width, bounds.height, this.contentBox.color);
        }
    }

    export class TextElement extends ShapeElement {
        text: string;
        font: Font;

        constructor(text?: string) {
            super();
            this.setText(text);
            this.contentBox.color = 1;
            this.font = Font.Normal;
        }

        setText(text: string) {
            this.text = text;
            this.updateBounds();
        }

        applyStyle(style: Style) {
            if (style.name === StyleName.Font) {
                this.font = style.value;
                this.updateBounds();
            }
            else {
                super.applyStyle(style);
            }
        }

        protected updateBounds() {
            const f = this.renderFont();
            this.height = f.charHeight;
            if (this.text) {
                this.width = this.text.length * f.charWidth;
            }
            else {
                this.width = 0;
            }
        }

        protected drawShape(bounds: BoundingBox) {
            screen.print(this.text, bounds.left, bounds.top, this.contentBox.color, this.renderFont());
        }

        protected renderFont() {
            if (this.font === Font.Small) {
                return image.font5
            }
            return image.font8;
        }
    }

    export class ScrollingTextElement extends TextElement {
        protected partialCanvas: Image;
        protected offset: number;
        protected pauseTime: number;
        protected stage: number;
        protected timer: number;
        protected maxCharacters: number;
        protected maxOffset: number;
        protected scrolling: boolean;

        constructor(text: string, maxWidth: number) {
            super(text);

            this.pauseTime = 1000;
            this.timer = this.pauseTime;
            this.stage = 0;
            this.offset = 0;
            this.width = maxWidth;

            this.updateBounds();
        }

        applyStyle(style: Style) {
            if (style.name === StyleName.Animate) {
                this.scrolling = !!style.value
            }
            else {
                super.applyStyle(style);
            }
        }

        protected updateBounds() {
            const f = this.renderFont();
            this.height = f.charHeight;

            const fullLength = this.text.length * f.charWidth;
            this.maxCharacters = Math.idiv(this.width, f.charWidth);
            this.maxOffset = fullLength - this.maxCharacters * f.charWidth;
            this.partialCanvas = image.create(f.charWidth, f.charHeight);
        }

        protected drawShape(bounds: BoundingBox) {
            const font = this.renderFont();
            const startIndex = Math.idiv(this.offset, font.charWidth);
            const letterOffset = startIndex * font.charWidth - this.offset;

            if (!this.scrolling) {
                this.offset = 0;
            }
            else if (this.stage === 1) {
                this.offset++;
                if (this.offset >= this.maxOffset) {
                    this.stage++;
                    this.offset = Math.max(this.maxOffset, 0);
                }
            }
            else {
                if (this.stage === 0) {
                    this.offset = 0;
                }
                else if (this.stage === 2) {
                    this.offset = Math.max(this.maxOffset, 0);
                }

                this.timer -= game.currentScene().eventContext.deltaTimeMillis;

                if (this.timer < 0) {
                    this.stage = (this.stage + 1) % 3;
                    this.timer = this.pauseTime;
                }
            }

            if (letterOffset) {
                this.partialCanvas.fill(0);
                this.partialCanvas.print(this.text.charAt(startIndex), letterOffset, 0, this.contentBox.color, font)
                screen.drawTransparentImage(this.partialCanvas, bounds.left, bounds.top);
            }
            else {
                screen.print(this.text.charAt(startIndex), bounds.left, bounds.top, this.contentBox.color, font);
            }

            for (let i = 1; i < this.maxCharacters; i++) {
                screen.print(
                    this.text.charAt(startIndex + i),
                    bounds.left + i * font.charWidth + letterOffset,
                    bounds.top,
                    this.contentBox.color,
                    font
                );
            }
        }
    }

    export class ImageElement extends BoxElement {
        protected src: Image;

        constructor(src: Image) {
            super();

            this.src = src;
            this.updateBounds();
        }

        protected updateBounds() {
            this.height = this.src.height;
            this.width = this.src.width;
        }

        protected drawShape(bounds: BoundingBox) {
            screen.drawTransparentImage(this.src, bounds.left, bounds.top);
        }
    }

    export class DynamicElement extends Element {
        protected drawFunction: (bounds: BoundingBox) => void;

        constructor(drawFunction: (bounds: BoundingBox) => void) {
            super();
            this.drawFunction = drawFunction;
        }

        protected drawSelf(bounds: BoundingBox) {
            this.drawFunction(bounds);
        }
    }

    export class LongTextElement extends Element {
        protected dialog: game.Dialog;
        protected text: string;

        constructor(text: string) {
            super();

            this.text = text;
        }

        protected onDidReceiveBounds(bounds: BoundingBox) {
            this.dialog = new game.Dialog(bounds.width, bounds.height, null, null, image.create(1, 1))
            this.dialog.setText(this.text);
            this.dialog.update();
        }

        protected drawSelf(bounds: BoundingBox) {
            screen.drawTransparentImage(this.dialog.image, bounds.left, bounds.top);
        }
    }
}