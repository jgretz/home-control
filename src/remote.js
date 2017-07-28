import SamsungRemote from 'node-samsung-remote';

const exec = require('child_process').exec;
const IP = '192.168.1.138';

export const isOn = () =>
  new Promise(resolve => {
    exec(`ping -c 1 ${IP}`, error => {
      resolve(!error);
    });
  });

export const turnOff = () =>
  new Promise(resolve => {
    const remote = new SamsungRemote({ip: IP});

    remote.sendToDevice(SamsungRemote.keys.POWEROFF);
    resolve();
  });
