;
var debounce = (function () {
    /**
     *
     * @param {function} cb 一个回调函数
     * @param {number} delay 延迟时间,阈值
     * @return {Function}
     */
    function debounce(cb,delay) {
        var timer;

        return function () {
            timer && clearTimeout(timer);
            var context = this, args = arguments;
            timer = setTimeout(function () {
                cb.apply(context, args);
            }, delay);
        }
    }
    return debounce;
})();