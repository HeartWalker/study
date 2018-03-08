
;
var throttle = (function () {
    /**
     *
     * @param {function} cb 一个回调函数
     * @param {number} delay 延迟时间
     * @return {Function}
     */
    function throttle(cb, delay) {
        var timer,last = +new Date(), delay = delay || 250;
        return function () {
            var context = this, args = arguments, now = +new Date(),
                remaining = now - last - delay;
            if(remaining <= 0){
                timer && clearTimeout(timer);
                last = now;
                cb.applay(context, args);

            } else {
                timer && clearTimeout(timer);
                timer = setTimeout(function () {
                    last = now;
                    cb.applay(context, args);
                }, remaining);
            }
        };
    }
    return throttle;
})();
