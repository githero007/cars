class GraphEditor {
    constructor(myCanvas, graph) {
        this.myCanvas = myCanvas;
        this.graph = graph;
        this.ctx = myCanvas.getContext("2d");
        this.selected = null;
        this.hovered = null;
        this.addEventListener();

    }
    addEventListener() {
        this.myCanvas.addEventListener("mousedown", (evt) => {
            if (evt.button == 2) {
                if (this.hovered) {
                    return this.#removePoint(this.hovered);
                }
            }
            if (evt.button == 0) {
                const mouse = new Point(evt.offsetX, evt.offsetY);

                this.hovered = getNearestPoint(mouse, this.graph.points);
                if (this.hovered) {
                    this.selected = this.hovered
                    return;
                }
                this.graph.addPoint(mouse);
                this.selected = mouse;
            }
        })
        this.myCanvas.addEventListener("mousedown", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY);

            this.hovered = getNearestPoint(mouse, this.graph.points);

        })
        this.myCanvas.addEventListener("contextmenu", (evt) => {
            evt.preventDefault()
        }
        )

    }
    #removePoint(point) {
        this.graph.removePoint(point);
        this.selected = null;
        this.hovered = null;
    }
    display() {
        this.graph.draw(this.ctx);
        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });

        }
        if (this.hovered) {
            this.selected.draw(this.ctx, { fill: true });

        }
    }
}