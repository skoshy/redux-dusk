const os = require('os');
const { spawn } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

let runPlatform = os.platform() === 'darwin'
  ? 'ios'
  : 'android';

argv._.forEach((cmdParam) => {
  switch (cmdParam) {
    case 'android':
      runPlatform = 'android';
      break;
    case 'ios':
      runPlatform = 'ios';
      break;
    default:
      break;
  }
});

const child = spawn('react-native', [`run-${runPlatform}`, '--port=50300']);

child.stdout.on('data', (data) => {
  console.log(data.toString());
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
