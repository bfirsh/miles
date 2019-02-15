// This is run by create-miles.
const chalk = require("chalk");
const childProcess = require("child_process");
const fs = require("fs-extra");
const klawSync = require("klaw-sync");
const os = require("os");
const path = require("path");
const process = require("process");
const yargs = require("yargs");

const argv = yargs.usage("$0 <path>").demandCommand(1).argv;
init(argv._[0]);

async function init(root) {
  const templateDir = path.resolve(__dirname, "../template");
  fs.copySync(templateDir, root);

  process.chdir(root);

  // Remove .keep files
  klawSync(path.join(root, "client"), { nodir: true })
    .map(obj => obj.path)
    .filter(f => path.basename(f) === ".keep")
    .map(f => fs.removeSync(f));

  // Update package.json
  const packageJson = require(path.join(root, "package.json"));
  packageJson.scripts = {
    start: "miles run server/index.js"
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  // Install dependencies
  await install(["react", "react-dom", "react-router-dom"]);

  console.log();
  const cd = `cd ${path.basename(root)}/`;
  console.log(
    `Your Miles app has been created! Run ${chalk.green(cd)} to get started.`
  );
}

async function install(dependencies) {
  await spawn(
    "npm",
    ["install", "--save", "--save-exact", "--loglevel", "error"].concat(
      dependencies
    )
  );
}

function spawn(command, args) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(command, args, { stdio: "inherit" });
    child.on("close", code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}
