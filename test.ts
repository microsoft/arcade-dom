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
                text(name)
            ]),
            [className("label-box"), index === selected ? className("label-selected") : null]
        ))
    );

    el.defineStyleClass("label-box", [width(100), color(1), padding(2), alignLeft()])
    el.defineStyleClass("label-selected", [color(3)]);
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

    game.onShade(function () {
        el.draw();
    });
}

function testV() {
    const elg = () => verticalFlow([
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
            `),
            box(statsView(), [border(2)]),
            box(detailView(), [border(4), borderColor(3)])
        ])
    ]);

    game.onShade(function () {
        const el = elg();
        el.draw();
    });
}

function statsView() {
    const nameStyle = [alignLeft(), width(FILL)];
    const statStyle = [alignRight(), width(FILL)];
    return box(
        verticalFlow([
            box(text("ATTACK"), nameStyle),
        box(text(Math.randomRange(10, 20).toString(), [smallFont()]), statStyle),
            box(text("DEFENSE"), nameStyle),
            box(text("86", [smallFont()]), statStyle),
            box(text("SPEED"), nameStyle),
            box(text("152", [smallFont()]), statStyle),
            box(text("SPECIAL"), nameStyle),
        box(text("132", [smallFont()]), statStyle)
    ], [width(FILL)]),
        [color(1), width(60), padding(2)]);
}

function detailView() {
    const nameStyle = [alignLeft(), width(FILL)];
    const detailStyle = [alignLeft(), width(FILL), paddingLeft(10)];

    return box(
        verticalFlow([
            box(text("TYPE1/"), nameStyle),
            box(text("ELECTRIC", [smallFont()]), detailStyle),
            box(text(""), nameStyle),
            box(text("", [smallFont()]), detailStyle),
            box(text("no/"), nameStyle),
            box(text("44196", [smallFont()]), detailStyle),
            box(text("OT/"), nameStyle),
            box(text("Richard", [smallFont()]), detailStyle),
        ], [width(FILL)]),
        [color(1), width(60), padding(2)]);
}

function nameView() {
    return box(
        verticalFlow([
            box(text("SPARKY"), [width(FILL), alignLeft()]),
            box(hpView(), [alignRight(), paddingTop(1), paddingBottom(1), width(FILL)]),
            box(text("STATUS/OK"), [width(FILL), alignLeft()]),
        ], [width(FILL)]),
        [color(1), padding(2), width(70)]);
}

function hpView() {
    return horizontalFlow([
        box(text("HP:", [smallFont()]), [paddingTop(3)]),
        verticalFlow([
            box(text("L48", [smallFont()]), [width(FILL), alignCenter()]),
            box(undefined, [width(FILL), height(4), color(3), border(1)]),
            box(text("95/138", [smallFont()]), [width(FILL), alignRight()])
        ], [width(30), paddingBottom(5)])
    ]);
}

testV();

}