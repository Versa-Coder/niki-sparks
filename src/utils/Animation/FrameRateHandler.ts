export default class FrameRateHandler {
  private fps = 0;
  private rateMS = 0;

  constructor() {}

  setFPS(fps: number) {
    this.fps = fps;
    this.setRateMS();
  }

  private setRateMS() {
    if (typeof this.fps === "number" && this.fps > 0) {
      this.rateMS = 1000 / this.fps;
    }
  }

  animate(cb: Function, fps: number | null = null) {
    if (typeof fps === "number") {
      this.setFPS(fps);
    }

    let delay = 0;
    let lastTime = 0;
    const fn = (time: number = 0) => {
      if (delay >= this.rateMS || this.fps === 0 || time === 0) {
        delay = 0;
        cb();
      } else {
        delay += time - lastTime;
      }

      lastTime = time > 0 ? time : 0;
      requestAnimationFrame(fn);
    };

    fn();
  }
}
