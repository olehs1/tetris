import {Container, Text} from 'pixi.js';
import {defaultStyle} from "../../common/styles";

export default class Score extends Container {
    constructor() {
        super();
        this.value = 0;
        this.scoreText = new Text('', defaultStyle);
        this.scoreText.anchor.set(0.5);

        this.addChild(this.scoreText);
    }

    set(value) {
        this.value += value;
        this.scoreText.text = `Score: ${this.value}`;
    }

    reset() {
        this.value = 0;
        this.set(this.value);
    }
}
