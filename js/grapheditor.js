class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport;
        this.myCanvas = viewport.canvas;
        this.graph = graph;
        this.ctx = myCanvas.getContext("2d");
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;
        this.addEventListener();

    }
    addEventListener() {
        this.myCanvas.addEventListener("mousedown", (evt) => {
            if (evt.button == 2) {
                if (this.hovered) {
                    return this.removePoint(this.hovered);
                }
                else {
                    this.selected = null;//implementing random right click to unselect the points
                }
            }
            if (evt.button == 0) {
                this.mouse = this.viewport.getMouse(evt);

                this.hovered = getNearestPoint(this.mouse, this.graph.points, 15 * this.viewport.zoom);
                if (this.hovered) {
                    this.select(this.hovered);
                    this.selected = this.hovered;
                    this.dragging = true;
                    return;
                }
                this.graph.addPoint(this.mouse);
                this.select(this.mouse)

                this.selected = this.mouse;
                this.hovered = this.mouse;

            }
        })

        this.myCanvas.addEventListener("mousemove", (evt) => {
            this.mouse = this.viewport.getMouse(evt);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 15 * this.viewport.zoom);
            if (this.dragging == true) {
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;

            }

        })
        this.myCanvas.addEventListener("contextmenu", (evt) => {
            evt.preventDefault()
        }
        )
        this.myCanvas.addEventListener("mouseup", (evt) => {
            this.dragging = false;
        }
        )

    }
    select(point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
    }
    removePoint(point) {
        console.log("remove point of ge")
        this.graph.removePoint(point);
        this.selected = null;
        this.hovered = null;


    }
    display() {
        this.graph.draw(this.ctx);
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(intent, this.selected).draw(this.ctx, { dash: [3, 3] });
            this.selected.draw(this.ctx, { outline: true });

        }
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });

        }
    }
}