import AbstractMenuScreen from '../common/AbstractMenuScreen';

/**
 * Display Game paused screen
 */
export default class GamePausedScreen extends AbstractMenuScreen {
    constructor(game) {
        super();
        this.init(game, 'PAUSED', 'Press SPACE to continue\nPress ESCAPE to restart');
    }

    update(dt) {
        super.update(dt);

        if (this.game.key.space.isPressed()) {
            this.game.setState('main', {restart: false});
        } else if (this.game.key.escape.isPressed()) {
            this.game.setState('main', {restart: true});
        }
    }
}
