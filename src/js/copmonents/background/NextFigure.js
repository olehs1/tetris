import {Container, Loader, Sprite} from 'pixi.js';
import config from "../../common/config";

const loader = Loader.shared;

export default class NextFigure extends Container{
    constructor() {
        super();

        this.textures = loader.resources.blocks.textures;

        this.create();
    }

    create() {
        this.sprites = [];
        this.spriteContainer = new Container();

        const blockSize = config.board.blockSize;

        for(let i = 0 ; i < 4 ; i++){
            this.sprites[i] = [];
            for(let j = 0 ; j < 4 ; j++){
                let block = new Sprite(this.textures.background);
                block.x = j * blockSize;
                block.y = i * blockSize;

                this.sprites[i][j] = block;

                this.spriteContainer.addChild(block);
            }
        }

        this.addChild(this.spriteContainer);
    }

    set(figure) {
        const {shape, color} = figure;

        this.clear();

        shape.forEach(([i, j]) => {
            const figure = this.sprites[i][j];
            figure.alpha = 1;
            figure.texture = this.textures[color];
        });
    }

    clear() {
        for(let i = 0 ; i < 4 ; i++){
            for(let j = 0 ; j < 4 ; j++) {
                this.sprites[i][j].alpha = 0;
            }
        }
    }
}
