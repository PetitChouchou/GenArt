
export type Coord = [number, number]
export type Rect = [Coord, Coord, Coord, Coord]
export type Triangle = [Coord, Coord, Coord]
export type Shape = Rect | Triangle
export type Quadrants = [Rect, Rect, Rect, Rect]
export type Polygon = Array<Coord>

/**
 * [number]: X
 * [number]: Y
 * [number]: Diameter
 */
export type Circle = [number, number, number]