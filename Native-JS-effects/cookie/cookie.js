// 开源 https://github.com/js-cookie/js-cookie

// 来自高程3
// expires path domain 不能获得

var CookieUtil = {
   get: function (name) {
       var cookieName = encodeURIComponent(name) + "=",
           cookieStart = document.cookie.indexOf(cookieName),
           cookieValue = null;
       if(~cookieStart) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if( !~cookieEnd ){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
                 cookieName.length, cookieEnd));
       }
       return cookieValue;
   },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
                encodeURIComponent(value);
        if(expires instanceof  Date){
            cookieText += ";expires=" + expires.toUTCString();
        }
        if (path) {
            cookieText += ";path=" + path;
        }
        if(domain) {
            cookieText += ";domain=" + domain;
        }
        if(secure) {
            cookieText += ";secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name,path,domain,secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
}