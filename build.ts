import { exec } from "child_process";

new (class {
  constructor() {
    this.buildPlainJs();
  }

  cmd(command: string) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        console.log({ err, stderr, stdout });
        if (err || stderr) {
          reject(err ?? stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  buildPlainJs() {
    this.cmd(`tsc -p tsconfigs/plain`)
      .then((stat) => {
        console.log(stat);
      })
      .catch((err) => {
        console.error(err);
      });
  }
})();
