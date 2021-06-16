import {Text, Graphics} from 'pixi.js';
import Screen from './Screen';
import {defaultStyle} from "./styles";

export default class AbstractMenuScreen extends Screen {
    init(game, titleText = 'Tetris', infoText = 'Press SPACE to play') {
        this.game = game;

        this.background = new Graphics();
        this.background.beginFill(0x000000, 0.5);
        this.background.drawRect(0, 0, this.game.app.renderer.width, this.game.app.renderer.height);
        this.background.endFill();
        this.addChild(this.background);

        this.title = new Text(titleText, defaultStyle);
        this.title.anchor.set(0.5);
        this.title.x = this.game.app.view.width * 0.5;
        this.title.y = this.game.app.renderer.height * 0.20;
        this.addChild(this.title);

        this.info = new Text(infoText, defaultStyle);
        this.info.anchor.set(0.5);
        this.info.x = this.game.app.view.width * 0.5;
        this.info.y = this.game.app.renderer.height * 0.90;
        this.addChild(this.info);
    }
}
