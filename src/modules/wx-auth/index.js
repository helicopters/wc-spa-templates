/*
    注意
    1. redirect_uri 记得跟随项目修改
    2. redirect_uri 需要在微信公众后台配置对应域名

    依赖项
    1. app_id

*/
import queryString from './utils/query-string'
import parseURL from './utils/parse-url'

import router from '../../router'
import WX from 'config/wx'

/* 判断用户是否已经登录 */
let alreayKnowWhoIsUser = ()=> {
    return !!localStorage.getItem('token');
}

/* 判断是否已经去过微信授权 */
let alreadyWXAuthed = () => {
    return !!parseURL().code;
}

/* 
保存当前用户希望去的路由 
以及携带的参数
*/
let saveCurPageURL = path => {
    localStorage.setItem('userWantToPage', path);
    localStorage.setItem('userWantToPageWith', JSON.stringify(parseURL()));
}

/* 跳转微信授权 */
let goToWXAuth = () => {
    let url =  'https://open.weixin.qq.com/connect/oauth2/authorize'
    let redirect_uri = 'http://explorelife.vip/gp/?#author'
    let query = {
        'appid': WX[process.env.NODE_ENV].APP_ID,
        'redirect_uri': encodeURIComponent(redirect_uri),
        'response_type': 'code',
        'scope': 'snsapi_userinfo',//非静默授权userinfo
        'state': 'wechat'
    }
    let _url = url + queryString(query) + '#wechat_redirect'
    window.location.replace(_url);
}

if (ls.get('clear')) {

} else {
    ls.clear();
    ls.set('clear', true);
}

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        if (alreayKnowWhoIsUser()) {
            next();
        } else {
            if (alreadyWXAuthed()) {
                next();
            } else {
                /**/
                saveCurPageURL(to.path);
                goToWXAuth();
            }
        }
    } else {
        next();
    }
});