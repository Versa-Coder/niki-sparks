import CanvasContainer, {
  Styles,
  CanvasSelectorType,
  ContainerType,
} from "../../../utils/CanvasContainer.js";
import FrameRateHandler from "../../../utils/Animation/FrameRateHandler.js";

class RainFall extends CanvasContainer {
  private containerData: ContainerType | null = null;
  private chars = "";
  private fontSize = 20;
  private fontColor = "#00ff00";
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
      const canvas = this.canvas as HTMLCanvasElement;
      const ctx = this.ctx as CanvasRenderingContext2D;

      this.colCount = canvas.width / this.fontSize;
      ctx.font = `${this.fontSize}px serif`;
      ctx.textAlign = "start";
      ctx.textBaseline = "top";
      ctx.fillStyle = this.fontColor;
    }
  }

  private setText(chars: string | Array<string> = "") {
    this.chars = Array.isArray(chars) ? chars.join("") : chars;
  }

  private setFontColor(fontColor: string = this.fontColor) {
    const ctx = this.ctx as CanvasRenderingContext2D;
    ctx.fillStyle = fontColor;
    this.fontColor = fontColor;
  }

  private spreadText() {
    const canvas = this.canvas as HTMLCanvasElement;
    const ctx = this.ctx as CanvasRenderingContext2D;

    this.setFontColor("green");

    this.currentX = 0;
    for (let i = 0; i < this.colCount; i++) {
      //this.currentY = 0;

      const char = this.chars.charAt(
        Math.floor(Math.random() * this.chars.length)
      );

      ctx.fillText(char, this.currentX, this.currentY);

      this.currentX += this.fontSize;
    }
    this.currentY += this.fontSize;
    if (this.currentY > canvas.height) {
      this.currentY = 0;
    }
  }

  public draw(stamp = 0) {
    const canvas = this.canvas as HTMLCanvasElement;
    const ctx = this.ctx as CanvasRenderingContext2D;

    const fpsHandler = new FrameRateHandler();

    fpsHandler.animate(() => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.03)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.spreadText();
    }, 20);
  }
}

export default RainFall;
