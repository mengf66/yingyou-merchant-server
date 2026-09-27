const Application = require('thinkjs');
const babel = require('think-babel');
const watcher = require('think-watcher');
const notifier = require('node-notifier');

const instance = new Application({
  ROOT_PATH: __dirname,
  watcher: watcher,
  transpiler: [babel, {
    presets: ['think-node']
  }],
  notifier: notifier.notify.bind(notifier),
  env: 'development',
  // 开发模式只开 1 个 worker：默认按 CPU 核数开进程，热重启时容易因句柄耗尽（EMFILE）崩溃
  workers: 1
});

instance.run();
