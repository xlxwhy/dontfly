
const request = require('request');
const Promise = require('bluebird');
const JSSHA = require('jssha');

let WX_SHARE_SIGN_CACHE = {}
let WX_SHARE_TOKEN_CACHE = { token: null, time: null }

exports.signature = function (appId, appSecret, url) {
    return new Promise((resolve, reject) => {
        let nt = new Date().getTime() / 1000;
        //如果命中缓存
        let cache = WX_SHARE_SIGN_CACHE[url];
        if (cache && (nt - cache.timestamp < 7200)) {
            resolve(cache);
            return;
        }
        //如果不命中缓存
        return Promise.resolve().then(function () {
            //获取Token
            let ntime = new Date().getTime();
            if (!WX_SHARE_TOKEN_CACHE.token || (ntime - WX_SHARE_TOKEN_CACHE.time > 7000000)) {
                return handleWeixinAccessToken(appId, appSecret).then((result) => {
                    console.log("request weixin share token: ", result.access_token)
                    if (!result.access_token) { 
                        return Promise.reject(result)
                    }
                    WX_SHARE_TOKEN_CACHE.token = result.access_token;
                    WX_SHARE_TOKEN_CACHE.time = new Date().getTime();
                    return Promise.resolve(WX_SHARE_TOKEN_CACHE);
                });
            } else {
                return Promise.resolve(WX_SHARE_TOKEN_CACHE);
            }
        }).then(function (result) {
            //获取Ticket
            return handleWeixinTicket(result.token);
        }).then(function (result) {
            //签名处理
            var data = handleWeixinSignature(result.ticket, url)
            WX_SHARE_SIGN_CACHE[url] = data;
            resolve(data);
        }).catch(function (error) {
            resolve(error);
        });

    });
}

function handleWeixinAccessToken(appId, appSecret) {
    return new Promise((resolve, reject) => {
        var tokenParam = { method: "get", url: getTokenUrl(appId, appSecret) }
        request(tokenParam, function (tokenError, tokenResponse, tokenBody) {
            if (tokenResponse.statusCode === 200) {
                resolve(JSON.parse(tokenBody));
            } else {
                reject({ error: tokenError });
            }
        });
    })
}


function handleWeixinTicket(accessToken) {
    return new Promise((resolve, reject) => {
        var ticketParam = { method: "get", url: getTicketUrl(accessToken) }
        request(ticketParam, function (tokenError, ticketResponse, ticketBody) {
            if (ticketResponse.statusCode === 200) {
                resolve(JSON.parse(ticketBody));
            } else {
                reject({ error: tokenError });
            }
        })
    });
}

function handleWeixinSignature(ticket, url) {
    var ret = {
        jsapi_ticket: ticket,
        nonceStr: Math.random().toString(36).substr(2, 15),
        timestamp: parseInt(new Date().getTime() / 1000) + '',
        url: url
    };
    ret.signature = getWeixinSignature(ret);
    return ret;
};


function getWeixinSignature(o) {
    let v = raw(o)
    var jssha = new JSSHA("SHA-1", "TEXT");
    jssha.update(v);
    return jssha.getHash("HEX");
};




// 排序拼接
function raw(args) {
    var keys = Object.keys(args).sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};






function getTokenUrl(appId, appSecret) {
    return `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
}


function getTicketUrl(accessToken) {
    return `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
}












