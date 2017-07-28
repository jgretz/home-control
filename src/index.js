import getSetting from './setting';
import {isOn, turnOff} from './remote';
import {log, logError} from './log';

const CHECK_EVERY = 30 * 1000;

const schedule = () => {
  log('Sleeping ...');
  setTimeout(check, CHECK_EVERY); // eslint-disable-line
};

const enforce = () => {
  log('TV Not Allowed On ... TV is On ... Powering Off');

  turnOff()
    .then(() => {
      log('TV Powered Off ...');
      schedule();
    });
};

const checkPower = () => {
  log('TV Not Allowed On ... Checking Power Status');

  isOn()
    .then(on => {
      if (!on) {
        log('TV Not Allowed On ... TV is Off');
        schedule();
        return;
      }

      enforce();
    });
};

const check = () => {
  log('Retrieving Latest Setting ...');

  getSetting()
    .then(setting => {
      if (setting) {
        log('TV is allowed on ...');
        schedule();
        return;
      }

      checkPower();
    })
    .catch(err => {
      logError(err);
      schedule();
    });
};

check();
