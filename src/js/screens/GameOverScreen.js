import AbstractMenuScreen from '../common/AbstractMenuScreen';


/**
 * Display Game Over screen
 */
export default class GameOverScreen extends AbstractMenuScreen {
    constructor(game) {
        super();
        this.init(game, 'Try again');
    }

    update(dt) {
        super.update(dt);

        if (this.game.key.space.isPressed()) {
            this.game.setState('main', {restart: true});
        }
    }
}
