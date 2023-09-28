export type SelectorType = null | string;
export type CanvasSelectorType = null | string;
export type CanvasElementType = HTMLCanvasElement | null;
export type ContainerElementType = HTMLElement | null;
export type CTXType = CanvasRenderingContext2D | null;

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
  private _selector: SelectorType = null;
  private _container: ContainerElementType = null;
  private _canvas: CanvasElementType = null;
  private _ctx: CTXType = null;

  constructor() {}

  public init(_selector: string, styles: Styles = {}): ContainerType {
    this._selector = _selector;
    this._container = this.doc(_selector);
    const data = this.initCanvas(null, styles);
    data.canvas.height = this._container.offsetHeight;
    data.canvas.width = this._container.offsetWidth;
    return data;
  }

  private initCanvas(
    _canvas: HTMLCanvasElement | null = null,
    styles: Styles = {}
  ): ContainerType {
    this._canvas =
      _canvas === null
        ? document.createElement("canvas")
        : (_canvas as HTMLCanvasElement);

    if (_canvas === null) {
      const doc = this._container as HTMLElement;
      doc.appendChild(this._canvas);
    }

    this.addStyles(this._canvas, {
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      position: "absolute",
      backgroundColor: "#000000",
      ...styles,
    });

    this._ctx = this._canvas.getContext("2d");

    return this.containerInfo;
  }

  private doc(
    _selector: SelectorType,
    parent: Document = document
  ): HTMLElement {
    return parent.querySelector(_selector as string) as HTMLElement;
  }

  private addStyles(element: HTMLElement, styles: Styles = {}) {
    for (let i in styles) {
      (element.style as any)[i] = styles[i];
    }
  }

  get containerInfo(): ContainerType {
    return {
      container: this._container as HTMLElement,
      selector: this._selector as string,
      canvas: this._canvas as HTMLCanvasElement,
      ctx: this._ctx as CanvasRenderingContext2D,
    };
  }

  get container(): ContainerElementType {
    return this._container;
  }

  get selector(): SelectorType {
    return this._selector;
  }

  get canvas(): CanvasElementType {
    return this._canvas;
  }

  get ctx(): CTXType {
    return this._ctx;
  }
}
