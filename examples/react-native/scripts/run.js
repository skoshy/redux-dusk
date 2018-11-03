const port = `50300`;

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
});
