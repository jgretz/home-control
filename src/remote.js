import SamsungRemote from 'node-samsung-remote';
import {log, logError} from './log';

const exec = require('child_process').exec;
const IP = '192.168.1.138';

export const isOn = () =>
  new Promise(resolve => {
    exec(`ping -c 1 ${IP}`, error => {
      resolve(!error);
    });
  });

export const turnOff = () => {
  const remote = new SamsungRemote({ip: IP});

  log('Sending Key');
  remote.sendToDevice(SamsungRemote.keys.POWEROFF, err => {
    if (err) {
      logError(err);
      return;
    }

    log('TV turned off ...');
  });
};
