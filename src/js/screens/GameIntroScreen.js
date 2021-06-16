import {Container, Loader, Sprite} from 'pixi.js';
import AbstractMenuScreen from '../common/AbstractMenuScreen';
import config from "../common/config";
import {defaultStyle} from "../common/styles";

const loader = Loader.shared;

/**
 * Display game intro screen
 */
export default class GameIntroScreen extends AbstractMenuScreen {
    constructor(game) {
        super();

        this.createBackground();
        this.init(game, 'Tetris');

        this.title.style = {
            ...defaultStyle,
            fontSize: 50
        }

        this.game = game;
    }

    createBackground() {
        const {textures} = loader.resources.blocks;
        const {blockSize} = config;
        const {width, height} = config.game;
        const cols = Math.ceil(width / blockSize);
        const cells = Math.ceil(height / blockSize);
        const spriteContainer = new Container();
        const texturesList = Object.keys(textures);

        for(let i = 0; i < cols ; i++){
            for(let j = 0; j < cells ; j++){
                const texture = texturesList[Math.floor(Math.random() * texturesList.length)];
                const block = new Sprite(textures[texture]);
                block.x = i * blockSize;
                block.y = j * blockSize;
                spriteContainer.addChild(block);
            }
        }

        this.addChild(spriteContainer);
    }

    update(dt) {
        super.update(dt);

        if (this.game.key.space.isPressed()) {
            this.game.setState('main', {restart: true});
        }
    }
}
