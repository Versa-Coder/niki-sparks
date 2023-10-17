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
  private colsArr: number[] = [];

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

      for (let i = 0; i < this.colCount; i++) {
        this.colsArr.push(0);
      }
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

    for (let i = 0; i < this.colsArr.length; i++) {
      let x = i * this.fontSize;
      let y = this.colsArr[i];

      const char = this.chars.charAt(
        Math.floor(Math.random() * this.chars.length)
      );

      ctx.fillText(char, x, y);
      this.colsArr[i] += this.fontSize;

      if (this.colsArr[i] > canvas.height && Math.random() > 0.98) {
        this.colsArr[i] = 0;
      }
    }
  }

  public draw(stamp = 0) {
    const canvas = this.canvas as HTMLCanvasElement;
    const ctx = this.ctx as CanvasRenderingContext2D;

    const fpsHandler = new FrameRateHandler();

    fpsHandler.animate(() => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.spreadText();
    }, 15);
  }
}

export default RainFall;
