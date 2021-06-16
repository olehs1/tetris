export const game = {
    cols: 10,
    rows: 20,
    hiddenRows: 2,
    fallSpeed: 30,
    fallSpeedMin: 3,
    fallSpeedupStep: 2,
    fallSpeedupDelay: 1800,
    dropModifier: 10,
    width: 640,
    height: 960
}

export const blockSize = 42;

export const board = {
    blockSize: blockSize,
    width: game.cols * blockSize,
    height: game.rows * blockSize
}

export const controls = {
    repeatDelay: 2,
    initialRepeatDelay: 10
}

export default {game, board, controls, blockSize};
