const jwt = require('jsonwebtoken');
// 签名密钥从环境变量 ADMIN_JWT_SECRET 读取；源码里的旧默认值是公开的，生产环境未设置时直接报错
const secret = process.env.ADMIN_JWT_SECRET || (think.env === 'production' ? '' : 'SLDLKKDS323ssdd@#@@gf');
if (!secret) throw new Error('缺少环境变量 ADMIN_JWT_SECRET');

const moment = require('moment');
const rp = require('request-promise');
const fs = require('fs');
const http = require("http");

module.exports = class extends think.Service {
    /**
     * 根据header中的x-hioshop-token值获取用户id
     */
    async getUserId() {
        const token = think.token;
        if (!token) {
            return 0;
        }

        const result = await this.parse();
        if (think.isEmpty(result) || result.user_id <= 0) {
            return 0;
        }

        return result.user_id;
    }

    /**
     * 根据值获取用户信息
     */
    async getUserInfo() {
        const userId = await this.getUserId();
        if (userId <= 0) {
            return null;
        }

        const userInfo = await this.model('admin').where({id: userId}).find();

        return think.isEmpty(userInfo) ? null : userInfo;
    }

    async create(userInfo) {
        const token = jwt.sign(userInfo, secret);
        return token;
    }

    async parse() {
        if (think.token) {
            try {
                return jwt.verify(think.token, secret);
            } catch (err) {
                return null;
            }
        }
        return null;
    }

    async verify() {
        const result = await this.parse();
        if (think.isEmpty(result)) {
            return false;
        }

        return true;
    }

    async getAccessToken() {
        const options = {
            method: 'POST',
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            qs: {
                grant_type: 'client_credential',
                secret: think.config('weixin.secret'),
                appid: think.config('weixin.appid')
            }
        };
        let sessionData = await rp(options);
        sessionData = JSON.parse(sessionData);
        let token = sessionData.access_token;
        return token;
    }
};
