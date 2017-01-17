/**
 * Created by HeartWalker on 2016.
 */

/*-----------------------------简单选择器的实现-----------------*/
var select = (function(window, undefined){


//工具函数
var push,
    each,
    indexOf,
    trim;


push = [].push;
try{
    var div = document.createElement('div');
    div.appendChild(document.createElement('div'));
    var list = div.getElementsByTagName('*');
    //检测push.apply能否使用伪数组
    push.apply([], list);
}catch(e){
    push = {
      apply: function (target, elem) {
          var i = target.length,
              j = 0;
          while(target[i++] = elem[ j++]);
          target.length = i - 1;
      }
    };
}finally{
    div = list = null;
}

//each 循环函数
each = function (arr, callback) {
    var i = 0,
        l = arr.length;
    for( ;i < l; i++){
        if(callback.call(arr[i], i, arr[i]) === false){
            break;
        }
    }
};

//trim 去两端空格
trim = function (str) {
    if(support.trim){
        return str.trim();
    }else {
        return str.replace(/^\s+|\s+$/g,'')
    }
};

//indexOf 匹配第一个相同项
indexOf = function(str, obj){
    var res = -1,
        m;
    if(support.indexOf){
      res = str.indexOf(obj);
    }else if(typeof str === 'string'){

        m = new RegExp( arr ).exec( obj );
        if ( m ) {
            res = m.index;
        }
    }
    return res;
};

/*----------------------------------能力检测---------------------*/
var support = {};

//getElementsByClassName 能力检测
support.getElementsByClassName = (function () {
    //判断getElementsByClassName 是否存在 与 类型名
    if(!!document.getElementsByClassName &&
            typeof document.getElementsByClassName == 'function'){
        //创建两个div节点
        var div = document.createElement('div'),
            divClass = document.createElement('div');
        //给divClass赋值类型, 并追加到div节点
        divClass.className = 'd';
        div.appendChild(divClass);
        //判断getElementsByClassName 能否取到类名 并返回结果
        return div.getElementsByClassName('d')[0] === divClass;
    }
    return false;
})();

// trim 检测
support.trim = !!String.prototype.trim;

//indexOf 检测
support.indexOf = !!Array.prototype.indexOf;

/*--------------------------------选择器----------------------*/
//基本选择器
/*
* context: 上级dom元素节点数组
* results: 原有元素节点数组
* */
//id选择器
var getId = function (id, results) {
    results = results || [];
    results.push(document.getElementById(id));
    return results;
};
//标签选择器
var getTag = function (tag, context, results) {
    results = results || [];
    push.apply(results, context.getElementsByTagName(tag));
    return results;
};
//类选择器
var getClass = function(className, context, results){
    results = results || [];
    if(support.getElementsByClassName){
        push.apply(results, context.getElementsByClassName(className));
    }else {
        var nodes = getTag( '*', context);
        each(nodes,function(i,v){
            if((' '+this.className+' ').indexOf(' ' +className+ ' ') != -1){
                results.push(v);
            }
        });

    }
    return results;
};

//根据传入字符串 调用基础选择器
var get = function (selector, context, results) {
    context = context || document;
    results = results || [];
    //选择器匹配正则表达式
    var reg = /^(?:#([\w-]+)|\.([\w-]+)|([\w-]+)|(\*))$/,
        m = reg.exec(selector);

    if(m){
        //如果context是dom对象用数组包装
        if(context.nodeType){
            context = [ context ];
        }
        //如果context是字符串 作为选择器字符串查找
        if(typeof  context === 'string'){
            context = get(context);
        }
        //循环遍历context
        each(context, function () {

            if(m[1]){
                results = getId(m[1] , results);
            }else if(m[2]){
                results = getClass(m[2] , this, results)
            }else {
                results = getTag(m[3] || '*', this, results);
            }
        });

    }
    return results;
};

//后代与并集选择器

var select = function (selector, context, results) {
    results = results || [];
    //用 ',' 分隔并集选择
    var nodes = selector.split(',');
    each(nodes, function (i, v) {
        var c = context,
        //去除每一项选择器字符串两端的空格, 并将所有连续的多个空格用一个空格替换
            //然后用空格分割成数组
            nodesChilds = trim(v).replace(/\s+/g,' ').split(' ');
        each(nodesChilds, function (index, value) {
            c = get(value, c);
        });
        push.apply(results, c);
    });
    return results;
};

return select ;

})(window);


/*-------------------------------整体框架-----------------------------*/
//工具函数
var push = [].push;
try{
    var div = document.createElement('div');
    div.appendChild(document.createElement('div'));
    var list = div.getElementsByTagName('*');
    //检测push.apply能否使用伪数组
    push.apply([], list);
}catch(e){
    push = {
        apply: function (target, elem) {
            var i = target.length,
                j = 0;
            while(target[i++] = elem[ j++]);
            target.length = i - 1;
        }
    };
}finally{
    div = list = null;
}

var hw = function (selector) {
    return new hw.fn.init(selector);
};
//重写hw原型
hw.fn = hw.prototype = {
    constructor:hw,
    selector: null,
    lenght: 0,
    init: function (selector) {
        //如果selector不存在
        if(!selector) return this;
        //如果selector是字符串
        if(hw.isString(selector)){
            if(hw.trim(selector).charAt(0) === '<'){
                hw.push.apply(this, hw.parseHtml(selector));
            }else {
                hw.push.apply(this, hw.select(selector));
                this.selector = selector;
            }
            return this;
        };
        //如果selector是hw对象
        if(hw.isHw(selector)){
            return this;
        }
        //如果selector是单个dom节点
        if(hw.isDom(selector)){
            this[0] = selector;
            this.length = 1;
            return this;
        };
        //如果selector是数组
        if(hw.isLikeArray(selector)){
            hw.push.apply(this, selector);
            return this;
        }
        //如果selector是函数
        if(hw.isFunction(selector)){
            var oldLoad = window.onload ;

            if(hw.isFunction(oldLoad)){
                window.onload = function () {
                    oldLoad();
                    selector();
                }
            }else {
                window.onload = selector;
            }
        }

    },
    each: function (callback) {
        hw.each(this, callback);
        return this;
    }
};

//将init的原型 更改为hw的原型
hw.fn.init.prototype = hw.prototype;

//扩展工具函数
hw.extend = hw.fn.extend = function(obj){
    var k;
    for( k in obj){
        this[k] = obj[k];
    }
};

//类型判断
hw.extend({
   isFunction: function(fn){
       return typeof fn === 'function';
   },
   isString: function(str){
       return typeof  str === 'string';
   },
   isLikeArray: function(obj){
       var len = obj.length;
       return !!length && length >= 0 && length - 1 in obj;
   },
   isHw: function(obj){
       return !!obj.selector;
   },
   isDom: function(dom){
       return !!dom.nodeType;
   }
});

//工具方法
hw.extend({
    parseHtml: function (html) {
        var arr = [],
            div = document.createElement('div'),
            nodes = div.childNodes;
        div.innerHTML = html;
        if(nodes[0]){
            hw.push.apply(arr, nodes);
        }
        return arr;
    },
    each: function (arr, callback) {
        var i, k,
            len;
        if(arr){
            if(hw.isLikeArray(arr)){
                len = arr.length;
                for(i = 0;i < len ; i++){
                    if(callback.call(arr[i], i, arr[i] === false)){
                        break;
                    }
                }
            }
        }else{
            for( k in arr){
                if(callback.call(arr[i], i, arr[i] === false)){
                    break;
                }
            }
        }
        return arr;
    },
    map:  function ( arr, callback, target ) {
        var results = [], res, len, i;
        if ( hw.isLikeArray( arr ) ) {   // 数组
            len = arr.length;
            for ( i = 0; i < len; i++ ) {
                res = callback( arr[ i ], i, target );
                if ( res ) {
                    results.push( res );
                }
            }
        } else {                        // 对象
            for ( i in arr ) {
                res = callback( arr[ k ], k, target );
                if ( res ) {
                    results.push( res );
                }
            }
        }
        return results.concat.apply( [], results );
    },
    trim: function(str){
        if(String.prototype.trim){
            return str.trim();
        }else {
            return str.replace(/^\s+|\s+$/g,'')
        }
    },
    push: push

});

/*------------DOM操作---------------------------*/
//dom操作工具方法
hw.extend({
    firstChild: function(dom){
        return dom.firstElementChild || dom.firstChild;
    },
    lastChild: function (dom) {
      return dom.lastElementChild || dom.lastChild;
    },
    insertAfter: function(dom){

    }
});

//操作dom方法
hw.fn.extend({
    appendTo: function(html){
        var elem = hw(html),
            i = 0,
            l = elem.length,
            arr = [],
            node;
        for( ;i < l; i++){
            hw.each(elem, function(){
               node = (i == l - 1) ? this : this.cloneNode(true);
                arr.push(node);
                elem[i].appendChild(node);
            });
        }
        return hw(arr);
    },
    append: function(html){
        hw.(html).appendTo(this);
        return this;
    },
    prependTo: function(html){
        var elem = hw.(html),
            i = 0,
            l = elem.length,
            arr = [],
            node;
        for( ; i < l; i++){
            hw.each(elem, function () {
               node = (i == l - 1) ?  this :this.childNodes(true);
               arr.push(node);
               elem[i].insertBefore(node, hw.firstChild(elem[i]));
            });
            return hw(arr);
        }
    },
    prepend: function(html){
        hw(html).prependTo(this);
        return this;
    }
});


/*-----------------------事件--------------------------*/
var addEvent = function ( obj, type, fn ) {
    var fEventHandler = function ( e ) {
        e = window.event || e;
        fn.call( this, hw.Event( e ) );  // 修改上下文调用
    }

    if ( obj.addEventListener ) {
        obj.addEventListener( type, fEventHandler );
    } else {
        obj.attachEvent( 'on' + type, fEventHandler );
    }
};


hw.fn.extend({
    on: function ( type, fn ) {
        this.each( function () {
            addEvent( this, type, fn );
        } );

        return this;
    }
});


hw.each( ( 'click keydown keyup keypress focus submit ' +
'mousedown mouseup mouseenter mouseleave mouseover ' +
'mouseout mousemove' ).split( ' ' ), function ( k, v ) {
    var that = this;
    hw.fn[ this ] = function ( fn ) {
        this.on( that, fn );

        return this;
    };
});

// 事件对象
hw.Event = function ( e ) {
    return new hw.Event.fn.init( e );
};
hw.Event.fn = hw.Event.prototype = {
    constructor: hw.Event,

    init: function ( e ) {
        this.event = e;
        // 事件类型
        this.type = e.type;
        // 坐标
        this.clientX = e.clientX;
        this.clientY = e.clientY;
        this.screenX = e.screenX;
        this.screenY = e.screenY;
        this.pageX = e.pageX;
        this.pageY = e.pageY;

        // 控制属性
        this.altKey = e.altKey;
        this.shiftKey = e.shiftKey;
        this.ctrlKey = e.ctrlKey;

        // 事件源对象与事件对象( 未考虑 IE )
        // IE 使用 srcElement
        // 火狐中使用 target
        this.target = this.target || this.srcElement;
        this.currentTarget = this.currentTarget;

        // 鼠标键属性
        // IE 左中右: 142
        // 火狐 : 012
        if ( e === window.event ) {
            // 1 4 2
            this.which = [ undefined, 0, 2, undefined, 1 ][ e.button ];
        } else {
            this.which = e.button;
        }
    },

    stopPropagation: function () {
        if ( this.event.stopPropagation ) {
            this.event.stopPropagation();
        }
        this.event.cancelBubble = true;
    }
};
hw.Event.fn.init.prototype = hw.Event.prototype;