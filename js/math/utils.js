function getNearestPoint(loc, points, threshold) {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for (const point of points) {
        const dist = distance(point, loc);
        if (dist < minDist && dist < threshold) {
            nearest = point;
            minDist = dist

        }

    }
    return nearest;
}
function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}
function add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}
function sub(p1, p2) {
    return new Point(p2.x - p1.x, p2.y - p1.y);
}