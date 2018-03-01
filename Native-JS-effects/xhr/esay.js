;
var ajax = (function () {
    /**
     * 封装一个建议的ajax函数
     * @param {object} opt
     * @param {string} opt.type 请求方式
     * @param {string} opt.url 请求地址
     * @param {bollean} opt.async 同步或异步请求
     * @param {function} opt.success 请求成功回调函数
     * @param {function} opt.error 请求失败的回调函数
     */
    function ajax( opt ) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function(){};
        opt.error = opt.error || function(){};

        var xhr = null;
        if(XMLHttpRequest){
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if(opt.method === "POST"){
            xhr.open('POST', opt.url, opt.async);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
            xhr.send(postData);
        }else if (opt.method === 'GET'){
            xhr.open('GET', opt.url + '?' + postData, opt.async);
            xhr.send(null);
        }

        xhr.onreadystatechange = function () {
            if(xhr.readySate === 4 && xhr.status == 200){
                opt.success();
            }else {
                opt.error();
            }
        }

    }

    return ajax;
    
})(); 