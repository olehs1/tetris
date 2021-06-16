import Keyboard from './common/Keyboard';
import MainScreen from './screens/MainScreen';
import GameIntroScreen from './screens/GameIntroScreen';
import GameOverScreen from './screens/GameOverScreen';
import GamePausedScreen from './screens/GamePausedScreen';

/**
 * Represent whole game and handles state changes
 */
export default class Game {
    constructor(app) {
        this.app = app;

        this.gameStates = {};
        this.state = null;
    }

    /**
     * start game, execute after all assets are loaded
     */
    start() {
        this.key = new Keyboard();

        this.addState('main', new MainScreen(this));

        this.addState('pause', new GamePausedScreen(this));
        this.addState('intro', new GameIntroScreen(this));
        this.addState('gameover', new GameOverScreen(this));

        this.setState('intro');

        this.app.ticker.add(this.update, this);
    }

    /**
     * Add new state
     * @param {String} stateName
     * @param {State} state     new state instance
     */
    addState(stateName, state) {
        this.gameStates[stateName] = state;
        this.app.stage.addChild(state);
    }

    /**
     * Handle game update
     * @param {Number} dt PIXI timer deltaTime
     */
    update(dt) {
        if (this.state) {
            this.state.update(dt);
        }
    }

    /**
     * changes current state
     * @param {String} stateName
     * @param {Object} opts additional options passed by previous state
     */
    setState(stateName, opts) {
        let oldState = this.state;

        this.state = null;

        if (oldState) {
            if (!opts.keepVisible) {
                oldState.visible = false;
            }
            oldState.exit(opts);
        }

        let newState = this.gameStates[stateName];
        newState.enter(opts);
        newState.visible = true;
        this.state = newState;
    }
}
