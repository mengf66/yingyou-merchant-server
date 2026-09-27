// 复制本文件为 database.local.js 并填写本机 MySQL 账号，database.local.js 已被 .gitignore 忽略。
// 注意：MySQL 8 默认的 caching_sha2_password 认证不被 mysql 驱动支持，
// 请使用 mysql_native_password 认证的账号，例如：
//   CREATE USER 'hioshop'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';
//   GRANT ALL PRIVILEGES ON hiolabsDB.* TO 'hioshop'@'localhost';
module.exports = {
    user: 'hioshop',
    password: '你的密码'
};
