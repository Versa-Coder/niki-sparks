import CanvasContainer, {
  Styles,
  CanvasSelectorType,
  ContainerType,
} from "../../../utils/CanvasContainer.js";

class RainFall extends CanvasContainer {
  private containerData: ContainerType | null = null;
  private chars = "";
  private fontSize = 20;
  private colCount = 0;
  private configured = false;
  private currentX = 0;
  private currentY = 0;

  constructor() {
    super();
  }

  public init(container: string, styles: Styles = {}) {
    this.containerData = super.init(container, styles);
    this.doConfig();
    return this.containerData;
  }

  private doConfig() {
    if (!this.configured) {
      const { canvas, ctx, container } = this.containerData as ContainerType;
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

  private setText(chars: string | Array<string> = "") {
    this.chars = Array.isArray(chars) ? chars.join("") : chars;
  }

  private spreadText() {
    const { canvas, ctx } = this.containerData as ContainerType;

    this.currentX = 0;
    for (let i = 0; i < this.colCount; i++) {
      const char = this.chars.charAt(
        Math.floor(Math.random() * this.chars.length)
      );

      ctx.fillText(char, this.currentX, this.currentY);
      console.log(char);

      this.currentX += this.fontSize;
    }
    this.currentY += this.fontSize;
  }

  public draw() {
    this.spreadText();
    //this.spreadText();
    // this.spreadText();
    // this.spreadText();
    // this.spreadText();
  }
}

export default RainFall;
