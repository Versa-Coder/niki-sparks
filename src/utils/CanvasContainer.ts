export type SelectorType = null | string;
export type CanvasSelectorType = null | string;
export type Styles = {
  [key: string]: String;
};
export interface ContainerType {
  container: HTMLElement;
  selector: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export default class CanvasContainer {
  private selector: SelectorType = null;
  private container: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {}

  public init(selector: string, styles: Styles = {}): ContainerType {
    this.selector = selector;
    this.container = this.doc(selector);
    return this.initCanvas(null, styles);
  }

  private initCanvas(
    canvas: HTMLCanvasElement | null = null,
    styles: Styles = {}
  ): ContainerType {
    this.canvas =
      canvas === null
        ? document.createElement("canvas")
        : (canvas as HTMLCanvasElement);

    if (canvas === null) {
      const doc = this.container as HTMLElement;
      doc.appendChild(this.canvas);
    }

    this.addStyles(this.canvas, {
      top: "0",
      left: "0",
      //height: "100%",
      //width: "100%",
      //position: "absolute",
      backgroundColor: "#000000",
      ...styles,
    });

    this.ctx = this.canvas.getContext("2d");

    return this.containerInfo;
  }

  private doc(
    selector: SelectorType,
    parent: Document = document
  ): HTMLElement {
    return parent.querySelector(selector as string) as HTMLElement;
  }

  private addStyles(element: HTMLElement, styles: Styles = {}) {
    for (let i in styles) {
      (element.style as any)[i] = styles[i];
    }
  }

  get containerInfo(): ContainerType {
    return {
      container: this.container as HTMLElement,
      selector: this.selector as string,
      canvas: this.canvas as HTMLCanvasElement,
      ctx: this.ctx as CanvasRenderingContext2D,
    };
  }
}
