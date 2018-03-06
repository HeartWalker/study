/*
通常只在网络出现问题时或者ERR_CONNECTION_RESET时,
    它们才会进入到相应的错误捕获里.
    (其中, 请求返回状态码为407时, chrome浏览器会触发onerror或者reject掉fetch.)
*/
// 使用示例
var headers = new Headers();
headers.append("Content-Type","application/json;charset=UTF-8");
fetch(url,{
    mehtod:'post',
    headers: headers,
    mode: 'cros',
    credentials: 'include',//带有cookie
    body: JSON.stringify({
        "date": "2016-10-08",
        "time": "15:16:00"
    })
}).then(function (response) {
    if((response.status >= 200 && response.status < 300) || response.status === "304" ){
        var url = response.url,
            status = response.status,
            type = response.type,
            statusText = response.statusText,
            ContentType = response.headers.get('Content-Type'),
            Date = response.headers.get('Date');
        return new Promise(resolve(response));
    }else {
        return new Promise(reject(new Error(response.statusText)));
    }
}).then(function (data) {
    console.log(data);
}).catch(function (e) {
    console.log(e);
})

//fetch-jsonp 跨域 https://github.com/camsong/fetch-jsonp

// 为fetch 添加abort功能
var _fetch = (function (fetch) {
    return function (url, options) {
        var abort = null
        var abort_promise = new Promise((resolve, reject) => {
            abort = () => {
                reject('abort');
            };
        });
        var promise = Promise.race([
            fetch(url, options),
            abort_promise
        ]);
        promise.abort = abort;
        return promise;
    }
})(fetch);

// 为fetch 设置超时功能
var _fetch = (function (fetch) {
    return function (url,options) {
        var abort = null;
        var timeout = 0;
        var abort_promise = new Promise((resolve, reject) => {
            abort = () => {
                reject('');
            };
        });
        
        var promise = Promise.race([
            fetch(url, options),
            abort_promise
        ]);
        promise.abort  = abort;
        
        Object.defineProperty(promise, 'timeout', {
            set: function (ts) {
                if( ts = + ts ){
                    timeout = ts;
                    setTimeout(abort, ts);
                }
            },
            get: function () {
                return timeout;
            }

        });
        return promise;
    }
})(fetch);

//progress
function consume(reader) {
    var total = 0
    return new Promise((resolve, reject) => {
        function pump() {
            reader.read().then(({done, value}) => {
                if (done) {
                    resolve();
                    return;
                }
                total += value.byteLength;
                console.log(`received ${value.byteLength} bytes (${total} bytes in total)`);
                pump();
            }).catch(reject)
        }
        pump();
    });
}
fetch('http://localhost:10101/notification/',{mode:'no-cors'})
    .then(res => consume(res.body.getReader()))
    .then(() => console.log("consumed the entire body without keeping the whole thing in memory!"))
    .catch(e => console.log("something went wrong: " + e));
