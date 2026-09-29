// production config, it will load in production enviroment
module.exports = {
  // 只开 1 个 worker：服务器只有 1.6G 内存，默认按 CPU 核数开进程会翻倍占用
  workers: 1,
  // 只监听本机，对外由 nginx 反向代理
  host: '127.0.0.1'
};
