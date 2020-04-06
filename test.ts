namespace dom {

function listComponent(items: string[], selected: number) {
    const el = verticalFlow(
        items.map((name, index) => box(
            dom.horizontalFlow([
                imageElement(img`
                    . . . . . . . . . . b 5 b . . .
                    . . . . . . . . . b 5 b . . . .
                    . . . . . . b b b b b b . . . .
                    . . . . . b b 5 5 5 5 5 b . . .
                    . . . . b b 5 d 1 f 5 d 4 c . .
                    . . . . b 5 5 1 f f d d 4 4 4 b
                    . . . . b 5 5 d f b 4 4 4 4 b .
                    . . . b d 5 5 5 5 4 4 4 4 b . .
                    . . b d d 5 5 5 5 5 5 5 5 b . .
                    . b d d d d 5 5 5 5 5 5 5 5 b .
                    b d d d b b b 5 5 5 5 5 5 5 b .
                    c d d b 5 5 d c 5 5 5 5 5 5 b .
                    c b b d 5 d c d 5 5 5 5 5 5 b .
                    . b 5 5 b c d d 5 5 5 5 5 d b .
                    b b c c c d d d d 5 5 5 b b . .
                    . . . c c c c c c c c b b . . .
                `),
                text(name, paddingLeft(8))
            ]),
            ["label-box", index === selected ? "label-selected" : null]
        ))
    );

    el.defineStyleClass("label-box", [width(100), color(1), padding(2), alignLeft()])
    el.defineStyleClass("label-selected", color(3));
    return el;
}

function testList() {
    const data = ["ATTACK", "DEFENSE", "SPEED", "SPECIAL"];
    let selected = 0;
    let el = listComponent(data, selected);

    controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
        selected = (selected + data.length - 1) % data.length
        el = listComponent(data, selected);
    });

    controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
        selected = (selected + 1) % data.length
        el = listComponent(data, selected);
    });

    game.onPaint(function () {
        el.draw();
    });
}

function testV() {
    const elg = () => {
        const el = verticalFlow([
            box(nameView(), [width(FILL), alignRight(), borderRight(2)]),
                horizontalFlow([
                    imageElement(img`
                        . . . . . . . . . . b 5 b . . .
                        . . . . . . . . . b 5 b . . . .
                        . . . . . . b b b b b b . . . .
                        . . . . . b b 5 5 5 5 5 b . . .
                        . . . . b b 5 d 1 f 5 d 4 c . .
                        . . . . b 5 5 1 f f d d 4 4 4 b
                        . . . . b 5 5 d f b 4 4 4 4 b .
                        . . . b d 5 5 5 5 4 4 4 4 b . .
                        . . b d d 5 5 5 5 5 5 5 5 b . .
                        . b d d d d 5 5 5 5 5 5 5 5 b .
                        b d d d b b b 5 5 5 5 5 5 5 b .
                        c d d b 5 5 d c 5 5 5 5 5 5 b .
                        c b b d 5 d c d 5 5 5 5 5 5 b .
                        . b 5 5 b c d d 5 5 5 5 5 d b .
                        b b c c c d d d d 5 5 5 b b . .
                        . . . c c c c c c c c b b . . .
                    `, borderColor(5)),
                    box(statsView(), border(2)),
                    box(detailView(), [border(4), borderColor(3)])
                ])
            ]);
        el.defineStyleClass("small", smallFont())
        return el; 
    }
    game.onShade(function () {
        const el = elg();
        el.draw();
    });
}

function statsView() {
    const el = box(
        verticalFlow([
                            imageElement(img`
                    . . . . . . . . . . b 5 b . . .
                    . . . . . . . . . b 5 b . . . .
                    . . . . . . b b b b b b . . . .
                    . . . . . b b 5 5 5 5 5 b . . .
                    . . . . b b 5 d 1 f 5 d 4 c . .
                    . . . . b 5 5 1 f f d d 4 4 4 b
                    . . . . b 5 5 d f b 4 4 4 4 b .
                    . . . b d 5 5 5 5 4 4 4 4 b . .
                    . . b d d 5 5 5 5 5 5 5 5 b . .
                    . b d d d d 5 5 5 5 5 5 5 5 b .
                    b d d d b b b 5 5 5 5 5 5 5 b .
                    c d d b 5 5 d c 5 5 5 5 5 5 b .
                    c b b d 5 d c d 5 5 5 5 5 5 b .
                    . b 5 5 b c d d 5 5 5 5 5 d b .
                    b b c c c d d d d 5 5 5 b b . .
                    . . . c c c c c c c c b b . . .
                `, paddingBottom(4)),
            box(text("ATTACK"), "name"),
        box(text(Math.randomRange(10, 20).toString(), "small"), "stat"),
            box(text("DEFENSE"), "name"),
            box(text("86", "small"), "name"),
            box(text("SPEED"), "name"),
            box(text("152", smallFont()), "name"),
            box(text("SPECIAL"), "name"),
        box(text("132", "small"), "stat")
    ], [width(FILL)]),
        [color(1), width(60), padding(2)]);
    el.defineStyleClass("name", [alignLeft(), width(FILL)]);
    el.defineStyleClass("stat", [alignRight(), width(FILL)]);
    return el;
}

