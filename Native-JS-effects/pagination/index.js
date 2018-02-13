//todo options ,remove envetlistener
;
var pageFunc = (function () {

/**
 *
 * @param config
 */
function pageFunc(config) {
    this.id = config.id || 'pagination'; //容器id
    this.cb = config.click; //用户点击要执行的方法
    this.total = config.total; //总页数
    this.currentPage = config.currentPage || 1; //当前页码
    this.dispalyPage = config.dispalyPage || 3; //当前页码前后显示的数量
    this.init(); //初始化
}

pageFunc.prototype.init = function () {
    var _this = this;
    var root = document.getElementById( this.id );
    var jumpPage = '';

    listeners = {
        'setWhat': function ( src ) {
            _this.jump( src.innerText );
            return false;
        },
        'pre': function () {
            _this.prevClick();
            return false;
        },
        'next': function () {
            _this.nextClick();
            return false;
        },
        'jumpInput': function ( src ) {
            var val = src.value,
                reg = /[^\d]/g;
            if( reg.test( val ) ){
                val = val.replace( reg, '');
            }
            (parseInt(val) > _this.total) && (val = _this.total);
            (parseInt(val) === 0) && (value = 1);
            src.value = jumpPage = val;
        },
        'jumpPage': function ( src ) {
            if( !jumpPage ) return;
            _this.jump( jumpPage );
            jumpPage = '';
            return false;
        }

    };


    var node = this.createPage( this.currentPage, this.total );
    root.innerHTML = node;

    on( root, ['click', 'input' ,'propertype'], listeners );

};

/**
 * 创建HTML的分页字符串
 * @param {Number} page Current page
 * @param {Number} total Total pages
 * @returns {String} Dom string
 */
pageFunc.prototype.createPage = function ( page, total ) {
    var str = '<a class="current" href="javascript:;">' + page + '</a>';
    var i = 1;
    var len = this.dispalyPage;
    for( i; i<= len; i++ ){
        if( page - 1 > i ){
            str = '<a class="setWhat" href="javascript:;">' + ( page - i ) + '</a>' + str;
        }
        if( page + i < total ){
            str = str + '<a class="setWhat" href="javascript:;">' + ( page + i ) + '</a>' ;

        }
    }
    if( page - len - 1 > 1 ){
        str = '<span>...</span>' + str;
    }
    if( page + len + 1 < total ){
        str = str + '<span>...</span>';
    }
    if( page > 1 ){
        str = '<a class="pre" href="javascript:;">' + '上一页' + '</a>'
                + '<a class="setWhat" href="javascript:;">' + 1 + '</a>'
                + str;
    }
    if( page < total ){
        str = str
            + '<a class="setWhat" href="javascript:;">' + total + '</a>'
            + '<a class="next" href="javascript:;">' + '下一页' +'</a>';
    }

    str = str + '<input type="text" class="jumpInput"/><a href="javascript:;" class="jumpPage">跳转</a>';
    return str;

}

// click previous page
pageFunc.prototype.prevClick = function () {
    var cp = --this.currentPage;
    var node = this.createPage( cp, this.total );
    document.getElementById(this.id).innerHTML = node;
    this.cb(cp);
}

// click next page
pageFunc.prototype.nextClick = function () {
    var cp = ++this.currentPage;
    var node = this.createPage( cp, this.total );
    document.getElementById( this.id ).innerHTML = node;
    this.cb(cp);
}

// click
pageFunc.prototype.jump = function ( index ) {
    var currentPage = parseInt( index );
    this.currentPage = currentPage;
    var node = this.createPage( currentPage, this.total );
    document.getElementById( this.id ).innerHTML = node;
    this.cb( currentPage );
}


function on( target, event, listeners ) {
    addEvent( target, event, function (e) {
        var e = e.target || window.event,
            src = e.target || e.srcElement.constructor,
            action,
            returnVal;
        while( src && src !== target ){
            action = src.getAttribute( 'class');
            if( listeners[action] ){
                returnVal = listeners[action]( src  );

                if( !returnVal ){
                    break;
                }
            }
            src = src.parentNode;
        }
    })

}
/**
 * 封装一个兼容的绑定事件的方法,支持传入多个 dom 节点数组 与 方法数组
 * @param {String|Array} target Dom target
 * @param {String|Array} type Event type
 * @param {Functin} handle
 * @param options
 */
function addEvent( target, type, handle, options ) {
    if( !target || !type || !handle ){
        return;
    }
    if( Object.prototype.toString.call(target) === '[object Array]' ){
        var i = 0,
            l = target.length;
        for( i; i < l; i++ ){
            addEvent( target[i], type, handle, options );
        }
        return;
    }

    if(  Object.prototype.toString.call(type) === '[object Array]' ){
        var i = 0,
            l = type.length;
        for( i; i < l; i++ ){
            addEvent( target, type[i], handle, options);
        }
        return;
    }
    //ie6 7 8 中 事件对象中的this指向window
    function createDelegate( handle, context ){
        return function () {
            return handle.call( context, handle);
        };
    }

    var fn = createDelegate( handle, target );
    if( window.addEventListener ){
        target.addEventListener( type, fn, options );
    }
    else if( window.attachEvent ){
        target.attachEvent( "on" + type, fn );
    }
    else {
        target["on" + type ] = handle;
    }
}

return pageFunc;
})();

