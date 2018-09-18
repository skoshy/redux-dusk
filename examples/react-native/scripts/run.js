const os = require('os');
const spawn = require('cross-spawn');
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

const child = spawn(
  'react-native',
  [`run-${runPlatform}`, '--port=50300'],
  { stdio: 'inherit' },
);

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
