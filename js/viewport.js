class ViewPort {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.zoom = 1;
        this.center = new Point(canvas.height / 2, canvas.width / 2);
        this.offset = new Point(0, 0);//default viewing angle
        this.dragging = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false

        }
        this.addEventListener();
    }
    getOffset() {
        return add(this.offset, this.dragging.offset);
    }
    getMouse(evt) {
        return new Point(
            evt.offsetX * this.zoom,
            evt.offsetY * this.zoom
        )
    }
    addEventListener() {
        this.canvas.addEventListener("mousewheel", this.handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
    handleMouseDown(evt) {
        if (evt.button == 1) {
            this.dragging.active = true;
            this.dragging.start = this.getMouse(evt);
            console.log("middle button pressed")
        }
    }
    handleMouseMove(evt) {
        if (this.dragging.active) {
            this.dragging.end = this.getMouse(evt);
            this.dragging.offset = sub(this.dragging.start, this.dragging.end)

        }
    }
    handleMouseUp(evt) {
        if (this.dragging.active) {
            this.offset = add(this.offset, this.dragging.offset);

            //since the global offset which defines the main viewing angle is changed we can change all the attributes related to drag
            this.dragging = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            };

        }

    }
    handleMouseWheel(evt) {
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));

        console.log(this.zoom);

    }
}