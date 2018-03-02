//参考:https://www.cnblogs.com/liliangel/p/6163994.html
;(function (name, definition) {
    var hasDefine = typeof define === 'function';
    var hasExport = typeof module != undefined && module.exports;
    if(hasDefine){
        define(definition);
    } else if(hasExport){
        module.exports = definition();
    } else{
        this[name] = definition();
    }

})('ajax', function () {
    var ajax = function (opts) {
        var url = opts.url || '',
            type = opts.type || 'GET',
            data = opts.data || null,
            contentType = opts.contentType || '',
            dataType = opts.dataType || 'json',
            async = opts.async || true,
            timeout = opts.timeout || 5000,
            before = opts.before || function(){},
            success = opts.success || function(){},
            error = opts.error || function(){}
            ;

        before();

        if(dataType === "jsonp") {
            jsonp();
        }else {
            xhttp();
        }

        //解析参数数据
        if(typeof data === "string") {
            data = data.split("&");
            var key , value;
            for( var i = 0,l = data.length; i < l; i++) {
                key = data[i].split("=")[0];
                value = data[i].split("=")[1];
                data[i] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }
            data = data.join("&").replace(/%20/g, "+");
        } else if( typeof opts.data === "object"){
            var arr = [],
                key,
                value;
            for (key in data ){
                value = data[key].toString();
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
            }
            data = arr.join("&").replace(/%20/g, "+");
        }

        //使用GET方法或JSONP，则手动添加到URL中
        if(type === "GET" || dataType === "jsonp") {
            url += ~url.indexOf("?") ? data : "?" + data;
        }

        function jsonp() {

            var script = document.createElement('script');
            var callback = "jsonp_" + new Date().getTime() + Math.round(Math.random() * 1000);
            script.src = url + "callback=" + callback;
            script.type = "text/javascript";
            document.body.appendChild(script);
            window[callback] = function (data) {
                success(data);
                document.body.removeChild(script);
                timeOutTimer && clearTimeout(timeOutTimer);
            }

            var timeOutTimer = setTimeout(function () {
                delete window[callback];
                document.body.remove(script);
                flag = true;
            }, timeout);

        }

        function xhttp() {
            // xhr 请求
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, async);
            if(type === "POST" && !contentType) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                xhr.send(data);
            } else if(contentType) {
                xhr.setRequestHeader("Content-Type", contentType);
                xhr.send(null);
            }

            // 超时设置
            var flag = false;
            var timeOutTimer = setTimeout(function () {
                xhr && xhr.abort();
                flag = true;
            }, timeout);

            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4) {
                    // 超时处理
                    if(timeout !== undefined && flag){
                        //执行abort()方法后，有可能触发onreadystatechange事件，
                        return;
                    }

                    if( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        success(xhr.responseText);
                        clearTimeout(timeOutTimer);

                    } else {
                        error(xhr);
                        clearTimeout(timeOutTimer);
                    }
                }

            }
        }


    };


    return ajax;
});