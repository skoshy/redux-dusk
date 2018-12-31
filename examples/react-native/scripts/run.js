const port = require(`../package.json`).defaultDebugPort;

// ------------------------------------------

const os = require(`os`);
const spawn = require(`cross-spawn`);
const argv = require(`minimist`)(process.argv.slice(2));
const devLog = (...toLog) => { console.log(...toLog); }; // eslint-disable-line no-console

// simulator - if macOS, default to iOS. else, default to Android.
let runPlatform = os.platform() === `darwin`
  ? `ios`
  : `android`;

argv._.forEach((cmdParam) => {
  switch (cmdParam) {
    case `android`:
      runPlatform = `android`;
      break;
    case `ios`:
      runPlatform = `ios`;
      break;
    default:
      break;
  }
});

const child = spawn(
  `react-native`,
  [`run-${runPlatform}`, `--port=${port}`],
  { stdio: `inherit` },
);

child.on(`close`, (code) => {
  devLog(`Child process exited with code ${code}`);

  if (runPlatform === `android`) {
    devLog(`\x1b[33m\nNOTE: For an Android emulator, you might need to set the debug server host/port. In the app, press Cmd+M => Dev Settings => Debug server host & port for device. Set it to 'localhost:${port}'\n\x1b[0m`);
  }
});
