export default class FrameRateHandler {
  private fps = 15;
  private rateMS = 0;

  constructor() {}

  setFPS(time: number) {
    this.fps = time;
  }

  private setRateMS() {
    this.rateMS = 15 / 1000;
  }

  handle(cb: Function) {}
}
