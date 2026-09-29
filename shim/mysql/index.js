// 老驱动 mysql@2 不支持 MySQL 9 的 caching_sha2_password 认证，这里用 mysql2 顶替。
// 服务器全局 sql_mode 是严格模式 + ONLY_FULL_GROUP_BY，海风小店的老 SQL 会报错；
// 只对本项目的连接放宽 sql_mode，不影响同一 MySQL 上的其他库。
const mysql2 = require('mysql2');

const SESSION_SQL_MODE = "SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'";

// ThinkJS 会把自己的配置项一并传进来，mysql2 不认识会刷警告，这里剔掉
const THINK_ONLY_KEYS = ['acquireWaitTimeout', 'handle', 'prefix', 'encoding', 'type'];
function clean(config = {}) {
  const out = Object.assign({}, config);
  if (out.encoding && !out.charset) out.charset = out.encoding;
  THINK_ONLY_KEYS.forEach(k => delete out[k]);
  return out;
}

module.exports = Object.assign({}, mysql2, {
  createPool(config) {
    const pool = mysql2.createPool(clean(config));
    pool.on('connection', conn => conn.query(SESSION_SQL_MODE));
    return pool;
  },
  createConnection(config) {
    const conn = mysql2.createConnection(clean(config));
    conn.query(SESSION_SQL_MODE);
    return conn;
  }
});
