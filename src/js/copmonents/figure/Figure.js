import {SHAPE_COLORS, SHAPES} from "./Shapes";

/**
 * Represent figure with position and rotation
 */
export default class Figure {
    constructor({shapeType, col = 0, row = 0}) {
        this.shapeType = shapeType;
        this.color = SHAPE_COLORS[shapeType];
        this.shapeRotation = 0;
        this.shape = SHAPES[this.shapeType][this.shapeRotation];

        this.row = row;
        this.col = col;
    }

    rotate() {
        this.shapeRotation = (this.shapeRotation + 1) % 4;
        this.shape = SHAPES[this.shapeType][this.shapeRotation];
    }

    /**
     * Return absolute (real on-grid position) positions of figure blocks,
     * without changing current position.
     * Additional arguments are used to modify returned positions and simulate movement.
     * @param   {Number} shiftRow = 0     shifts row position
     * @param   {Number} shiftCol = 0     shifts column position
     * @param   {Boolean} rotate = false  use next shape rotation
     * @returns {Array} list of block positions, each being a two element list [row, col]
     */
    absolutePos(shiftRow = 0, shiftCol = 0, rotate = false) {
        let shape = rotate ? SHAPES[this.shapeType][(this.shapeRotation+1)%4] : this.shape;
        return shape.map(pos => [this.row + shiftRow + pos[0],
                                 this.col + shiftCol + pos[1]]);
    }
}
