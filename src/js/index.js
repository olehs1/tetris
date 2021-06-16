import { Application, Loader } from 'pixi.js';
import config from './common/config';
import Game from './Game';
import {loadResources, scaleToWindow} from "./common/utils";

const loader = Loader.shared;
const {width, height} = config.game;
const app = new Application({width, height});

document.body.appendChild(app.view);
document.body.onresize = () => scaleToWindow(app.view);

scaleToWindow(app.view)

const game = new Game(app);

loadResources(loader, () => game.start());
