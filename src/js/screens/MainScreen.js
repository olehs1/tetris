import config from '../common/config';
import Screen from '../common/Screen';
import BoardModel from '../copmonents/board/BoardModel';
import Board from '../copmonents/board/Board';
import FigureFactory from '../copmonents/figure/FigureFactory';
import Background from "../copmonents/background/Background";
import {getLayoutData} from "../common/utils";

/**
 *  Main game logic
 */
export default class MainScreen extends Screen {
    constructor(game) {
        super();

        this.game = game;

        this.boardModel = null;
        this.figureFactory = null;
        this.figure = null;
        this.nextFigure = null;

        this.background = new Background();

        const {rows, cols, hiddenRows} = config.game;
        const {x, y} = getLayoutData('board');

        this.board = new Board({rows, cols, rowsOffset: hiddenRows, blockSize: config.board.blockSize});
        this.board.x = x;
        this.board.y = y;

        this.addChild(
            this.background,
            this.board
        );
    }

    /**
     * Reset game
     */
    enter(opts) {
        if (opts.restart || this.boardModel == null) {
            const {rows, hiddenRows, cols, fallSpeed, fallSpeedMin, fallSpeedupStep, fallSpeedupDelay, dropModifier} = config.game;

            this.boardModel = new BoardModel(rows + hiddenRows, cols);
            this.figureFactory = new FigureFactory();
            this.figure = null;
            this.figureFallSpeed = fallSpeed;
            this.figureFallSpeedMin = fallSpeedMin;
            this.figureFallSpeedupStep = fallSpeedupStep;
            this.figureFallSpeedupDelay = fallSpeedupDelay;
            this.figureDropModifier = dropModifier;
            this.figureFallTimer = this.figureFallSpeed;
            this.figureFallSpeedupTimer = this.figureFallSpeedupDelay;
            this.score = 0;

            this.background.resetScore();
            this.createFigure();
        }
    }

    /**
     * Main update funcion
     * @param {Number} dt pixi timer deltaTime
     */
    update(dt) {
        const {escape, space} = this.game.key;

        if (escape.isPressed() || space.isPressed()) {
            this.game.setState('pause', {
                keepVisible: true,
                score:{
                    points: this.score
                }});
        }

        if (this.figure) {
            this.updateFigure();
        }

        this.board.updateFromBoard(this.boardModel);
        this.board.updateFromFigure(this.figure);
    }

    /**
     * Create new active figure and test for end game condition
     */
    createFigure() {
        if(!this.nextFigure){
            this.figure = this.figureFactory.create();
            this.nextFigure = this.figureFactory.create();
        } else {
            this.figure = this.nextFigure;
            this.nextFigure = this.figureFactory.create();
        }

        this.background.setNextFigure(this.nextFigure);

        if (this.boardModel.collides(this.figure.absolutePos(0, 0))) {
            this.lockFigure();
            this.gameOver();
        }
    }

    /**
     * merge active figure with board
     */
    lockFigure() {
        let fullRows = this.boardModel.setAll(this.figure.absolutePos(), this.figure.color);
        this.figure = null;

        if (fullRows.length > 0) {
            this.updateScore(fullRows.length);
            this.boardModel.cleanRows(fullRows);
        }
    }

    /**
     * handle game ending
     */
    gameOver() {
        this.game.setState('gameover', {keepVisible: true});
    }

    /**
     * Update terominos falling and handle user input
     */
    updateFigure() {
        const {up, left, right, down} = this.game.key;
        if (up.isPressed()) {
            if (!this.boardModel.collides(this.figure.absolutePos(0, 0, true))) {
                this.figure.rotate();
            } else if (!this.boardModel.collides(this.figure.absolutePos(0, -1, true))) {
                --this.figure.col;
                this.figure.rotate();
            } else if (!this.boardModel.collides(this.figure.absolutePos(0, 1, true))) {
                ++this.figure.col;
                this.figure.rotate();
            }
        }

        if (left.isPressed() && !this.boardModel.collides(this.figure.absolutePos(0, -1))) {
            --this.figure.col;
        }
        if (right.isPressed() && !this.boardModel.collides(this.figure.absolutePos(0, 1))) {
            ++this.figure.col;
        }

        let tickMod = down.pressed ? this.figureDropModifier : 1;
        if ((--this.figureFallSpeedupTimer) <= 0) {
            this.figureFallSpeed = Math.max(this.figureFallSpeedMin, this.figureFallSpeed - this.figureFallSpeedupStep);
            this.figureFallSpeedupTimer = this.figureFallSpeedupDelay;
        }
        if ((this.figureFallTimer -= tickMod) <= 0) {
            if (this.boardModel.collides(this.figure.absolutePos(1, 0))) {
                this.lockFigure();
                this.createFigure();
            } else {
                ++this.figure.row;
                this.figureFallTimer = this.figureFallSpeed;
            }
        }
    }

    /**
     * Update score based on number of cleared rows
     * @param {Number} rows count of rows cleared in one move
     */
    updateScore(rows) {
        this.score += Math.pow(2, rows - 1);
        this.background.setScore(this.score);
    }
}
