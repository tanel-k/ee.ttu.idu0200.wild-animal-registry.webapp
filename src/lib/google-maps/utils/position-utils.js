export const equalPositions = (p1, p2) => (
    (p1 && p2) && (p1.lat == p2.lat && p1.lng == p2.lng)
);