function detailView() {
    const nameStyle = [alignLeft(), width(FILL)];
    const detailStyle = [alignLeft(), width(FILL), paddingLeft(10)];

    return box(
        verticalFlow([
            box(text("TYPE1/"), nameStyle),
            box(text("ELECTRIC", smallFont()), detailStyle),
            box(text(""), nameStyle),
            box(text("", smallFont()), detailStyle),
            box(text("no/"), nameStyle),
            box(text("44196", smallFont()), detailStyle),
            box(text("OT/"), nameStyle),
            box(text("Richard", smallFont()), detailStyle),
        ], width(FILL)),
        [color(1), width(60), padding(2)]);
}

function nameView() {
    return box(
        verticalFlow([
            imageElement(img`
                    . . . . . . . . . . b 5 b . . .
                    . . . . . . . . . b 5 b . . . .
                    . . . . . . b b b b b b . . . .
                    . . . . . b b 5 5 5 5 5 b . . .
                    . . . . b b 5 d 1 f 5 d 4 c . .
                    . . . . b 5 5 1 f f d d 4 4 4 b
                    . . . . b 5 5 d f b 4 4 4 4 b .
                    . . . b d 5 5 5 5 4 4 4 4 b . .
                    . . b d d 5 5 5 5 5 5 5 5 b . .
                    . b d d d d 5 5 5 5 5 5 5 5 b .
                    b d d d b b b 5 5 5 5 5 5 5 b .
                    c d d b 5 5 d c 5 5 5 5 5 5 b .
                    c b b d 5 d c d 5 5 5 5 5 5 b .
                    . b 5 5 b c d d 5 5 5 5 5 d b .
                    b b c c c d d d d 5 5 5 b b . .
                    . . . c c c c c c c c b b . . .
                `),
            box(text("SPARKY"), [width(FILL), alignLeft()]),
            box(hpView(), [alignRight(), paddingTop(1), paddingBottom(1), width(FILL)]),
            box(text("STATUS/OK"), [width(FILL), alignLeft()]),
        ], width(FILL)),
        [color(1), padding(2), width(70)]);
}

function hpView() {
    return horizontalFlow([
        box(text("HP:", smallFont()), [paddingTop(3)]),
        verticalFlow([
            box(text("L48", smallFont()), [width(FILL), alignCenter()]),
            box(undefined, [width(FILL), height(4), color(3), border(1)]),
            box(text("95/138", smallFont()), [width(FILL), alignRight()])
        ], [width(30), paddingBottom(5)])
    ]);
}

function testBoxModel() {
    const im = img`
        . . . . . . . . . . b 5 b . . .
        . . . . . . . . . b 5 b . . . .
        . . . . . . . . . b c . . . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . . . . b b 5 d 1 f 5 5 d f . .
        . . . . b 5 5 1 f f 5 d 4 c . .
        . . . . b 5 5 d f b d d 4 4 . .
        b d d d b b d 5 5 5 4 4 4 4 4 b
        b b d 5 5 5 b 5 5 4 4 4 4 4 b .
        b d c 5 5 5 5 d 5 5 5 5 5 b . .
        c d d c d 5 5 b 5 5 5 5 5 5 b .
        c b d d c c b 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `;
    const elg = () => {
        const el = verticalFlow([
            text("text"),
            text("text", [color(1), border(2), padding(3)]),
            text("text", [color(2), borderLeft(2), borderTop(3), borderRight(4), borderBottom(5)]),
            text("text - padding 60", [color(1), paddingLeft(60)]),
            text("color red", color(2)),
            horizontalFlow([
                text("p0", [color(4), border(1)]),
                text("pl", [color(2), border(1), paddingLeft(8)]),
                text("pr", [color(2), border(1), paddingRight(8)]),
                text("pt", [color(3), border(1), paddingTop(8)]),
                text("pb", [color(3), border(1), paddingBottom(8)])
            ], color(1)),
            horizontalFlow([
                imageElement(im, [color(4), border(1)]),
                imageElement(im, [color(2), border(1), paddingLeft(8)]),
                imageElement(im, [color(2), border(1), paddingRight(8)]),
                imageElement(im, [color(3), border(1), paddingTop(8)]),
                imageElement(im, [color(3), border(1), paddingBottom(8)])
            ], color(1))

        ], alignLeft());
        return el; 
    }
    game.onShade(function () {
        const el = elg();
        el.draw();
    });
}

//testList();
// testV();
testBoxModel();

}