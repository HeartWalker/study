//事件委托

/**
 *
 * @param {dom} parent 一个dom节点
 * @param {Function} child 一个回调函数,默认参数是事件的target,返回Bollean
 * @param {String|Array} eve 事件类型 一个用空格分割的字符串或字符串数组
 * @param {Fucntion} cb 回调函数
 */
var addEvent = (function () {
    function addEvent(parent,child,eve,cb) {
        if( !parent || !child || !eve || !cb ){
            return;
        }
        if(typeof eve === 'string'){
            eve = eve.replace(/\s+/g,' ').split(' ');
        }

        if(window.attachEvent){
            for(var i = 0,len = eve.length; i < len; i++) {
                parent.attachEvent(eve[i], function (e) {
                    var event = window.event;
                    if (child(event.srcElement)) {
                        cb(event);
                    }
                });
            }
        }else{
            for(var i = 0,len = eve.length; i < len; i++) {
                parent.addEventListener(eve[i], function (e) {
                    var event = e;
                    if (child(event.target)) {
                        cb(event);
                    }
                }, false);
            }
        }
    }
    return addEvent;
})();
