class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;

    }
    addPoint(point) {
        this.points.push(point);
    }
    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
        //points are the points pushed into the array
    }
    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        else {
            return false;
        }
    }
    addSegment(segment) {
        this.segments.push(segment);
    }
    containsSegment(segment) {
        return this.segments.find((s) => s.equals(segment))
    }
    tryAddSegment(segment) {
        if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
            this.addSegment(segment);
            return true;
        }
        return false;

    }
    removeSegment(seg) {

        this.segments.splice(this.segments.indexOf(seg), 1)

    }
    removePoint(point) {
        this.points.splice(this.points.indexOf(point), 1);
        this.segments.splice(this.getSegmentWithPoint(point), 1);

    }
    getSegmentWithPoint(point) {
        let segs = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) { segs.push(seg); }
        }
        return segs;//last ma k hunxa vanesi 2 ta point segs ma push vaxa so euta segment
    }
    dispose() {
        this.segments.length = 0;
        this.points.length = 0;
    }
    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx)
        }
        for (const point of this.points)
            point.draw(ctx);

    }

}