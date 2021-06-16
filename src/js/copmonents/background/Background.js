import {Container, Loader, Sprite, Text} from 'pixi.js';
import NextFigure from "./NextFigure";
import Score from "./Score";
import {defaultStyle} from "../../common/styles";
import {getLayoutData} from "../../common/utils";
const loader = Loader.shared;

export default class Background extends Container{
    constructor() {
        super();

        this.createBackgroundSprite();
        this.createNextFigure();
        this.createScore();
        this.createTitle();
        this.createTutorial()
    }

    createBackgroundSprite() {
        const {background} = loader.resources
        const sprite = new Sprite(background.texture);
        this.addChild(sprite);
    }

    createNextFigure() {
        const {x, y, scale} = getLayoutData('nextFigure');
        this.nextFigure = new NextFigure();
        this.nextFigure.x = x;
        this.nextFigure.y = y;
        this.nextFigure.scale.set(scale);

        this.addChild(this.nextFigure);
    }

    createScore() {
        const {x, y} = getLayoutData('score');
        this.score = new Score();
        this.score.x = x;
        this.score.y = y;

        this.addChild(this.score);
    }

    createTitle() {
        const {x, y} = getLayoutData('title');
        const title = new Text('Tetris', defaultStyle);
        title.anchor.set(0.5);
        title.x = x;
        title.y = y;
        this.addChild(title);
    }

    createTutorial() {
        const {x, y} = getLayoutData('tutorial');
        const tutorial = new Text('Move: \n ← → \n\n Rotate: \n ↑ \n\n SpeedUp: \n ⬇', defaultStyle);
        tutorial.anchor.set(0.5);
        tutorial.x = x;
        tutorial.y = y;
        this.addChild(tutorial);

        window.t = tutorial;
    }

    setNextFigure(figure) {
        this.nextFigure.set(figure);
    }

    setScore(score) {
        this.score.set(score);
    }

    resetScore() {
        this.score.reset();
    }
}
