export default class CanvasContainer {
    constructor() {
        this.selector = null;
        this.container = null;
        this.canvas = null;
        this.ctx = null;
    }
    init(selector, styles = {}) {
        this.selector = selector;
        this.container = this.doc(selector);
        return this.initCanvas(null, styles);
    }
    initCanvas(canvas = null, styles = {}) {
        this.canvas =
            canvas === null
                ? document.createElement("canvas")
                : canvas;
        if (canvas === null) {
            const doc = this.container;
            doc.appendChild(this.canvas);
        }
        this.addStyles(this.canvas, Object.assign({ top: "0", left: "0", 
            //height: "100%",
            //width: "100%",
            //position: "absolute",
            backgroundColor: "#000000" }, styles));
        this.ctx = this.canvas.getContext("2d");
        return this.containerInfo;
    }
    doc(selector, parent = document) {
        return parent.querySelector(selector);
    }
    addStyles(element, styles = {}) {
        for (let i in styles) {
            element.style[i] = styles[i];
        }
    }
    get containerInfo() {
        return {
            container: this.container,
            selector: this.selector,
            canvas: this.canvas,
            ctx: this.ctx,
        };
    }
}
