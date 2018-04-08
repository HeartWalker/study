;
var imgCrop = (function () {

    /**
     *
     * @param {object} opts
     * opts.id 上传图片按钮id
     * opts.contain 放置图片的容器id
     * opts.width 容器宽度
     * opts.height 容器高度
     */
    function imgCrop(opts) {
        this.opts = opts;
        this.init();
    }
    imgCrop.prototype = {
         constructor: imgCrop,
         init: function () {
            this.readFile();
         },
        readFile: function () {
             var _this = this;
            var file = document.querySelector('#' + this.opts.id);
            file.addEventListener('change',function () {
                var reader = new FileReader();
                var image = this.files[0];
                //window.URL.createObjectURL(image)

                //验证文件类型必须为图片
                if(!/^image\/\w+/.exec(image.type)){return}
                reader.readAsDataURL(image);

                reader.onload = function () {
                    var img = new Image();
                    img.src = reader.result;
                    img.onload = function () {
                        console.log(this.width);;
                        var canvas = _this.compressImg(img, this.width, this.height);
                        var contain = document.getElementById(_this.opts.contain);
                        contain.innerHTML = '';
                        contain.appendChild(canvas);

                    }

                }
            })
        },
        /**
         *  如果图片大小超过容器,等比例压缩到容器大小
         * @param img 源图
         * @param w 源图片高度
         * @param h 源图片宽度
         * @return
         */
        compressImg: function (img, w, h) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            var maxWidth = this.opts.width;
            var maxHeight = this.opts.height;
            if( w > maxWidth || h > maxHeight){
                if( w / h > maxWidth / maxHeight) { //更宽
                    h = h / w * maxWidth;
                    w = maxWidth;

                } else {
                    w = w / h * maxHeight;
                    h = maxHeight;

                }
            }
            canvas.width = w;
            canvas.height = h;
            //清除画布 此处的canvas不共用 使用innderHTML = '' 清空
            //context.clearRect(0, 0, w, h);
            //压缩
            context.drawImage(img, 0, 0, w, h);
            /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
             * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
            var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
            return canvas;
        }

    }
    return imgCrop;
})()