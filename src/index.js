import getSetting from './setting';
import {isOn, turnOff} from './remote';
import {log} from './log';

const CHECK_EVERY = 5 * 1000;

const check = () => {
  log('Retrieving Latest Setting ...');

  return getSetting()
    .then(setting => {
      if (!setting) {
        log('TV Not Allowed On ... Checking Power Status');
        return isOn()
          .then(on => {
            if (on) {
              log('TV Not Allowed On ... TV is On ... Powering Off');
              turnOff();

              return true;
            }

            log('TV Not Allowed On ... TV is Off');
            return false;
          });
      }

      log('TV is allowed on ...');
      return false;
    });
};

const loop = () => {
  check()
    .then(() => {
      setTimeout(loop, CHECK_EVERY);
    });
};

loop();
