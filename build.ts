import { exec } from "child_process";

new (class {
  constructor() {
    this.buildPlainJs();
  }

  cmd(command: string) {
    const cmd = exec(command);

    cmd.stdout?.on("data", (data) => {
      console.log(data);
    });

    cmd.stdout?.on("error", (err) => {
      console.error(`Error occurred for COMMAND::${command}:: `, err);
    });

    cmd.stderr?.on("data", (err) => {
      console.error(`CMD err occurred::${command}:: `, err);
    });

    cmd.on("error", (err) => {
      console.error(`CMD err occurred::${command}:: `, err);
    });

    cmd.on("exit", (code, signal) => {
      //console.log("here", { code, signal });
    });
  }

  buildPlainJs() {
    let command = `tsc -p tsconfigs/plain`;
    if (process.argv[2] === "--watch") {
      command = `tsc --watch -p tsconfigs/plain`;
    }

    this.cmd(command);
  }
})();
