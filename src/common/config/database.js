const mysql = require('think-model-mysql');

// 账号密码放在 database.local.js（不提交到 Git），参考 database.local.example.js
let local = {};
try {
    local = require('./database.local.js');
} catch (e) {
    console.warn('[database] 未找到 src/common/config/database.local.js，请参考 database.local.example.js 创建');
}

module.exports = {
    handle: mysql,
    database: 'hiolabsDB',
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    dateStrings: true,
    ...local
};
