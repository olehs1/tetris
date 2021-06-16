import {Loader} from "pixi.js";
const loader = Loader.shared;

export const scaleToWindow = (view) => {
    const canvas = view;
    let scaleX, scaleY, scale, center;
    scaleX = window.innerWidth / canvas.offsetWidth;
    scaleY = window.innerHeight / canvas.offsetHeight;
    scale = Math.min(scaleX, scaleY);
    canvas.style.transformOrigin = "0 0";
    canvas.style.transform = "scale(" + scale + ")";
    if (canvas.offsetWidth > canvas.offsetHeight) {
        if (canvas.offsetWidth * scale < window.innerWidth) { center = "horizontally" }
        else { center = "vertically" }
    } else {
        if (canvas.offsetHeight * scale < window.innerHeight) { center = "vertically" }
        else { center = "horizontally"; }
    }
    let margin;
    if (center === "horizontally") {
        margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
        canvas.style .marginTop = 0 + "px";canvas.style .marginBottom = 0 + "px";
        canvas.style .marginLeft = margin + "px";canvas.style .marginRight = margin + "px";
    }
    if (center === "vertically") {
        margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
        canvas.style .marginTop  = margin + "px";canvas.style .marginBottom = margin + "px";
        canvas.style .marginLeft = 0      + "px";canvas.style .marginRight  = 0      + "px";
    }
    canvas.style.paddingLeft = 0 + "px";canvas.style.paddingRight  = 0 + "px";
    canvas.style.paddingTop  = 0 + "px";canvas.style.paddingBottom = 0 + "px";
    canvas.style.display = "-webkit-inline-box";
    return scale;
}

export const loadResources = (loader, callback) => {
    loader
        .add('blocks', 'assets/blocks.json')
        .add('background', 'assets/background.jpg')
        .add('layout', 'assets/layout.json')
        .load(callback);
}

export const getLayoutData = (name) => {
    const {layout} = loader.resources;
    return layout.data[name];
}

