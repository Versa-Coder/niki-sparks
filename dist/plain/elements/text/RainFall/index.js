import CanvasContainer from "../../../utils/CanvasContainer.js";
class RainFall extends CanvasContainer {
    constructor() {
        super();
        this.containerData = null;
        this.chars = "";
        this.fontSize = 20;
        this.colCount = 0;
        this.configured = false;
        this.currentX = 0;
        this.currentY = 0;
    }
    init(container, styles = {}) {
        this.containerData = super.init(container, styles);
        this.doConfig();
        return this.containerData;
    }
    doConfig() {
        if (!this.configured) {
            const { canvas, ctx, container } = this.containerData;
            canvas.height = container.offsetHeight;
            canvas.width = container.offsetWidth;
            this.colCount = canvas.width / this.fontSize;
            ctx.font = `${this.fontSize}px`;
            ctx.fillStyle = `green`;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 10, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "48px serif";
            ctx.strokeStyle = `green`;
            ctx.strokeText("Hello world", 10, 80);
            ctx.closePath();
        }
    }
    setText(chars = "") {
        this.chars = Array.isArray(chars) ? chars.join("") : chars;
    }
    spreadText() {
        const { canvas, ctx } = this.containerData;
        this.currentX = 0;
        for (let i = 0; i < this.colCount; i++) {
            const char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            ctx.fillText(char, this.currentX, this.currentY);
            console.log(char);
            this.currentX += this.fontSize;
        }
        this.currentY += this.fontSize;
    }
    draw() {
        this.spreadText();
        //this.spreadText();
        // this.spreadText();
        // this.spreadText();
        // this.spreadText();
    }
}
export default RainFall;
