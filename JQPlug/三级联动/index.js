
jQuery.extend({
    distPicker: function distPicker() {

    }
})

var distPicker = (function(){


    function distPicker(id,url) {

        this.id = id;
        this.select1 = 'select1';
        this.select2 = 'select2';
        this.select3 = 'select3';
        this.url = url;
        this.data = {};
        this.init();

    }

    distPicker.prototype = {
        constructor: distPicker,
        init: function () {
          this.getData();
          this.setHtml(this.id);

        },

        setHtml: function ( id ) {
            var str = '<select name="" class="' + this.select1 +' "><option value="0">--请选择--</option></select>' +
                '<select name="" class="' + this.select2 +' "><option value="0">--请选择--</option></select>' +
                '<select name="" class="' + this.select3 +' "><option value="0">--请选择--</option></select>';
            $(id).html(str);
        },

        getData: function () {
          var _this = this;
          $.ajax({url:_this.url,success(data){
              _this.data = data;
              console.log(data);
              _this.setData(_this.select1,_this.data);
              _this.change();

          }})
        },

        setData: function (select, data) {
            select = $(this.id + " ." + select);
            var str = '<option value="0">--请选择--</option> ';
            let type = Object.prototype.toString.call(data);

            if(type === "[object Object]"){
                for( var i in data){
                    str +=  '<option value='+ i +'>'+ i+ '</option> ';
                }
            }else if(type === "[object Array]"){
                for( var i=0 , len = data.length; i < len; i++){
                    str +=  '<option value='+ data[i] +'>'+ data[i] + '</option> ';
                }
            }
            select.html(str);

            
        },

        change: function () {
            var _this = this;
            var $select = $(this.id );
            var val1 = '', val2 = '', var3 = '';
            $select.on('change',  " ." + _this.select1, function () {
                 val1 = $(this).val();
                _this.setData(_this.select2, _this.data[val1]);
                _this.setData(_this.select3);

            }  );

            $select.on('change',  " ." + _this.select2, function () {
                val2 = $(this).val();
                _this.setData(_this.select3,_this.data[val1][val2]);
            }  );

            $select.on('change',  " ." + _this.select3, function () {
            }  );
        }

    }



   return distPicker;
})();