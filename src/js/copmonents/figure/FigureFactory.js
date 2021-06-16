import Figure from './Figure';
import {SHAPE_COLORS} from "./Shapes";
import config from "../../common/config";

const shapeTypes = Object.keys(SHAPE_COLORS).join('');

/**
 * Provide figure shapes queue, that gives fair randomness,
 * but lacks iritating single shape long strikes.
 */
export default class FigureFactory {
    constructor() {
        this.queue = [];
        this.refillQueue();
    }

    /**
     * refill figure shapes queue, with semi-random ordering
     */
    refillQueue() {
        let a = (shapeTypes+shapeTypes+shapeTypes+shapeTypes).split('');
        for (let i = a.length; i > 0; --i) {
            let j = Math.floor(Math.random() * i);
            let tmp = a[i-1];
            a[i-1] = a[j];
            a[j] = tmp;
        }
        this.queue = a.concat(this.queue);
    }

    create() {
        if(this.queue.length < 2) {
            this.refillQueue();
        }
        const shapeType = this.queue.pop();
        const {cols} = config.game;
        const row = 0;
        const col = cols / 2 - 2;

        return new Figure({ shapeType, col, row });
    }
}
