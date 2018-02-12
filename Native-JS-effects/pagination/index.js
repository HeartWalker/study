//todo options ,remove envetlistener, jump page
/**
 *
 * @param config
 */
function pageFunc(config) {
    this.id = 'pagination' || config.id; //容器id
    this.cb = config.click; //用户点击要执行的方法
    this.total = config.total; //总页数
    this.currentPage = config.currentPage || 1; //当前页码
    this.dispalyPage = config.dispalyPage || 3; //当前页码前后显示的数量
    this.init(); //初始化
}

pageFunc.prototype.init = function () {
    var _this = this;

    listeners = {
        'setWhat': function ( index ) {
            _this.jump( index );
            return false;
        }
    };

    listenersPre = {
        'pre': function () {
            _this.prevClick();
            return false;
        }
    };

    listenersNext = {
        'next': function () {
            _this.nextClick();
            return false;
        }
    };

    var node = this.createPage( this.currentPage, this.total );
    var root = document.getElementById( this.id );
    root.innerHTML = node;

    on( root, 'click', listeners );
    on( root, 'click', listenersPre );
    on( root, 'click', listenersNext );


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
            str = '<a attr-action="setWhat" href="javascript:;">' + ( page - i ) + '</a>' + str;
        }
        if( page + i < total ){
            str = str + '<a attr-action="setWhat" href="javascript:;">' + ( page + i ) + '</a>' ;

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
                + '<a attr-action="setWhat" href="javascript:;">' + 1 + '</a>'
                + str;
    }
    if( page < total ){
        str = str
            + '<a attr-action="setWhat" href="javascript:;">' + total + '</a>'
            + '<a class="next" href="javascript:;">' + '下一页' +'</a>';
    }

    str = str + '<input type="text"/><a>跳转</a>';
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
            action = src.getAttribute( 'attr-action' ) || src.getAttribute( 'class');
            if( listeners[action] ){
                returnVal = listeners[action]( src.innerText );

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

